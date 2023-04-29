import { Divider, Text } from "@mantine/core";
import Update0Info from "~/components/index/Update0Info";
import Update1Info from "~/components/index/Update1Info";
import Update2Info from "~/components/index/Update2Info";
import Shape from "~/components/Shape";

export default function Changelog() {
  return (
    <>
      <Shape>
        <Text size={'xl'} style={{ paddingBottom: '1rem' }} underline>Site changelog:</Text>
        <Update2Info/>
        <Divider my="sm"/>
        <Update1Info/>
        <Divider my="sm"/>
        <Update0Info/>
      </Shape>
    </>)
}
