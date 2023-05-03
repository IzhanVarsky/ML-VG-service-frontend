import { AppShell } from '@mantine/core';
import Navigation from '~/components/Navigation';
import React from 'react';
import AbstractPage from "~/AbstractPage";
import { HeaderPageName } from "~/components/HeaderPageName";
import Changelog from "~/components/changelog/Changelog";

export default class VectorWeaver extends AbstractPage {
  returnFunc() {
    return (
      <AppShell
        footer={<Navigation/>}
        header={<HeaderPageName text='Site Changelog'/>}
        styles={{
          main: {
            padding: 0,
          },
        }}
      >
        <Changelog/>
      </AppShell>
    );
  }
}
