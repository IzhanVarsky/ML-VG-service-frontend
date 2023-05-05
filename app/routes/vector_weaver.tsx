import React from 'react';
import AbstractPage from "~/AbstractPage";
import MainVectorWeaver from "~/components/vector_weaver/MainVectorWeaver";
import config from "~/config.json";
import ServiceShell from "~/components/ServiceShell";

export default class VectorWeaver extends AbstractPage {
  returnFunc() {
    return (
      <ServiceShell serviceName={'Vector Weaver'}
                    serviceHostname={config.vector_weaver_backend_host}
                    shellChild={<MainVectorWeaver/>}
      />
    );
  }
}
