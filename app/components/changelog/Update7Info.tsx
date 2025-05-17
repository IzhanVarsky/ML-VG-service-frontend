import { List, Text } from "@mantine/core";

export default function Update7Info() {
  return (
    <>
      <Text size='md' style={{ paddingBottom: '1rem' }}>Update on <Text weight={600} span>17.05.2025:</Text></Text>
      <List size="md" withPadding>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text>Frontend tag version: v1.1.4.</Text>
        </List.Item>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text>Added audio recording for CoverGAN.</Text>
        </List.Item>
        <List.Item>
          <Text>New papers and projects info added.</Text>
        </List.Item>
      </List>
    </>)
}
