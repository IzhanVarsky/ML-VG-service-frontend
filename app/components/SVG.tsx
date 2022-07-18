import { Container, Text } from '@mantine/core';
import { svgWithSize } from "~/utils";

export default function SVG({ svg, w, h }) {
  let html = svgWithSize(svg, w, h);
  return (
    <Container style={{
      width: "100%", height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div dangerouslySetInnerHTML={{ __html: html }}/>
    </Container>
  )
}