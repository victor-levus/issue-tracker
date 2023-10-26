"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { data: session, status } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
    // { label: "Account", href: "/account" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={"/"}>
        <AiFillBug className="text-2xl text-zinc-600 " />
      </Link>
      <ul className="flex space-x-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classnames({
                "text-zinc-900": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <Box>
        {status === "authenticated" && (
          <Link href={"/api/auth/signout"}>Log Out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href={"/api/auth/signin"}>Login</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
