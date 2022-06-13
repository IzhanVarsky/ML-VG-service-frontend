import { Container } from '@mantine/core';
import {svgWithSize} from "~/utils";

export default function SVG({ svg, size="50vh" }) {
  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: svgWithSize(svg, size) }} />
    </Container>
  )
}