import { Header, Text, Space, Container } from '@mantine/core';
import Shape from './Shape';

export default function CoverGANLogo() {
  return (
    <Header height="5rem" style={{ borderBottom: 0 }}>
      <Shape>
        <Space w="xl"/>
        <Text
          size='xl'
          align='center'
          weight={800}
          variant="gradient"
          gradient={{ from: 'indigo', to: 'red', deg: 10 }}
          style={{ fontFamily: 'Greycliff CF, sans-serif' }}
        >
          - - - CoverGAN - - -
        </Text>
      </Shape>
    </Header>
  )
}