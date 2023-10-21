import React from "react";
import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

interface Props {
  href: string;
  children: string;
  color?: string;
}

const Link = ({ href, children, color }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink style={{ color: color }}>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
