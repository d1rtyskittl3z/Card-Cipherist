/**
 * Card Creator Layout Component
 * Main application layout with canvas preview and tab navigation
 */

import { memo } from 'react';
import { Box, Heading, HStack, Accordion } from '@chakra-ui/react';
import { CardCanvas } from './CardCanvas';
import { CanvasErrorBoundary } from './CanvasErrorBoundary';
import { ScryfallImportTab } from './tabs/ScryfallImportTab';
import { FrameTab } from './tabs/FrameTab';
import { TextTab } from './tabs/TextTab';
import { SagaTab } from './tabs/SagaTab';
import { PlaneswalkerTab } from './tabs/PlaneswalkerTab';
import { KamigawaTab } from './tabs/KamigawaTab';
import { ClassTab } from './tabs/ClassTab';
import { StationsTab } from './tabs/StationsTab';
import { DungeonTab } from './tabs/DungeonTab';
import { MysticalArchiveTab } from './tabs/MysticalArchiveTab';
import { MysticalArchiveHorizontalTab } from './tabs/MysticalArchiveHorizontalTab';
import { QRCodeTab } from './tabs/QRCodeTab';
import { ArtTab } from './tabs/ArtTab';
import { SetSymbolTab } from './tabs/SetSymbolTab';
import { WatermarkTab } from './tabs/WatermarkTab';
import { CollectorTab } from './tabs/CollectorTab';
import { SaveImportTab } from './tabs/SaveImportTab';
// import { TutorialTab } from './tabs/TutorialTab'; //  Hidden for now --DSKZ
import { Toaster } from './ui/toaster';
import { useCardStore } from '../store/cardStore';
import { useRotateCanvasPreview } from '../store/selectors';
import { TABS } from '../constants';

