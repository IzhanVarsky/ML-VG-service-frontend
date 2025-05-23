import { Button, Center, Group, Text, } from '@mantine/core';
import { ArrowBackUp, ArrowForwardUp, LayoutBoardSplit, Trash, } from 'tabler-icons-react';
import { Dropzone } from '@mantine/dropzone';
import { getSVGAndColorsState } from '~/svg_checkers_transformers';
import { useState } from "react";
import { useTranslation } from "react-i18next"; // добавил импорт

export default function SVGViewerControlButtons({
                                                  svg, setState, pointer, undo, redo, history,
                                                  isColorFindingEnabled
                                                }) {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation(); // добавил хук

  return (
    <>
      <Center>
        <Button m='md'
                color={svg == "" ? 'gray' : ''}
                onClick={() => setState({ svg: '', colors: [] })}
                leftIcon={<Trash/>}
        >
          {t("delete")}
        </Button>
        <Button m='md'
                color={pointer == 0 ? 'gray' : ''}
                onClick={undo}
                leftIcon={<ArrowBackUp/>}
        >
          {t("undo")}
        </Button>
        <Button m='md'
                color={pointer + 1 == history.length ? 'gray' : ''}
                onClick={redo}
                leftIcon={<ArrowForwardUp/>}
        >
          {t("redo")}
        </Button>
      </Center>
      <Dropzone
        accept={['image/svg+xml']}
        onDrop={async (files) => {
          setIsLoading(true);
          const x = await files[0].text();
          setState(getSVGAndColorsState(x, isColorFindingEnabled));
          setIsLoading(false);
        }}
        multiple={false}
        loading={isLoading}
      >
        <Group position="center" spacing="xl" style={{ pointerEvents: 'none' }}>
          <LayoutBoardSplit color='grey' size={60}/>
          <div>
            <Text color='grey' size="xl" inline>
              {t("drag-svg-here")}
            </Text>
            <Text color='dimmed' size="sm" inline mt={7}>
              {t("edit-after-upload")}
            </Text>
          </div>
        </Group>
      </Dropzone>
    </>
  )
}
