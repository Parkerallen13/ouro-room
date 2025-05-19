import { useDisclosure } from "@mantine/hooks";
import { AppShell, Group, Burger, Skeleton } from "@mantine/core";
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
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <p>logo</p>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <PageButtons />
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
