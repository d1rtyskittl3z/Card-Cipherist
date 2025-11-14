# Card Cipherist - Comprehensive Refactoring Guide
**Version:** 1.0
**Created:** November 14, 2025
**Based On:** TECHNICAL_ANALYSIS.md
**Purpose:** Step-by-step implementation guide for codebase improvements

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Phase 1: Foundation (Week 1-2)](#phase-1-foundation-week-1-2)
4. [Phase 2: Code Organization (Week 3-6)](#phase-2-code-organization-week-3-6)
5. [Phase 3: Performance & Quality (Week 7-10)](#phase-3-performance--quality-week-7-10)
6. [Phase 4: Advanced Features (Week 11+)](#phase-4-advanced-features-week-11)
7. [Testing Strategy](#testing-strategy)
8. [Migration Checklist](#migration-checklist)
9. [Rollback Plan](#rollback-plan)

---

## Overview

### Goals
This refactoring aims to improve code maintainability, performance, and developer experience **without** changing the application's functionality or user interface.

### Key Principles
- ✅ **No Breaking Changes:** All refactors must be backward compatible
- ✅ **Incremental Progress:** Small, testable changes
- ✅ **Test Coverage:** Add tests before refactoring
- ✅ **Documentation:** Update docs alongside code changes

### Timeline
**Total Duration:** ~12 weeks (part-time)
**Commitment:** 10-15 hours/week
**Team Size:** 1-2 developers

---

## Prerequisites

### Required Knowledge
- React Hooks (useState, useEffect, useCallback, useMemo)
- TypeScript (interfaces, generics, type inference)
- Zustand state management
- Canvas API basics
- Git/GitHub workflow

### Development Environment Setup

#### 1. Install Dependencies
```bash
cd Card-Cipherist

# Install existing dependencies
npm install

# Install new dev dependencies for testing
npm install --save-dev \
  vitest \
  @vitest/ui \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  happy-dom \
  @tanstack/react-virtual \
  immer \
  zustand-middleware-immer
```

#### 2. Configure Vitest
```bash
# Create test configuration
cat > vitest.config.ts << 'EOF'
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
      ],
    },
  },
});
EOF
```

#### 3. Create Test Setup File
```bash
mkdir -p src/test
cat > src/test/setup.ts << 'EOF'
import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock HTMLCanvasElement
HTMLCanvasElement.prototype.getContext = () => ({
  fillRect: () => {},
  clearRect: () => {},
  drawImage: () => {},
  fillText: () => {},
  measureText: () => ({ width: 0 }),
  save: () => {},
  restore: () => {},
} as any);
EOF
```

#### 4. Update package.json Scripts
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch"
  }
}
```

#### 5. Create Git Branch
```bash
git checkout -b refactor/foundation-setup
```

---

## Phase 1: Foundation (Week 1-2)

### Overview
Establish testing infrastructure and extract magic strings to constants. These changes enable safer refactoring in later phases.

---

### Task 1.1: Extract Magic Strings to Constants

**Priority:** HIGH
**Effort:** 8 hours
**Dependencies:** None

#### Steps

##### 1. Create Constants Directory
```bash
mkdir -p src/constants
```

##### 2. Create Tab Constants
```bash
cat > src/constants/tabs.ts << 'EOF'
/**
 * Application tab identifiers
 * Used in CardCreatorLayout for accordion navigation
 */
export const TABS = {
  SCRYFALL: 'scryfall',
  FRAME: 'frame',
  SAGA: 'saga',
  PLANESWALKER: 'planeswalker',
  KAMIGAWA: 'kamigawa',
  STATIONS: 'stations',
  TEXT: 'text',
  ART: 'art',
  SET_SYMBOL: 'setSymbol',
  WATERMARK: 'watermark',
  COLLECTOR: 'collector',
  SAVE: 'save',
  TUTORIAL: 'tutorial',
} as const;

export type TabKey = typeof TABS[keyof typeof TABS];
EOF
```

##### 3. Create Text Field Constants
```bash
cat > src/constants/textFields.ts << 'EOF'
/**
 * Standard text field identifiers
 * Used throughout the application for card text rendering
 */
export const TEXT_FIELDS = {
  MANA: 'mana',
  TITLE: 'title',
  TYPE: 'type',
  RULES: 'rules',
  PT: 'pt',
  NICKNAME: 'nickname',
  FLAVOR: 'flavor',
} as const;

export type TextFieldKey = typeof TEXT_FIELDS[keyof typeof TEXT_FIELDS];

/**
 * Array of standard text fields for iteration
 */
export const STANDARD_TEXT_FIELDS = [
  TEXT_FIELDS.MANA,
  TEXT_FIELDS.TITLE,
  TEXT_FIELDS.TYPE,
  TEXT_FIELDS.RULES,
  TEXT_FIELDS.PT,
] as const;
EOF
```

##### 4. Create Card Version Constants
```bash
cat > src/constants/cardVersions.ts << 'EOF'
/**
 * Card frame version identifiers
 */
export const CARD_VERSIONS = {
  M15_REGULAR: 'm15Regular',
  NEO_BASICS: 'neoBasics',
  SAGA: 'saga',
  PLANESWALKER: 'planeswalker',
  STATION_REGULAR: 'stationRegular',
  STATION_BORDERLESS: 'stationBorderless',
  TOKEN_REGULAR: 'tokenRegular',
  TRANSFORM: 'transform',
  MODAL_DFC: 'modalDfc',
} as const;

export type CardVersion = typeof CARD_VERSIONS[keyof typeof CARD_VERSIONS];

/**
 * Helper to check if a version is a saga card
 */
export const isSagaVersion = (version: string): boolean => {
  return version.toLowerCase().includes('saga');
};

/**
 * Helper to check if a version is a planeswalker card
 */
export const isPlaneswalkerVersion = (version: string): boolean => {
  return version.toLowerCase().includes('planeswalker');
};

/**
 * Helper to check if a version is a station card
 */
export const isStationVersion = (version: string): boolean => {
  return version.toLowerCase().includes('station');
};
EOF
```

##### 5. Create Canvas Layer Constants
```bash
cat > src/constants/canvasLayers.ts << 'EOF'
/**
 * Canvas layer names for multi-layer rendering
 */
export const CANVAS_LAYERS = {
  CARD: 'card',
  FRAME: 'frame',
  FRAME_MASKING: 'frameMasking',
  FRAME_COMPOSITING: 'frameCompositing',
  SAGA: 'saga',
  PLANESWALKER_PRE: 'planeswalkerPre',
  PLANESWALKER_POST: 'planeswalkerPost',
  STATION_PRE: 'stationPre',
  STATION_POST: 'stationPost',
  TEXT: 'text',
  PARAGRAPH: 'paragraph',
  LINE: 'line',
  WATERMARK: 'watermark',
  BOTTOM_INFO: 'bottomInfo',
  GUIDELINES: 'guidelines',
  PRE_PT: 'prePT',
  PREVIEW: 'preview',
} as const;

export type CanvasLayerKey = typeof CANVAS_LAYERS[keyof typeof CANVAS_LAYERS];

/**
 * Array of all canvas layer names for initialization
 */
export const ALL_CANVAS_LAYERS = Object.values(CANVAS_LAYERS);
EOF
```

##### 6. Create Index File for Easy Imports
```bash
cat > src/constants/index.ts << 'EOF'
export * from './tabs';
export * from './textFields';
export * from './cardVersions';
export * from './canvasLayers';
EOF
```

##### 7. Update cardStore.ts to Use Constants
```typescript
// Before
import { create } from 'zustand';

// After
import { create } from 'zustand';
import { TEXT_FIELDS } from '../constants/textFields';
import { CARD_VERSIONS } from '../constants/cardVersions';

// Replace magic strings throughout the file
// Example changes:
currentTab: 'frame',  // Before
currentTab: TABS.FRAME,  // After

if (store.card.version === 'neoBasics' && store.card.text?.title) {  // Before
if (store.card.version === CARD_VERSIONS.NEO_BASICS && store.card.text?.[TEXT_FIELDS.TITLE]) {  // After
```

##### 8. Update useCanvasRender.ts to Use Constants
```typescript
// Before
const canvasNames = ['card', 'frame', 'frameMasking', ...];

// After
import { ALL_CANVAS_LAYERS } from '../constants/canvasLayers';
const canvasNames = ALL_CANVAS_LAYERS;

// Before
const standardFields = ['mana', 'title', 'type', 'rules', 'pt'];

// After
import { STANDARD_TEXT_FIELDS } from '../constants/textFields';
const standardFields = STANDARD_TEXT_FIELDS;
```

##### 9. Update CardCreatorLayout.tsx to Use Constants
```typescript
// Before
<Accordion.Item value="frame">

// After
import { TABS } from '../constants/tabs';
<Accordion.Item value={TABS.FRAME}>
```

#### Acceptance Criteria
- [ ] All constants files created in `src/constants/`
- [ ] No hardcoded strings in store, hooks, or components
- [ ] All files import from constants
- [ ] TypeScript compilation successful (no errors)
- [ ] Application runs without errors

#### Testing
```bash
# Run the application
npm run dev

# Verify all tabs still work
# Click through each accordion item
# Ensure no console errors
```

#### Commit
```bash
git add src/constants/
git add src/store/cardStore.ts
git add src/hooks/useCanvasRender.ts
git add src/components/CardCreatorLayout.tsx
git commit -m "refactor: extract magic strings to constants

- Create constants for tabs, text fields, card versions, canvas layers
- Update store, hooks, and components to use constants
- Add type-safe constant definitions with 'as const'
- Improve maintainability and reduce typos"
```

---

### Task 1.2: Add Error Boundaries

**Priority:** HIGH
**Effort:** 4 hours
**Dependencies:** None

#### Steps

##### 1. Create Error Boundary Component
```bash
cat > src/components/ErrorBoundary.tsx << 'EOF'
/**
 * Error Boundary Component
 * Catches React errors and prevents full app crashes
 */
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minH="100vh"
          bg="gray.900"
          color="white"
          p={8}
        >
          <VStack gap={4} maxW="600px">
            <Heading size="xl" color="red.400">
              Something went wrong
            </Heading>
            <Text fontSize="lg" textAlign="center">
              An unexpected error occurred. This has been logged and we'll work on fixing it.
            </Text>
            {this.state.error && (
              <Box
                bg="gray.800"
                p={4}
                borderRadius="md"
                w="100%"
                fontFamily="mono"
                fontSize="sm"
                maxH="200px"
                overflowY="auto"
              >
                <Text color="red.300">{this.state.error.message}</Text>
                {this.state.error.stack && (
                  <Text color="gray.500" mt={2} fontSize="xs">
                    {this.state.error.stack}
                  </Text>
                )}
              </Box>
            )}
            <Button onClick={this.handleReset} colorScheme="blue" size="lg">
              Try Again
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}
EOF
```

##### 2. Create Canvas Error Boundary (Specialized)
```bash
cat > src/components/CanvasErrorBoundary.tsx << 'EOF'
/**
 * Canvas-specific Error Boundary
 * Handles canvas rendering errors gracefully
 */
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Text, VStack, Button } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class CanvasErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Canvas rendering error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
    // Optionally trigger a canvas re-render
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="800px"
          w="571px"
          bg="gray.800"
          borderRadius="12px"
          border="2px solid"
          borderColor="red.500"
        >
          <VStack gap={3} p={6} textAlign="center">
            <Text fontSize="lg" fontWeight="bold" color="red.400">
              Canvas Render Error
            </Text>
            <Text fontSize="sm" color="gray.300">
              Unable to render the card preview.
            </Text>
            {this.state.error && (
              <Text fontSize="xs" color="gray.500" fontFamily="mono">
                {this.state.error.message}
              </Text>
            )}
            <Button size="sm" onClick={this.handleReset} colorScheme="red">
              Reload Canvas
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}
EOF
```

##### 3. Wrap App in Error Boundary
```typescript
// src/App.tsx
import { CardCreatorLayout } from './components/CardCreatorLayout';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <CardCreatorLayout />
    </ErrorBoundary>
  );
}

export default App;
```

##### 4. Wrap Canvas in Specialized Error Boundary
```typescript
// src/components/CardCreatorLayout.tsx
import { CanvasErrorBoundary } from './CanvasErrorBoundary';

// Inside render, wrap CardCanvas:
<Box flex="1" display="flex" alignItems="center" justifyContent="center">
  <CanvasErrorBoundary>
    <CardCanvas />
  </CanvasErrorBoundary>
</Box>
```

#### Acceptance Criteria
- [ ] ErrorBoundary component created
- [ ] CanvasErrorBoundary component created
- [ ] App wrapped in ErrorBoundary
- [ ] CardCanvas wrapped in CanvasErrorBoundary
- [ ] Error boundaries display user-friendly messages
- [ ] Errors logged to console

#### Testing
```bash
# Test error boundary by temporarily throwing an error
# Add to CardCanvas.tsx:
throw new Error('Test error boundary');

# Verify error boundary catches it and displays fallback UI
# Remove test error after verification
```

#### Commit
```bash
git add src/components/ErrorBoundary.tsx
git add src/components/CanvasErrorBoundary.tsx
git add src/App.tsx
git add src/components/CardCreatorLayout.tsx
git commit -m "feat: add error boundaries for graceful error handling

- Create ErrorBoundary for global error catching
- Create CanvasErrorBoundary for canvas-specific errors
- Wrap App in ErrorBoundary
- Wrap CardCanvas in CanvasErrorBoundary
- Add user-friendly error messages and retry functionality"
```

---

### Task 1.3: Set Up Testing Infrastructure

**Priority:** HIGH
**Effort:** 6 hours
**Dependencies:** Prerequisites completed

#### Steps

##### 1. Create First Utility Test
```bash
mkdir -p src/utils/__tests__
cat > src/utils/__tests__/canvasHelpers.test.ts << 'EOF'
import { describe, it, expect } from 'vitest';
import { scaleX, scaleY, scaleWidth, scaleHeight } from '../canvasHelpers';
import type { Card } from '../../types/card.types';

describe('canvasHelpers', () => {
  const mockCard: Partial<Card> = {
    width: 2010,
    height: 2814,
    marginX: 0,
    marginY: 0,
  };

  describe('scaleX', () => {
    it('should scale normalized X coordinate to pixels', () => {
      const result = scaleX(mockCard as Card, 0.5);
      expect(result).toBe(1005); // 0.5 * 2010
    });

    it('should handle margin offset', () => {
      const cardWithMargin = { ...mockCard, marginX: 0.1 };
      const result = scaleX(cardWithMargin as Card, 0.5);
      expect(result).toBe(1105.5); // (0.5 + 0.1) * 2010
    });

    it('should handle zero coordinates', () => {
      const result = scaleX(mockCard as Card, 0);
      expect(result).toBe(0);
    });
  });

  describe('scaleY', () => {
    it('should scale normalized Y coordinate to pixels', () => {
      const result = scaleY(mockCard as Card, 0.5);
      expect(result).toBe(1407); // 0.5 * 2814
    });

    it('should handle margin offset', () => {
      const cardWithMargin = { ...mockCard, marginY: 0.1 };
      const result = scaleY(cardWithMargin as Card, 0.5);
      expect(result).toBe(1688.4); // (0.5 + 0.1) * 2814
    });
  });

  describe('scaleWidth', () => {
    it('should scale normalized width to pixels', () => {
      const result = scaleWidth(mockCard as Card, 0.8);
      expect(result).toBe(1608); // 0.8 * 2010
    });

    it('should not apply margin to width', () => {
      const cardWithMargin = { ...mockCard, marginX: 0.1 };
      const result = scaleWidth(cardWithMargin as Card, 0.8);
      expect(result).toBe(1608); // Still 0.8 * 2010
    });
  });

  describe('scaleHeight', () => {
    it('should scale normalized height to pixels', () => {
      const result = scaleHeight(mockCard as Card, 0.6);
      expect(result).toBe(1688.4); // 0.6 * 2814
    });
  });
});
EOF
```

##### 2. Create Store Test
```bash
mkdir -p src/store/__tests__
cat > src/store/__tests__/cardStore.test.ts << 'EOF'
import { describe, it, expect, beforeEach } from 'vitest';
import { useCardStore } from '../cardStore';
import type { Frame } from '../../types/card.types';

describe('cardStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useCardStore.setState({
      card: {
        width: 2010,
        height: 2814,
        marginX: 0,
        marginY: 0,
        frames: [],
        artSource: '/img/blank.png',
        artX: 0,
        artY: 0,
        artZoom: 1,
        artRotate: 0,
        setSymbolSource: '/img/blank.png',
        setSymbolX: 0,
        setSymbolY: 0,
        setSymbolZoom: 1,
        watermarkSource: '/img/blank.png',
        watermarkX: 0,
        watermarkY: 0,
        watermarkZoom: 1,
        watermarkLeft: '#b79d58',
        watermarkRight: 'none',
        watermarkOpacity: 0.4,
        version: '',
        manaSymbols: [],
        text: {},
        bottomInfo: {},
        landscape: false,
        margins: false,
        bottomInfoTranslate: { x: 0, y: 0 },
        bottomInfoRotate: 0,
        bottomInfoZoom: 1,
        bottomInfoColor: 'white',
        hideBottomInfoBorder: false,
        showsFlavorBar: true,
        onload: null,
        infoYear: new Date().getFullYear(),
        showCollectorInfo: false,
        collectorInfoStyle: 'default',
        saga: null,
      },
    });
  });

  describe('addFrame', () => {
    it('should add a frame to the card', () => {
      const mockFrame: Frame = {
        name: 'Test Frame',
        src: '/test.png',
        image: null,
        masks: [],
        opacity: 1,
      };

      useCardStore.getState().addFrame(mockFrame);

      const frames = useCardStore.getState().card.frames;
      expect(frames).toHaveLength(1);
      expect(frames[0].name).toBe('Test Frame');
    });

    it('should calculate margins when frame has bounds', () => {
      const mockFrame: Frame = {
        name: 'Test Frame',
        src: '/test.png',
        image: null,
        masks: [],
        opacity: 1,
        bounds: {
          x: -0.1,
          y: -0.1,
          width: 1.2,
          height: 1.2,
        },
      };

      useCardStore.getState().addFrame(mockFrame);

      const { marginX, marginY } = useCardStore.getState().card;
      expect(marginX).toBeGreaterThan(0);
      expect(marginY).toBeGreaterThan(0);
    });
  });

  describe('removeFrame', () => {
    it('should remove a frame at the specified index', () => {
      const frame1: Frame = {
        name: 'Frame 1',
        src: '/test1.png',
        image: null,
        masks: [],
        opacity: 1,
      };
      const frame2: Frame = {
        name: 'Frame 2',
        src: '/test2.png',
        image: null,
        masks: [],
        opacity: 1,
      };

      useCardStore.getState().addFrame(frame1);
      useCardStore.getState().addFrame(frame2);
      useCardStore.getState().removeFrame(0);

      const frames = useCardStore.getState().card.frames;
      expect(frames).toHaveLength(1);
      expect(frames[0].name).toBe('Frame 2');
    });
  });

  describe('updateText', () => {
    it('should update text field', () => {
      useCardStore.getState().updateText('title', { text: 'Test Card' });

      const text = useCardStore.getState().card.text?.title;
      expect(text?.text).toBe('Test Card');
    });

    it('should merge updates with existing text', () => {
      useCardStore.getState().updateText('title', { text: 'Test', color: 'red' });
      useCardStore.getState().updateText('title', { text: 'Updated' });

      const text = useCardStore.getState().card.text?.title;
      expect(text?.text).toBe('Updated');
      expect(text?.color).toBe('red');
    });
  });
});
EOF
```

##### 3. Create Hook Test
```bash
mkdir -p src/hooks/__tests__
cat > src/hooks/__tests__/useImageLoader.test.ts << 'EOF'
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useImageLoader } from '../useImageLoader';

