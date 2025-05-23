import { Anchor, List, Text, Center, Container } from '@mantine/core';
import Shape from '../Shape';
import { CoverGANLink, SVGEditorLink, VectorNSTLink, VectorWeaverLink } from "~/components/Links";
import { Link } from "@remix-run/react";
import { config } from "~/config.js";
import { useTranslation } from "react-i18next"; // добавил импорт

export default function StartPage() {
  const { t } = useTranslation(); // добавил хук

  return (
    <>
      <Center>
        <div style={{ maxWidth: '70%' }}>
          <Shape>
            <Text size={'xl'} style={{ paddingBottom: '1rem' }} underline>{t("services-available")}</Text>
            <List size="lg" withPadding>
              <List.Item style={{ paddingBottom: '1rem' }}>
                <Text>
                  <CoverGANLink/> {t("covergan-desc")}
                </Text>
                <List size="lg" withPadding>
                  <List.Item>
                    {t("view-implementation")} <Anchor href="https://github.com/IzhanVarsky/CoverGAN" target="_blank">{t("on-github")}</Anchor>
                  </List.Item>
                  <List.Item>
                    <Anchor href="https://www.scitepress.org/PublicationsDetail.aspx?ID=nExT/huV0TI=&t=1" target="_blank">{t("link-paper")}</Anchor>
                  </List.Item>
                </List>
              </List.Item>
              <List.Item style={{ paddingBottom: '1rem' }}>
                <Text>
                  <VectorNSTLink/> {t("vectornst-desc")}
                </Text>
                <List size="lg" withPadding>
                  <List.Item>
                    {t("view-implementation")} <Anchor href="https://github.com/IzhanVarsky/VectorNST" target="_blank">{t("on-github")}</Anchor>
                  </List.Item>
                  <List.Item>
                    <Anchor href="https://www.scitepress.org/PublicationsDetail.aspx?ID=MBw35KalSXo=&t=1" target="_blank">{t("link-paper")}</Anchor>
                  </List.Item>
                </List>
              </List.Item>
              <List.Item style={{ paddingBottom: '1rem' }}>
                <Text>
                  <VectorWeaverLink/> {t("vectorweaver-desc")}
                </Text>
                <List size="lg" withPadding>
                  <List.Item>
                    {t("view-implementation")} <Anchor href="https://github.com/CTLab-ITMO/VGLib/tree/main/VectorWeaver" target="_blank">{t("on-github")}</Anchor>
                  </List.Item>
                  <List.Item>
                    <Anchor href="https://www.scitepress.org/PublicationsDetail.aspx?ID=Xy0kw/2ivPE=&t=1" target="_blank">{t("link-paper")}</Anchor>
                  </List.Item>
                </List>
              </List.Item>
              <List.Item>
                <Text>
                  <SVGEditorLink/> {t("svgeditor-desc")}
                </Text>
              </List.Item>
            </List>
          </Shape>
          <Shape>
            <Text size={'xl'} style={{ paddingBottom: '1rem' }} underline>{t("other-vector-projects")}</Text>
            <List size="lg" withPadding style={{ width: "90%" }}>
              <List.Item style={{ paddingBottom: '1rem', }}>
                <Anchor href="https://arxiv.org/html/2503.04983" target="_blank">{t("llm-svg-title")}</Anchor>
                {t("llm-svg-desc")}
              </List.Item>
              <List.Item style={{ paddingBottom: '1rem' }}>
                <Anchor href="https://www.scitepress.org/PublicationsDetail.aspx?ID=i1mJHiH5vBY=&t=1" target="_blank">{t("livboc-title")}</Anchor>
                {t("livboc-desc")} <Anchor href="https://github.com/CTLab-ITMO/LIVBOC" target="_blank">{t("on-github")}</Anchor>.
              </List.Item>
              <List.Item style={{ paddingBottom: '1rem' }}>
                <Anchor href="https://link.springer.com/chapter/10.1007/978-3-031-70085-9_24" target="_blank">{t("evovec-title")}</Anchor>
                {t("evovec-desc")} <Anchor href="https://github.com/CTLab-ITMO/VGLib/blob/main/EvoVec-Evolutionary-Image-Vectorization" target="_blank">{t("on-github")}</Anchor>.
              </List.Item>
              <List.Item style={{ paddingBottom: '1rem' }}>
                <Anchor href="https://link.springer.com/article/10.1007/s10958-024-07422-4" target="_blank">{t("review-title")}</Anchor>
                {t("review-desc")}
              </List.Item>
              <List.Item style={{ paddingBottom: '1rem' }}>
                DiffVG: <Anchor href="https://github.com/IzhanVarsky/diffvg" target="_blank">{t("on-github")}</Anchor>. {t("diffvg-desc")}
              </List.Item>
              <List.Item>
                {t("docker-template")} <Anchor href="https://github.com/IzhanVarsky/server_docker_template" target="_blank">{t("on-github")}</Anchor>.
              </List.Item>
            </List>
          </Shape>
          <Shape>
            <Text size={'xl'} style={{ paddingBottom: '1rem' }} underline>
              {t("site-implementation")}
            </Text>
            <List size="lg" withPadding>
              <List.Item style={{ paddingBottom: '1rem' }}>
                {t("frontend-repo")} <Anchor href="https://github.com/IzhanVarsky/ML-VG-service-frontend" target="_blank">{t("on-github")}</Anchor>
              </List.Item>
              <List.Item>
                {t("covergan-backend-repo")} <Anchor href="https://github.com/IzhanVarsky/ML-VG-CoverGAN-service-backend" target="_blank">{t("on-github")}</Anchor>
              </List.Item>
            </List>
          </Shape>
          <Shape>
            <Text size={'md'}>
              {t("changelog-view")} <Link to={config.Changelog_href}>{t("separate-page")}</Link>.
            </Text>
          </Shape>
          <Shape>
            <Text size='md'>{t("questions-suggestions")} <Anchor href="https://t.me/IzhanVarsky" target="_blank">Telegram</Anchor>.</Text>
          </Shape>
        </div>
      </Center>
    </>
  )
}
