import { AppShell } from '@mantine/core';
import Header from '~/components/Header';
import Form from '~/components/Form';
import Main from '~/components/Editor';

export default function Index() {
  return (
    <AppShell
      header={<Header />}
      styles={{
        main: {
          padding: 0,
        },
      }}
    >
      <Main />
    </AppShell>
  );
}
