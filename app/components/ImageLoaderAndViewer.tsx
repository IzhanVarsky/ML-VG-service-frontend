import SVGViewer from "~/components/SVGViewer";
import { Button, Center, Grid, Group, Stack, Text } from "@mantine/core";
import { Atom, Download, LayoutBoardSplit, Shadow } from "tabler-icons-react";
import { Dropzone } from "@mantine/dropzone";
import { useState } from "react";
import { downloadTextFile } from "~/download_utils";

export default function ImageLoaderAndViewer({
                                               image,
                                               setImage,
                                               imageType,
                                               updateForm,
                                               showError = false,
                                               setShowError = (e: boolean) => null,
                                               callbackRunApp = undefined
                                             }) {
  const [isLoading, setIsLoading] = useState(false);
  const [filename, setFilename] = useState("");

  return (
    <Stack>
      <Text size='lg' align="center" weight={700}>{imageType} Image</Text>
      <SVGViewer svg={image} boxHeight={'45vh'}/>
      {callbackRunApp === undefined ?
        <Dropzone
          loading={isLoading}
          accept={['image/svg+xml']}
          onDrop={async (files) => {
            setIsLoading(true);
            const x = await files[0].text();
            setFilename(files[0].name);
            setImage(x);
            updateForm(files[0]);
            setIsLoading(false);
            setShowError(false);
          }}
          style={{
            borderColor: showError ? '#ffa3a3' : '',
            backgroundColor: showError ? '#fff6f5' : '',
            padding: '4px'
          }}
        >
          <Grid align='center' columns={8} style={{ margin: 0 }}>
            <Grid.Col span={1}>
              <LayoutBoardSplit color={showError ? '#ff3b3b' : 'grey'}
                                style={{ display: 'block', margin: 'auto' }}
                                size={35}/>
            </Grid.Col>
            <Grid.Col span={7}>
              {filename !== "" ?
                <Text
                  color='grey'
                  style={{ overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center' }}
                >{filename}</Text>
                :
                <Text color={showError ? '#ff3b3b' : 'grey'}
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: '1.5rem',
                        textAlign: 'center'
                      }}
                      inline>
                  Drag SVG {imageType} image here or click to select file
                </Text>
              }
            </Grid.Col>
          </Grid>
        </Dropzone>
        :
        <>
          <Group position='center' style={{ marginTop: '10px' }}>
            <Center>
              <Button
                leftIcon={<Atom size={20}/>}
                style={{ width: 'fit-content' }}
                onClick={() => callbackRunApp()}>
                Run SVG Style Transfer!
              </Button>
            </Center>
            <Center>
              <Button
                leftIcon={<Download size={20}/>}
                style={{ width: 'fit-content' }}
                onClick={() => {
                  if (image !== "") downloadTextFile(image)
                }}>
                Download result
              </Button>
            </Center>
          </Group>
        </>
      }
    </Stack>
  )
}