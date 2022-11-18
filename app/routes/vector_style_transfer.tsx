import { AppShell } from '@mantine/core';
import Navigation from '~/components/Navigation';
import React from 'react';
import AbstractPage from "~/AbstractPage";
import MainVectorStyleTransfer from '~/components/vector_style_transfer/MainVectorStyleTransfer';

export default class VectorStyleTransfer extends AbstractPage {
  returnFunc() {
    return (
      <AppShell
        footer={<Navigation/>}
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
