import { Button, Container, Grid, Image, Stack, Tabs } from '@mantine/core';
import { Link, useOutletContext } from '@remix-run/react';
import Shape from '../Shape';
import { downloadBase64File, downloadTextFile } from "app/download_utils";
import SVG from '../SVG';
import { useState } from "react";

export default function Viewer() {
  const [selectedCover, setSelectedCover, covers, setCovers] = useOutletContext();
  const cover = covers[selectedCover];
  const src = cover.src
    ? cover.src
    : 'data:image/png;base64, ' + cover.base64;
  const [activeTab, setActiveTab] = useState("svg");

  return (
    <Shape>
      <Tabs value={activeTab} onTabChange={(s: string) => setActiveTab(s)}>
        <Tabs.List grow>
          <Tabs.Tab value="svg"
                    style={{ color: activeTab == 'svg' ? '#228be6' : '' }}>
            SVG
          </Tabs.Tab>
          <Tabs.Tab value="png"
                    style={{ color: activeTab == 'png' ? '#228be6' : '' }}>
            PNG
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="svg" pt="xs">
          <Stack>
            <SVG svg={cover.svg} w={"50vh"} h={"50vh"}/>
            <Grid justify='space-around'>
              <Button
                onClick={() => downloadTextFile(cover.svg, "image.svg")}
              >Download</Button>
              <Link to="/edit">
                <Button>Edit</Button>
              </Link>
            </Grid>
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel value="png" pt="xs">
          <Stack>
            <Container sx={{ maxHeight: '50vh' }}>
              <Image
                height='50vh'
                src={src}
              />
            </Container>
            <Grid justify='center'>
              <Button
                onClick={() => downloadBase64File("image/png", cover.base64, "image.png")}
              >
                Download
              </Button>
            </Grid>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Shape>
  )
}