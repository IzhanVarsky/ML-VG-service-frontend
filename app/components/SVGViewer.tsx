import { useState } from "react";
import { useDraggable } from "~/use-draggable";
import { ActionIcon, Grid, Group, NumberInput } from "@mantine/core";
import ChipSVGBackground from "~/components/ChipSVGBackground";
import { svgWithSize } from '~/utils';

export default function SVGViewer({ svg, boxHeight }) {
  const [backgroundColorState, setBackgroundColorState] = useState("");
  const [zoomValue, setZoomValue] = useState(100);
  const [ref, pressed, setPosition] = useDraggable(zoomValue);
  return (
    <>
      <div style={{
        textAlign: 'center',
        backgroundColor: backgroundColorState,
        height: boxHeight,
        width: '100%',
        overflow: 'auto',
        backgroundImage: backgroundColorState == '' ? 'url(images/checkerboard-tiled.png)' : 'none',
        marginBottom: '15px',
        padding: '25px 5px',
        border: '1px solid lightgray',
        borderRadius: '5px'
      }}>
        <div style={{ transform: 'scale(' + (zoomValue / 100.0).toString() + ')' }}>
          <div
            ref={ref}
            style={{ cursor: pressed ? 'grabbing' : 'grab' }}
            dangerouslySetInnerHTML={{ __html: svg }}
            // dangerouslySetInnerHTML={{ __html: svgWithSize(svg, "none", "44vh") }}
          />
        </div>
      </div>
      <Grid justify='center' align="center">
        <Group position='center'>
          <Grid
            justify='space-between' align="center"
            style={{ width: '150px', backgroundColor: '#EAEEF0', borderRadius: '5px', padding: '5px' }}
          >
            <ChipSVGBackground backgroundColor='#FFFFFF'
                               usersBackgroundColor={backgroundColorState}
                               setUsersBackgroundColor={setBackgroundColorState}
            />
            <ChipSVGBackground backgroundColor='#F7F8F9' usersBackgroundColor={backgroundColorState}
                               setUsersBackgroundColor={setBackgroundColorState}/>
            <ChipSVGBackground backgroundColor='#161B1D' usersBackgroundColor={backgroundColorState}
                               setUsersBackgroundColor={setBackgroundColorState}/>
            <ChipSVGBackground usersBackgroundColor={backgroundColorState}
                               setUsersBackgroundColor={setBackgroundColorState}/>
          </Grid>
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
        </Group>
      </Grid>
    </>
  )
}