describe('useImageLoader', () => {
  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useImageLoader());
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  // Note: Full image loading tests require more complex mocking
  // This is a placeholder for the testing pattern
});
EOF
```

##### 4. Add Test Scripts to package.json
Ensure these are in your package.json (should already be added in prerequisites):
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch"
  }
}
```

##### 5. Run Tests
```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage
```

#### Acceptance Criteria
- [ ] Vitest configured and working
- [ ] Test setup file created
- [ ] At least 3 test files created (utils, store, hooks)
- [ ] All tests passing
- [ ] Coverage report generated
- [ ] Tests run in CI/CD (if applicable)

#### Commit
```bash
git add vitest.config.ts
git add src/test/setup.ts
git add src/utils/__tests__/
git add src/store/__tests__/
git add src/hooks/__tests__/
git add package.json
git commit -m "test: add testing infrastructure with Vitest

- Configure Vitest with React support
- Create test setup with canvas mocks
- Add tests for canvasHelpers utilities
- Add tests for cardStore actions
- Add placeholder tests for hooks
- Configure coverage reporting"
```

---

### Phase 1 Summary

At the end of Phase 1, you should have:
- ✅ All magic strings replaced with typed constants
- ✅ Error boundaries protecting against crashes
- ✅ Testing infrastructure with initial test coverage
- ✅ Foundation for safer refactoring in Phase 2

