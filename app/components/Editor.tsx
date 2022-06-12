import {
  Stack,
  Grid,
  InputWrapper,
  ColorInput,
  Textarea,
  Tabs, Button,
  Text,
} from '@mantine/core';
import Shape from '~/components/Shape';
import { Link, useOutletContext } from '@remix-run/react';
import { AdjustmentsAlt, FileText, Palette, Braces } from 'tabler-icons-react';
import { getJSON, extractColors, downloadPNGFromServer } from "~/download_utils";
import { getColors } from '~/utils';
import SVG from './SVG';
import { useEffect, useState } from 'react';
import { Dropzone } from '@mantine/dropzone';

export default function Main() {
  const [selectedCover, setSelectedCover, covers, setCovers] = useOutletContext();
  const [cover, setCover] = useState(covers[selectedCover].svg);
  const [colors, setColors] = useState([]);
  const [value, setValue] = useState('');

  const updateColor = (oldColor) => (newColor) => {
    setColors(colors.map(c => c === oldColor ? newColor : c));
    setCover(cover.replace(oldColor, newColor));
  }

  useEffect(() => {
    getJSON(cover, (svg) => setColors(getColors(svg)));
  }, []);

  return (
    <Shape>
      <Link to="/">
        <Button m='md'>
          Go back
        </Button>
      </Link>
      <Grid justify='space-around' columns={2}>
        <Grid.Col span={1}>
          <SVG svg={cover} />
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
                      format='rgb' // TODO: change to rgba
                      onChange={updateColor(color)}
                    />
                  )
                  }
                  <Dropzone
                    multiple={false}
                    accept={["image/*"]}
                    onDrop={(files) => {
                      let oldCover = cover + '';
                      extractColors(files[0], colors.length, newColors => {
                        setColors(newColors);
                        colors.forEach((oldColor, index) => {
                          oldCover = oldCover.replace(oldColor, newColors[index]);
                        });
                        setCover(oldCover);
                      });
                    }}>
                    {() => <Text color='grey'>Drop image to style transfer</Text>}
                  </Dropzone>
                </Stack>
              </InputWrapper>
            </Tabs.Tab>
            <Tabs.Tab label="Edit raw svg" icon={<FileText size={14} />}>
              <Textarea
                minRows={30}
                minLength={50}
                value={cover}
                onChange={event => setCover(event.currentTarget.value)}
              />
            </Tabs.Tab>
            <Tabs.Tab label="PNG (rasterize)" icon={<Palette size={14} />}>
              <Button onClick={() => downloadPNGFromServer(cover)}>Download</Button>
            </Tabs.Tab>
            <Tabs.Tab label="To JSON" icon={<Braces size={14} />}>
              <Button onClick={() => getJSON(cover)}>Download JSON</Button>
            </Tabs.Tab>
          </Tabs>
        </Grid.Col>
      </Grid>
    </Shape >
  )
}
