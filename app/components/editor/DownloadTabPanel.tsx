import { Button, Grid, NumberInput, Stack, } from '@mantine/core';
import { Braces, LayoutBoardSplit, Palette, } from 'tabler-icons-react';
import { downloadPNGFromServer, downloadTextFile, getJSON } from "~/download_utils";
import { svgWithSize } from '~/utils';

export default function DownloadTabPanel({
                                           state,
                                           imageWidthToDownload, setImageWidthToDownload,
                                           imageHeightToDownload, setImageHeightToDownload
                                         }) {
  return (
    <Stack style={{
      padding: '0 25%',
      justifyContent: 'flex-start', minHeight: '70vh'
    }}>
      <Grid justify="space-around" align="center">
        <NumberInput
          value={imageWidthToDownload}
          onChange={(val) => setImageWidthToDownload(val)}
          min={0}
          max={10000}
          placeholder="Image width"
          label="Image width"
          style={{ width: '40%' }}
          required
        />
        <NumberInput
          value={imageHeightToDownload}
          onChange={(val) => setImageHeightToDownload(val)}
          min={0}
          max={10000}
          placeholder="Image height"
          label="Image height"
          style={{ width: '40%' }}
          required
        />
      </Grid>
      <Button
        leftIcon={<LayoutBoardSplit size={14}/>}
        onClick={() =>
          downloadTextFile(svgWithSize(state.svg, imageWidthToDownload, imageHeightToDownload),
            "edited.svg")}
      >
        Download SVG
      </Button>
      <Button
        leftIcon={<Palette size={14}/>}
        onClick={() =>
          downloadPNGFromServer(svgWithSize(state.svg, imageWidthToDownload, imageHeightToDownload))}
      >
        Download PNG
      </Button>
      <Button
        leftIcon={<Braces size={14}/>}
        onClick={() => getJSON(svgWithSize(state.svg, imageWidthToDownload))}
      >
        Download JSON
      </Button>
    </Stack>
  )
}