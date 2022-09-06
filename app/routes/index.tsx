import { AppShell, Stack } from '@mantine/core';
import CoverGANLogo from '~/components/CoverGANLogo';
import Form from '~/components/Form';
import Navigation from '~/components/Navigation';
import Covers from '~/components/covers/Covers';
import React from 'react';
import AbstractPage from "~/AbstractPage";

export default class Index extends AbstractPage {
  returnFunc() {
    return (
      <AppShell
        footer={<Navigation/>}
        navbar={<Stack><CoverGANLogo/><Form/></Stack>}
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
