import { AppShell } from '@mantine/core';
import Navigation from '~/components/Navigation';
import React from 'react';
import AbstractPage from "~/AbstractPage";
import StartPage from "~/components/index/StartPage";
import { HeaderPageName } from "~/components/HeaderPageName";
import { withTranslation } from "react-i18next";

class Index extends AbstractPage {
  returnFunc() {
    return (
      <AppShell
        footer={<Navigation />}
        header={<HeaderPageName text={this.props.t('welcome')} />}
        styles={{
          main: {
            padding: 0,
          },
        }}
      >
        <StartPage />
      </AppShell>
    );
  }
}

export default withTranslation()(Index);  // ③
