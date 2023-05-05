import React from 'react';
import AbstractPage from "~/AbstractPage";
import MainVectorStyleTransfer from '~/components/vector_style_transfer/MainVectorStyleTransfer';
import config from "~/config.json";
import ServiceShell from "~/components/ServiceShell";

export default class VectorStyleTransfer extends AbstractPage {
  returnFunc() {
    return (
      <ServiceShell serviceName={'Vector Style Transfer'}
                    serviceHostname={config.vector_style_transfer_backend_host}
                    shellChild={<MainVectorStyleTransfer/>}
      />
    );
  }
}
