import { Grid, Image, AspectRatio } from '@mantine/core';
import Shape from '../Shape';
import {useOutletContext} from "@remix-run/react";


export default function Carousel() {
  const [selectedCover, setSelectedCover, covers, _] = useOutletContext();
  return (
    <Shape size={50}>
      {/* //   <Pagination total={covers.length} size="xl"
    //     itemComponent={(item, a, b, c) => {
    //       if (Number.isInteger(item.page)) {
    //         const index = item.page - 1
    //         const cover = covers[index];
    //         const src = cover.src
    //           ? cover.src
    //           : 'data:image/png;base64, ' + cover.base64;

    //         return (
    //           <Image
    //             onClick={setSelectedCover(index)}
    //             style={{ border: index == selectedCover ? "5px solid #228be6" : "0"}}
    //             height='16vh'
    //             src={src}
    //           />
    //         )
    //       }
    //       console.log(item, a, b, c);
    //       return (<Button onClick={item.onClick}>{item.page}</Button>);
    //     }
    //     }
    // /> */}
      <Grid justify="space-around"
            // columns={covers.length}
      >
        {covers.map((cover, index) => {
          const src = cover.src
            ? cover.src
            : 'data:image/png;base64, ' + cover.base64;
          return (
            <Grid.Col span={1}
                      key={index}
            >
              <AspectRatio ratio={1} sx={{ maxWidth: '16vh' }}>
                <Image
                  key={index}
                  // height='16vh'
                  src={src}
                  onClick={() => setSelectedCover(index)}
                  style={{ outline: index == selectedCover ? "5px solid #228be6" : "0" }}
                />
              </AspectRatio>
            </Grid.Col>
          )
        })}
      </Grid>
    </Shape >
  )
}