**Checkpoint:** Run `npm test && npm run dev` to ensure everything works.

---

## Phase 2: Code Organization (Week 3-6)

### Overview
Refactor large files into smaller, more maintainable modules. This phase improves developer experience and makes the codebase easier to navigate.

---

### Task 2.1: Split useCanvasRender Hook (Week 3)

**Priority:** HIGH
**Effort:** 16 hours
**Dependencies:** Phase 1 complete

#### Current Problem
`useCanvasRender.ts` is 907 lines long and handles multiple responsibilities:
- Canvas initialization
- Layer drawing (art, frames, text, watermark, etc.)
- Compositing
- Event management

#### Solution
Split into focused hooks with single responsibilities.

#### Steps

##### 1. Create Hooks Directory Structure
```bash
mkdir -p src/hooks/canvas
```

##### 2. Extract Canvas Initialization Hook
```bash
cat > src/hooks/canvas/useCanvasInitialization.ts << 'EOF'
/**
 * Canvas Initialization Hook
 * Manages canvas creation and resizing
 */
import { useRef, useCallback, useState, useEffect } from 'react';
import { useCardStore } from '../../store/cardStore';
import { initializeCanvas } from '../../utils/canvasHelpers';
import { ALL_CANVAS_LAYERS } from '../../constants/canvasLayers';
import type { CanvasRefs, CanvasContextRefs } from '../../types/card.types';

export const useCanvasInitialization = () => {
  const canvasRefs = useRef<Partial<CanvasRefs>>({});
  const contextRefs = useRef<Partial<CanvasContextRefs>>({});
  const [canvasesReady, setCanvasesReady] = useState(false);

  const initializeCanvases = useCallback(() => {
    setCanvasesReady(false);

    const currentCard = useCardStore.getState().card;
    const width = Math.round(currentCard.width * (1 + 2 * currentCard.marginX));
    const height = Math.round(currentCard.height * (1 + 2 * currentCard.marginY));

    ALL_CANVAS_LAYERS.forEach((name) => {
      const existingCanvas = canvasRefs.current[name];

      if (existingCanvas && (existingCanvas.width !== width || existingCanvas.height !== height)) {
        existingCanvas.width = width;
        existingCanvas.height = height;
      } else if (!existingCanvas) {
        const { canvas, context } = initializeCanvas(width, height);
        canvasRefs.current[name] = canvas as HTMLCanvasElement;
        contextRefs.current[name] = context as CanvasRenderingContext2D;
      }
    });

    setCanvasesReady(true);
  }, []);

  // Subscribe to margin/dimension changes
  useEffect(() => {
    initializeCanvases();

    let prevMarginX = useCardStore.getState().card.marginX;
    let prevMarginY = useCardStore.getState().card.marginY;
    let prevWidth = useCardStore.getState().card.width;
    let prevHeight = useCardStore.getState().card.height;

    const unsubscribe = useCardStore.subscribe((state) => {
      const { marginX, marginY, width, height } = state.card;

      if (
        marginX !== prevMarginX ||
        marginY !== prevMarginY ||
        width !== prevWidth ||
        height !== prevHeight
      ) {
        prevMarginX = marginX;
        prevMarginY = marginY;
        prevWidth = width;
        prevHeight = height;
        initializeCanvases();
      }
    });

    return () => unsubscribe();
  }, [initializeCanvases]);

  return {
    canvasRefs: canvasRefs.current,
    contextRefs: contextRefs.current,
    canvasesReady,
    initializeCanvases,
  };
};
EOF
```

