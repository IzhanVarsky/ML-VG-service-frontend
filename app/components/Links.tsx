import config from "~/config.json";
import { Link } from "@remix-run/react";
import { Anchor } from "@mantine/core";

export const MainPageLink = () => <Link to={config.MainPage_href}>Main Page</Link>;

export const SVGEditorLink = () => <Link to={config.SVGEditor_href}>SVG Editor</Link>;

export const CoverGANLink = () => <Link to={config.CoverGAN_href}>CoverGAN</Link>;

export const VectorNSTLink = () => <Link to={config.VectorNST_href}>Vector Style Transfer</Link>;

export const MantineAnchor = () => <Anchor href={config.Mantine_href}>Mantine</Anchor>;