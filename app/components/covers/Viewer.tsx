import { Button, Grid, Image, Stack, Title } from '@mantine/core';
import { Link } from '@remix-run/react';
import Shape from '../Shape';


export default function Viewer() {
  return (
    <Shape>
      <Grid justify='space-around'>
        <Stack>
          <Title align='center'>
            PNG version
          </Title>
          <Image
            height='45vh'
            src="https://www.nashe.ru/storage/27409/conversions/Megadeth-Peace-Sells-But-Whos-Buying-album-cover-web-optimised-820-large.jpg"
          />
          <Button>Download</Button>
        </Stack>
        <Stack>
          <Title align='center'>
            SVG version
          </Title>
          <Image
            height='45vh'
            src="https://www.nashe.ru/storage/27409/conversions/Megadeth-Peace-Sells-But-Whos-Buying-album-cover-web-optimised-820-large.jpg"
          />
          <Grid justify='space-around'>
            <Button>Download</Button>
            <Link
              to="/edit"
            >
              <Button>Edit</Button>
            </Link>
          </Grid>
        </Stack>
      </Grid>
    </Shape >
  )
}