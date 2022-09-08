import { Button, Center, Group, Text, } from '@mantine/core';
import { ArrowBackUp, ArrowForwardUp, LayoutBoardSplit, Trash, } from 'tabler-icons-react';
import { Dropzone } from '@mantine/dropzone';
import { updCoverNotPrettified } from '~/svg_checkers_transformers';
import { useState } from "react";

export default function SVGViewerControlButtons({ state, setState, pointer, undo, redo }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Center>
        <Button m='md'
                color={state.svg == "" ? 'gray' : ''}
                onClick={() => setState({ svg: '', colors: [] })}
                leftIcon={<Trash/>}
        >
          Delete
        </Button>
        <Button m='md'
                color={pointer == 0 ? 'gray' : ''}
                onClick={undo}
                leftIcon={<ArrowBackUp/>}
        >
          Undo
        </Button>
        <Button m='md'
                color={pointer + 1 == history.length ? 'gray' : ''}
                onClick={redo}
                leftIcon={<ArrowForwardUp/>}
        >
          Redo
        </Button>
      </Center>
      <Dropzone
        accept={['image/svg+xml']}
        onDrop={async (files) => {
          setIsLoading(true);
          const x = await files[0].text();
          setState(updCoverNotPrettified(state, x));
          setIsLoading(false);
        }}
        multiple={false}
        loading={isLoading}
      >
        <Group position="center" spacing="xl" style={{ pointerEvents: 'none' }}>
          <LayoutBoardSplit color='grey' size={60}/>
          <div>
            <Text color='grey' size="xl" inline>
              Drag SVG image here or click to select file
            </Text>
            <Text color='dimmed' size="sm" inline mt={7}>
              You can edit it after uploading!
            </Text>
          </div>
        </Group>
      </Dropzone>
    </>
  )
}