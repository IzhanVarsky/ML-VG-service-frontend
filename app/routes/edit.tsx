import { AppShell } from '@mantine/core';
import React from 'react';
import Navigation from '~/components/Navigation';
import Editor from '~/components/editor/Editor';
import AbstractPage from "~/AbstractPage";
import { HeaderPageName } from "~/components/HeaderPageName";
import { withTranslation } from "react-i18next"; // добавил импорт

class Edit extends AbstractPage {
  returnFunc() {
    return (
      <AppShell
        footer={<Navigation/>}
        header={<HeaderPageName text={this.props.t('svg-editor')}/>}
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

export default withTranslation()(Edit); // добавил HOC
