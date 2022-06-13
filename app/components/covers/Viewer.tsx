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
      <Tabs position="center" grow>
        <Tabs.Tab label="SVG">
          <Stack>
            {/*{cover.svg}*/}
            <SVG svg={cover.svg} />
            <Grid justify='space-around'>
              <Button
                onClick={() => downloadTextFile(cover.svg, "image.svg")}
                style={{ width: "45%" }}>
                Download
              </Button>
              <Link to="/edit" style={{ width: '45%' }}>
                <Button style={{ width: "100%" }}>Edit</Button>
              </Link>
            </Grid>
          </Stack>
        </Tabs.Tab>
        <Tabs.Tab label="PNG">
          <Stack>
            <AspectRatio ratio={1} sx={{ maxHeight: '50vh' }}>
              <Image
                height='50vh'
                src={src}
              />
            </AspectRatio>
            <Button onClick={() => downloadBase64File("image/png", cover.base64, "image.png")}>Download</Button>
          </Stack>
        </Tabs.Tab>
      </Tabs>
    </Shape >
  )
}