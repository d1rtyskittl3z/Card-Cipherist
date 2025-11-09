/**
 * Text Tab Component
 * Text editing interface with MTG formatting
 */

import { Box, Heading, Textarea, VStack, Tabs, Button, HStack, Table, DrawerRoot, DrawerBackdrop, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseTrigger, Drawer, Portal, CloseButton, Input } from '@chakra-ui/react';
import { Field } from '../ui/field';
import { useCardStore } from '../../store/cardStore';
import { useState, useRef, useMemo, useEffect } from 'react';
import { convertTypedQuote } from '../../utils/smartQuotes';

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

export const TextTab = () => {
  const text = useCardStore((state) => state.card.text || {});
  const updateText = useCardStore((state) => state.updateText);
  const loadedPack = useCardStore((state) => state.loadedPack);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [editBoundsOpen, setEditBoundsOpen] = useState(false);
  const [codeReferenceOpen, setCodeReferenceOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
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

  /**
   * Dynamically build TEXT_FIELDS from available text fields in the card
   * Order: mana, title, type, rules, pt, then any additional fields (like nickname)
   * Uses the 'name' property from text config, with FIELD_LABELS as fallback
   */
  const TEXT_FIELDS = useMemo(() => {
    const fieldOrder = ['mana', 'title', 'type', 'rules', 'pt'];
    const availableFields = Object.keys(text);
    
    // Build ordered list based on standard order, then add any extras
    const orderedFields = fieldOrder.filter(key => availableFields.includes(key));
    const extraFields = availableFields.filter(key => !fieldOrder.includes(key));
    
    return [...orderedFields, ...extraFields].map(key => ({
      key,
      label: text[key]?.name || FIELD_LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1),
    }));
  }, [text]);

  // Initialize selected field to first available field if not set
  const currentField = useMemo(() => {
    if (selectedField && TEXT_FIELDS.some(f => f.key === selectedField)) {
      return selectedField;
    }
    // Default to first available field, or empty string if no fields
    return TEXT_FIELDS.length > 0 ? TEXT_FIELDS[0].key : '';
  }, [selectedField, TEXT_FIELDS]);

  // Load bounds when currentField changes
  useEffect(() => {
    const fieldConfig = text[currentField];
    if (fieldConfig) {
      setBoundsX(fieldConfig.x ?? '');
      setBoundsY(fieldConfig.y ?? '');
      setBoundsWidth(fieldConfig.width ?? '');
      setBoundsHeight(fieldConfig.height ?? '');
      setFontSizeAdjustment(fieldConfig.fontSizeAdjustment ?? 0);
    }
  }, [currentField, text]);

  const wrapSelectedText = (prefix: string, suffix: string) => {
    const start = selectionStart;
    const end = selectionEnd;
    
    // Get the current text from the store, not from textarea (which might be stale)
    const currentText = text[currentField]?.text || '';
    const selectedText = currentText.substring(start, end);

    // Only apply if there's selected text
    if (selectedText && start !== end) {
      const newText =
        currentText.substring(0, start) +
        prefix + selectedText + suffix +
        currentText.substring(end);

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
   * Handle bounds update - persist changes to store
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
    
    updateText(currentField, updates);
  };

  /**
   * Handle font size adjustment changes
   */
  const handleFontSizeAdjustmentChange = (value: number) => {
    setFontSizeAdjustment(value);
    updateText(currentField, { fontSizeAdjustment: value });
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
   * Handle text change with smart quote conversion for rules field
   */
  const handleTextChange = (fieldKey: string, newText: string, cursorPos: number) => {
    // Only apply smart quotes to the rules field
    if (fieldKey === 'rules') {
      const oldText = text[fieldKey]?.text || '';

      // Check if user just typed a quote
      if (newText.length > oldText.length && newText.charAt(cursorPos - 1) === '"') {
        const { text: convertedText, cursorOffset } = convertTypedQuote(newText, cursorPos);
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

    // Default: just update the text normally
    updateText(fieldKey, { text: newText });
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
                <Textarea
                  ref={textareaRef}
                  value={text[field.key]?.text || ''}
                  onChange={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    handleTextChange(field.key, e.target.value, target.selectionStart);
                  }}
                  onMouseUp={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    setSelectionStart(target.selectionStart);
                    setSelectionEnd(target.selectionEnd);
                  }}
                  onKeyUp={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    setSelectionStart(target.selectionStart);
                    setSelectionEnd(target.selectionEnd);
                  }}
                  rows={6}
                  placeholder="Enter text..."
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

      {/* Edit Bounds Drawer */}
      <DrawerRoot open={editBoundsOpen} onOpenChange={(e) => setEditBoundsOpen(e.open)} placement="end" size="md">
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader>Edit Bounds - {text[currentField]?.name || currentField}</DrawerHeader>
          <DrawerCloseTrigger />
          <DrawerBody>
            <VStack align="stretch" gap={4}>
              <HStack gap={3}>
                <Box flex={1}>
                  <Field label="X">
                    <Input
                      type="number"
                      step="0.01"
                      value={boundsX}
                      onChange={(e) => handleBoundsChange('x', e.target.value === '' ? '' : Number(e.target.value))}
                    />
                  </Field>
                </Box>

                <Box flex={1}>
                  <Field label="Y">
                    <Input
                      type="number"
                      step="0.01"
                      value={boundsY}
                      onChange={(e) => handleBoundsChange('y', e.target.value === '' ? '' : Number(e.target.value))}
                    />
                  </Field>
                </Box>
              </HStack>

              <HStack gap={3}>
                <Box flex={1}>
                  <Field label="Width">
                    <Input
                      type="number"
                      step="0.01"
                      value={boundsWidth}
                      onChange={(e) => handleBoundsChange('width', e.target.value === '' ? '' : Number(e.target.value))}
                    />
                  </Field>
                </Box>

                <Box flex={1}>
                  <Field label="Height">
                    <Input
                      type="number"
                      step="0.01"
                      value={boundsHeight}
                      onChange={(e) => handleBoundsChange('height', e.target.value === '' ? '' : Number(e.target.value))}
                    />
                  </Field>
                </Box>
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
      <Drawer.Root open={codeReferenceOpen} onOpenChange={(e) => !e.open && setCodeReferenceOpen(false)} placement="end" size="lg">
        <Portal>
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header borderBottomWidth="1px">
                <HStack justify="space-between" w="full">
                  <Heading size="md">Code Reference</Heading>
                  <Drawer.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Drawer.CloseTrigger>
                </HStack>
              </Drawer.Header>

              <Drawer.Body>
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
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>

    </VStack>
  );
};
