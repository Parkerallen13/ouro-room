import { useDisclosure } from "@mantine/hooks";
import { AppShell, Group, Burger } from "@mantine/core";
import PageButtons from "./PageButtons";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function HomeAppShell({children}: Props) {
  const [opened, { toggle }] = useDisclosure();

  return (
 <AppShell
  header={{ height: 60 }}
  padding="md"
>
  <AppShell.Header>
    <Group h="100%" px="md">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      {/* <p>logo</p> */}
    </Group>
  </AppShell.Header>

  {/* Navbar becomes horizontal bar below header */}
  <Group p="md" bg="gray.1" justify="space-between">
    <PageButtons />
  </Group>

  <AppShell.Main>
    {children}
  </AppShell.Main>
</AppShell>
  );
}
