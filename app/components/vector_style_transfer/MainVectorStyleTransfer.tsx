import {
  Button,
  Center,
  Checkbox,
  Grid,
  Group,
  HoverCard,
  NumberInput,
  SegmentedControl,
  Stack,
  Text
} from "@mantine/core";
import Shape from "~/components/Shape";
import ImageLoaderAndViewer from "~/components/vector_style_transfer/ImageLoaderAndViewer";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { downloadTextFile, runVectorStyleTransfer } from "~/download_utils";
import SVGViewer from "~/components/SVGViewer";
import { Atom, Download, InfoCircle } from "tabler-icons-react";
import InputParameters from "~/components/vector_style_transfer/InputParameters";

export default function MainVectorStyleTransfer() {
  const [styleImage, setStyleImage] = useState("");
  const [styleError, setStyleError] = useState(false);
  const [contentImage, setContentImage] = useState("");
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

  const form = useForm({
    initialValues: {
      styleSVG: "",
      contentSVG: ""
    },
  });

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
            <ImageLoaderAndViewer image={contentImage}
                                  setImage={setContentImage}
                                  imageType={"Content"}
                                  updateForm={(x) => form.setFieldValue("contentSVG", x)}
                                  showError={contentError}
                                  setShowError={setContentError}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <ImageLoaderAndViewer image={styleImage}
                                  setImage={setStyleImage}
                                  imageType={"Style"}
                                  updateForm={(x) => form.setFieldValue("styleSVG", x)}
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
                  <SVGViewer svg={resultImage} boxHeight={'45vh'}/>
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
                    if (styleImage === "") {
                      setStyleError(true);
                      checks_passed = false;
                    }
                    if (contentImage === "") {
                      setContentError(true);
                      checks_passed = false;
                    }
                    if (!checks_passed) return;
                    setAppRunning(true);
                    setAppError(false);
                    runVectorStyleTransfer(styleImage, contentImage,
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
