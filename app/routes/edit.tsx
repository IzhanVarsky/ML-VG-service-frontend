import { AppShell } from '@mantine/core';
import Editor from '~/components/Editor';

export default function Index() {
  return (
    <AppShell
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