##### 3. Extract Layer Drawing Hooks
```bash
cat > src/hooks/canvas/useCanvasLayers.ts << 'EOF'
/**
 * Canvas Layer Drawing Hook
 * Handles individual layer rendering (art, watermark, set symbol)
 */
import { useCallback } from 'react';
import { useCardStore } from '../../store/cardStore';
import type { CanvasRefs, CanvasContextRefs } from '../../types/card.types';

export const useCanvasLayers = (
  canvasRefs: Partial<CanvasRefs>,
  contextRefs: Partial<CanvasContextRefs>
) => {
  const card = useCardStore((state) => state.card);
  const artImage = useCardStore((state) => state.artImage);
  const setSymbolImage = useCardStore((state) => state.setSymbolImage);
  const watermarkImage = useCardStore((state) => state.watermarkImage);
  const loadedPack = useCardStore((state) => state.loadedPack);

  const drawArt = useCallback(() => {
    const artCanvas = canvasRefs.card;
    if (!artCanvas || !artImage) return;

    const ctx = artCanvas.getContext('2d');
    if (!ctx) return;

    ctx.save();

    if (card.artGrayscale) {
      ctx.filter = 'grayscale(100%)';
    }

    const centerX = artCanvas.width / 2 + card.artX;
    const centerY = artCanvas.height / 2 + card.artY;

    ctx.translate(centerX, centerY);
    ctx.rotate((card.artRotate * Math.PI) / 180);
    ctx.scale(card.artZoom, card.artZoom);

    const width = artImage.width;
    const height = artImage.height;

    ctx.drawImage(artImage, -width / 2, -height / 2, width, height);
    ctx.restore();
  }, [artImage, card.artX, card.artY, card.artZoom, card.artRotate, card.artGrayscale, canvasRefs.card]);

  const drawSetSymbol = useCallback(() => {
    const canvas = canvasRefs.card;
    if (!canvas || !setSymbolImage || card.setSymbolSource === '/img/blank.png') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let x: number;
    let y: number;
    let symbolWidth: number;
    let symbolHeight: number;

    if (loadedPack?.setSymbolBounds) {
      const bounds = loadedPack.setSymbolBounds;
      const boundWidth = bounds.width * card.width;
      const boundHeight = bounds.height * card.height;

      const symbolAspect = setSymbolImage.width / setSymbolImage.height;
      const boundAspect = boundWidth / boundHeight;

      if (symbolAspect > boundAspect) {
        symbolWidth = boundWidth * card.setSymbolZoom;
        symbolHeight = (boundWidth / symbolAspect) * card.setSymbolZoom;
      } else {
        symbolHeight = boundHeight * card.setSymbolZoom;
        symbolWidth = (boundHeight * symbolAspect) * card.setSymbolZoom;
      }

      const baseX = (bounds.x + card.marginX) * card.width;
      const baseY = (bounds.y + card.marginY) * card.height;

      x = baseX + card.setSymbolX;
      y = baseY + card.setSymbolY;

      if (bounds.horizontal === 'center') {
        x -= symbolWidth / 2;
      } else if (bounds.horizontal === 'right') {
        x -= symbolWidth;
      }

      if (bounds.vertical === 'center') {
        y -= symbolHeight / 2;
      } else if (bounds.vertical === 'bottom') {
        y -= symbolHeight;
      }
    } else {
      symbolWidth = setSymbolImage.width * card.setSymbolZoom;
      symbolHeight = setSymbolImage.height * card.setSymbolZoom;
      x = canvas.width / 2 + card.setSymbolX;
      y = canvas.height / 2 + card.setSymbolY;
      x -= symbolWidth / 2;
      y -= symbolHeight / 2;
    }

    ctx.drawImage(setSymbolImage, x, y, symbolWidth, symbolHeight);
  }, [setSymbolImage, card, loadedPack, canvasRefs.card]);

  // Add drawWatermark here (similar extraction)
  // Add other layer drawing functions...

  return {
    drawArt,
    drawSetSymbol,
    // drawWatermark,
    // drawSerial,
    // etc.
  };
};
EOF
```

