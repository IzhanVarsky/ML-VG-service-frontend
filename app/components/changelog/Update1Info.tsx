import { List, Text } from "@mantine/core";
import { MainPageLink, MantineAnchor, VectorNSTLink } from "~/components/Links";

export default function Update1Info() {
  return (
    <>
      <Text size='md' style={{ paddingBottom: '1rem' }}>Update on <Text weight={600} span>28.04.2023:</Text></Text>
      <List size="md" withPadding>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text>
            Updated <MantineAnchor/> framework version to 6.0.9.
          </Text>
        </List.Item>
        <List.Item style={{ paddingBottom: '1rem' }}>
          <Text>
            Added more options for <VectorNSTLink/> service.
          </Text>
        </List.Item>
        <List.Item>
          <Text>
            This <MainPageLink/> created.
          </Text>
        </List.Item>
      </List>
    </>)
}
