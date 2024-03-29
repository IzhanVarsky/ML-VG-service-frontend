import { AppShell } from '@mantine/core';
import React from 'react';
import Navigation from '~/components/Navigation';
import Editor from '~/components/editor/Editor';
import AbstractPage from "~/AbstractPage";
import { HeaderPageName } from "~/components/HeaderPageName";

export default class Edit extends AbstractPage {
  returnFunc() {
    return (
      <AppShell
        footer={<Navigation/>}
        header={<HeaderPageName text='SVG Editor'/>}
        styles={{
          main: {
            padding: 0,
          },
        }}
      >
        <Editor/>
      </AppShell>
    );
  }
}