##### 4. Create Main Compositing Hook
```bash
cat > src/hooks/canvas/useCanvasComposite.ts << 'EOF'
/**
 * Canvas Compositing Hook
 * Combines all layers into final preview
 */
import { useCallback } from 'react';
import type { CanvasRefs } from '../../types/card.types';
import { useCardStore } from '../../store/cardStore';

export const useCanvasComposite = (
  canvasRefs: Partial<CanvasRefs>,
  previewRef: React.RefObject<HTMLCanvasElement>
) => {
  const card = useCardStore((state) => state.card);
  const showGuidelines = useCardStore((state) => state.showGuidelines);
  const showArtBoundsDebug = useCardStore((state) => state.showArtBoundsDebug);

  const composite = useCallback(
    (drawFunctions: {
      drawArt: () => void;
      drawSetSymbol: () => void;
      // Add other draw functions
    }) => {
      const cardCanvas = canvasRefs.card;
      const cardContext = cardCanvas?.getContext('2d');
      const previewCanvas = previewRef.current;

      if (!cardCanvas || !cardContext || !previewCanvas) return;

      // Clear canvas
      cardContext.clearRect(0, 0, cardCanvas.width, cardCanvas.height);

      // Draw layers in order
      drawFunctions.drawArt();

      // Draw frames
      if (canvasRefs.frame) {
        cardContext.drawImage(canvasRefs.frame, 0, 0);
      }

      // Draw set symbol
      drawFunctions.drawSetSymbol();

      // ... composite other layers ...

      // Copy to preview
      const previewContext = previewCanvas.getContext('2d');
      if (previewContext) {
        if (previewCanvas.width !== cardCanvas.width || previewCanvas.height !== cardCanvas.height) {
          previewCanvas.width = cardCanvas.width;
          previewCanvas.height = cardCanvas.height;
        }
        previewContext.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        previewContext.drawImage(cardCanvas, 0, 0);
      }
    },
    [card, showGuidelines, showArtBoundsDebug, canvasRefs, previewRef]
  );

  return { composite };
};
EOF
```

##### 5. Update Main useCanvasRender Hook
```bash
cat > src/hooks/useCanvasRender.ts << 'EOF'
/**
 * Main Canvas Render Hook
 * Orchestrates all canvas operations
 */
import { useRef, useCallback, useEffect } from 'react';
import { useCardStore } from '../store/cardStore';
import { useCanvasInitialization } from './canvas/useCanvasInitialization';
import { useCanvasLayers } from './canvas/useCanvasLayers';
import { useCanvasComposite } from './canvas/useCanvasComposite';

export const useCanvasRender = () => {
  const card = useCardStore((state) => state.card);
  const frames = useCardStore((state) => state.card.frames);
  const previewRef = useRef<HTMLCanvasElement>(null);

  // Initialize canvases
  const { canvasRefs, contextRefs, canvasesReady } = useCanvasInitialization();

  // Layer drawing
  const { drawArt, drawSetSymbol } = useCanvasLayers(canvasRefs, contextRefs);

  // Compositing
  const { composite } = useCanvasComposite(canvasRefs, previewRef);

  // Main render function
  const render = useCallback(async () => {
    if (!canvasesReady) return;

    composite({
      drawArt,
      drawSetSymbol,
    });
  }, [canvasesReady, composite, drawArt, drawSetSymbol]);

  // Auto-render on changes
  useEffect(() => {
    if (!canvasesReady) return;

    const timeoutId = setTimeout(() => {
      render();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [render, card, frames, canvasesReady]);

  return {
    previewRef,
    canvasRefs,
    contextRefs,
    render,
  };
};
EOF
```

#### Acceptance Criteria
- [ ] useCanvasInitialization hook created
- [ ] useCanvasLayers hook created
- [ ] useCanvasComposite hook created
- [ ] Main useCanvasRender updated to use new hooks
- [ ] All canvas rendering still works
- [ ] No regressions in card preview

#### Testing
```bash
# Run tests
npm test

# Run application
npm run dev

# Verify:
# - Canvas displays correctly
# - Art, frames, text all render
# - No console errors
# - Performance is unchanged
```

#### Commit
```bash
git add src/hooks/canvas/
git add src/hooks/useCanvasRender.ts
git commit -m "refactor: split useCanvasRender into focused hooks

- Extract useCanvasInitialization for canvas management
- Extract useCanvasLayers for layer drawing
- Extract useCanvasComposite for final compositing
- Reduce main hook from 907 to ~100 lines
- Improve maintainability and testability"
```

---

### Task 2.2: Split cardStore into Slices (Week 4)

**Priority:** MEDIUM
**Effort:** 12 hours
**Dependencies:** Task 1.1 (Constants)

#### Current Problem
`cardStore.ts` is 964 lines with all state and actions in one file.

#### Solution
Split into feature slices using Zustand's recommended pattern.

#### Steps

##### 1. Create Store Slices Directory
```bash
mkdir -p src/store/slices
```

##### 2. Create Frame Slice
```bash
cat > src/store/slices/frameSlice.ts << 'EOF'
/**
 * Frame Slice
 * Manages card frame layers
 */
import type { StateCreator } from 'zustand';
import type { Frame } from '../../types/card.types';

export interface FrameSlice {
  selectedFrameIndex: number;
  isFrameEditorOpen: boolean;
  editingFrameIndex: number | null;

  setSelectedFrameIndex: (index: number) => void;
  openFrameEditor: (index: number) => void;
  closeFrameEditor: () => void;
  toggleFrameVisibility: (index: number) => void;
  addFrame: (frame: Frame) => void;
  removeFrame: (index: number) => void;
  updateFrame: (index: number, updates: Partial<Frame>) => void;
  reorderFrames: (oldIndex: number, newIndex: number) => void;
}

export const createFrameSlice: StateCreator<
  FrameSlice & { card: any; updateCard: any }, // Will be combined with CardSlice
  [],
  [],
  FrameSlice
> = (set) => ({
  selectedFrameIndex: 0,
  isFrameEditorOpen: false,
  editingFrameIndex: null,

  setSelectedFrameIndex: (index) => set({ selectedFrameIndex: index }),

  openFrameEditor: (index) =>
    set({ editingFrameIndex: index, isFrameEditorOpen: true }),

  closeFrameEditor: () =>
    set({ editingFrameIndex: null, isFrameEditorOpen: false }),

  toggleFrameVisibility: (index) =>
    set((state) => ({
      card: {
        ...state.card,
        frames: state.card.frames.map((frame: Frame, i: number) =>
          i === index
            ? { ...frame, visible: frame.visible === false ? true : false }
            : frame
        ),
      },
    })),

  addFrame: (frame) =>
    set((state) => {
      const newFrames = [...state.card.frames, frame];
      const { marginX, marginY } = calculateRequiredMargins(newFrames);

      return {
        card: {
          ...state.card,
          frames: newFrames,
          marginX,
          marginY,
        },
      };
    }),

  removeFrame: (index) =>
    set((state) => {
      const newFrames = state.card.frames.filter((_: Frame, i: number) => i !== index);
      const { marginX, marginY } = calculateRequiredMargins(newFrames);

      return {
        card: {
          ...state.card,
          frames: newFrames,
          marginX,
          marginY,
        },
        selectedFrameIndex: Math.max(0, state.selectedFrameIndex - 1),
      };
    }),

  updateFrame: (index, updates) =>
    set((state) => ({
      card: {
        ...state.card,
        frames: state.card.frames.map((frame: Frame, i: number) =>
          i === index ? { ...frame, ...updates } : frame
        ),
      },
    })),

  reorderFrames: (oldIndex, newIndex) =>
    set((state) => {
      const frames = [...state.card.frames];
      const [movedFrame] = frames.splice(oldIndex, 1);
      frames.splice(newIndex, 0, movedFrame);
      return {
        card: { ...state.card, frames },
      };
    }),
});

// Helper function (moved from main store)
const calculateRequiredMargins = (frames: Frame[]) => {
  let maxMarginX = 0;
  let maxMarginY = 0;

  const checkBounds = (bounds: { x: number; y: number; width: number; height: number }) => {
    if (bounds.x < 0) {
      maxMarginX = Math.max(maxMarginX, Math.abs(bounds.x));
    }
    if (bounds.x + bounds.width > 1) {
      maxMarginX = Math.max(maxMarginX, bounds.x + bounds.width - 1);
    }
    if (bounds.y < 0) {
      maxMarginY = Math.max(maxMarginY, Math.abs(bounds.y));
    }
    if (bounds.y + bounds.height > 1) {
      maxMarginY = Math.max(maxMarginY, bounds.y + bounds.height - 1);
    }
  };

  frames.forEach((frame) => {
    if (frame.bounds) {
      checkBounds(frame.bounds);
    }
    if (frame.masks) {
      frame.masks.forEach((mask) => {
        if (mask.bounds) {
          checkBounds(mask.bounds);
        }
      });
    }
  });

  return { marginX: maxMarginX, marginY: maxMarginY };
};
EOF
```

