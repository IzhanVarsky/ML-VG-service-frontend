import { List, Text } from "@mantine/core";

export default function Update4Info() {
  return (
    <>
      <Text size='md' style={{ paddingBottom: '1rem' }}>Update on <Text weight={600} span>05.05.2023:</Text></Text>
      <List size="md" withPadding>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text>Frontend tag version: v1.1.1.</Text>
        </List.Item>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text>New unpublished ports configured on all services.</Text>
        </List.Item>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text>Nginx reverse proxy configured.</Text>
        </List.Item>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text>CORS policy configured for all services.</Text>
        </List.Item>
        <List.Item>
          <Text>Check for the availability of the backend add for all services.</Text>
        </List.Item>
      </List>
    </>)
}
