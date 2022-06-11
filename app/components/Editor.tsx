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
import { AdjustmentsAlt, FileText, Palette } from 'tabler-icons-react';
import {downloadBase64File} from "app/download_utils";

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
      // context: this,
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
    // fetch('http://localhost:5001/generate', {
    //   method: 'POST',
    //   headers: {
    //     "Accept": "*",
    //   },
    //   body: formData,
    // }).then(res => {
    //   console.log('RES', res);
    //   const json = res.json();
    //   console.log('Server answer:', json);
    // }).catch(err => {
    //   console.log("Uploading error error", err);
    // });
  };

  return (
    <Shape>
      <Title>
        <Link
          to="/"
        >Go back</Link>
      </Title>
      <Grid justify='space-around'>
        <Grid.Col>
          <Container>
            <div dangerouslySetInnerHTML={{ __html: cover.svg }} />
          </Container>
        </Grid.Col>
        <Grid.Col>
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
              >{cover.svg}</Textarea>
            </Tabs.Tab>
            <Tabs.Tab label="PNG (rasterize)" icon={<Palette size={14} />}>
              <Button onClick={() => downloadPNGFromServer(cover.svg)}>Download</Button>
            </Tabs.Tab>
          </Tabs>
        </Grid.Col>
      </Grid>
    </Shape >
  )
}