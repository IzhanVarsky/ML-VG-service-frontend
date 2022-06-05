import { AppShell } from '@mantine/core';
import Header from '~/components/Header';
import Navbar from '~/components/Navbar';
import Main from '~/components/Main';

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
      <Main />
    </AppShell>
  );
}
