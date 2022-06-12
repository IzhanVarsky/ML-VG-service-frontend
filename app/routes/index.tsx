import { AppShell, Stack } from '@mantine/core';
import Header from '~/components/Header';
import Form from '~/components/Form';
import Covers from '~/components/covers/Covers';

export default function Index() {
  return (
    <AppShell
      navbar={<Stack><Header /><Form /></Stack>}
      styles={{
        main: {
          padding: 0,
        },
      }}
    >
      <Covers />
    </AppShell>
  );
}
