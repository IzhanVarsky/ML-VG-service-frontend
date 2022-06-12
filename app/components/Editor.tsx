import {
  Stack,
  Grid,
  InputWrapper,
  ColorInput,
  Textarea,
  Container,
  Title,
  Tabs, Button,
} from '@mantine/core';
import Shape from '~/components/Shape';
import { Link, useOutletContext } from '@remix-run/react';
import { AdjustmentsAlt, FileText, Palette, Braces } from 'tabler-icons-react';
import { downloadBase64File, downloadTextFile } from "app/download_utils";
import SVG from './SVG';

export default function Main() {
  const [selectedCover, setSelectedCover, covers, setCovers] = useOutletContext();
  const cover = covers[selectedCover];

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

  const getJSON = (data) => {
    const formData = new FormData()
    formData.append("svg", data);
    // TODO: сделать прогресс бар, хотя бы просто <progress/>
    $.ajax({
      url: "http://localhost:5001/svg_to_json",
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success: (response) => {
        console.log('SUCC', response);
        downloadTextFile(JSON.stringify(response.result), "obj.json");
      },
      error: (e) => {
        console.log('ERR', e);
      }
    });
  };

  return (
    <Shape>
      <Title>
        <Link
          to="/"
        >Go back</Link>
      </Title>
      <Grid justify='space-around' columns={2}>
        <Grid.Col span={1}>
          <SVG svg={cover.svg} />
        </Grid.Col>
        <Grid.Col span={1}>
          <Tabs>
            <Tabs.Tab label="Edit options" icon={<AdjustmentsAlt size={14} />}>
              <InputWrapper label="Colors">
                <Stack>
                  <ColorInput defaultValue="#C5D899" />
                  <ColorInput defaultValue="#CF3636" />
                  <ColorInput defaultValue="#E08D07" />
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