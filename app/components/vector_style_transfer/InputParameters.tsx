import { Center, Checkbox, Grid, Group, HoverCard, NumberInput, SegmentedControl, Text } from '@mantine/core';
import Shape from "~/components/Shape";
import { InfoCircle } from "tabler-icons-react";

export default function InputParameters({
                                          iterationsNumber, setIterationsNumber,
                                          learningRateIsDefault, setLearningRateIsDefault,
                                          lrPoint, setLrPoint,
                                          lrColor, setLrColor,
                                          lrStroke, setLrStroke,
                                          contourLoss, setContourLoss,
                                          perceptionLoss, setPerceptionLoss,
                                          ABMethod, setABMethod,
                                          ABCoef, setABCoef,
                                        }) {
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
              <Text size='lg' weight={600}>
                Alpha Blending
              </Text>
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
  )
}