import { List, Text } from "@mantine/core";
import { CoverGANLink, MantineAnchor, SVGEditorLink, VectorNSTLink } from "~/components/Links";

export default function Update0Info() {
  return (
    <>
      <Text size='md' style={{ paddingBottom: '1rem' }}>Before <Text weight={600} span>28.04.2023:</Text></Text>
      <List size="md" withPadding>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text>
            <MantineAnchor/> framework version: 5.8.0.
          </Text>
        </List.Item>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text>
            <CoverGANLink/> service implemented.
          </Text>
        </List.Item>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text>
            <VectorNSTLink/> service implemented.
          </Text>
        </List.Item>
        <List.Item>
          <Text>
            <SVGEditorLink/> service implemented.
          </Text>
        </List.Item>
      </List>
    </>)
}
