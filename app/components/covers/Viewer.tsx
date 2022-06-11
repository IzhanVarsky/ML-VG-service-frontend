import { Button, Grid, Image, Stack, Tabs, AspectRatio, Container } from '@mantine/core';
import { Link } from '@remix-run/react';
import Shape from '../Shape';


export default function Viewer({ covers, selectedCover }) {
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
              <Button>Download</Button>
              <Link
                to="/main/edit"
              >
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
            <Button>Download</Button>
          </Stack>
        </Tabs.Tab>
      </Tabs>
    </Shape >
  )
}