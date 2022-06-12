import {
  Stack,
  Grid,
  InputWrapper,
  ColorInput,
  Textarea,
  Tabs, Button,
} from '@mantine/core';
import Shape from '~/components/Shape';
import { Link, useOutletContext } from '@remix-run/react';
import { AdjustmentsAlt, FileText, Palette, Braces } from 'tabler-icons-react';
import { downloadBase64File, getJSON } from "~/download_utils";
import { getColors } from '~/utils';
import SVG from './SVG';
import { useEffect, useState } from 'react';

export default function Main() {
  const [selectedCover, setSelectedCover, covers, setCovers] = useOutletContext();
  const [cover, setCover] = useState(covers[selectedCover]);
  const [colors, setColors] = useState([]);

  const updateColor = (oldColor) => (newColor) => {
    setColors(colors.map(c => c === oldColor ? newColor : c));
    setCover({ svg: cover.svg.replace(oldColor, newColor) });
  }

  useEffect(() => {
    getJSON(cover.svg, (svg) => setColors(getColors(svg)));
  }, []);

  const downloadPNGFromServer = (data) => {
    const formData = new FormData()
    formData.append("svg", data);
    // TODO: сделать прогресс бар, хотя бы просто <progress/>
    $.ajax({
      url: "http://localhost:5001/rasterize",
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success: (response) => {
        console.log('SUCC', response);
        downloadBase64File("image/png", response.result.res_png1, "rasterized.png");
      },
      error: (e) => {
        console.log('ERR', e);
      }
    });
  };

  return (
    <Shape>
        <Link to="/">
          <Button m='md'>
            Go back
          </Button>
      <Grid justify='space-around' columns={2}>
        <Grid.Col span={1}>
          <SVG svg={cover.svg} />
        </Grid.Col>
        <Grid.Col span={1}>
          <Tabs>
            <Tabs.Tab label="Edit options" icon={<AdjustmentsAlt size={14} />}>
              <InputWrapper label="Colors">
                <Stack>
                  {colors.map((color, index) =>
                    <ColorInput
                      key={index}
                      value={color}
                      onChange={updateColor(color)}
                    />
                  )
                  }
                </Stack>
              </InputWrapper>
            </Tabs.Tab>
            <Tabs.Tab label="Edit raw svg" icon={<FileText size={14} />}>
              <Textarea
                minRows={30}
                minLength={50}
                defaultValue={cover.svg}
              />
            </Tabs.Tab>
            <Tabs.Tab label="PNG (rasterize)" icon={<Palette size={14} />}>
              <Button onClick={() => downloadPNGFromServer(cover.svg)}>Download</Button>
            </Tabs.Tab>
            <Tabs.Tab label="To JSON" icon={<Braces size={14} />}>
              <Button onClick={() => getJSON(cover.svg)}>Download JSON</Button>
            </Tabs.Tab>
          </Tabs>
        </Grid.Col>
      </Grid>
    </Shape >
  )
}