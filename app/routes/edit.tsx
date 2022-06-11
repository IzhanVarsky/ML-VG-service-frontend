import { AppShell } from '@mantine/core';
import Header from '~/components/Header';
import Editor from '~/components/Editor';

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
      <Editor />
    </AppShell>
  );
}
