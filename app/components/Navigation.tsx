import Shape from "~/components/Shape";
import { Grid, Text } from "@mantine/core";
import { CoverGANLink, MainPageLink, SVGEditorLink, VectorNSTLink } from "~/components/Links";
import config from "~/config.json";

export default function Navigation() {
  return (
    <>
      <Shape>
        <Grid align="center" columns={8}>
          <Grid.Col span={4}>
            <Text size="lg">ML Vector Tools (c) | {config.frontend_tag_version} | 2022 - 2023</Text>
          </Grid.Col>
          <Grid.Col span={1} style={{ textAlign: "center" }}>
            <Text><MainPageLink/></Text>
          </Grid.Col>
          <Grid.Col span={1} style={{ textAlign: "center" }}>
            <Text><CoverGANLink/></Text>
          </Grid.Col>
          <Grid.Col span={1} style={{ textAlign: "center" }}>
            <Text><VectorNSTLink/></Text>
          </Grid.Col>
          <Grid.Col span={1} style={{ textAlign: "center" }}>
            <Text><SVGEditorLink/></Text>
          </Grid.Col>
        </Grid>
      </Shape>
    </>)
}
