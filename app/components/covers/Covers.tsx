import { useOutletContext } from '@remix-run/react';
import Carousel from './Carousel';
import Viewer from './Viewer';
import { Center, Text } from '@mantine/core';
import Shape from '../Shape';

export default function Covers() {
  const [selectedCover, setSelectedCover, covers, setCovers] = useOutletContext();

  return (
    <>
      {covers.length > 0 ?
        <>
          <Carousel/>
          <Viewer/>
        </>
        :
        <Shape>
          <Center>
            <Text size={'xl'} weight={600} color='darkgray'>You haven't generated any covers yet.</Text>
          </Center>
          <Center>
            <Text size={'xl'} weight={600} color='darkgray'>Set input parameters on the left and run generation.</Text>
          </Center>
        </Shape>
      }
    </>
  )
}