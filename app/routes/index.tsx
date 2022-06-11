import { AppShell } from '@mantine/core';
import Header from '~/components/Header';
import Form from '~/components/Form';
import Covers from '~/components/covers/Covers';
import { useOutletContext } from '@remix-run/react';

export default function Index() {
  const [selectedCover, setSelectedCover, covers, setCovers] = useOutletContext();

  return (
    <AppShell
      header={<Header />}
      navbar={<Form setCovers={setCovers} />}
      styles={{
        main: {
          padding: 0,
        },
      }}
    >
      <Covers
        covers={covers}
        selectedCover={selectedCover}
        setSelectedCover={setSelectedCover}
      />
    </AppShell>
  );
}
