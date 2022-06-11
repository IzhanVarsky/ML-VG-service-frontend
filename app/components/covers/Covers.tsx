import Carousel from './Carousel';
import Viewer from './Viewer';


export default function Covers({ covers, selectedCover, setSelectedCover }) {
  return (
    <>
      <Carousel
        covers={covers}
        selectedCover={selectedCover}
        setSelectedCover={setSelectedCover} />
      <Viewer
        covers={covers}
        selectedCover={selectedCover} />
    </>
  )
}