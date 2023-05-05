import React from 'react';
import AbstractPage from "~/AbstractPage";
import MainVectorStyleTransfer from '~/components/vector_style_transfer/MainVectorStyleTransfer';
import { vector_style_transfer_backend_host } from "~/config.js";
import ServiceShell from "~/components/ServiceShell";

export default class VectorStyleTransfer extends AbstractPage {
  returnFunc() {
    return (
      <ServiceShell serviceName={'Vector Style Transfer'}
                    backendPath={vector_style_transfer_backend_host}
                    shellChild={<MainVectorStyleTransfer/>}
      />
    );
  }
}
