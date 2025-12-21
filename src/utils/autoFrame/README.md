# AutoFrame Module

Automatic frame generation system for MTG-style cards. Detects card properties (colors, types, legendary status) and automatically selects and layers appropriate frame components.

## Overview

The AutoFrame system allows users to automatically generate frame layer stacks based on card data, eliminating the need to manually select and order frame layers. It supports 20 different frame types across various styles (M15, Universes Beyond, Etched, Borderless, etc.).

## Quick Start

```typescript
import { useAutoFrame } from '../hooks/useAutoFrame';

// In a React component
function FrameTab() {
  const {
    isEnabled,
    frameType,
    detectedColors,
    setEnabled,
    setFrameType,
    rebuild,
  } = useAutoFrame();

  // The hook automatically rebuilds frames when card data changes
}
```

## Module Structure

```
src/utils/autoFrame/
├── index.ts           # Barrel exports
├── config.ts          # Frame type and letter configurations
├── builders.ts        # Frame layer builder functions
├── colorDetection.ts  # Color detection from mana costs/type lines
├── orchestrator.ts    # Main orchestration logic
└── __tests__/         # Test files (205 tests)
```

## Key Functions

### Configuration (`config.ts`)

- `getFrameTypeConfig(type)` - Get configuration for a frame type
- `getFrameLetterConfig(builderType)` - Get letter config for path building
- `getSupportedFrameTypes()` - List all available frame types

### Builders (`builders.ts`)

- `makeFrameByLetterUnified(frameType, letter, mask, style)` - Core unified builder
- `makeM15FrameByLetter(...)`, `makeUBFrameByLetter(...)`, etc. - Type-specific wrappers

### Color Detection (`colorDetection.ts`)

- `detectCardColors(manaCost, typeLine)` - Detect colors from card data
- `detectSpellColors(manaCost)` - Detect colors from mana cost only
- `detectLandColors(typeLine, manaCost)` - Detect colors for lands
- `getCardFrameProperties(...)` - Get frame properties (letter, legendary, creature)

### Orchestration (`orchestrator.ts`)

- `buildAutoFrame(input)` - Main entry point, builds complete frame stack
- `determineStyle(frameType, typeLine, alwaysNyx)` - Determine Nyx/snow/regular
- `getPreservedFrames(frameType, existingFrames)` - Get frames to preserve during rebuild

## Supported Frame Types

| Category | Types |
|----------|-------|
| Standard | M15Regular-1, M15RegularNew, M15Eighth |
| Showcase | UB, Etched, JapanShowcase, Vault |
| Accurate | UBNew, FullArtNew |
| Custom | Circuit, Praetors, Adventure, Omen |
| Pre-M15 | Seventh, 8th |
| Borderless | Borderless, BorderlessUB |
| Extended Art | M15BoxTopper, M15ExtendedArtShort |

## Color Detection Logic

1. **Spells**: Parse mana cost for {W}, {U}, {B}, {R}, {G} symbols
2. **Lands**: Check type line for basic land types and mana abilities
3. **Hybrid**: Handle hybrid mana symbols (e.g., {W/U})
4. **Multicolor**: Cards with 3+ colors use the 'M' (multicolor) letter

## Layer Ordering

Frames are built in render order (bottom to top):
1. Border/Frame base
2. Main frame
3. Pinlines
4. Type/Title bars
5. Rules box
6. PT box (if creature)
7. Stamps (if UB/Vault)
8. Crown layers (if legendary)

## UI Integration

The `useAutoFrame` hook in `src/hooks/useAutoFrame.ts` provides:
- Store integration with `uiStore` (enabled, frameType, alwaysNyx)
- Debounced rebuilding (300ms) when card data changes
- Preservation of extension frames during rebuild
- Automatic color detection

The UI controls are in `src/components/tabs/FrameTab.tsx`:
- Toggle switch to enable/disable auto-frame
- Frame type dropdown (grouped by category)
- "Always Nyx" checkbox for enchantments
- Color indicator showing detected colors

## Testing

```bash
# Run autoFrame tests
npm run test -- --run src/utils/autoFrame

# Run with coverage
npm run test:coverage -- --run src/utils/autoFrame
```

Tests cover:
- Frame type configurations (37 tests)
- Builder functions (65 tests)
- Color detection (52 tests)
- Orchestration (51 tests)

## Error Handling

- Unknown frame types log an error and return empty/null results
- Missing assets are handled gracefully by the rendering system
- Invalid mana costs default to colorless

## Future Improvements

- Asset verification for all frame types
- Additional frame type support
- Performance optimization for large frame stacks
