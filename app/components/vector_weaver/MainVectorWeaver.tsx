import Shape from "~/components/Shape";
import { Button, Center, Container, Group, Menu, NumberInput, Text } from "@mantine/core";
import { Palette } from "tabler-icons-react";
import { useState } from "react";
import { IconMessageCircle, IconPhoto, IconSettings, } from '@tabler/icons-react';
import { config } from "~/config.js";
import { downloadPNGFromServer, downloadTextFile } from "~/download_utils";
import { svgWithSize } from "~/utils";
import { addSVGToStorageAndOpenNewEditor } from "~/components/editor/Editor"

function runImageGeneration(numOfImages, succ_callback, err_callback) {
  console.log("numOfImages", numOfImages);
  $.ajax({
    url: `${config.vector_weaver_backend_path}/vector_weaver`,
    type: 'post',
    data: JSON.stringify({ 'n_count': numOfImages }),
    contentType: 'application/json',
    dataType: 'json',
    cache: false,
    success: function (res) {
      console.log("Successfully!");
      console.log(res);
      succ_callback(res.res_svg);
    },
    error: function (msg) {
      console.log("Error!");
      console.log(msg);
      err_callback(msg);
    }
  });
}

export default function MainVectorWeaver() {
  const imageDim = "200px";
  const [numOfImages, setNumOfImages] = useState(5);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedSVGImages, setGeneratedSVGImages] = useState(
    // ["1", "2", "3", "4", "5"]
    []
  );

  return (
    <>
      <Shape>
        <Group
          style={{ justifyContent: 'space-evenly' }}
          align="flex-start"
        >
          {generatedSVGImages.map(function (d, idx) {
            return (
              <Container key={idx}>
                <Menu
                  arrowSize={20}
                  shadow="lg"
                  // width={100}
                  withArrow
                  offset={0}
                  position="left"
                  onChange={opened =>
                    opened ? setSelectedIdx(idx) : setSelectedIdx(-1)}
                >
                  <Menu.Target>
                    <Center
                      style={{
                        height: imageDim,
                        width: imageDim,
                        padding: '1vh 1vw',
                        border: '1px solid lightgray',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        outline: selectedIdx == idx ? "solid lightgray 3px" : ""
                      }}
                    >
                      <img style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'contain',
                      }}
                           src={"data:image/svg+xml;base64, " +
                             window.btoa(unescape(encodeURIComponent(d)))}
                           alt={"UploadedImage"}/>
                    </Center>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      icon={<IconSettings size={14}/>}
                      onClick={() =>
                        downloadTextFile(d,
                          `vector_weather_${idx}.svg`)}
                    >
                      Download SVG
                    </Menu.Item>
                    <Menu.Item icon={<IconMessageCircle size={14}/>}
                               onClick={() =>
                                 downloadPNGFromServer(svgWithSize(d, 256, 256))}
                    >
                      Download PNG
                    </Menu.Item>
                    <Menu.Item
                      icon={<IconPhoto size={14}/>}
                      onClick={() => addSVGToStorageAndOpenNewEditor(d)}
                    >
                      Edit
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Container>
            )
          })}
        </Group>
        {
          generatedSVGImages.length > 0 ?
            <></>
            :
            <>
              <Center>
                <Text size={'xl'} weight={600} color='darkgray'>You haven't generated any images yet.</Text>
                {/*<Text size={'xl'} weight={'bolder'}>Welcome! Generate some covers!</Text>*/}
              </Center>
              <Center>
                <Text size={'xl'} weight={600} color='darkgray'>Specify number of images and run
                  generation.</Text>
              </Center>
            </>
        }
        <Group
          align="flex-end"
          position="center"
          style={{
            // marginTop: generatedSVGImages.length > 0 ? '2rem' : 0,
            marginTop: '2rem',
          }}
        >
          <NumberInput
            styles={{ input: { width: '9rem', } }}
            value={numOfImages}
            onChange={(val) => setNumOfImages(val)}
            placeholder="Number of images"
            label="Number of images"
            min={1}
            max={20}
            withAsterisk
            stepHoldDelay={500}
            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
          />
          <Button
            leftIcon={<Palette size={14}/>}
            variant="gradient"
            type='submit'
            gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
            onClick={() => {
              setIsLoading(true);
              runImageGeneration(
                numOfImages,
                (res) => {
                  setGeneratedSVGImages([
                    ...generatedSVGImages,
                    ...res
                  ]);
                  setIsLoading(false);
                },
                () => {
                  setIsLoading(false);
                },
              )
            }}
            loading={isLoading}
          >
            Generate images
          </Button>
        </Group>
      </Shape>
    </>
  )
}
