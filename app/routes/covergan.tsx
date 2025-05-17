import React from 'react';
import AbstractPage from "~/AbstractPage";
import ServiceShell from "~/components/ServiceShell";
import { covergan_backend_host } from '~/config.js';
import Covers from "~/components/covers/Covers";
import Form from "~/components/covers/Form";
import type { LinksFunction } from "@remix-run/node";
import styles from "~/styles/AudioRecorder.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles }
];

export default class CoverGAN extends AbstractPage {
  returnFunc() {
    return (
      <ServiceShell serviceName='CoverGAN'
                    backendPath={covergan_backend_host}
                    navBar={<Form/>}
                    shellChild={<Covers/>}
      />
    );
  }
}
