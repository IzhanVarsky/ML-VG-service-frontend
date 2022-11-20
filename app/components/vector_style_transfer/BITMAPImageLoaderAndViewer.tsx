import { Center, Grid, Stack, Text } from "@mantine/core";
import { LayoutBoardSplit } from "tabler-icons-react";
import { Dropzone } from "@mantine/dropzone";
import { useState } from "react";

export default function BITMAPImageLoaderAndViewer({
                                                     imageType,
                                                     updateForm,
                                                     showError = false,
                                                     setShowError = (e: boolean) => null,
                                                     callbackRunApp = undefined
                                                   }) {
  const [isLoading, setIsLoading] = useState(false);
  const [filename, setFilename] = useState("");
  const [image, setImage] = useState("");

  return (
    <Stack>
      <Text size='lg' align="center" weight={700}>{imageType} Image</Text>
      <Center style={{
        height: '45vh',
        padding: '1vh 1vw',
        // marginBottom: '57px',
        border: '1px solid lightgray',
        borderRadius: '5px'
      }}>
        {image == "" ?
          <></>
          :
          <img style={{
            height: '100%',
            width: '100%',
            objectFit: 'contain',
          }}
               src={image}
               alt={"UploadedImage"}/>
        }
      </Center>
      <Dropzone
        loading={isLoading}
        accept={[imageType === "Content" ? "image/svg+xml" : "image/*"]}
        onDrop={async (files) => {
          setIsLoading(true);
          const uploadedFile = files[0];
          if (uploadedFile.type === "image/svg+xml") {
            const x = await uploadedFile.text();
            updateForm(x, uploadedFile.type);
          }

          // TODO: maybe: ADD resizing (for SVG) to show small picture well
          let reader = new FileReader();
          reader.onload = (e) => {
            let result = e.target.result;
            setImage(result);
            if (imageType === "Style" && uploadedFile.type !== "image/svg+xml") {
              updateForm(result, uploadedFile.type);
            }
            setIsLoading(false);
          };
          reader.readAsDataURL(uploadedFile);

          setFilename(uploadedFile.name);
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
    </Stack>
  )
}