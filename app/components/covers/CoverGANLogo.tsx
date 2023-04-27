import { Text, Space } from '@mantine/core';
import Shape from '../Shape';

export default function CoverGANLogo() {
  return (
    <div style={{ borderBottom: 0, height: "5rem" }}>
      <Shape>
        <Space w="xl"/>
        <Text
          size='xl'
          align='center'
          weight={800}
          variant="gradient"
          gradient={{ from: 'indigo', to: 'red', deg: 10 }}
          style={{ fontFamily: 'Greycliff CF, sans-serif', userSelect: 'none' }}
        >
          - - - CoverGAN - - -
        </Text>
      </Shape>
    </div>
  )
}