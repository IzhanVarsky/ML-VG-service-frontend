import Shape from "~/components/Shape";
import { Link } from "@remix-run/react";
import { Grid, Text } from "@mantine/core";

export default function Navigation() {
  return (
    <>
      <Shape>
        <Grid align="center" columns={7}>
          <Grid.Col span={4}>
            <Text size="lg">ML Vector Tools (c)</Text>
          </Grid.Col>
          <Grid.Col span={1} style={{ textAlign: "center" }}>
            <Text><Link to="/">Main Page</Link></Text>
          </Grid.Col>
          <Grid.Col span={1} style={{ textAlign: "center" }}>
            <Text><Link to="/edit">Editor</Link></Text>
          </Grid.Col>
          <Grid.Col span={1} style={{ textAlign: "center" }}>
            <Text><Link to="/vector_style_transfer">Vector Style Transfer</Link></Text>
          </Grid.Col>
        </Grid>
      </Shape>
    </>)
}
