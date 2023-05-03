import { AppShell } from '@mantine/core';
import Form from '~/components/covers/Form';
import Navigation from '~/components/Navigation';
import Covers from '~/components/covers/Covers';
import React from 'react';
import AbstractPage from "~/AbstractPage";
import { HeaderPageName } from "~/components/HeaderPageName";

export default class CoverGAN extends AbstractPage {
  returnFunc() {
    return (
      <AppShell
        footer={<Navigation/>}
        header={<HeaderPageName text='CoverGAN'/>}
        navbar={<Form/>}
        styles={{
          main: {
            padding: 0,
          },
        }}
      >
        <Covers/>
      </AppShell>
    );
  }
}
