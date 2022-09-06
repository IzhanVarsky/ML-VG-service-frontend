import { Button, Grid, Image, Stack, Tabs, AspectRatio, Container } from '@mantine/core';
import { Link, useOutletContext } from '@remix-run/react';
import Shape from '../Shape';
import { downloadTextFile, downloadBase64File } from "app/download_utils";
import SVG from '../SVG';

export default function Viewer() {
  const [selectedCover, setSelectedCover, covers, setCovers] = useOutletContext();
  const cover = covers[selectedCover];
  const src = cover.src
    ? cover.src
    : 'data:image/png;base64, ' + cover.base64;

  return (
    <Shape>
      <Tabs defaultValue="svg">
        <Tabs.List grow>
          <Tabs.Tab value="svg">SVG</Tabs.Tab>
          <Tabs.Tab value="png">PNG</Tabs.Tab>
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