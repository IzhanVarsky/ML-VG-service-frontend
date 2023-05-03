import { AppShell } from '@mantine/core';
import Navigation from '~/components/Navigation';
import React from 'react';
import AbstractPage from "~/AbstractPage";
import MainVectorStyleTransfer from '~/components/vector_style_transfer/MainVectorStyleTransfer';
import { HeaderPageName } from "~/components/HeaderPageName";

export default class VectorStyleTransfer extends AbstractPage {
  returnFunc() {
    return (
      <AppShell
        footer={<Navigation/>}
        header={<HeaderPageName text='Vector Style Transfer'/>}
        styles={{
          main: {
            padding: 0,
          },
        }}
      >
        <MainVectorStyleTransfer/>
      </AppShell>
    );
  }
}
