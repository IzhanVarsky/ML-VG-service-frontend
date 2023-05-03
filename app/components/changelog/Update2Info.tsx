import { List, Text } from "@mantine/core";
import { SVGEditorLink } from "~/components/Links";

export default function Update2Info() {
  return (
    <>
      <Text size='md' style={{ paddingBottom: '1rem' }}>Update on <Text weight={600} span>29.04.2023:</Text></Text>
      <List size="md" withPadding>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text>Frontend tag version: v1.0.2.</Text>
        </List.Item>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text>Fixed automatic word wrapping and removed code outline in the <SVGEditorLink/>.</Text>
        </List.Item>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text>Added automatic build and push docker image to dockerhub using GitHub Actions.</Text>
        </List.Item>
        <List.Item>
          <Text>Frontend tag versioning added.</Text>
        </List.Item>
      </List>
    </>)
}
