import { List, Space, Text } from "@mantine/core";
import { ChangelogLink, SVGEditorLink, VectorWeaverLink } from "~/components/Links";

export default function Update3Info() {
  return (
    <>
      <Text size='md' style={{ paddingBottom: '1rem' }}>Update on <Text weight={600} span>03.05.2023:</Text></Text>
      <List size="md" withPadding>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text>Frontend tag version: v1.1.0.</Text>
        </List.Item>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text><VectorWeaverLink/> frontend and backend services implemented.</Text>
          <Space/>
          <Text>CORS policy and json data forwarding configured.</Text>
          <Space/>
          <Text>Implemented a check for the availability of the backend server.</Text>
        </List.Item>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text>Site design unified.</Text>
        </List.Item>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text><ChangelogLink/> info moved to separate page.</Text>
        </List.Item>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text>Updated passing data to <SVGEditorLink/> method. SessionStorage is now used instead of
            outletContext.</Text>
        </List.Item>
        <List.Item>
          <Text>Added stub messages info about specifying input parameters before running services.</Text>
        </List.Item>
      </List>
    </>)
}
