import { Center, Checkbox, Grid, Group, HoverCard, NumberInput, SegmentedControl, Text } from '@mantine/core';
import Shape from "~/components/Shape";
import { InfoCircle } from "tabler-icons-react";

export default function InputParameters({ modelParams, setModelParams }) {
  return (
    <Shape>
      <Text size='xl'
            weight={800}
            style={{
              marginLeft: '3rem',
              fontFamily: 'Greycliff CF, sans-serif'
            }}
      >Input parameters</Text>
      <Group position="center" spacing={0}>
        <Shape style={{ padding: '16px' }}>
          <Grid
            grow
            justify='space-between'
            style={{
              margin: 0,
            }}
            align='center'>
            <Grid.Col style={{ padding: '0 8px' }} span={2}>
              <Text size='lg' weight={600} style={{ margin: 0, width: 'max-content' }}>
                Number of iterations
              </Text>
            </Grid.Col>
            <Grid.Col style={{ padding: '0 8px' }} span={2}>
              <NumberInput
                value={modelParams.iterationsNumber}
                onChange={(val) => setModelParams({
                  ...modelParams,
                  iterationsNumber: val
                })}
                min={0}
                max={500}
                style={{ width: '5rem' }}
                stepHoldDelay={500}
                stepHoldInterval={100}
              />
            </Grid.Col>
          </Grid>
        </Shape>
        <Shape style={{ padding: '16px' }}>
          <Grid
            grow
            justify='space-between'
            style={{
              margin: 0,
              marginBottom: modelParams.learningRateIsDefault ? '0' : '1rem',
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
              <Checkbox checked={modelParams.learningRateIsDefault}
                        labelPosition="left"
                        label="Use default LRs"
                        size='md'
                        style={{
                          textAlign: 'right',
                          width: 'max-content'
                        }}
                        onChange={(event) =>
                          setModelParams({
                            ...modelParams,
                            learningRateIsDefault: event.currentTarget.checked
                          })}/>
            </Grid.Col>
          </Grid>
          {modelParams.learningRateIsDefault ?
            <></>
            :
            <Group>
              <NumberInput
                value={modelParams.lrPoint}
                onChange={(val) => setModelParams({
                  ...modelParams,
                  lrPoint: val
                })}
                precision={4}
                step={0.05}
                label="Point LR"
                style={{ width: '6rem' }}
                stepHoldDelay={500}
                stepHoldInterval={100}
              />
              <NumberInput
                value={modelParams.lrColor}
                onChange={(val) => setModelParams({
                  ...modelParams,
                  lrColor: val
                })}
                precision={4}
                step={0.05}
                label="Color LR"
                style={{ width: '6rem' }}
                stepHoldDelay={500}
                stepHoldInterval={100}
              />
              <NumberInput
                value={modelParams.lrStroke}
                onChange={(val) => setModelParams({
                  ...modelParams,
                  lrStroke: val
                })}
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
        <Shape style={{ padding: '16px' }}>
          <Checkbox checked={modelParams.optimizeOpacity}
                    labelPosition="left"
                    label="Optimize opacity"
                    size='md'
                    style={{
                      fontWeight: 600,
                      textAlign: 'right',
                      width: 'max-content'
                    }}
                    onChange={(event) =>
                      setModelParams({
                        ...modelParams,
                        optimizeOpacity: event.currentTarget.checked
                      })}/>
        </Shape>
        <Shape style={{ padding: '16px' }}>
          <Text size='lg' weight={600} style={{ margin: 0, marginBottom: '1rem' }}>
            Losses weights
          </Text>
          <Center>
            <Group>
              <NumberInput
                value={modelParams.contourLoss}
                onChange={(val) => setModelParams({
                  ...modelParams,
                  contourLoss: val
                })}
                label="Contour Loss"
                style={{ width: '6rem' }}
                stepHoldDelay={500}
                stepHoldInterval={100}
              />
              <NumberInput
                value={modelParams.perceptionLoss}
                onChange={(val) => setModelParams({
                  ...modelParams,
                  perceptionLoss: val
                })}
                label="Perception Loss"
                style={{ width: '7rem' }}
                stepHoldDelay={500}
                stepHoldInterval={100}
              />
              <NumberInput
                value={modelParams.styleLoss}
                onChange={(val) => setModelParams({
                  ...modelParams,
                  styleLoss: val
                })}
                label="Style Loss"
                style={{ width: '7rem' }}
                stepHoldDelay={500}
                stepHoldInterval={100}
              />
              <NumberInput
                value={modelParams.contentLoss}
                onChange={(val) => setModelParams({
                  ...modelParams,
                  contentLoss: val
                })}
                label="Content Loss"
                style={{ width: '7rem' }}
                stepHoldDelay={500}
                stepHoldInterval={100}
              />
              <NumberInput
                value={modelParams.xingLoss}
                onChange={(val) => setModelParams({
                  ...modelParams,
                  xingLoss: val
                })}
                label="Xing Loss"
                style={{ width: '7rem' }}
                stepHoldDelay={500}
                stepHoldInterval={100}
              />
            </Group>
          </Center>
        </Shape>
        <Shape style={{ padding: '16px' }}>
          <Grid
            grow
            justify='space-between'
            style={{
              margin: 0,
              marginBottom: modelParams.ABMethod == 'method1' ? '0' : '1rem',
            }}
            align='center'>
            <Grid.Col style={{ padding: '0 8px' }} span={2}>
              <Text size='lg' weight={600}>
                Alpha Blending
              </Text>
            </Grid.Col>
            <Grid.Col style={{ padding: '0 8px' }} span={2}>
              <SegmentedControl
                value={modelParams.ABMethod}
                onChange={(val) => setModelParams({
                  ...modelParams,
                  ABMethod: val
                })}
                data={[
                  { label: 'method1', value: 'method1' },
                  { label: 'method2', value: 'method2' },
                ]}
              />
            </Grid.Col>
          </Grid>
          {modelParams.ABMethod == "method1" ? <></> : <Center>
            <Group>
              <NumberInput
                value={modelParams.ABCoef}
                onChange={(val) => setModelParams({
                  ...modelParams,
                  ABCoef: val
                })}
                label="Alpha Blending Coef"
                style={{ width: '9rem' }}
                precision={2}
                step={0.25}
                min={0}
                max={1}
                stepHoldDelay={500}
                stepHoldInterval={100}
              />
            </Group>
          </Center>
          }
        </Shape>
        <Shape style={{ padding: '16px' }}>
          <Grid
            grow
            justify='space-between'
            style={{
              margin: 0,
              marginBottom: modelParams.initType == 'with_content' ? '0' : '1rem',
            }}
            align='center'>
            <Grid.Col style={{ padding: '0 8px' }} span={2}>
              <Text size='lg' weight={600}>
                Image initialisation
              </Text>
            </Grid.Col>
            <Grid.Col style={{ padding: '0 8px' }} span={2}>
              <SegmentedControl
                value={modelParams.initType}
                onChange={(val) => setModelParams({
                  ...modelParams,
                  initType: val
                })}
                data={[
                  { label: 'Content', value: 'with_content' },
                  { label: 'Curves (CLIPDraw)', value: 'with_rand_clipdraw' },
                  { label: 'Closed paths (LIVE)', value: 'with_rand_LIVE' },
                  { label: 'Circles (LIVE)', value: 'with_circles_LIVE' },
                ]}
              />
            </Grid.Col>
          </Grid>
          {modelParams.initType == 'with_content' ?
            <></> :
            <Center>
              <Group>
                <NumberInput
                  value={modelParams[modelParams.initType].num_paths}
                  onChange={(val) => {
                    let newVar = { ...modelParams };
                    newVar[modelParams.initType].num_paths = val;
                    setModelParams(newVar);
                  }}
                  label="Num of paths"
                  style={{ width: '6rem' }}
                  step={1}
                  min={1}
                  max={1024}
                  stepHoldDelay={500}
                  stepHoldInterval={100}
                />
                <NumberInput
                  value={modelParams[modelParams.initType].min_num_segments}
                  onChange={(val) => {
                    let newVar = { ...modelParams };
                    newVar[modelParams.initType].min_num_segments = val;
                    setModelParams(newVar);
                  }}
                  label="Min segments"
                  style={{ width: '6rem' }}
                  step={1}
                  min={1}
                  max={20}
                  stepHoldDelay={500}
                  stepHoldInterval={100}
                />
                <NumberInput
                  value={modelParams[modelParams.initType].max_num_segments}
                  onChange={(val) => {
                    let newVar = { ...modelParams };
                    newVar[modelParams.initType].max_num_segments = val;
                    setModelParams(newVar);
                  }}
                  label="Max segments"
                  style={{ width: '6rem' }}
                  step={1}
                  min={1}
                  max={20}
                  stepHoldDelay={500}
                  stepHoldInterval={100}
                />
                <NumberInput
                  value={modelParams[modelParams.initType].radius}
                  onChange={(val) => {
                    let newVar = { ...modelParams };
                    newVar[modelParams.initType].radius = val;
                    setModelParams(newVar);
                  }}
                  label="Radius"
                  style={{ width: '6rem' }}
                  precision={2}
                  step={0.25}
                  min={0}
                  max={50}
                  stepHoldDelay={500}
                  stepHoldInterval={100}
                />
                <NumberInput
                  value={modelParams[modelParams.initType].stroke_width}
                  onChange={(val) => {
                    let newVar = { ...modelParams };
                    newVar[modelParams.initType].stroke_width = val;
                    setModelParams(newVar)
                  }}
                  label="Stroke width"
                  style={{ width: '6rem' }}
                  precision={2}
                  step={0.25}
                  min={0}
                  max={50}
                  stepHoldDelay={500}
                  stepHoldInterval={100}
                />
              </Group>
            </Center>
          }
        </Shape>
        <Shape style={{ padding: '16px' }}>
          <Grid
            grow
            justify='space-between'
            style={{
              margin: 0,
            }}
            align='center'>
            <Grid.Col style={{ padding: '0 8px' }} span={2}>
              <Text size='lg' weight={600} style={{ margin: 0, width: 'max-content' }}>
                Max stroke width
              </Text>
            </Grid.Col>
            <Grid.Col style={{ padding: '0 8px' }} span={2}>
              <NumberInput
                value={modelParams.maxStrokeWidth}
                onChange={(val) => setModelParams({
                  ...modelParams,
                  maxStrokeWidth: val
                })}
                min={0}
                style={{ width: '5rem' }}
                step={0.5}
                precision={2}
                stepHoldDelay={500}
                stepHoldInterval={100}
              />
            </Grid.Col>
          </Grid>
        </Shape>
      </Group>
    </Shape>
  )
}