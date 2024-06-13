import { List, Text } from "@mantine/core";

export default function Update6Info() {
  return (
    <>
      <Text size='md' style={{ paddingBottom: '1rem' }}>Update on <Text weight={600} span>14.06.2024:</Text></Text>
      <List size="md" withPadding>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text>Frontend tag version: v1.1.3.</Text>
        </List.Item>
        <List.Item>
          <Text>Timeout for VectorNST fixed.</Text>
        </List.Item>
      </List>
    </>)
}
