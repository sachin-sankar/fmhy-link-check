"use client";
import {
  ActionIcon,
  AppShell,
  Burger,
  Button,
  Divider,
  Flex,
  Group,
  Input,
  NavLink,
  Stack,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBrandGithubFilled,
  IconSearch,
  IconWorldWww,
} from "@tabler/icons-react";
import VerificationForm from "./components/VerificationForm";

export default function Home() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="sm"
    >
      <AppShell.Header>
        <Group h="100%" p="sm">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Flex className="items-center">
              <img src="logo.png" alt="Logo" className="w-10" />
              <Title order={3} className="pt-1">
                FMHY
              </Title>
            </Flex>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <Tooltip.Floating label="View Github">
                <ActionIcon
                  variant="light"
                  size="xl"
                  aria-label="Github Link"
                  onClick={() => {
                    window.open(
                      "https://github.com/sachin-sankar/fmhy-link-check",
                      "_blank",
                    );
                  }}
                >
                  <IconBrandGithubFilled
                    style={{ width: "70%", height: "70%" }}
                    stroke={1.5}
                  />
                </ActionIcon>
              </Tooltip.Floating>{" "}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <NavLink
          label="Github"
          href="https://github.com/sachin-sankar/fmhy-link-check"
          description="View Source code on github"
          leftSection={<IconBrandGithubFilled />}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Stack className="pt-24 px-10">
          <Stack>
            <Title>Website Verification</Title>
            <Group>
              <Input
                variant="filled"
                size="md"
                placeholder="Enter website url"
                className="w-1/2"
                leftSection={<IconWorldWww />}
              />
              <Button
                size="md"
                className="w-min hover:scale-110 transition-all"
                variant="gradient"
                gradient={{ from: "grape", to: "violet", deg: 90 }}
                rightSection={<IconSearch />}
                fullWidth={false}
              >
                Run Checks
              </Button>
            </Group>
          </Stack>
          <Stack>
            <Divider />
            <VerificationForm />
          </Stack>
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}
