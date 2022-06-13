import { useOutletContext } from '@remix-run/react';
import Carousel from './Carousel';
import Viewer from './Viewer';


export default function Covers() {
  const [selectedCover, setSelectedCover, covers, setCovers] = useOutletContext();

  return (
    covers.length > 0 &&
    <>
      <Carousel />
      <Viewer />
    </>
  )
}