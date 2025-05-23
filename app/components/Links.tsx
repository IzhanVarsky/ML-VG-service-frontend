import { config } from "~/config.js";
import { Link } from "@remix-run/react";
import { Anchor } from "@mantine/core";
import { useTranslation } from "react-i18next"; // добавил импорт

export const MainPageLink = () => {
  const { t } = useTranslation();
  return <Link to={config.MainPage_href}>{t("main-page")}</Link>;
};

export const SVGEditorLink = () => {
  const { t } = useTranslation();
  return <Link to={config.SVGEditor_href}>{t("svg-editor")}</Link>;
};

export const CoverGANLink = () => {
  const { t } = useTranslation();
  return <Link to={config.CoverGAN_href}>{t("covergan")}</Link>;
};

export const VectorNSTLink = () => {
  const { t } = useTranslation();
  return <Link to={config.VectorNST_href}>{t("vector-nst")}</Link>;
};

export const VectorWeaverLink = () => {
  const { t } = useTranslation();
  return <Link to={config.VectorWeaver_href}>{t("vector-weaver")}</Link>;
};

export const ChangelogLink = () => {
  const { t } = useTranslation();
  return <Link to={config.Changelog_href}>{t("site-changelog")}</Link>;
};

export const MantineAnchor = () => {
  const { t } = useTranslation();
  return <Anchor href={config.Mantine_href} target="_blank">{t("mantine")}</Anchor>;
};
