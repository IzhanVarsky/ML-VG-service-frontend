import { AppShell } from '@mantine/core';
import Navigation from '~/components/Navigation';
import React from 'react';
import AbstractPage from "~/AbstractPage";
import { HeaderPageName } from "~/components/HeaderPageName";
import Changelog from "~/components/changelog/Changelog";
import { withTranslation } from "react-i18next"; // добавил импорт

class ChangelogPage extends AbstractPage {
  returnFunc() {
    return (
      <AppShell
        footer={<Navigation/>}
        header={<HeaderPageName text={this.props.t('site-changelog')}/>}
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

export default withTranslation()(ChangelogPage); // добавил HOC
