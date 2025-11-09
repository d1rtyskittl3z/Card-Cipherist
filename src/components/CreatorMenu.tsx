import {
  Accordion,
  Box,
  Text,
  Stack,
  Button,
  Input,
  Textarea,
  Span,
  Separator
} from '@chakra-ui/react'
import { LuChevronDown } from 'react-icons/lu'
import { Checkbox } from './ui/checkbox'
import { Select } from './ui/select'

const CreatorMenu = () => {


  return (
    <Box
      bg="rgba(45, 55, 72, 0.95)"
      borderRadius="lg"
      boxShadow="xl"
      backdropFilter="blur(10px)"
      color="white"
      h="fit-content"
      maxH="90vh"
      overflowY="auto"
    >
      <Accordion.Root multiple defaultValue={['frame']}>
        {/* Frame Section */}
        <Accordion.Item value="frame">
          <Accordion.ItemTrigger>
            <Span flex="1" textAlign="left" fontWeight="bold">Frame</Span>
            <Accordion.ItemIndicator>
              <LuChevronDown />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <Stack gap={4}>
                <Box>
                  <Text fontSize="sm" mb={2} color="whiteAlpha.800">
                    Select a Frame Group and a Frame Pack, or type to search
                  </Text>
                  <Stack gap={3}>
                    <Select 
                      placeholder="Select Frame Group" 
                      bg="whiteAlpha.100" 
                      border="none"
                      color="white"
                    >
                      <option value="Standard-3">Regular</option>
                      <option value="Token-2">Tokens</option>
                      <option value="Saga-1">Sagas</option>
                      <option value="Planeswalker">Planeswalkers</option>
                      <option value="Modal-1">Modal DFC's</option>
                      <option value="DFC">Transform</option>
                    </Select>
                    <Select 
                      placeholder="Select Frame Pack" 
                      bg="whiteAlpha.100" 
                      border="none"
                      color="white"
                    />
                    <Input 
                      placeholder="Search Frames..." 
                      bg="whiteAlpha.100" 
                      border="none"
                      color="white"
                      _placeholder={{ color: 'whiteAlpha.600' }}
                    />
                  </Stack>
                </Box>
                
                <Button colorPalette="blue" size="sm">
                  Load Frame Version
                </Button>
                
                <Checkbox defaultChecked colorPalette="blue">
                  <Text fontSize="sm">Auto load Frame Version when loading Frame Packs</Text>
                </Checkbox>
                
                <Separator />
                
                <Box>
                  <Text fontSize="sm" mb={2} color="whiteAlpha.800">
                    Select a Frame Image and a Mask, then add it to your card
                  </Text>
                  <Stack direction="row" gap={2}>
                    <Button colorPalette="green" size="sm" flex={1}>
                      Add Frame to Card
                    </Button>
                    <Button colorPalette="green" size="sm" flex={1}>
                      Add Frame (Right Half)
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* Text Section */}
        <Accordion.Item value="text">
          <Accordion.ItemTrigger>
            <Span flex="1" textAlign="left" fontWeight="bold">Text</Span>
            <Accordion.ItemIndicator>
              <LuChevronDown />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <Stack gap={4}>
                <Box>
                  <Text fontSize="sm" mb={2} color="whiteAlpha.800">
                    Select a text area to edit
                  </Text>
                </Box>
                
                <Box>
                  <Text fontSize="sm" color="whiteAlpha.800" mb={2}>Enter card text</Text>
                  <Textarea 
                    placeholder="Enter your card text here..."
                    bg="whiteAlpha.100"
                    border="none"
                    color="white"
                    rows={4}
                    _placeholder={{ color: 'whiteAlpha.600' }}
                  />
                  <Stack direction="row" gap={2} mt={2}>
                    <Button size="xs" variant="outline">Italic</Button>
                    <Button size="xs" variant="outline">Bold</Button>
                  </Stack>
                </Box>
              </Stack>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* Art Section */}
        <Accordion.Item value="art">
          <Accordion.ItemTrigger>
            <Span flex="1" textAlign="left" fontWeight="bold">Art</Span>
            <Accordion.ItemIndicator>
              <LuChevronDown />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <Stack gap={4}>
                <Box>
                  <Text fontSize="sm" mb={2} color="whiteAlpha.800">
                    Choose/upload your art
                  </Text>
                  <Stack gap={2}>
                    <Input 
                      type="file" 
                      accept=".png,.svg,.jpg,.jpeg,.bmp"
                      bg="whiteAlpha.100"
                      border="none"
                      color="white"
                      p={1}
                    />
                    <Input 
                      placeholder="Via URL" 
                      bg="whiteAlpha.100" 
                      border="none"
                      color="white"
                      _placeholder={{ color: 'whiteAlpha.600' }}
                    />
                    <Input 
                      placeholder="Enter Card Name" 
                      bg="whiteAlpha.100" 
                      border="none"
                      color="white"
                      _placeholder={{ color: 'whiteAlpha.600' }}
                    />
                  </Stack>
                </Box>
              </Stack>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* Set Symbol Section */}
        <Accordion.Item value="setSymbol">
          <Accordion.ItemTrigger>
            <Span flex="1" textAlign="left" fontWeight="bold">Set Symbol</Span>
            <Accordion.ItemIndicator>
              <LuChevronDown />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <Stack gap={4}>
                <Text fontSize="sm" color="whiteAlpha.800">
                  Choose/upload your set symbol
                </Text>
                <Input 
                  type="file" 
                  accept=".png,.svg,.jpg,.jpeg,.bmp"
                  bg="whiteAlpha.100"
                  border="none"
                  color="white"
                  p={1}
                />
              </Stack>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* Watermark Section */}
        <Accordion.Item value="watermark">
          <Accordion.ItemTrigger>
            <Span flex="1" textAlign="left" fontWeight="bold">Watermark</Span>
            <Accordion.ItemIndicator>
              <LuChevronDown />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <Stack gap={4}>
                <Text fontSize="sm" color="whiteAlpha.800">
                  Choose/upload your watermark
                </Text>
                <Input 
                  type="file" 
                  accept=".png,.svg,.jpg,.jpeg,.bmp"
                  bg="whiteAlpha.100"
                  border="none"
                  color="white"
                  p={1}
                />
              </Stack>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* Collector Section */}
        <Accordion.Item value="collector">
          <Accordion.ItemTrigger>
            <Span flex="1" textAlign="left" fontWeight="bold">Collector</Span>
            <Accordion.ItemIndicator>
              <LuChevronDown />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <Stack gap={4}>
                <Text fontSize="sm" color="whiteAlpha.800">
                  Enter collector information
                </Text>
                <Stack direction="row" gap={2}>
                  <Input 
                    placeholder="Number" 
                    bg="whiteAlpha.100" 
                    border="none" 
                    size="sm"
                    color="white"
                    _placeholder={{ color: 'whiteAlpha.600' }}
                  />
                  <Input 
                    placeholder="Rarity" 
                    bg="whiteAlpha.100" 
                    border="none" 
                    size="sm"
                    color="white"
                    _placeholder={{ color: 'whiteAlpha.600' }}
                  />
                </Stack>
              </Stack>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* Import/Save Section */}
        <Accordion.Item value="import">
          <Accordion.ItemTrigger>
            <Span flex="1" textAlign="left" fontWeight="bold">Import/Save</Span>
            <Accordion.ItemIndicator>
              <LuChevronDown />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <Stack gap={4}>
                <Input 
                  placeholder="Enter Card Name" 
                  bg="whiteAlpha.100" 
                  border="none"
                  color="white"
                  _placeholder={{ color: 'whiteAlpha.600' }}
                />
                <Button colorPalette="blue" size="sm">
                  Save Card
                </Button>
              </Stack>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* Tutorial Section */}
        <Accordion.Item value="tutorial">
          <Accordion.ItemTrigger>
            <Span flex="1" textAlign="left" fontWeight="bold">Tutorial</Span>
            <Accordion.ItemIndicator>
              <LuChevronDown />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <Text fontSize="sm" color="whiteAlpha.800">
                Tutorial content will be displayed here
              </Text>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* Developer Section */}
        <Accordion.Item value="developer">
          <Accordion.ItemTrigger>
            <Span flex="1" textAlign="left" fontWeight="bold">Developer</Span>
            <Accordion.ItemIndicator>
              <LuChevronDown />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <Stack gap={4}>
                <Text fontSize="sm" color="whiteAlpha.800">
                  Automatically update frame
                </Text>
                <Select 
                  placeholder="Disabled" 
                  bg="whiteAlpha.100" 
                  border="none"
                  color="white"
                >
                  <option value="M15Regular-1">Regular</option>
                  <option value="M15BoxTopper">Extended Art</option>
                  <option value="UB">Universes Beyond</option>
                </Select>
              </Stack>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* Download Section */}
        <Accordion.Item value="download">
          <Accordion.ItemTrigger>
            <Span flex="1" textAlign="left" fontWeight="bold">Download</Span>
            <Accordion.ItemIndicator>
              <LuChevronDown />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <Stack gap={2}>
                <Button colorPalette="green" size="lg">
                  Download your card
                </Button>
                <Button variant="ghost" size="sm" color="whiteAlpha.800">
                  Click here to download as JPEG
                </Button>
                <Button variant="ghost" size="sm" color="whiteAlpha.800">
                  Click here for an alternative download
                </Button>
              </Stack>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </Box>
  )
}

export default CreatorMenu