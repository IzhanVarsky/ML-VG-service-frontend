import { useState } from "react";
import { useDraggable } from "~/use-draggable";
import { ActionIcon, Grid, Group, NumberInput, Radio, RadioGroup } from "@mantine/core";

export default function SVGViewer({ svg, boxHeight }) {
  const [backgroundColorState, setBackgroundColorState] = useState("");
  const [zoomValue, setZoomValue] = useState(100);
  const [ref, pressed, setPosition] = useDraggable(zoomValue);
  return (
    <>
      <div style={{
        backgroundColor: backgroundColorState,
        height: boxHeight,
        width: '100%',
        overflow: 'auto',
        backgroundImage: backgroundColorState == '' ? 'url(images/checkerboard-tiled.png)' : 'none',
        marginBottom: '10px',
        padding: '25px 0'
      }}>
        <div style={{ transform: 'scale(' + (zoomValue / 100.0).toString() + ')' }}>
          <div
            ref={ref}
            style={{ cursor: pressed ? 'grabbing' : 'grab', width: 'fit-content' }}
            dangerouslySetInnerHTML={{ __html: svg }}/>
        </div>
      </div>
      <Grid justify='space-around' align="center" columns={3}>
        <Grid.Col span={2}>
          <RadioGroup value={backgroundColorState} onChange={setBackgroundColorState}>
            <Radio value="" label="Checkered"/>
            <Radio value="#FFFFFF" label="White"/>
            <Radio value="#F7F8F9" label="LightGray"/>
            <Radio value="#161B1D" label="Black"/>
          </RadioGroup>
        </Grid.Col>
        <Grid.Col span={1}>
          <Group spacing={5}>
            <ActionIcon size={42} variant="default"
                        onClick={() => {
                          setZoomValue(zoomValue / 2.0);
                          setPosition({ x: 0, y: 0 })
                        }}>
              –
            </ActionIcon>
            <NumberInput
              hideControls
              value={zoomValue}
              onChange={(val) => setZoomValue(val)}
              max={2000}
              min={0}
              precision={3}
              styles={{ input: { width: 100, textAlign: 'center' } }}
              parser={(value) => value.replace('%', '')}
              formatter={(value) => `${value}%`}
            />
            <ActionIcon size={42} variant="default" onClick={() => {
              setZoomValue(zoomValue * 2)
              setPosition({ x: 0, y: 0 })
            }}>
              +
            </ActionIcon>
          </Group>
        </Grid.Col>
      </Grid>
    </>
  )
}