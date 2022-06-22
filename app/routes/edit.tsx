import { AppShell } from '@mantine/core';
import React from 'react';
import Editor from '~/components/Editor';
import AbstractPage from "~/AbstractPage";

export default class Edit extends AbstractPage {
  returnFunc() {
    return (
      <AppShell
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
