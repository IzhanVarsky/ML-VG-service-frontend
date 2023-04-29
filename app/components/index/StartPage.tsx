import { Anchor, Center, List, Text } from '@mantine/core';
import Shape from '../Shape';
import { CoverGANLink, SVGEditorLink, VectorNSTLink } from "~/components/Links";
import Changelog from "~/components/index/Changelog";

export default function StartPage() {
  return (
    <>
      <Shape>
        <Center>
          <Text size={'xl'} weight={'bolder'}>Welcome to ML Vector Graphics Lab!</Text>
        </Center>
      </Shape>
      <Shape>
        <Text size={'xl'} style={{ paddingBottom: '1rem' }} underline>Currently available services:</Text>
        <List size="lg" withPadding>
          <List.Item style={{ paddingBottom: '1rem' }}>
            <Text>
              <CoverGANLink/> - service for generating covers in SVG format based
              user's music track and emotion
            </Text>
            <List size="lg" withPadding>
              <List.Item>
                View implementation <Anchor href="https://github.com/IzhanVarsky/CoverGAN" target="_blank">on
                GitHub</Anchor>
              </List.Item>
              <List.Item>
                <Anchor href="https://arxiv.org/pdf/2205.07301v1.pdf" target="_blank">Link to the paper</Anchor>
              </List.Item>
            </List>
          </List.Item>
          <List.Item style={{ paddingBottom: '1rem' }}>
            <Text>
              <VectorNSTLink/> - service for iterative
              neural style transfer for images in SVG format
            </Text>
            <List size="lg" withPadding>
              <List.Item>
                View implementation <Anchor href="https://github.com/IzhanVarsky/VectorNST" target="_blank">on
                GitHub</Anchor>
              </List.Item>
              <List.Item>
                <Anchor href="https://arxiv.org/pdf/2303.03405.pdf" target="_blank">Link to the paper</Anchor>
              </List.Item>
            </List>
          </List.Item>
          <List.Item>
            <Text>
              <SVGEditorLink/> - service for editing SVG code and subsequent image
              downloading
            </Text>
          </List.Item>
        </List>
      </Shape>
      <Shape>
        <Text size={'xl'} style={{ paddingBottom: '1rem' }} underline>Other vector graphics projects:</Text>
        <List size="lg" withPadding>
          <List.Item style={{ paddingBottom: '1rem' }}>
            DiffVG: <Anchor href="https://github.com/IzhanVarsky/diffvg2022" target="_blank">GitHub</Anchor>. We fixed
            come serious bugs and added useful functions.
          </List.Item>
          <List.Item>
            Docker template for running models on GPU: <Anchor
            href="https://github.com/IzhanVarsky/server_docker_template"
            target="_blank">GitHub</Anchor>.
          </List.Item>
        </List>
      </Shape>
      <Shape>
        <Text size={'xl'} style={{ paddingBottom: '1rem' }} underline>
          This site implementation:
        </Text>
        <List size="lg" withPadding>
          <List.Item style={{ paddingBottom: '1rem' }}>
            Frontend repo <Anchor href="https://github.com/IzhanVarsky/ML-VG-service-frontend" target="_blank">on
            GitHub</Anchor>
          </List.Item>
          <List.Item>
            CoverGAN backend repo <Anchor href="https://github.com/IzhanVarsky/ML-VG-CoverGAN-service-backend"
                                          target="_blank">on
            GitHub</Anchor>
          </List.Item>
        </List>
      </Shape>
      <Changelog/>
      <Shape>
        <Text size='md'>If you have any <Text weight={600} span>questions</Text> or <Text weight={600}
                                                                                          span>suggestions</Text>, write
          me on <Anchor href="https://t.me/IzhanVarsky" target="_blank">Telegram</Anchor>.</Text>
      </Shape>
    </>
  )
}