/**
 * Card Creator Layout Component
 * Main application layout with canvas preview and tab navigation
 */

import { Box, Heading, HStack, Accordion } from '@chakra-ui/react';
import { CardCanvas } from './CardCanvas';
import { CanvasErrorBoundary } from './CanvasErrorBoundary';
import { ScryfallImportTab } from './tabs/ScryfallImportTab';
import { FrameTab } from './tabs/FrameTab';
import { TextTab } from './tabs/TextTab';
import { SagaTab } from './tabs/SagaTab';
import { PlaneswalkerTab } from './tabs/PlaneswalkerTab';
import { KamigawaTab } from './tabs/KamigawaTab';
import { StationsTab } from './tabs/StationsTab';
import { ArtTab } from './tabs/ArtTab';
import { SetSymbolTab } from './tabs/SetSymbolTab';
import { WatermarkTab } from './tabs/WatermarkTab';
import { CollectorTab } from './tabs/CollectorTab';
import { SaveImportTab } from './tabs/SaveImportTab';
// import { TutorialTab } from './tabs/TutorialTab'; //  Hidden for now --DSKZ
import { Toaster } from './ui/toaster';
import { useCardStore } from '../store/cardStore';
import { TABS } from '../constants';

export const CardCreatorLayout = () => {
  const hasShownSagaTab = useCardStore((state) => state.hasShownSagaTab);
  const hasShownPlaneswalkerTab = useCardStore((state) => state.hasShownPlaneswalkerTab);
  const hasShownKamigawaTab = useCardStore((state) => state.hasShownKamigawaTab);
  const hasShownStationsTab = useCardStore((state) => state.hasShownStationsTab);

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
          flexBasis="1200px"
          minW="500px"
          maxW="2000px"
          h="100%"
          overflowY="auto"
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

              {/* <Accordion.Item value="tutorial">
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
