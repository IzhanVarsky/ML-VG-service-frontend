import { Button, Grid, Image, Stack, Tabs, AspectRatio, Container } from '@mantine/core';
import {Link, useOutletContext} from '@remix-run/react';
import Shape from '../Shape';
import {downloadTextFile, downloadBase64File} from "app/download_utils";

export default function Viewer() {
  const [selectedCover, _, covers, _] = useOutletContext();
  const cover = covers[selectedCover];
  const src = cover.src
    ? cover.src
    : 'data:image/png;base64, ' + cover.base64;

  return (
    <Shape>
      <Tabs position="center" grow>
        <Tabs.Tab label="SVG">
          <Stack>
            <Container>
              <div dangerouslySetInnerHTML={{ __html: cover.svg }} />
            </Container>
            <Grid justify='space-around'>
              <Button onClick={() => downloadTextFile(cover.svg, "image.svg")}>Download</Button>
              <Link to="/edit">
                <Button>Edit</Button>
              </Link>
            </Grid>
          </Stack>
        </Tabs.Tab>
        <Tabs.Tab label="PNG">
          <Stack>
            <AspectRatio ratio={1} sx={{ maxHeight: '45vh' }}>
              <Image
                height='45vh'
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