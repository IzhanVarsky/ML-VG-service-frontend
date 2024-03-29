import { config } from "~/config.js";
import { Link } from "@remix-run/react";
import { Anchor } from "@mantine/core";

export const MainPageLink = () => <Link to={config.MainPage_href}>Main Page</Link>;

export const SVGEditorLink = () => <Link to={config.SVGEditor_href}>SVG Editor</Link>;

export const CoverGANLink = () => <Link to={config.CoverGAN_href}>CoverGAN</Link>;

export const VectorNSTLink = () => <Link to={config.VectorNST_href}>Vector Style Transfer</Link>;

export const VectorWeaverLink = () => <Link to={config.VectorWeaver_href}>Vector Weaver</Link>;

export const ChangelogLink = () => <Link to={config.Changelog_href}>Site Changelog</Link>;

export const MantineAnchor = () => <Anchor href={config.Mantine_href} target="_blank">Mantine</Anchor>;