import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ currentPage, itemCount, pageSize }: Props) => {
  const numberOfPage = Math.ceil(itemCount / pageSize);

  if (numberOfPage <= 1) return null;

  return (
    <Flex align={"center"} gap={"2"}>
      <Text>
        Page {currentPage} of {numberOfPage}{" "}
      </Text>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <AiOutlineDoubleLeft />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <AiOutlineLeft />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === numberOfPage}
      >
        <AiOutlineRight />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === numberOfPage}
      >
        <AiOutlineDoubleRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