##### 3. Create Text Slice
```bash
cat > src/store/slices/textSlice.ts << 'EOF'
/**
 * Text Slice
 * Manages card text fields
 */
import type { StateCreator } from 'zustand';
import type { TextObject } from '../../types/card.types';

export interface TextSlice {
  selectedTextIndex: number;

  setSelectedTextIndex: (index: number) => void;
  updateText: (name: string, updates: Partial<TextObject>) => void;
  setText: (text: { [key: string]: TextObject }) => void;
}

export const createTextSlice: StateCreator<
  TextSlice & { card: any },
  [],
  [],
  TextSlice
> = (set) => ({
  selectedTextIndex: 0,

  setSelectedTextIndex: (index) => set({ selectedTextIndex: index }),

  updateText: (name, updates) =>
    set((state) => ({
      card: {
        ...state.card,
        text: {
          ...state.card.text,
          [name]: { ...(state.card.text?.[name] || {}), ...updates } as TextObject,
        },
      },
    })),

  setText: (text) =>
    set((state) => ({
      card: { ...state.card, text },
    })),
});
EOF
```

##### 4. Create Art Slice
```bash
cat > src/store/slices/artSlice.ts << 'EOF'
/**
 * Art Slice
 * Manages card artwork
 */
import type { StateCreator } from 'zustand';
import type { CardBounds } from '../../types/card.types';

export interface ArtSlice {
  artImage: HTMLImageElement | null;
  showArtBoundsDebug: boolean;
  customArtBounds: CardBounds | null;
  autoFitArt: boolean;

  setArtImage: (image: HTMLImageElement | null) => void;
  updateArt: (updates: {
    artSource?: string;
    artX?: number;
    artY?: number;
    artZoom?: number;
    artRotate?: number;
  }) => void;
  setShowArtBoundsDebug: (show: boolean) => void;
  setCustomArtBounds: (bounds: CardBounds | null) => void;
  setAutoFitArt: (enabled: boolean) => void;
}

export const createArtSlice: StateCreator<
  ArtSlice & { card: any },
  [],
  [],
  ArtSlice
> = (set) => ({
  artImage: null,
  showArtBoundsDebug: false,
  customArtBounds: null,
  autoFitArt: true,

  setArtImage: (image) => set({ artImage: image }),

  updateArt: (updates) =>
    set((state) => ({
      card: { ...state.card, ...updates },
    })),

  setShowArtBoundsDebug: (show) => set({ showArtBoundsDebug: show }),

  setCustomArtBounds: (bounds) => set({ customArtBounds: bounds }),

  setAutoFitArt: (enabled) => set({ autoFitArt: enabled }),
});
EOF
```

##### 5. Update Main Store to Combine Slices
```typescript
// src/store/cardStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createFrameSlice, type FrameSlice } from './slices/frameSlice';
import { createTextSlice, type TextSlice } from './slices/textSlice';
import { createArtSlice, type ArtSlice } from './slices/artSlice';
// Import other slices...

// Combined store type
type CardStore = FrameSlice & TextSlice & ArtSlice; // & OtherSlices...

export const useCardStore = create<CardStore>()(
  devtools(
    persist(
      (...a) => ({
        ...createFrameSlice(...a),
        ...createTextSlice(...a),
        ...createArtSlice(...a),
        // ...createOtherSlices(...a),
      }),
      {
        name: 'card-conjurer-storage',
        partialize: (state) => ({
          // Existing partialize logic
        }),
      }
    ),
    {
      name: 'CardStore',
    }
  )
);
```

#### Acceptance Criteria
- [ ] Frame slice created
- [ ] Text slice created
- [ ] Art slice created
- [ ] Main store combines slices
- [ ] All store actions still work
- [ ] Tests updated and passing

#### Testing
```bash
npm test
npm run dev
# Verify all functionality works
```

#### Commit
```bash
git add src/store/slices/
git add src/store/cardStore.ts
git commit -m "refactor: split cardStore into feature slices

- Create frameSlice for frame management
- Create textSlice for text field management
- Create artSlice for artwork management
- Combine slices in main store
- Improve code organization and maintainability"
```

---

### Task 2.3: Component Modularization (Week 5-6)

**Priority:** MEDIUM
**Effort:** 20 hours
**Dependencies:** None

#### Goal
Break down large tab components into smaller, reusable pieces.

#### Example: ScryfallImportTab

##### Before (Single File)
```typescript
// ScryfallImportTab.tsx (300+ lines)
export const ScryfallImportTab = () => {
  // Search logic
  // Form inputs
  // Card preview
  // Import button
  // Error handling
  // ...
};
```

##### After (Modular)
```bash
mkdir -p src/components/tabs/ScryfallImport
```

Create structure:
```
ScryfallImport/
├── index.tsx              # Main component
├── ScryfallSearchForm.tsx # Search form
├── ScryfallCardPreview.tsx # Card preview
├── ScryfallImportButton.tsx # Import action
└── useScryfallSearch.ts   # Custom hook
```

##### Implementation

```typescript
// src/components/tabs/ScryfallImport/useScryfallSearch.ts
export const useScryfallSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [card, setCard] = useState<ScryfallCard | null>(null);

  const searchCard = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error('Card not found');
      const data = await response.json();
      setCard(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return { card, loading, error, searchCard };
};

// src/components/tabs/ScryfallImport/ScryfallSearchForm.tsx
export const ScryfallSearchForm = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');

  return (
    <HStack>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter card name..."
      />
      <Button onClick={() => onSearch(query)}>Search</Button>
    </HStack>
  );
};

// src/components/tabs/ScryfallImport/index.tsx
export const ScryfallImportTab = () => {
  const { card, loading, error, searchCard } = useScryfallSearch();

  return (
    <VStack gap={4}>
      <ScryfallSearchForm onSearch={searchCard} />
      {loading && <Spinner />}
      {error && <Text color="red.400">{error}</Text>}
      {card && <ScryfallCardPreview card={card} />}
      {card && <ScryfallImportButton card={card} />}
    </VStack>
  );
};
```

#### Apply Same Pattern to Other Tabs
Repeat this process for:
- FrameTab → FrameSelection/
- TextTab → TextFields/
- ArtTab → ArtControls/
- etc.

#### Acceptance Criteria
- [ ] At least 3 tabs refactored into smaller components
- [ ] Custom hooks extracted for business logic
- [ ] Components are reusable and testable
- [ ] UI/UX unchanged

