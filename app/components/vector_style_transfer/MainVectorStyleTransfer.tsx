import { Button, Center, Grid, Group, Stack, Text } from "@mantine/core";
import Shape from "~/components/Shape";
import { useState } from "react";
import { downloadTextFile, runVectorStyleTransfer } from "~/download_utils";
import { Atom, Download } from "tabler-icons-react";
import InputParameters from "~/components/vector_style_transfer/InputParameters";
import BITMAPImageLoaderAndViewer from "~/components/vector_style_transfer/BITMAPImageLoaderAndViewer";

let default_params = {
  iterationsNumber: 100,
  learningRateIsDefault: true,
  lrPoint: 0.8,
  lrColor: 0.01,
  lrStroke: 0.1,
  contourLoss: 100,
  perceptionLoss: 1,
  styleLoss: 0,
  contentLoss: 0,
  xingLoss: 0,
  optimizeOpacity: true,
  initType: 'with_content',
  with_content: {
    num_paths: -1,
    min_num_segments: -1,
    max_num_segments: -1,
    radius: -1,
    stroke_width: -1,
  },
  with_rand_clipdraw: {
    num_paths: 256,
    min_num_segments: 1,
    max_num_segments: 4,
    radius: 0.1,
    stroke_width: 1.0,
  },
  with_rand_LIVE: {
    num_paths: 128,
    min_num_segments: 1,
    max_num_segments: 4,
    radius: 5,
    stroke_width: 0.0,
  },
  with_circles_LIVE: {
    num_paths: 128,
    min_num_segments: 4,
    max_num_segments: 4,
    radius: 5,
    stroke_width: 1.0,
  },
  maxStrokeWidth: 1.0,
  ABMethod: 'method1',
  ABCoef: 1,
}

export default function MainVectorStyleTransfer() {
  const [style, setStyle] = useState("");
  const [styleMimeType, setStyleMimeType] = useState("");
  const [contentSVG, setContentSVG] = useState("");

  const [styleError, setStyleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [resultImage, setResultImage] = useState("");
  const [appRunning, setAppRunning] = useState(false);
  const [appError, setAppError] = useState(false);

  const [modelParams, setModelParams] = useState(default_params);

  return (
    <>
      <Text size='xl'
            weight={800}
            variant="gradient"
            gradient={{ from: 'indigo', to: 'red', deg: 1 }}
            style={{ marginLeft: '30px', fontFamily: 'Greycliff CF, sans-serif', userSelect: 'none' }}
      >- - - Vector style transfer app - - -</Text>
      <Shape>
        <Grid justify='space-around' align="flex-start" columns={3}>
          <Grid.Col span={1}>
            <BITMAPImageLoaderAndViewer imageType={"Content"}
                                        updateForm={(x) => setContentSVG(x)}
                                        showError={contentError}
                                        setShowError={setContentError}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <BITMAPImageLoaderAndViewer imageType={"Style"}
                                        updateForm={(x, y) => {
                                          setStyle(x);
                                          setStyleMimeType(y);
                                        }}
                                        showError={styleError}
                                        setShowError={setStyleError}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <Stack>
              <Text size='lg' align="center" weight={700}>Result Image</Text>
              {
                appError ?
                  <>
                    <Center>
                      <Text>Error occurred while running :(</Text>
                    </Center>
                    <Center>
                      <Text>Maybe your images are not supported</Text>
                    </Center>
                  </>
                  :
                  <Center style={{
                    height: '45vh',
                    padding: '1vh 1vw',
                    // marginBottom: '57px',
                    border: '1px solid lightgray',
                    borderRadius: '5px'
                  }}>
                    {resultImage === "" ?
                      <></>
                      :
                      <img style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'contain',
                      }}
                           src={"data:image/svg+xml;base64, " +
                             window.btoa(unescape(encodeURIComponent(resultImage)))}
                           alt={"UploadedImage"}/>
                    }
                  </Center>
              }
              <Group position='center' style={{ marginTop: '10px' }} spacing='md'>
                <Button
                  leftIcon={<Atom size={20}/>}
                  style={{
                    width: 'fit-content',
                    backgroundColor: appError ? 'red' : '#228be6'
                  }}
                  loading={appRunning}
                  onClick={() => {
                    let checks_passed = true;
                    if (style === "") {
                      setStyleError(true);
                      checks_passed = false;
                    }
                    if (contentSVG === "") {
                      setContentError(true);
                      checks_passed = false;
                    }
                    if (!checks_passed) return;
                    setAppRunning(true);
                    setAppError(false);
                    runVectorStyleTransfer(
                      contentSVG, style, styleMimeType,
                      modelParams,
                      // iterationsNumber, learningRateIsDefault,
                      // lrPoint, lrColor, lrStroke,
                      // contourLoss, perceptionLoss,
                      // styleLoss, contentLoss,
                      // xingLoss,
                      // optimizeOpacity,
                      // initType,
                      // maxStrokeWidth,
                      // ABMethod, ABCoef,
                      (res_svg) => {
                        setResultImage(res_svg);
                        setAppRunning(false);
                      },
                      (error) => {
                        setAppRunning(false);
                        setAppError(true);
                      },
                      false
                    );
                  }}>
                  Run SVG Style Transfer!
                </Button>
                {
                  resultImage !== "" ?
                    <Button
                      leftIcon={<Download size={20}/>}
                      style={{ width: 'fit-content' }}
                      onClick={() => downloadTextFile(resultImage, 'vector_style_transfer_result.svg')}>
                      Download result
                    </Button>
                    :
                    <></>
                }
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
      </Shape>

      <InputParameters modelParams={modelParams} setModelParams={setModelParams}/>
    </>
  )
}
