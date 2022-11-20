import { Button, Center, Grid, Group, Stack, Text } from "@mantine/core";
import Shape from "~/components/Shape";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { downloadTextFile, runVectorStyleTransfer } from "~/download_utils";
import SVGViewer from "~/components/SVGViewer";
import { Atom, Download } from "tabler-icons-react";
import InputParameters from "~/components/vector_style_transfer/InputParameters";
import BITMAPImageLoaderAndViewer from "~/components/vector_style_transfer/BITMAPImageLoaderAndViewer";

export default function MainVectorStyleTransfer() {
  const [style, setStyle] = useState("");
  const [styleMimeType, setStyleMimeType] = useState("");
  const [contentSVG, setContentSVG] = useState("");

  const [styleError, setStyleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [resultImage, setResultImage] = useState("");
  const [appRunning, setAppRunning] = useState(false);
  const [appError, setAppError] = useState(false);

  const [iterationsNumber, setIterationsNumber] = useState(100);
  const [learningRateIsDefault, setLearningRateIsDefault] = useState(true);
  const [lrPoint, setLrPoint] = useState(0.8);
  const [lrColor, setLrColor] = useState(0.01);
  const [lrStroke, setLrStroke] = useState(0.1);
  const [contourLoss, setContourLoss] = useState(100);
  const [perceptionLoss, setPerceptionLoss] = useState(1);
  const [ABMethod, setABMethod] = useState('method1');
  const [ABCoef, setABCoef] = useState(1);

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
                      iterationsNumber, learningRateIsDefault,
                      lrPoint, lrColor, lrStroke,
                      contourLoss, perceptionLoss,
                      ABMethod, ABCoef,
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

      <InputParameters
        iterationsNumber={iterationsNumber} setIterationsNumber={setIterationsNumber}
        learningRateIsDefault={learningRateIsDefault} setLearningRateIsDefault={setLearningRateIsDefault}
        lrPoint={lrPoint} setLrPoint={setLrPoint}
        lrColor={lrColor} setLrColor={setLrColor}
        lrStroke={lrStroke} setLrStroke={setLrStroke}
        contourLoss={contourLoss} setContourLoss={setContourLoss}
        perceptionLoss={perceptionLoss} setPerceptionLoss={setPerceptionLoss}
        ABMethod={ABMethod} setABMethod={setABMethod}
        ABCoef={ABCoef} setABCoef={setABCoef}/>
    </>
  )
}
