import { Grid, Image } from '@mantine/core';
import Shape from '../Shape';


export default function Carousel() {
  return (
    <Shape>
      <Grid justify="space-around">
        <Image
          height='16vh'
          src="https://www.nashe.ru/storage/27409/conversions/Megadeth-Peace-Sells-But-Whos-Buying-album-cover-web-optimised-820-large.jpg"
        />
        <Image
          height='16vh'
          src="https://www.nashe.ru/storage/27409/conversions/Megadeth-Peace-Sells-But-Whos-Buying-album-cover-web-optimised-820-large.jpg"
        />
        <Image
          height='16vh'
          src="https://www.nashe.ru/storage/27409/conversions/Megadeth-Peace-Sells-But-Whos-Buying-album-cover-web-optimised-820-large.jpg"
        />
        <Image
          height='16vh'
          src="https://www.nashe.ru/storage/27409/conversions/Megadeth-Peace-Sells-But-Whos-Buying-album-cover-web-optimised-820-large.jpg"
        />
        <Image
          height='16vh'
          src="https://www.nashe.ru/storage/27409/conversions/Megadeth-Peace-Sells-But-Whos-Buying-album-cover-web-optimised-820-large.jpg"
        />
      </Grid>
    </Shape>
  )
}