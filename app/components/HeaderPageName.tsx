import { Text } from "@mantine/core";

export const HeaderPageName = ({ text }) =>
  <Text size='1.4rem'
        align='center'
        weight={800}
        variant="gradient"
        gradient={{ from: 'indigo', to: 'red', deg: 10 }}
        style={{ fontFamily: 'Greycliff CF, sans-serif', userSelect: 'none' }}
  >- - - {text} - - -</Text>;
