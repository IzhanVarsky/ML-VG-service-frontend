import { AppShell } from '@mantine/core';
import Navigation from '~/components/Navigation';
import React from 'react';
import AbstractPage from "~/AbstractPage";
import MainVectorWeaver from "~/components/vector_weaver/MainVectorWeaver";
import { HeaderPageName } from "~/components/HeaderPageName";

export default class VectorWeaver extends AbstractPage {
  returnFunc() {
    return (
      <AppShell
        footer={<Navigation/>}
        header={<HeaderPageName text='Vector Weaver'/>}
        styles={{
          main: {
            padding: 0,
          },
        }}
      >
        <MainVectorWeaver/>
      </AppShell>
    );
  }
}
