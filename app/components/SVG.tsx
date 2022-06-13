import { Container } from '@mantine/core';

export default function SVG({ svg }) {
  return (
    <Container>
      <img
        style={{ height: '50vh' }}
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
        alt='SVG'
      />
    </Container>
  )
}