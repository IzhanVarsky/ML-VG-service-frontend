import { Container, Text } from '@mantine/core';
import { svgWithSize } from "~/utils";

export default function SVG({ svg, w = "50vh", h = "50vh" }) {
  let html = svgWithSize(svg, w, h);
  return (
    <Container>
      {html === "" ?
        <Text size={'xl'}>SVG is empty</Text>
        :
        <div dangerouslySetInnerHTML={{ __html: html }}/>
      }
    </Container>
  )
}