/**
 * Text Tab Component
 * Text editing interface with MTG formatting
 */

import { memo } from 'react';
import { Box, Heading, Textarea, VStack, Tabs, Button, HStack, Table, DrawerRoot, DrawerBackdrop, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseTrigger, Input } from '@chakra-ui/react';
import { Field } from '../ui/field';
import { LabeledInput, LabeledSelect } from '../ui';
import { useCardStore } from '../../store/cardStore';
import { useState, useRef, useMemo, useEffect } from 'react';
import { convertTypedQuote } from '../../utils/smartQuotes';
import { useCardText, useLoadedPack, useDungeonRooms, useIsDungeonCard } from '../../store/selectors';
import { useUIStore } from '../../store/uiStore';
import { formatTextRenderError } from '../../utils/textRenderErrors';
import { useDebouncedCallback } from '../../hooks/useDebounce';
import { TEXT_INPUT_DEBOUNCE_MS, SLIDER_DEBOUNCE_MS } from '../../constants/canvas';
import { generateDungeonTextFields } from '../../utils/dungeonHelpers';
import { BUILT_IN_MANA_SETS, processCustomManaFiles } from '../../constants/manaSets';

/**
 * Standard field display order and labels
 */
const FIELD_LABELS: Record<string, string> = {
  'mana': 'Mana',
  'title': 'Title',
  'type': 'Type',
  'rules': 'Rules Text',
  'pt': 'Power/Toughness',
  'nickname': 'Nickname',
};

const TEXT_CODES = [
 { code: "{/__}", result: "All tokens have a closing token to reset. Replace __ with the token that you are using. ie. {outline#}{/outline#}" },
 { code: "{cardname}", result: "Inserts the name of the card (or use a tilde: ~)" },
 { code: "{-}", result: "Inserts an em-dash" },
 { code: "{i}", result: "Italicizes text" },
 { code: "{/i}", result: "Removes italicization" },
 { code: "{bold}", result: "Bolds text" },
 { code: "{/bold}", result: "Removes bold" },
 { code: "{lns}", result: "Moves to the next line without an extra space (stands for line-no-space)" },
 { code: "{divider}", result: "Moves to the next line and draws the flavor text bar" },
 { code: "{flavor}", result: "Moves to the next line, draws the flavor text bar, and italicizes" },
 { code: "{oldflavor}", result: "Italicizes and adds line breaks" },
 { code: "{fontsize#pt}", result: "Changes the font size to #pt (absolute)" },
 { code: "{fontsize#}", result: "Changes the font size by # pixels (relative - use negative integers to shrink text - ie '{fontsize-12}')" },
 { code: "{fontcolor___}", result: "Changes the font color to ___ (ie '{fontcolor#00FF00}')" },
 { code: "{left}", result: "Aligns text to the left" },
 { code: "{center}", result: "Aligns text to the center" },
 { code: "{right}", result: "Aligns text to the right" },
 { code: "{justify-left}", result: "Justifies text to the left" },
 { code: "{justify-center}", result: "Justifies text to the center" },
 { code: "{justify-right}", result: "Justifies text to the right" },
 { code: "{permashift#,$}", result: "Moves the text # pixels right and $ pixels down. Recommended for moving the text over large distances" },
 { code: "{up#}", result: "Moves the text # pixels up" },
 { code: "{down#}", result: "Moves the text # pixels down" },
 { code: "{left#}", result: "Moves the text # pixels left" },
 { code: "{right#}", result: "Moves the text # pixels right" },
 { code: "{shadow#}", result: "Changes the shadow distance to # (use {shadow0} to remove the shadow)" },
 { code: "{shadowcolor#}", result: "Changes the shadow color to #" },
 { code: "{outline#}", result: "Changes the Outline Width to # (enables it if not already enabled)" },
 { code: "{outlinecolor___}", result: "Changes the Outline Color to ___ (ie '{outlinecolorblue}'" },
 { code: "{bullet}", result: "Does bullet point •" },
 { code: "{indent}", result: "Indents the rest of the paragraph to the current point" },
 { code: "{/indent}", result: "Removes paragraph indendation" },
 { code: "{kerning#}", result: "Changes the kerning (letter spacing) to #" },
 { code: "{roll___}", result: "Used for dice-rolling cards (like from AFR) - whatever you fill in for '___' will be bolded, and alternating paragraphs will be shaded." },
 { code: "Notes", result: "For colors, you may use HTML color codes (ie 'green'), hex color codes (ie '#00FF00'), or rgb (ie 'rgb(0,255,0)'')" },
];

