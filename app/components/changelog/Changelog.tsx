import { Divider, Center } from "@mantine/core";
import Update0Info from "~/components/changelog/Update0Info";
import Update1Info from "~/components/changelog/Update1Info";
import Update2Info from "~/components/changelog/Update2Info";
import Update3Info from "~/components/changelog/Update3Info";
import Shape from "~/components/Shape";

export default function Changelog() {
  return (
    <>
      <Center>
        <Shape style={{ width: '60%' }}>
          <Update3Info/>
          <Divider my="sm"/>
          <Update2Info/>
          <Divider my="sm"/>
          <Update1Info/>
          <Divider my="sm"/>
          <Update0Info/>
        </Shape>
      </Center>
    </>)
}
