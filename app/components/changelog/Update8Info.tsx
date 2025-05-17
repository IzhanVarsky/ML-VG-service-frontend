import { List, Text } from "@mantine/core";

export default function Update8Info() {
  return (
    <>
      <Text size='md' style={{ paddingBottom: '1rem' }}>Update on <Text weight={600} span>17.05.2025:</Text></Text>
      <List size="md" withPadding>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text>Frontend tag version: v1.1.5.</Text>
        </List.Item>
        <List.Item>
          <Text>Moved to HTTPS instead of HTTP.</Text>
        </List.Item>
      </List>
    </>)
}
