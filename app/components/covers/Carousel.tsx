import { Grid, Image, AspectRatio } from '@mantine/core';
import Shape from '../Shape';
import { useOutletContext } from "@remix-run/react";


export default function Carousel() {
  const [selectedCover, setSelectedCover, covers, setCovers] = useOutletContext();
  return (
    <Shape size={50}>
      <Grid justify="space-around">
        {covers.map((cover, index) => {
          const src = cover.src
            ? cover.src
            : 'data:image/png;base64, ' + cover.base64;
          return (
            <Grid.Col span={1} key={index}>
              <AspectRatio ratio={1} sx={{ maxWidth: '16vh' }}>
                <Image
                  key={index}
                  src={src}
                  onClick={() => { setSelectedCover(index) }}
                  style={{
                    outline: index == selectedCover ? "5px solid #228be6" : "0",
                    cursor: 'pointer'
                  }}
                />
              </AspectRatio>
            </Grid.Col>
          )
        })}
      </Grid>
    </Shape >
  )
}