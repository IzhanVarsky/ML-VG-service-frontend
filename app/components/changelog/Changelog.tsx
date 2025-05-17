import { Divider, Center } from "@mantine/core";
import Update0Info from "~/components/changelog/Update0Info";
import Update1Info from "~/components/changelog/Update1Info";
import Update2Info from "~/components/changelog/Update2Info";
import Update3Info from "~/components/changelog/Update3Info";
import Update4Info from "~/components/changelog/Update4Info";
import Update5Info from "~/components/changelog/Update5Info";
import Update6Info from "~/components/changelog/Update6Info";
import Update7Info from "~/components/changelog/Update7Info";
import Shape from "~/components/Shape";
import Update8Info from "~/components/changelog/Update8Info";

export default function Changelog() {
  return (
    <>
      <Center>
        <Shape style={{ width: '60%' }}>
          <Update8Info/>
          <Divider my="sm"/>
          <Update7Info/>
          <Divider my="sm"/>
          <Update6Info/>
          <Divider my="sm"/>
          <Update5Info/>
          <Divider my="sm"/>
          <Update4Info/>
          <Divider my="sm"/>
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
