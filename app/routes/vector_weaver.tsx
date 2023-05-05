import React from 'react';
import AbstractPage from "~/AbstractPage";
import MainVectorWeaver from "~/components/vector_weaver/MainVectorWeaver";
import { vector_weaver_backend_path } from "~/config.js";
import ServiceShell from "~/components/ServiceShell";

export default class VectorWeaver extends AbstractPage {
  returnFunc() {
    return (
      <ServiceShell serviceName={'Vector Weaver'}
                    backendPath={vector_weaver_backend_path}
                    shellChild={<MainVectorWeaver/>}
      />
    );
  }
}
