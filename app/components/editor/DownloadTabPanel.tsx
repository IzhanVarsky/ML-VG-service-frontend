import { Button, Grid, NumberInput, Stack, Center } from '@mantine/core';
import { Braces, LayoutBoardSplit, Palette, } from 'tabler-icons-react';
import { downloadPNGFromServer, downloadTextFile, getJSON } from "~/download_utils";
import { svgWithSize } from '~/utils';
import { useTranslation } from "react-i18next"; // добавил импорт

export default function DownloadTabPanel({
                                           svg,
                                           imageWidthToDownload, setImageWidthToDownload,
                                           imageHeightToDownload, setImageHeightToDownload
                                         }) {
  const { t } = useTranslation(); // добавил хук

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
          placeholder={t("image-width")}
          label={t("image-width")}
          style={{ width: '40%' }}
          required
        />
        <NumberInput
          value={imageHeightToDownload}
          onChange={(val) => setImageHeightToDownload(val)}
          min={0}
          max={10000}
          placeholder={t("image-height")}
          label={t("image-height")}
          style={{ width: '40%' }}
          required
        />
      </Grid>
      <Button
        leftIcon={<LayoutBoardSplit size={14}/>}
        onClick={() =>
          downloadTextFile(svgWithSize(svg, imageWidthToDownload, imageHeightToDownload),
            "edited.svg")}
      >
        {t("download-svg")}
      </Button>
      <Button
        leftIcon={<Palette size={14}/>}
        onClick={() =>
          downloadPNGFromServer(svgWithSize(svg, imageWidthToDownload, imageHeightToDownload))}
      >
        {t("download-png")}
      </Button>
      <Button
        leftIcon={<Braces size={14}/>}
        onClick={() => getJSON(svgWithSize(svg, imageWidthToDownload))}
      >
        {t("download-json")}
      </Button>
    </Stack>
  )
}
