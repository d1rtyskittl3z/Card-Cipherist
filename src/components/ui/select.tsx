import { NativeSelect as ChakraNativeSelect } from '@chakra-ui/react'
import { ComponentProps } from 'react'

interface SelectProps extends ComponentProps<typeof ChakraNativeSelect.Root> {
  placeholder?: string
  children?: React.ReactNode
}

export const Select = ({ placeholder, children, ...props }: SelectProps) => {
  return (
    <ChakraNativeSelect.Root {...props}>
      <ChakraNativeSelect.Field placeholder={placeholder}>
        {children}
      </ChakraNativeSelect.Field>
    </ChakraNativeSelect.Root>
  )
}