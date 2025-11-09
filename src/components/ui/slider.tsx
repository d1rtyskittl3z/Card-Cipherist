import { Slider as ChakraSlider } from "@chakra-ui/react"
import { forwardRef } from "react"

export interface SliderProps extends ChakraSlider.RootProps {
  marks?: Array<number | { value: number; label: string }>
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  function Slider(props, ref) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { marks, ...rest } = props
    return (
      <ChakraSlider.Root ref={ref} {...rest}>
        <ChakraSlider.Control>
          <ChakraSlider.Track>
            <ChakraSlider.Range />
          </ChakraSlider.Track>
          <ChakraSlider.Thumb index={0} />
        </ChakraSlider.Control>
      </ChakraSlider.Root>
    )
  },
)
