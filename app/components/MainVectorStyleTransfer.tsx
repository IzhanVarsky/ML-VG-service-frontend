import {
  ActionIcon,
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
import ImageLoaderAndViewer from "~/components/ImageLoaderAndViewer";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { downloadTextFile, runVectorStyleTransfer } from "~/download_utils";
import SVGViewer from "~/components/SVGViewer";
import { Atom, Download, InfoCircle } from "tabler-icons-react";

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

      <Shape>
        <Text size='xl'
              weight={800}
              style={{
                marginLeft: '3rem',
                fontFamily: 'Greycliff CF, sans-serif'
              }}
        >Input parameters</Text>
        <Group position="center" spacing={0}>
          <Shape style={{ width: 'fit-content' }}>
            <Text size='lg' weight={600} style={{ margin: 0, marginBottom: '1rem' }}>
              Number of iterations
            </Text>
            <Center>
              <NumberInput
                value={iterationsNumber}
                onChange={(val) => setIterationsNumber(val)}
                min={0}
                max={200}
                style={{ width: '5rem' }}
                stepHoldDelay={500}
                stepHoldInterval={100}
              />
            </Center>
          </Shape>
          <Shape style={{ width: 'fit-content' }}>
            <Grid
              grow
              justify='space-between'
              style={{
                margin: 0,
                marginBottom: learningRateIsDefault ? '' : '1rem',
              }}
              align='center'>
              <Grid.Col style={{ padding: '0 8px' }} span={2}>
                <Group
                  spacing={'0.3rem'}
                  style={{ width: 'max-content' }}
                >
                  <Text size='lg' weight={600}>
                    Learning Rates
                  </Text>
                  <HoverCard width={280} shadow="md">
                    <HoverCard.Target>
                      <Center>
                        <InfoCircle size='1.8rem' color='gray'></InfoCircle>
                      </Center>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                      <Text size="md">
                        <span>Default PointLR depends on count of shapes in SVG:</span>
                        <br/>
                        <span>{'if len(shapes) < 300:'}</span>
                        <br/>
                        <span>&emsp;{'point_rate = 0.2'}</span>
                        <br/>
                        <span>{'elif len(shapes) < 1000:'}</span>
                        <br/>
                        <span>&emsp;{'point_rate = 0.3'}</span>
                        <br/>
                        <span>{'elif len(shapes) < 1600:'}</span>
                        <br/>
                        <span>&emsp;{'point_rate = 0.4'}</span>
                        <br/>
                        <span>{'else:'}</span>
                        <br/>
                        <span>&emsp;{'point_rate = 0.8'}</span>
                        <br/>
                        <br/>
                        <span>Other LRs are:</span>
                        <br/>
                        <span>&emsp;{'color_rate = 0.01'}</span>
                        <br/>
                        <span>&emsp;{'width_rate = 0.1'}</span>
                      </Text>
                    </HoverCard.Dropdown>
                  </HoverCard>
                </Group>
              </Grid.Col>
              <Grid.Col style={{ padding: '0 8px' }} span={2}>
                <Checkbox checked={learningRateIsDefault}
                          labelPosition="left"
                          label="Use default LRs"
                          size='md'
                          style={{
                            textAlign: 'right',
                            width: 'max-content'
                          }}
                          onChange={(event) =>
                            setLearningRateIsDefault(event.currentTarget.checked)}/>
              </Grid.Col>
            </Grid>
            {learningRateIsDefault ?
              <></>
              :
              <Group>
                <NumberInput
                  value={lrPoint}
                  onChange={(val) => setLrPoint(val)}
                  precision={4}
                  step={0.05}
                  label="Point LR"
                  style={{ width: '6rem' }}
                  stepHoldDelay={500}
                  stepHoldInterval={100}
                />
                <NumberInput
                  value={lrColor}
                  onChange={(val) => setLrColor(val)}
                  precision={4}
                  step={0.05}
                  label="Color LR"
                  style={{ width: '6rem' }}
                  stepHoldDelay={500}
                  stepHoldInterval={100}
                />
                <NumberInput
                  value={lrStroke}
                  onChange={(val) => setLrStroke(val)}
                  precision={4}
                  step={0.05}
                  label="Stroke width LR"
                  style={{ width: '7rem' }}
                  stepHoldDelay={500}
                  stepHoldInterval={100}
                />
              </Group>
            }
          </Shape>
          <Shape style={{ width: 'fit-content' }}>
            <Text size='lg' weight={600} style={{ margin: 0, marginBottom: '1rem' }}>
              Losses weights
            </Text>
            <Center>
              <Group>
                <NumberInput
                  value={contourLoss}
                  onChange={(val) => setContourLoss(val)}
                  label="Contour Loss"
                  style={{ width: '6rem' }}
                  stepHoldDelay={500}
                  stepHoldInterval={100}
                />
                <NumberInput
                  value={perceptionLoss}
                  onChange={(val) => setPerceptionLoss(val)}
                  label="Perception Loss"
                  style={{ width: '7rem' }}
                  stepHoldDelay={500}
                  stepHoldInterval={100}
                />
              </Group>
            </Center>
          </Shape>
          <Shape style={{ width: 'fit-content' }}>
            <Grid
              grow
              justify='space-between'
              style={{
                margin: 0,
                marginBottom: ABMethod == 'method1' ? '' : '1rem',
              }}
              align='center'>
              <Grid.Col style={{ padding: '0 8px' }} span={2}>
                <Group
                  spacing={'0.3rem'}
                  style={{ width: 'max-content' }}
                >
                  <Text size='lg' weight={600}>
                    Alpha Blending
                  </Text>
                </Group>
              </Grid.Col>
              <Grid.Col style={{ padding: '0 8px' }} span={2}>
                <SegmentedControl
                  value={ABMethod}
                  onChange={setABMethod}
                  data={[
                    { label: 'method1', value: 'method1' },
                    { label: 'method2', value: 'method2' },
                  ]}
                />
              </Grid.Col>
            </Grid>
            {ABMethod == 'method1' ?
              <></>
              :
              <Center>
                <Group>
                  <NumberInput
                    value={ABCoef}
                    onChange={(val) => setABCoef(val)}
                    label="Alpha Blending Coef"
                    style={{ width: '9rem' }}
                    precision={2}
                    step={0.25}
                    min={0}
                    max={1}
                  />
                </Group>
              </Center>
            }
          </Shape>
        </Group>
      </Shape>
    </>
  )
}