#### Commit
```bash
git add src/components/tabs/ScryfallImport/
# Repeat for other tabs
git commit -m "refactor: modularize tab components

- Split ScryfallImportTab into smaller components
- Extract useScryfallSearch custom hook
- Split FrameTab into FrameSelection components
- Improve component reusability and testability"
```

---

## Phase 3: Performance & Quality (Week 7-10)

### Overview
Optimize performance, add comprehensive tests, and improve developer experience.

---

### Task 3.1: Add Immer Middleware (Week 7)

**Priority:** HIGH
**Effort:** 4 hours
**Dependencies:** Phase 2 complete

#### Problem
Large state updates require spreading entire objects, which is error-prone and verbose.

#### Solution
Use Immer for "mutable" updates that are automatically made immutable.

#### Steps

##### 1. Install Immer Middleware
```bash
npm install immer zustand-middleware-immer
```

##### 2. Update Store with Immer
```typescript
// src/store/cardStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const useCardStore = create<CardStore>()(
  devtools(
    persist(
      immer((set) => ({
        // Frame slice with Immer
        addFrame: (frame) =>
          set((draft) => {
            draft.card.frames.push(frame);
            const { marginX, marginY } = calculateRequiredMargins(draft.card.frames);
            draft.card.marginX = marginX;
            draft.card.marginY = marginY;
          }),

        updateText: (name, updates) =>
          set((draft) => {
            if (!draft.card.text[name]) {
              draft.card.text[name] = {} as TextObject;
            }
            Object.assign(draft.card.text[name], updates);
          }),

        // Much simpler than spreading!
      })),
      { name: 'card-store' }
    ),
    { name: 'CardStore' }
  )
);
```

#### Acceptance Criteria
- [ ] Immer middleware installed
- [ ] All state mutations use Immer
- [ ] Tests still passing
- [ ] No performance regressions

#### Commit
```bash
git add package.json package-lock.json
git add src/store/
git commit -m "feat: add Immer middleware for safer state mutations

- Install zustand-middleware-immer
- Update store actions to use Immer draft pattern
- Simplify state updates (no more spreading)
- Improve type safety and reduce bugs"
```

---

### Task 3.2: Implement Virtualization (Week 7)

**Priority:** MEDIUM
**Effort:** 6 hours
**Dependencies:** None

#### Problem
Frame pack lists render all 84+ items, causing unnecessary DOM nodes.

#### Solution
Use `@tanstack/react-virtual` for virtualized lists.

#### Steps

##### 1. Install React Virtual
```bash
npm install @tanstack/react-virtual
```

##### 2. Create Virtualized Frame List Component
```typescript
// src/components/frames/VirtualizedFrameList.tsx
import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Box } from '@chakra-ui/react';
import type { FrameOption } from '../../types/card.types';

interface Props {
  frames: FrameOption[];
  onSelectFrame: (frame: FrameOption) => void;
  selectedFrame: FrameOption | null;
}

export const VirtualizedFrameList = ({ frames, onSelectFrame, selectedFrame }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: frames.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100, // Estimated item height
    overscan: 5, // Render 5 extra items above/below viewport
  });

  return (
    <Box
      ref={parentRef}
      h="400px"
      overflowY="auto"
      border="1px solid"
      borderColor="gray.700"
      borderRadius="md"
    >
      <Box
        h={`${virtualizer.getTotalSize()}px`}
        w="100%"
        position="relative"
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const frame = frames[virtualItem.index];
          const isSelected = selectedFrame?.src === frame.src;

          return (
            <Box
              key={virtualItem.key}
              position="absolute"
              top={0}
              left={0}
              w="100%"
              h={`${virtualItem.size}px`}
              transform={`translateY(${virtualItem.start}px)`}
              onClick={() => onSelectFrame(frame)}
              cursor="pointer"
              bg={isSelected ? 'blue.900' : 'transparent'}
              _hover={{ bg: 'gray.800' }}
              p={2}
            >
              {frame.name}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
```

##### 3. Replace Regular List with Virtualized List
```typescript
// src/components/tabs/FrameTab.tsx
import { VirtualizedFrameList } from '../frames/VirtualizedFrameList';

export const FrameTab = () => {
  const availableFrames = useCardStore((state) => state.availableFrames);
  const addFrame = useCardStore((state) => state.addFrame);

  return (
    <VStack>
      <VirtualizedFrameList
        frames={availableFrames}
        onSelectFrame={addFrame}
        selectedFrame={null}
      />
    </VStack>
  );
};
```

#### Acceptance Criteria
- [ ] Virtualized list component created
- [ ] Frame selection uses virtualized list
- [ ] Only visible items rendered to DOM
- [ ] Scrolling is smooth
- [ ] Selection still works

#### Commit
```bash
git add package.json package-lock.json
git add src/components/frames/VirtualizedFrameList.tsx
git add src/components/tabs/FrameTab.tsx
git commit -m "perf: add virtualized rendering for frame lists

- Install @tanstack/react-virtual
- Create VirtualizedFrameList component
- Only render visible frame items
- Improve performance with large lists"
```

---

### Task 3.3: Comprehensive Test Coverage (Week 8-10)

**Priority:** HIGH
**Effort:** 24 hours
**Dependencies:** Phase 1 testing infrastructure

#### Goal
Achieve >70% test coverage for critical paths.

#### Test Priorities

##### 1. Store Tests (Week 8)
Test all actions in each slice:

```typescript
// src/store/slices/__tests__/frameSlice.test.ts
describe('frameSlice', () => {
  describe('addFrame', () => {
    it('should add frame and recalculate margins');
    it('should handle frames with no bounds');
    it('should handle frames extending beyond canvas');
  });

  describe('removeFrame', () => {
    it('should remove frame at index');
    it('should adjust selected index');
    it('should recalculate margins');
  });

  // ... more tests
});
```

##### 2. Utility Tests (Week 8)
Test all canvas helpers:

```typescript
// src/utils/__tests__/canvasHelpers.test.ts
describe('scaleX/Y/Width/Height', () => {
  // Already started in Phase 1
});

describe('drawFrameLayers', () => {
  it('should draw visible frames');
  it('should skip invisible frames');
  it('should apply opacity');
  it('should handle masking');
});
```

##### 3. Hook Tests (Week 9)
Test custom hooks:

```typescript
// src/hooks/__tests__/useCanvasRender.test.ts
describe('useCanvasRender', () => {
  it('should initialize canvases');
  it('should render on card changes');
  it('should debounce renders');
});

// src/hooks/__tests__/useImageLoader.test.ts
describe('useImageLoader', () => {
  it('should load images from URLs');
  it('should handle errors');
  it('should cache loaded images');
});
```

##### 4. Component Tests (Week 9-10)
Test UI components:

```typescript
// src/components/__tests__/CardCanvas.test.tsx
import { render, screen } from '@testing-library/react';
import { CardCanvas } from '../CardCanvas';

describe('CardCanvas', () => {
  it('should render canvas element', () => {
    render(<CardCanvas />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should apply transparency background', () => {
    // Test checkerboard pattern
  });
});

// src/components/tabs/__tests__/FrameTab.test.tsx
describe('FrameTab', () => {
  it('should display available frames');
  it('should add frame on selection');
  it('should show frame editor');
});
```

##### 5. Integration Tests (Week 10)
Test complete workflows:

