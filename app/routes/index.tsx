import { AppShell } from '@mantine/core';
import Navigation from '~/components/Navigation';
import React from 'react';
import AbstractPage from "~/AbstractPage";
import StartPage from "~/components/index/StartPage";
import { HeaderPageName } from "~/components/HeaderPageName";

export default class Index extends AbstractPage {
  returnFunc() {
    return (
      <AppShell
        footer={<Navigation/>}
        header={<HeaderPageName text='Welcome to ML Vector Graphics Lab'/>}
        styles={{
          main: {
            padding: 0,
          },
        }}
      >
        <StartPage/>
      </AppShell>
    );
  }
}
