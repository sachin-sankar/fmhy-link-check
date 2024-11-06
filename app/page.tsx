"use client";
import { AppShell, Burger, Flex, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function Home() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Flex className="items-center">
              <img src="logo.png" alt="Logo" className="w-10" />
              <Title order={3} className="pt-1">
                FMHY
              </Title>
            </Flex>
            <Group ml="xl" gap={0} visibleFrom="sm"></Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}></AppShell.Navbar>

      <AppShell.Main>
        Navbar is only visible on mobile, links that are rendered in the header
        on desktop are hidden on mobile in header and rendered in navbar
        instead.
      </AppShell.Main>
    </AppShell>
  );
}
