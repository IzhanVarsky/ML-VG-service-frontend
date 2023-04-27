import { AppShell } from '@mantine/core';
import Navigation from '~/components/Navigation';
import React from 'react';
import AbstractPage from "~/AbstractPage";
import StartPage from "~/components/index/StartPage";

export default class Index extends AbstractPage {
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
        <StartPage/>
      </AppShell>
    );
  }
}
