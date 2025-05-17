import { Anchor, List, Text, Center, Container } from '@mantine/core';
import Shape from '../Shape';
import { CoverGANLink, SVGEditorLink, VectorNSTLink, VectorWeaverLink } from "~/components/Links";
import { Link } from "@remix-run/react";
import { config } from "~/config.js";

export default function StartPage() {
  return (
    <>
      <Center>
        <div style={{ maxWidth: '70%' }}>
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
                    <Anchor href="https://www.scitepress.org/PublicationsDetail.aspx?ID=nExT/huV0TI=&t=1"
                            target="_blank">Link to the paper</Anchor>
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
                    <Anchor href="https://www.scitepress.org/PublicationsDetail.aspx?ID=MBw35KalSXo=&t=1"
                            target="_blank">Link to the paper</Anchor>
                  </List.Item>
                </List>
              </List.Item>
              <List.Item style={{ paddingBottom: '1rem' }}>
                <Text>
                  <VectorWeaverLink/> - service for unconditional vector image generating using pretrained transformer
                  model
                </Text>
                <List size="lg" withPadding>
                  <List.Item>
                    View implementation <Anchor href="https://github.com/CTLab-ITMO/VGLib/tree/main/VectorWeaver"
                                                target="_blank">on
                    GitHub</Anchor>
                  </List.Item>
                  <List.Item>
                    <Anchor href="https://www.scitepress.org/PublicationsDetail.aspx?ID=Xy0kw/2ivPE=&t=1"
                            target="_blank">Link to the paper</Anchor>
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
            <List size="lg" withPadding style={{width: "90%"}}>
              <List.Item style={{ paddingBottom: '1rem', }}>
                <Anchor href="https://arxiv.org/html/2503.04983" target="_blank">Leveraging Large Language Models For
                  Scalable Vector Graphics Processing: A Review. </Anchor>
                In this paper we examine how well
                popular LLMs cope with SVG generation, editing and understanding tasks.
              </List.Item>
              <List.Item style={{ paddingBottom: '1rem' }}>
                <Anchor href="https://www.scitepress.org/PublicationsDetail.aspx?ID=i1mJHiH5vBY=&t=1" target="_blank">LIVBOC:
                  Layerwise Image Vectorization via Bayesain-Optimized Contour. </Anchor>
                In this paper we present our new vectorization algorithm. See implementation on <Anchor
                href="https://github.com/CTLab-ITMO/LIVBOC"
                target="_blank">GitHub</Anchor>.
              </List.Item>
              <List.Item style={{ paddingBottom: '1rem' }}>
                <Anchor href="https://link.springer.com/chapter/10.1007/978-3-031-70085-9_24" target="_blank">EvoVec:
                  Evolutionary Image
                  Vectorization with Adaptive Curve Number and Color Gradients. </Anchor>
                In this paper we present our new vectorization algorithm. See implementation on <Anchor
                href="https://github.com/CTLab-ITMO/VGLib/blob/main/EvoVec-Evolutionary-Image-Vectorization"
                target="_blank">GitHub</Anchor>.
              </List.Item>
              <List.Item style={{ paddingBottom: '1rem' }}>
                <Anchor href="https://link.springer.com/article/10.1007/s10958-024-07422-4" target="_blank">Image Vectorization: a Review. </Anchor>
                In this paper we examine the problems of image vectorization algorithms.
              </List.Item>
              <List.Item style={{ paddingBottom: '1rem' }}>
                DiffVG: <Anchor href="https://github.com/IzhanVarsky/diffvg" target="_blank">GitHub</Anchor>. We
                fixed some serious bugs and added useful functions.
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
          <Shape>
            <Text size={'md'}>
              Site changelog can be viewed on <Link to={config.Changelog_href}>separate page</Link>.
            </Text>
          </Shape>
          <Shape>
            <Text size='md'>If you have any <Text weight={600} span>questions</Text> or <Text weight={600}
                                                                                              span>suggestions</Text>,
              write
              me on <Anchor href="https://t.me/IzhanVarsky" target="_blank">Telegram</Anchor>.</Text>
          </Shape>
        </div>
      </Center>
    </>
  )
}