import { List, Text } from "@mantine/core";

export default function Update5Info() {
  return (
    <>
      <Text size='md' style={{ paddingBottom: '1rem' }}>Update on <Text weight={600} span>23.02.2024:</Text></Text>
      <List size="md" withPadding>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text>Frontend tag version: v1.1.2.</Text>
        </List.Item>
        <List.Item>
          <Text>Backend Host moved to new IP: api.statanly.com and CORS updated.</Text>
        </List.Item>
      </List>
    </>)
}