const MANA_CODES = [
 { code: "{1}, {2}... {20}", result: "Generic mana (works for numbers 1 through 20)" },
 { code: "{w}, {u}, {b}, {r}, {g}", result: "Colored mana" },
 { code: "{wu}, {wb}, {ub}... {2w}, {2u}...", result: "Hybrid mana" },
 { code: "{pw}, {pu}...", result: "Phyrexian mana" },
 { code: "{wup}, {wbp}, {ubp}...", result: "Hybrid phyrexian mana" },
 { code: "{t}, {untap}", result: "Respective tapping-related symbol" },
 { code: "{oldtap}, {originaltap}", result: "Old tap symbols" },
 { code: "{x}, {y}, {z}", result: "Respective variable-related symbol" },
 { code: "{c}", result: "Colorless-specific mana" },
 { code: "{s}", result: "Snow mana" },
 { code: "{e}", result: "Energy symbol" },
 { code: "{+1}", result: "+1 loyalty icon" },
 { code: "{planeswalker}", result: "Planeswalker icon" },
 { code: "{chaos}", result: "Chaos symbol (planechase)" },
 { code: "{p}", result: "Bloomburrow pawprint symbol" },
 { code: "Notes", result: "Hybrid/Phyrexian mana only works with WUBRG" },
];