```typescript
// src/__tests__/integration/cardCreation.test.tsx
describe('Card Creation Workflow', () => {
  it('should create a complete card', async () => {
    const { user } = renderWithProviders(<App />);

    // Load frame
    await user.click(screen.getByText('Frame'));
    await user.click(screen.getByText('M15 Regular'));

    // Add text
    await user.click(screen.getByText('Text'));
    await user.type(screen.getByLabelText('Title'), 'Test Card');

    // Add art
    await user.click(screen.getByText('Art'));
    // ... more steps

    // Verify card rendered
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
```

#### Coverage Target
```bash
# Aim for:
# - Utilities: >90%
# - Store: >80%
# - Hooks: >70%
# - Components: >60%
# - Overall: >70%

npm run test:coverage
```

#### Commit (Throughout Weeks 8-10)
```bash
# Commit after each test suite
git add src/store/slices/__tests__/
git commit -m "test: add comprehensive store slice tests"

git add src/utils/__tests__/
git commit -m "test: add utility function tests"

git add src/hooks/__tests__/
git commit -m "test: add custom hook tests"

git add src/components/__tests__/
git commit -m "test: add component tests"

git add src/__tests__/integration/
git commit -m "test: add integration tests for card creation"
```

---

## Phase 4: Advanced Features (Week 11+)

### Overview
Optional enhancements for long-term maintainability.

---

### Task 4.1: Lazy Load Frame Packs

**Priority:** LOW
**Effort:** 8 hours

#### Implementation
```typescript
// src/components/frames/packs/packLoader.ts
export const loadFramePack = async (packName: string) => {
  const module = await import(`./${packName}.ts`);
  return module.default;
};

// Usage in FrameTab
const [selectedPack, setSelectedPack] = useState<string | null>(null);
const [pack, setPack] = useState<FramePackTemplate | null>(null);

useEffect(() => {
  if (selectedPack) {
    loadFramePack(selectedPack).then(setPack);
  }
}, [selectedPack]);
```

---

### Task 4.2: Add Performance Monitoring

**Priority:** LOW
**Effort:** 4 hours

#### Implementation
```typescript
// src/utils/performance.ts
export const measureRender = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const duration = performance.now() - start;
  if (duration > 16) {
    // Slower than 60fps
    console.warn(`Slow render: ${name} took ${duration.toFixed(2)}ms`);
  }
};

// Usage
measureRender('drawFrames', () => {
  drawFrames();
});
```

---

### Task 4.3: Accessibility Improvements

**Priority:** LOW
**Effort:** 8 hours

#### Checklist
- [ ] Add ARIA labels to all interactive elements
- [ ] Keyboard navigation for tabs
- [ ] Focus management in modals
- [ ] Screen reader announcements for state changes
- [ ] Color contrast compliance (WCAG AA)

---

## Testing Strategy

### Test Pyramid
```
       /\
      /E2E\       10% - Full workflows
     /------\
    /Integration\ 20% - Multi-component
   /------------\
  /  Unit Tests  \ 70% - Functions, hooks, store
 /----------------\
```

### Running Tests

#### During Development
```bash
# Watch mode
npm run test:watch

# Specific file
npm test useCanvasRender

# With UI
npm run test:ui
```

#### Before Commit
```bash
# Run all tests
npm test

# Check coverage
npm run test:coverage

# Ensure >70% coverage
```

#### CI/CD (GitHub Actions)
```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
```

---

## Migration Checklist

Use this checklist to track progress:

### Phase 1: Foundation
- [ ] Extract magic strings to constants
  - [ ] Tab constants
  - [ ] Text field constants
  - [ ] Card version constants
  - [ ] Canvas layer constants
- [ ] Add error boundaries
  - [ ] Global ErrorBoundary
  - [ ] CanvasErrorBoundary
- [ ] Set up testing infrastructure
  - [ ] Vitest configured
  - [ ] Test setup file
  - [ ] Initial tests written

### Phase 2: Code Organization
- [ ] Split useCanvasRender
  - [ ] useCanvasInitialization
  - [ ] useCanvasLayers
  - [ ] useCanvasComposite
- [ ] Split cardStore
  - [ ] frameSlice
  - [ ] textSlice
  - [ ] artSlice
  - [ ] Other slices
- [ ] Modularize components
  - [ ] ScryfallImportTab
  - [ ] FrameTab
  - [ ] TextTab

### Phase 3: Performance & Quality
- [ ] Add Immer middleware
- [ ] Implement virtualization
- [ ] Comprehensive test coverage
  - [ ] Store tests (>80%)
  - [ ] Utility tests (>90%)
  - [ ] Hook tests (>70%)
  - [ ] Component tests (>60%)
  - [ ] Integration tests

### Phase 4: Advanced Features
- [ ] Lazy load frame packs
- [ ] Performance monitoring
- [ ] Accessibility improvements

---

## Rollback Plan

If any refactoring causes issues:

### 1. Identify the Problem
```bash
# Check git diff
git diff HEAD~1

# Check tests
npm test

# Check application
npm run dev
```

### 2. Rollback Strategy

#### Option A: Revert Last Commit
```bash
git revert HEAD
git push
```

#### Option B: Revert to Specific Commit
```bash
git log --oneline
git revert <commit-hash>
git push
```

#### Option C: Reset Branch (if not pushed)
```bash
git reset --hard HEAD~1
```

### 3. Fix Forward
Preferred approach: Fix the issue rather than reverting:
```bash
# Make fixes
git add .
git commit -m "fix: resolve issue from previous refactor"
git push
```

---

## Best Practices

### Commit Messages
Follow conventional commits:
```
feat: add new feature
fix: fix bug
refactor: code restructuring
test: add or update tests
docs: documentation changes
perf: performance improvements
chore: maintenance tasks
```

### Branch Strategy
```bash
# Feature branches
git checkout -b refactor/split-canvas-render
git checkout -b test/add-store-tests
git checkout -b perf/add-virtualization

# Merge when complete
git checkout main
git merge refactor/split-canvas-render
```

### Code Review
Before merging:
- [ ] All tests pass
- [ ] No console errors
- [ ] TypeScript compiles
- [ ] Coverage maintained or improved
- [ ] Documentation updated

---

## Success Metrics

Track these metrics throughout the refactoring:

### Code Quality
- **Lines of Code:** Target 10-20% reduction
- **File Size:** No file >500 lines
- **Cyclomatic Complexity:** Max 10 per function
- **TypeScript Strict:** 100% compliance

### Performance
- **Initial Load:** <3 seconds
- **Render Time:** <16ms (60fps)
- **Memory Usage:** <100MB idle
- **Bundle Size:** <2MB gzipped

### Testing
- **Unit Test Coverage:** >70%
- **Store Coverage:** >80%
- **Utility Coverage:** >90%
- **Test Execution:** <10 seconds

### Developer Experience
- **Build Time:** <30 seconds
- **Hot Reload:** <1 second
- **Type Checking:** <5 seconds
- **Test Feedback:** <3 seconds

---

## Conclusion

This refactoring guide provides a structured, incremental approach to improving the Card Cipherist codebase. By following these steps:

1. ✅ **Foundation** - Constants, error handling, testing
2. ✅ **Organization** - Split large files, modularize components
3. ✅ **Quality** - Performance, comprehensive tests
4. ✅ **Advanced** - Optional enhancements

You'll have a maintainable, performant, and well-tested application.

**Remember:**
- Make small, incremental changes
- Test after each change
- Commit frequently
- Don't rush - quality over speed

Good luck with the refactoring! 🚀
