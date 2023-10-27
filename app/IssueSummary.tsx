import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ closed, inProgress, open }: Props) => {
  const statusData: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSE" },
  ];
  return (
    <Flex gap={"3"}>
      {statusData.map((data) => (
        <Link key={data.status} href={`/issues/list?status=${data.status}`}>
          <Card>
            <Flex direction={"column"} gap={"1"}>
              <Text className="text-sm font-medium"> {data.label}</Text>

              <Text size={"8"} className="font-bold">
                {data.value}
              </Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};

export default IssueSummary;
