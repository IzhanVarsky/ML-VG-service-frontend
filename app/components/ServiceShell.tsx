import React, { useState } from "react";
import { runHealthQuery } from "~/health_query";
import { AppShell } from "@mantine/core";
import { HeaderPageName } from "~/components/HeaderPageName";
import Navigation from "~/components/Navigation";
import ServiceUnavailableInfo from "~/components/ServiceUnavailableInfo";

export default function ServiceShell({
                                       serviceHostname, serviceName,
                                       shellChild, navBar = <></>
                                     }) {
  const [isServerAvailable, setIsServerAvailable] = useState(true);
  runHealthQuery(
    serviceHostname,
    (msg) => {
      setIsServerAvailable(true);
    },
    (msg) => {
      setIsServerAvailable(false);
    },
  );

  return (
    <>
      <AppShell
        header={<HeaderPageName text={serviceName}/>}
        footer={<Navigation/>}
        navbar={isServerAvailable ? navBar : <></>}
        styles={{
          main: {
            padding: 0,
          },
        }}
      >
        {isServerAvailable ? shellChild : <ServiceUnavailableInfo serviceName={serviceName}/>}
      </AppShell>
    </>
  )
}