const CardCreatorLayoutComponent = () => {
  const hasShownSagaTab = useCardStore((state) => state.hasShownSagaTab);
  const hasShownPlaneswalkerTab = useCardStore((state) => state.hasShownPlaneswalkerTab);
  const hasShownKamigawaTab = useCardStore((state) => state.hasShownKamigawaTab);
  const hasShownClassTab = useCardStore((state) => state.hasShownClassTab);
  const hasShownStationsTab = useCardStore((state) => state.hasShownStationsTab);
  const hasShownDungeonTab = useCardStore((state) => state.hasShownDungeonTab);
  const hasShownMysticalArchiveTab = useCardStore((state) => state.hasShownMysticalArchiveTab);
  const hasShownMysticalArchiveHorizontalTab = useCardStore((state) => state.hasShownMysticalArchiveHorizontalTab);
  const hasShownQRCodeTab = useCardStore((state) => state.hasShownQRCodeTab);
  const rotateCanvasPreview = useRotateCanvasPreview();
  const accordionWidth = rotateCanvasPreview ? '1000px' : '1200px';

  return (
    <Box
      minH="100vh"
      w="100%"
      color="white"
      style={{
        backgroundImage: 'url(/img/lowpolyBackground_deepPurple.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Header */}
  <Box w="100%" bg="rgba(0, 0, 0, 0.7)" borderBottom="1px solid" borderColor="gray.800" py={4} px={6}>
        <HStack justify="space-between">
          <Heading size="lg" fontWeight="bold">
            Card Cipherist
          </Heading>
          <Box fontSize="sm" color="gray.400">
            Modernized Edition
          </Box>
        </HStack>
      </Box>

      {/* Main Content */}
  <Box display="flex" w="100%" h="calc(100vh - 73px)">
        {/* Canvas Preview - Fixed height container */}
        <Box
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          position="relative"
        >
          <CanvasErrorBoundary>
            <CardCanvas />
          </CanvasErrorBoundary>
        </Box>

        {/* Controls Panel */}
        <Box
          // These two determine the size of the Panel. Need to play with this --DSKZ
          flexShrink={0}
          flexGrow={0}
          flexBasis={accordionWidth}
          minW="500px"
          maxW={rotateCanvasPreview ? '1800px' : '2000px'}
          h="100%"
          overflowY="auto"
          transition="flex-basis 0.2s ease, max-width 0.2s ease"
            css={{
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#1a1a1a',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#404040',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#505050',
              },
            }}
          >
            <Accordion.Root multiple variant="enclosed">
              <Accordion.Item value={TABS.SCRYFALL}>
                <Accordion.ItemTrigger
                  fontSize="md"
                  fontWeight="semibold"
                  py={4}
                >
                  <Box flex="1" textAlign="start">
                    Import Scryfall Data
                  </Box>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody p={4}>
                    <ScryfallImportTab />
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>

              <Accordion.Item value={TABS.FRAME}>
                <Accordion.ItemTrigger
                  fontSize="md"
                  fontWeight="semibold"
                  py={4}
                >
                  <Box flex="1" textAlign="start">
                    Frame
                  </Box>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody p={4}>
                    <FrameTab />
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>


              {/* Conditionally show Saga accordion item */}
              {hasShownSagaTab && (
                <Accordion.Item value={TABS.SAGA}>
                  <Accordion.ItemTrigger
                    fontSize="md"
                    fontWeight="semibold"
                    py={4}
                  >
                    <Box flex="1" textAlign="start">
                      Saga
                    </Box>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody p={4}>
                      <SagaTab />
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              )}

              {/* Conditionally show Planeswalker accordion item */}
              {hasShownPlaneswalkerTab && (
                <Accordion.Item value={TABS.PLANESWALKER}>
                  <Accordion.ItemTrigger
                    fontSize="md"
                    fontWeight="semibold"
                    py={4}
                  >
                    <Box flex="1" textAlign="start">
                      Planeswalker
                    </Box>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody p={4}>
                      <PlaneswalkerTab />
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              )}

              {/* Conditionally show Kamigawa accordion item */}
              {hasShownKamigawaTab && (
                <Accordion.Item value={TABS.KAMIGAWA}>
                  <Accordion.ItemTrigger
                    fontSize="md"
                    fontWeight="semibold"
                    py={4}
                  >
                    <Box flex="1" textAlign="start">
                      Kamigawa Basics
                    </Box>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody p={4}>
                      <KamigawaTab />
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              )}

              {/* Conditionally show Class accordion item */}
              {hasShownClassTab && (
                <Accordion.Item value={TABS.CLASS}>
                  <Accordion.ItemTrigger
                    fontSize="md"
                    fontWeight="semibold"
                    py={4}
                  >
                    <Box flex="1" textAlign="start">
                      Class
                    </Box>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody p={4}>
                      <ClassTab />
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              )}

              {/* Conditionally show Stations accordion item */}
              {hasShownStationsTab && (
                <Accordion.Item value={TABS.STATIONS}>
                  <Accordion.ItemTrigger
                    fontSize="md"
                    fontWeight="semibold"
                    py={4}
                  >
                    <Box flex="1" textAlign="start">
                      Stations
                    </Box>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody p={4}>
                      <StationsTab />
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              )}

              {/* Conditionally show Dungeon accordion item */}
              {hasShownDungeonTab && (
                <Accordion.Item value={TABS.DUNGEON}>
                  <Accordion.ItemTrigger
                    fontSize="md"
                    fontWeight="semibold"
                    py={4}
                  >
                    <Box flex="1" textAlign="start">
                      Dungeon
                    </Box>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody p={4}>
                      <DungeonTab />
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              )}

              {/* Conditionally show Japanese Mystical Archive accordion item */}
              {hasShownMysticalArchiveTab && (
                <Accordion.Item value={TABS.MYSTICAL_ARCHIVE}>
                  <Accordion.ItemTrigger
                    fontSize="md"
                    fontWeight="semibold"
                    py={4}
                  >
                    <Box flex="1" textAlign="start">
                      Japanese Mystical Archive
                    </Box>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody p={4}>
                      <MysticalArchiveTab />
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              )}

              {/* Conditionally show Japanese Mystical Archive Horizontal accordion item */}
              {hasShownMysticalArchiveHorizontalTab && (
                <Accordion.Item value={TABS.MYSTICAL_ARCHIVE_HORIZONTAL}>
                  <Accordion.ItemTrigger
                    fontSize="md"
                    fontWeight="semibold"
                    py={4}
                  >
                    <Box flex="1" textAlign="start">
                      Japanese Mystical Archive Horizontal
                    </Box>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody p={4}>
                      <MysticalArchiveHorizontalTab />
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              )}

              {/* Conditionally show QR Code accordion item */}
              {hasShownQRCodeTab && (
                <Accordion.Item value={TABS.QR_CODE}>
                  <Accordion.ItemTrigger
                    fontSize="md"
                    fontWeight="semibold"
                    py={4}
                  >
                    <Box flex="1" textAlign="start">
                      QR Code
                    </Box>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody p={4}>
                      <QRCodeTab />
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              )}

              <Accordion.Item value={TABS.TEXT}>
                <Accordion.ItemTrigger
                  fontSize="md"
                  fontWeight="semibold"
                  py={4}
                >
                  <Box flex="1" textAlign="start">
                    Text
                  </Box>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody p={4}>
                    <TextTab />
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>

              <Accordion.Item value={TABS.ART}>
                <Accordion.ItemTrigger
                  fontSize="md"
                  fontWeight="semibold"
                  py={4}
                >
                  <Box flex="1" textAlign="start">
                    Art
                  </Box>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody p={4}>
                    <ArtTab />
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>

              <Accordion.Item value={TABS.SET_SYMBOL}>
                <Accordion.ItemTrigger
                  fontSize="md"
                  fontWeight="semibold"
                  py={4}
                >
                  <Box flex="1" textAlign="start">
                    Set Symbol
                  </Box>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody p={4}>
                    <SetSymbolTab />
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>

              <Accordion.Item value={TABS.WATERMARK}>
                <Accordion.ItemTrigger
                  fontSize="md"
                  fontWeight="semibold"
                  py={4}
                >
                  <Box flex="1" textAlign="start">
                    Watermark
                  </Box>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody p={4}>
                    <WatermarkTab />
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>

              <Accordion.Item value={TABS.COLLECTOR}>
                <Accordion.ItemTrigger
                  fontSize="md"
                  fontWeight="semibold"
                  py={4}
                >
                  <Box flex="1" textAlign="start">
                    Collector Info
                  </Box>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody p={4}>
                    <CollectorTab />
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>

              <Accordion.Item value={TABS.SAVE}>
                <Accordion.ItemTrigger
                  fontSize="md"
                  fontWeight="semibold"
                  py={4}
                >
                  <Box flex="1" textAlign="start">
                    Save/Load Card
                  </Box>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody p={4}>
                    <SaveImportTab />
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>

              {/* <Accordion.Item value={TABS.TUTORIAL}>
                <Accordion.ItemTrigger
                  fontSize="md"
                  fontWeight="semibold"
                  py={4}
                >
                  <Box flex="1" textAlign="start">
                    Help & Tutorial
                  </Box>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody p={4}>
                    <TutorialTab />
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item> */}
            </Accordion.Root>
          </Box>
      </Box>
      <Toaster />
    </Box>
  );
};

CardCreatorLayoutComponent.displayName = 'CardCreatorLayout';
export const CardCreatorLayout = memo(CardCreatorLayoutComponent);
