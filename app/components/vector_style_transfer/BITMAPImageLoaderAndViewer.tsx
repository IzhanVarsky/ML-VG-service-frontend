import SVGViewer from "~/components/SVGViewer";
import { Button, Center, Grid, Group, Stack, Text } from "@mantine/core";
import { Atom, Download, LayoutBoardSplit, Shadow } from "tabler-icons-react";
import { Dropzone } from "@mantine/dropzone";
import { useState } from "react";
import { downloadPNGFromServer, downloadTextFile } from "~/download_utils";
import { svgWithSize } from "~/utils";

export default function BITMAPImageLoaderAndViewer({
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
      <Center style={{
        height: '45vh',
        padding: '25px 0',
        marginBottom: '57px',
        border: '1px solid lightgray',
        borderRadius: '5px'
      }}>
        {image == "" ?
          <></>
          :
          <img style={{
            maxHeight: '45vh',
            maxWidth: '100%',
            objectFit: 'contain',
          }}
               src={"data:image/png;base64, " + image}
               alt={"Uploaded Style-Image"}/>
        }
      </Center>
      <Dropzone
        loading={isLoading}
        accept={['image/svg+xml']}
        onDrop={async (files) => {
          setIsLoading(true);
          const x = await files[0].text();
          downloadPNGFromServer(svgWithSize(x),
            (res) => {
              //TODO: ADD resizing to show small picture well
              // and to not waste time for big images.
              setFilename(files[0].name);
              setImage(res);
              updateForm(files[0]);
              setIsLoading(false);
              setShowError(false);
            },
            (err) => {
              setIsLoading(false);
              setShowError(true);
            })
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
    </Stack>
  )
}