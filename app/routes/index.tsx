import { AppShell } from '@mantine/core';
import Header from '~/components/Header';
import Navbar from '~/components/Form';
import Covers from '~/components/covers/Covers';

export default function Index() {
  return (
    <AppShell
      header={<Header />}
      navbar={<Navbar />}
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
