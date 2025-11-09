/**
 * Tutorial Tab Component
 * Help and documentation interface
 */

import { Box, Heading, VStack, Accordion } from '@chakra-ui/react';

export const TutorialTab = () => {
  return (
    <VStack align="stretch" gap={4}>
      <Box>
        <Heading size="md" mb={4}>
          Tutorial & Help
        </Heading>
      </Box>

      <Accordion.Root collapsible defaultValue={['basics']}>
        <Accordion.Item value="basics">
          <Accordion.ItemTrigger>Getting Started</Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Box p={4} fontSize="sm" color="gray.300" lineHeight="tall">
              <Box as="strong" display="block" mb={2}>
                Welcome to Card Conjurer!
              </Box>
              <Box>
                This tool allows you to create custom Magic: The Gathering cards with professional
                quality. Start by selecting a frame from the Frame tab, then add your art, text, and
                other elements.
              </Box>
            </Box>
          </Accordion.ItemContent>
        </Accordion.Item>

        <Accordion.Item value="frames">
          <Accordion.ItemTrigger>Frame Tab</Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Box p={4} fontSize="sm" color="gray.300" lineHeight="tall">
              <Box as="strong" display="block" mb={2}>
                Working with Frames
              </Box>
              <Box>
                • Select a frame pack from the dropdown
                <br />
                • Click on a frame to add it to your card
                <br />
                • Frames stack in layers (bottom to top)
                <br />
                • Adjust opacity, position, and color adjustments
                <br />
                • Drag frames to reorder them
                <br />• Remove unwanted frames with the X button
              </Box>
            </Box>
          </Accordion.ItemContent>
        </Accordion.Item>

        <Accordion.Item value="text">
          <Accordion.ItemTrigger>Text Formatting</Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Box p={4} fontSize="sm" color="gray.300" lineHeight="tall">
              <Box as="strong" display="block" mb={2}>
                Formatting Codes
              </Box>
              <Box fontFamily="mono" bg="gray.900" p={3} borderRadius="md" mb={3}>
                {'{w}'} {'{u}'} {'{b}'} {'{r}'} {'{g}'} - Mana symbols
                <br />
                {'{t}'} - Tap symbol
                <br />
                {'{untap}'} - Untap symbol
                <br />
                {'{i}'}...{'{/i}'} - Italic
                <br />
                {'{bold}'}...{'{/bold}'} - Bold
                <br />
                {'{flavor}'} - Flavor text style
                <br />
                {'{tab}'} - Tab space
              </Box>
              <Box>
                You can combine multiple codes for complex formatting. Position and size text boxes
                as needed for your card layout.
              </Box>
            </Box>
          </Accordion.ItemContent>
        </Accordion.Item>

        <Accordion.Item value="art">
          <Accordion.ItemTrigger>Art Upload</Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Box p={4} fontSize="sm" color="gray.300" lineHeight="tall">
              <Box as="strong" display="block" mb={2}>
                Adding Art
              </Box>
              <Box>
                • Upload from your computer
                <br />
                • Load from URL
                <br />
                • Paste from clipboard
                <br />
                • Adjust position with X/Y controls
                <br />
                • Zoom in/out to fit the frame
                <br />• Rotate for proper orientation
              </Box>
            </Box>
          </Accordion.ItemContent>
        </Accordion.Item>

        <Accordion.Item value="symbols">
          <Accordion.ItemTrigger>Set Symbols & Watermarks</Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Box p={4} fontSize="sm" color="gray.300" lineHeight="tall">
              <Box as="strong" display="block" mb={2}>
                Set Symbol
              </Box>
              <Box mb={3}>
                Upload a set symbol image (typically SVG or PNG) and position it in the bottom right
                area of the card. Adjust size as needed.
              </Box>
              <Box as="strong" display="block" mb={2}>
                Watermark
              </Box>
              <Box>
                Add a watermark to the card's textbox area. Common watermarks include guild symbols,
                plane symbols, or other thematic images. Adjust opacity to make it subtle.
              </Box>
            </Box>
          </Accordion.ItemContent>
        </Accordion.Item>

        <Accordion.Item value="collector">
          <Accordion.ItemTrigger>Collector Information</Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Box p={4} fontSize="sm" color="gray.300" lineHeight="tall">
              <Box as="strong" display="block" mb={2}>
                Bottom Card Info
              </Box>
              <Box>
                • Card Number: e.g., "123/456"
                <br />
                • Rarity: Common, Uncommon, Rare, Mythic
                <br />
                • Artist: Name of the artist
                <br />
                • Set Code: Three-letter set abbreviation
                <br />
                • Language: EN, JP, DE, etc.
                <br />• Copyright Year: Usually current year
              </Box>
            </Box>
          </Accordion.ItemContent>
        </Accordion.Item>

        <Accordion.Item value="save">
          <Accordion.ItemTrigger>Saving & Exporting</Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Box p={4} fontSize="sm" color="gray.300" lineHeight="tall">
              <Box as="strong" display="block" mb={2}>
                Export Options
              </Box>
              <Box>
                • Download as PNG image for printing or sharing
                <br />
                • Export to JSON to save your work
                <br />
                • Import from JSON to continue editing
                <br />
                • Browser storage for quick auto-save
                <br />
              </Box>
              <Box as="strong" display="block" mt={3} mb={2}>
                Tips
              </Box>
              <Box>
                Save your work frequently! Use JSON export to back up complex cards. The browser
                storage is convenient but can be cleared if you clear your browser data.
              </Box>
            </Box>
          </Accordion.ItemContent>
        </Accordion.Item>

        <Accordion.Item value="tips">
          <Accordion.ItemTrigger>Pro Tips</Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Box p={4} fontSize="sm" color="gray.300" lineHeight="tall">
              <Box as="strong" display="block" mb={2}>
                Advanced Techniques
              </Box>
              <Box>
                • Layer multiple frames for custom effects
                <br />
                • Use HSL adjustments to recolor frames
                <br />
                • Adjust text bounds precisely for perfect alignment
                <br />
                • Use the preserve alpha mode for special frame blending
                <br />
                • Export high-resolution images for professional printing
                <br />
              </Box>
            </Box>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>

      <Box p={4} bg="gray.800" borderRadius="md" fontSize="sm" color="gray.400">
        <Box as="strong" display="block" mb={2}>
          Note
        </Box>
        This is a modernized version of Card Conjurer. Some features from the original may still be
        in development. Original project by Kyle Burton (ImKyle4815).
      </Box>
    </VStack>
  );
};