const TextTabComponent = () => {
  // Use fine-grained selectors to prevent unnecessary re-renders
  const text = useCardText();
  const updateText = useCardStore((state) => state.updateText);
  const loadedPack = useLoadedPack();
  const isDungeonCard = useIsDungeonCard();
  const dungeonRooms = useDungeonRooms();
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [editBoundsOpen, setEditBoundsOpen] = useState(false);
  const [codeReferenceOpen, setCodeReferenceOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Mana style state from uiStore
  const globalManaPrefix = useUIStore((s) => s.globalManaPrefix);
  const selectBuiltInManaSet = useUIStore((s) => s.selectBuiltInManaSet);
  const registerCustomManaSymbols = useUIStore((s) => s.registerCustomManaSymbols);
  const customManaSetLabel = useUIStore((s) => s.customManaSetLabel);
  const selectCustomManaSet = useUIStore((s) => s.selectCustomManaSet);
  const clearCustomManaSymbols = useUIStore((s) => s.clearCustomManaSymbols);
  const customManaSymbols = useUIStore((s) => s.customManaSymbols);

  // Custom mana upload state
  const [isUploadingMana, setIsUploadingMana] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Text render errors from UI store
  const textRenderErrors = useUIStore((state) => state.textRenderErrors);
  
  // Local state for immediate UI feedback (prevents input lag)
  const [localText, setLocalText] = useState<Record<string, string>>({});

  // Bounds input state
  const [boundsX, setBoundsX] = useState<number | ''>('');
  const [boundsY, setBoundsY] = useState<number | ''>('');
  const [boundsWidth, setBoundsWidth] = useState<number | ''>('');
  const [boundsHeight, setBoundsHeight] = useState<number | ''>('');

  // Font size adjustment state
  const [fontSizeAdjustment, setFontSizeAdjustment] = useState<number>(0);

  // Store selection state before button click
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  // Debounced update callbacks for text input
  const debouncedUpdateText = useDebouncedCallback(
    (fieldKey: string, newText: string) => {
      updateText(fieldKey, { text: newText });
    },
    TEXT_INPUT_DEBOUNCE_MS
  );

  // Debounced update callbacks for bounds inputs
  const debouncedUpdateBounds = useDebouncedCallback(
    (fieldKey: string, updates: Record<string, number | undefined>) => {
      updateText(fieldKey, updates);
    },
    SLIDER_DEBOUNCE_MS
  );

  // Debounced update callback for font size adjustment
  const debouncedUpdateFontSize = useDebouncedCallback(
    (fieldKey: string, value: number) => {
      updateText(fieldKey, { fontSizeAdjustment: value });
    },
    SLIDER_DEBOUNCE_MS
  );

  /**
   * Generate dungeon room text field definitions dynamically
   * These are computed from the current dungeon room configuration
   */
  const dungeonTextFields = useMemo(() => {
    if (!isDungeonCard || dungeonRooms.length === 0) {
      return {};
    }
    return generateDungeonTextFields(dungeonRooms);
  }, [isDungeonCard, dungeonRooms]);

  /**
   * Dynamically build TEXT_FIELDS based on the loaded frame pack (if any)
   * Pack-defined fields take priority and preserve their declared order
   * Fallback to default card text ordering when no pack text is available
   *
   * SPECIAL CASE: For dungeon cards, dynamically generate room text fields
   * based on the number of rooms defined in the Dungeon tab
   */
  const TEXT_FIELDS = useMemo(() => {
    const packText = loadedPack?.text;

    // For dungeon cards, merge pack text (title) with dynamic room fields
    if (isDungeonCard && dungeonRooms.length > 0) {
      const mergedText = { ...packText, ...dungeonTextFields };
      const fields = Object.keys(mergedText);

      // Sort so title comes first, then rooms in order
      fields.sort((a, b) => {
        if (a === 'title') return -1;
        if (b === 'title') return 1;
        // Extract room numbers and sort numerically
        const aMatch = a.match(/dungeonRoom(\d+)/);
        const bMatch = b.match(/dungeonRoom(\d+)/);
        if (aMatch && bMatch) {
          return parseInt(aMatch[1], 10) - parseInt(bMatch[1], 10);
        }
        return a.localeCompare(b);
      });

      return fields.map((key) => ({
        key,
        label: mergedText[key]?.name || FIELD_LABELS[key] || key,
      }));
    }

    const packFields = packText ? Object.keys(packText) : [];
    const cardFields = text ? Object.keys(text) : [];

    const activeFields = packFields.length > 0 ? packFields : cardFields;
    if (activeFields.length === 0) return [];

    const resolveLabel = (key: string) =>
      packText?.[key]?.name || text?.[key]?.name || FIELD_LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1);

    // When a pack defines text entries, respect its order exactly
    if (packFields.length > 0) {
      return activeFields.map((key) => ({ key, label: resolveLabel(key) }));
    }

    // Otherwise fall back to the default ordering logic
    const fieldOrder = ['mana', 'title', 'type', 'rules', 'pt'];
    const orderedFields = fieldOrder.filter((key) => activeFields.includes(key));
    const extraFields = activeFields.filter((key) => !fieldOrder.includes(key));

    return [...orderedFields, ...extraFields].map((key) => ({
      key,
      label: resolveLabel(key),
    }));
  }, [loadedPack, text, isDungeonCard, dungeonRooms, dungeonTextFields]);

  // Initialize selected field to first available field if not set
  const currentField = useMemo(() => {
    if (selectedField && TEXT_FIELDS.some(f => f.key === selectedField)) {
      return selectedField;
    }
    // Default to first available field, or empty string if no fields
    return TEXT_FIELDS.length > 0 ? TEXT_FIELDS[0].key : '';
  }, [selectedField, TEXT_FIELDS]);

  // Sync local text state from store when text changes
  useEffect(() => {
    if (!text) return;

    // Initialize local text state from store for all fields
    const newLocalText: Record<string, string> = {};
    Object.keys(text).forEach(key => {
      newLocalText[key] = text[key]?.text || '';
    });
    setLocalText(newLocalText);
  }, [text]);

  // Load bounds when currentField changes
  useEffect(() => {
    if (!currentField) return;

    const fieldConfig = text?.[currentField];
    if (fieldConfig) {
      setBoundsX(fieldConfig.x ?? '');
      setBoundsY(fieldConfig.y ?? '');
      setBoundsWidth(fieldConfig.width ?? '');
      setBoundsHeight(fieldConfig.height ?? '');
      setFontSizeAdjustment(fieldConfig.fontSizeAdjustment ?? 0);
    } else if (isDungeonCard && currentField.startsWith('dungeonRoom')) {
      // For dungeon rooms not yet in store, compute bounds on-the-fly
      const computed = generateDungeonTextFields(dungeonRooms);
      const computedField = computed[currentField];
      if (computedField) {
        setBoundsX(computedField.x ?? '');
        setBoundsY(computedField.y ?? '');
        setBoundsWidth(computedField.width ?? '');
        setBoundsHeight(computedField.height ?? '');
        setFontSizeAdjustment(0);
      }
    }
  }, [currentField, text, isDungeonCard, dungeonRooms]);

  const wrapSelectedText = (prefix: string, suffix: string) => {
    const start = selectionStart;
    const end = selectionEnd;

    // Get the current text from local state for immediate feedback
    const currentText = localText[currentField] || '';
    const selectedText = currentText.substring(start, end);

    // Only apply if there's selected text
    if (selectedText && start !== end) {
      const newText =
        currentText.substring(0, start) +
        prefix + selectedText + suffix +
        currentText.substring(end);

      // Update local state immediately
      setLocalText(prev => ({ ...prev, [currentField]: newText }));

      // Update the store with the new text
      updateText(currentField, { text: newText });

      // Restore cursor position and selection after the wrapped text
      setTimeout(() => {
        const textarea = textareaRef.current;
        if (textarea) {
          textarea.focus();
          const newSelectionStart = start + prefix.length;
          const newSelectionEnd = newSelectionStart + selectedText.length;
          textarea.setSelectionRange(newSelectionStart, newSelectionEnd);
          // Update state to reflect new selection
          setSelectionStart(newSelectionStart);
          setSelectionEnd(newSelectionEnd);
        }
      }, 0);
    }
  };

  const handleItalic = () => wrapSelectedText('{i}', '{/i}');
  const handleBold = () => wrapSelectedText('{bold}', '{/bold}');

  /**
   * Handle bounds update - persist changes to store (debounced)
   */
  const handleBoundsChange = (field: 'x' | 'y' | 'width' | 'height', value: number | '') => {
    const updates: Record<string, number | undefined> = {};

    if (field === 'x') {
      setBoundsX(value);
      updates.x = value !== '' ? value : undefined;
    } else if (field === 'y') {
      setBoundsY(value);
      updates.y = value !== '' ? value : undefined;
    } else if (field === 'width') {
      setBoundsWidth(value);
      updates.width = value !== '' ? value : undefined;
    } else if (field === 'height') {
      setBoundsHeight(value);
      updates.height = value !== '' ? value : undefined;
    }

    // Use debounced update for smooth slider experience
    debouncedUpdateBounds(currentField, updates);
  };

  /**
   * Handle font size adjustment changes (debounced)
   */
  const handleFontSizeAdjustmentChange = (value: number) => {
    setFontSizeAdjustment(value);
    // Use debounced update for smooth slider experience
    debouncedUpdateFontSize(currentField, value);
  };

  /**
   * Reset bounds to pack defaults
   */
  const handleResetBounds = () => {
    const packDefaults = loadedPack?.text?.[currentField];
    if (packDefaults) {
      setBoundsX(packDefaults.x ?? '');
      setBoundsY(packDefaults.y ?? '');
      setBoundsWidth(packDefaults.width ?? '');
      setBoundsHeight(packDefaults.height ?? '');
      setFontSizeAdjustment(0);
      updateText(currentField, {
        x: packDefaults.x,
        y: packDefaults.y,
        width: packDefaults.width,
        height: packDefaults.height,
        fontSizeAdjustment: 0,
      });
    }
  };

  /**
   * Handle custom mana folder upload
   * Processes uploaded image files and extracts symbol names from filenames
   */
  const handleCustomManaUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploadingMana(true);
    setUploadError(null);

    try {
      const { symbols, unmatched } = await processCustomManaFiles(files);

      const symbolCount = Object.keys(symbols).length;

      if (symbolCount === 0) {
        setUploadError(
          'No valid mana symbols found. Files should be named after symbols (e.g., w.png, wu.svg, 10.png).'
        );
        return;
      }

      // Generate a label from the first file's directory or use a generic name
      const firstFile = files[0];
      let setLabel = 'Custom Set';

      // Try to extract folder name from webkitRelativePath if available
      if (firstFile.webkitRelativePath) {
        const parts = firstFile.webkitRelativePath.split('/');
        if (parts.length > 1) {
          setLabel = parts[0];
        }
      }

      // Register the symbols
      registerCustomManaSymbols(symbols, setLabel);

      // Log unmatched files for debugging
      if (unmatched.length > 0) {
        console.log('Unmatched files:', unmatched);
      }
    } catch (error) {
      console.error('Error processing custom mana files:', error);
      setUploadError('Failed to process uploaded files.');
    } finally {
      setIsUploadingMana(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  /**
   * Handle mana style selection change
   * Handles both built-in sets and custom set
   */
  const handleManaStyleChange = (value: string) => {
    if (value === 'custom') {
      // Select the already-uploaded custom set
      selectCustomManaSet();
    } else {
      // Select a built-in set (or default if empty)
      selectBuiltInManaSet(value);
    }
  };

  /**
   * Handle text change with smart quote conversion for rules field
   * Uses local state for immediate feedback, debounced store update
   *
   * For dungeon room fields, ensures the full field configuration is saved
   * to the store on first edit (not just the text)
   */
  const handleTextChange = (fieldKey: string, newText: string, cursorPos: number) => {
    // Update local state immediately for instant feedback
    setLocalText(prev => ({ ...prev, [fieldKey]: newText }));

    // Only apply smart quotes to the rules field
    if (fieldKey === 'rules') {
      const oldText = localText[fieldKey] || '';

      // Check if user just typed a quote
      if (newText.length > oldText.length && newText.charAt(cursorPos - 1) === '"') {
        const { text: convertedText, cursorOffset } = convertTypedQuote(newText, cursorPos);

        // Update local state with converted text
        setLocalText(prev => ({ ...prev, [fieldKey]: convertedText }));

        // Update store immediately for smart quotes (no debounce)
        updateText(fieldKey, { text: convertedText });

        // Restore cursor position after conversion
        setTimeout(() => {
          if (textareaRef.current) {
            const newPos = cursorPos + cursorOffset;
            textareaRef.current.setSelectionRange(newPos, newPos);
          }
        }, 0);
        return;
      }
    }

    // For dungeon room fields, if the field doesn't exist in the store yet,
    // initialize it with the full computed field configuration
    const isDungeonRoomField = fieldKey.startsWith('dungeonRoom');
    const fieldExistsInStore = text?.[fieldKey] !== undefined;

    if (isDungeonRoomField && !fieldExistsInStore) {
      // First time editing this dungeon room - compute and save full config
      const computed = generateDungeonTextFields(dungeonRooms);
      if (computed[fieldKey]) {
        updateText(fieldKey, { ...computed[fieldKey], text: newText });
      } else {
        debouncedUpdateText(fieldKey, newText);
      }
    } else {
      // Default: debounced update to store (text only)
      debouncedUpdateText(fieldKey, newText);
    }
  };

  return (
    <VStack align="stretch" gap={4}>
      <Tabs.Root value={currentField} onValueChange={(e) => setSelectedField(e.value)}>
        <Tabs.List
          bg="rgba(0, 0, 0, 0.3)"
          borderRadius="md"
          p={1}
          gap={1}
          css={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {TEXT_FIELDS.map((field) => (
            <Tabs.Trigger
              key={field.key}
              value={field.key}
              flex={1}
              minW="120px"
              fontSize="sm"
              border="2px solid"
              borderColor="transparent"
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
              _selected={{
                borderColor: 'purple.400',
                boxShadow: '0 0 12px rgba(159, 122, 234, 0.6)',
                bg: 'rgba(159, 122, 234, 0.2)',
              }}
              _hover={{
                borderColor: 'purple.300',
                bg: 'rgba(159, 122, 234, 0.1)',
              }}
              transition="all 0.2s"
            >
              {field.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {TEXT_FIELDS.map((field) => (
          <Tabs.Content key={field.key} value={field.key}>
            <VStack align="stretch" gap={3} mt={4}>
                {/* Error display for this field */}
                {textRenderErrors[field.key] && (
                  <Box
                    p={3}
                    bg="red.900"
                    color="red.100"
                    borderRadius="md"
                    borderLeft="4px solid"
                    borderColor="red.500"
                  >
                    <Box fontWeight="bold" mb={1}>
                      Rendering Error
                    </Box>
                    <Box fontSize="sm">
                      {formatTextRenderError(field.key, textRenderErrors[field.key])}
                    </Box>
                  </Box>
                )}

                <Textarea
                  ref={textareaRef}
                  value={localText[field.key] || ''}
                  onChange={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    handleTextChange(field.key, e.target.value, target.selectionStart);
                  }}
                  onSelect={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    setSelectionStart(target.selectionStart);
                    setSelectionEnd(target.selectionEnd);
                  }}
                  rows={6}
                  placeholder={loadedPack?.text?.[field.key]?.placeholder ?? 'Enter text...'}
                  css={{
                    textTransform: loadedPack?.text?.[field.key]?.allCaps ? 'uppercase' : 'none',
                  }}
                />

              <HStack gap={2} align="end">
                <Field label="Adjust Font Size:">
                  <Input
                    type="number"
                    value={fontSizeAdjustment}
                    onChange={(e) => handleFontSizeAdjustmentChange(Number(e.target.value) || 0)}
                    placeholder="0"
                    size="sm"
                    w="100px"
                  />
                </Field>
                <Button
                  size="sm"
                  onClick={handleItalic}
                  border="2px solid"
                  borderColor="transparent"
                  borderRadius="md"
                  bg="rgba(0, 0, 0, 0.3)"
                  color="white"
                >
                  Italic
                </Button>
                <Button
                  size="sm"
                  onClick={handleBold}
                  border="2px solid"
                  borderColor="transparent"
                  borderRadius="md"
                  bg="rgba(0, 0, 0, 0.3)"
                  color="white"
                >
                  Bold
                </Button>
                <Button
                  size="sm"
                  onClick={() => setEditBoundsOpen(true)}
                  border="2px solid"
                  borderColor="transparent"
                  borderRadius="md"
                  bg="rgba(0, 0, 0, 0.3)"
                  color="white"
                >
                  Edit Bounds
                </Button>
                <Button
                  size="sm"
                  onClick={() => setCodeReferenceOpen(true)}
                  border="2px solid"
                  borderColor="transparent"
                  borderRadius="md"
                  bg="rgba(0, 0, 0, 0.3)"
                  color="white"
                >
                  Code Reference
                </Button>
              </HStack>
            </VStack>
          </Tabs.Content>
        ))}
      </Tabs.Root>

      {/* Mana Symbol Style Select */}
      <VStack align="stretch" gap={2}>
        <LabeledSelect
          label="Mana Symbol Style"
          value={globalManaPrefix}
          onChange={handleManaStyleChange}
          items={[
            { label: 'Default (Standard)', value: '' },
            ...BUILT_IN_MANA_SETS.map((set) => ({
              label: set.name,
              value: set.prefix,
            })),
            // Only show custom option if symbols have been uploaded
            ...(Object.keys(customManaSymbols).length > 0
              ? [{ label: `Custom: ${customManaSetLabel}`, value: 'custom' }]
              : []),
          ]}
        />

        {/* Custom Mana Upload */}
        <Box>
          <HStack gap={2}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              // @ts-expect-error - webkitdirectory is a non-standard attribute
              webkitdirectory=""
              style={{ display: 'none' }}
              onChange={(e) => handleCustomManaUpload(e.target.files)}
            />
            <Button
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingMana}
              border="2px solid"
              borderColor="transparent"
              borderRadius="md"
              bg="rgba(0, 0, 0, 0.3)"
              color="white"
            >
              {isUploadingMana ? 'Processing...' : 'Upload Custom Mana Folder'}
            </Button>
            {Object.keys(customManaSymbols).length > 0 && (
              <Button
                size="sm"
                onClick={clearCustomManaSymbols}
                border="2px solid"
                borderColor="transparent"
                borderRadius="md"
                bg="rgba(120, 0, 0, 0.3)"
                color="white"
              >
                Clear Custom
              </Button>
            )}
          </HStack>
          {uploadError && (
            <Box color="red.300" fontSize="sm" mt={1}>
              {uploadError}
            </Box>
          )}
          {Object.keys(customManaSymbols).length > 0 && !uploadError && (
            <Box color="green.300" fontSize="sm" mt={1}>
              {Object.keys(customManaSymbols).length} custom symbols loaded
            </Box>
          )}
        </Box>
      </VStack>

      {/* Edit Bounds Drawer */}
      <DrawerRoot open={editBoundsOpen} onOpenChange={(e) => setEditBoundsOpen(e.open)} placement="end" size="md">
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader>Edit Bounds - {text?.[currentField]?.name || currentField}</DrawerHeader>
          <DrawerCloseTrigger />
          <DrawerBody>
            <VStack align="stretch" gap={4}>
              <HStack gap={3}>
                <LabeledInput
                  label="X"
                  type="number"
                  step={0.01}
                  value={boundsX}
                  onChange={(val) => handleBoundsChange('x', val === '' ? '' : Number(val))}
                  flex={1}
                />

                <LabeledInput
                  label="Y"
                  type="number"
                  step={0.01}
                  value={boundsY}
                  onChange={(val) => handleBoundsChange('y', val === '' ? '' : Number(val))}
                  flex={1}
                />
              </HStack>

              <HStack gap={3}>
                <LabeledInput
                  label="Width"
                  type="number"
                  step={0.01}
                  value={boundsWidth}
                  onChange={(val) => handleBoundsChange('width', val === '' ? '' : Number(val))}
                  flex={1}
                />

                <LabeledInput
                  label="Height"
                  type="number"
                  step={0.01}
                  value={boundsHeight}
                  onChange={(val) => handleBoundsChange('height', val === '' ? '' : Number(val))}
                  flex={1}
                />
              </HStack>

              <Button
                onClick={handleResetBounds}
                size="sm"
                variant="outline"
                colorPalette="red"
                w="full"
              >
                Reset to Defaults
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>

      {/* Code Reference Drawer */}
      <DrawerRoot open={codeReferenceOpen} onOpenChange={(e) => setCodeReferenceOpen(e.open)} placement="end" size="lg">
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader>
            Code Reference
          </DrawerHeader>
          <DrawerCloseTrigger />

          <DrawerBody>
                <VStack align="stretch" gap={6} py={4}>
                  <Box>
                    <Heading size="md" mb={3}>Text Codes</Heading>
                    <Table.Root size="sm" variant="outline">
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeader>Code</Table.ColumnHeader>
                          <Table.ColumnHeader>Result</Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {TEXT_CODES.map((item, index) => (
                          <Table.Row key={index}>
                            <Table.Cell fontFamily="mono" fontSize="sm">{item.code}</Table.Cell>
                            <Table.Cell fontSize="sm">{item.result}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Box>

                  <Box>
                    <Heading size="md" mb={3}>Mana Codes</Heading>
                    <Table.Root size="sm" variant="outline">
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeader>Code</Table.ColumnHeader>
                          <Table.ColumnHeader>Result</Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {MANA_CODES.map((item, index) => (
                          <Table.Row key={index}>
                            <Table.Cell fontFamily="mono" fontSize="sm">{item.code}</Table.Cell>
                            <Table.Cell fontSize="sm">{item.result}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Box>
                </VStack>
              </DrawerBody>
        </DrawerContent>
      </DrawerRoot>

    </VStack>
  );
};

TextTabComponent.displayName = 'TextTab';
export const TextTab = memo(TextTabComponent);
