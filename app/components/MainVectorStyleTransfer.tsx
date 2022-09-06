import { Grid } from "@mantine/core";
import { useState } from "react";
import Shape from "~/components/Shape";
import SVGViewer from "~/components/SVGViewer";

export default function MainVectorStyleTransfer() {
  const [styleImage, setStyleImage] = useState("");
  const [contentImage, setContentImage] = useState("");
  const [isLoadingStyleImage, setIsLoadingStyleImage] = useState(false);
  const [isLoadingContentImage, setIsLoadingContentImage] = useState(false);

  const preprocessSVGToRender = (svg) => {
    if (svg.trim() == "") {
      return "Error: SVG is empty"
    }
    try {
      let parsed = $(svg);
      if (parsed.prop("tagName") == "svg") {
        return svg
      }
      return "Error: Incorrect SVG"
    } catch (e) {
      return "Error: Couldn't parse SVG"
    }
  }

  return (
    <>
      <Shape>
        <Grid justify='space-around' align="center" columns={3}>
          <Grid.Col span={1}>
            <SVGViewer svg={styleImage} boxHeight={'45vh'}/>
          </Grid.Col>
          <Grid.Col span={1}>
            <SVGViewer svg={contentImage} boxHeight={"45vh"}/>
          </Grid.Col>
          <Grid.Col span={1}>
            <SVGViewer svg={""} boxHeight={"45vh"}/>
          </Grid.Col>
        </Grid>
      </Shape>
    </>
  )
}
