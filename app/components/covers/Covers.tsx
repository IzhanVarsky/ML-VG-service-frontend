import { useOutletContext } from '@remix-run/react';
import Carousel from './Carousel';
import Viewer from './Viewer';
import { Center, Text } from '@mantine/core';
import Shape from '../Shape';
import { useTranslation } from "react-i18next"; // добавил импорт

export default function Covers() {
  const [selectedCover, setSelectedCover, covers, setCovers] = useOutletContext();
  const { t } = useTranslation(); // добавил хук

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
            <Text size={'xl'} weight={600} color='darkgray'>
              {t("no-covers")}
            </Text>
          </Center>
          <Center>
            <Text size={'xl'} weight={600} color='darkgray'>
              {t("set-params")}
            </Text>
          </Center>
        </Shape>
      }
    </>
  )
}
