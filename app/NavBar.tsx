"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import Skeleton from "@/app/components/Skeleton";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-4">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href={"/"}>
              <AiFillBug
                className="text-2xl text-zinc-600 "
                style={{ fill: "var(--accent-11)" }}
              />
            </Link>

            <NavLinks />
          </Flex>

          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
    // { label: "Account", href: "/account" },
  ];

  return (
    <ul className="flex space-x-4">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <Skeleton width={"3rem"} />;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href={"/api/auth/signin"}>
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Box>
            <BsPersonFill className="text-4xl text-zinc-600 cursor-pointer" />
          </Box>
          {/* <Avatar fallback="?" src={session.user?.image!} radius='full' className='cursor-pointer' referrerPolicy='no-referrer' /> */}
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text>User: {session!.user?.name!}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Label>
            <Text>Email: {session!.user?.email!}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item className="my-3">
            <Link href={"/api/auth/signout"}>LogOut</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
