import {
  Stack,
  Grid,
  InputWrapper,
  ColorInput,
  Textarea,
  Container,
  Title,
  Tabs,
} from '@mantine/core';
import Shape from '~/components/Shape';
import { Link, useOutletContext } from '@remix-run/react';
import { AdjustmentsAlt, FileText } from 'tabler-icons-react';

export default function Main() {
  const [selectedCover, _, covers, _] = useOutletContext();
  const cover = covers[selectedCover];

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
          </Tabs>
        </Grid.Col>
      </Grid>
    </Shape >
  )
}