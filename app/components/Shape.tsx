import { Paper } from '@mantine/core';

export default function Shape({ children }) {
  return (
    <Paper withBorder radius='lg' shadow="xl" p="xl" m='md' style={{ height: '100%' }}>
      {children}
    </ Paper>
  )
}