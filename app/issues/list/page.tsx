import prisma from "@/prisma/client";
import { Button, Flex } from "@radix-ui/themes";
import { Link } from "@/app/components";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import { Status } from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const filterStatus = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: { status: filterStatus },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: { status: filterStatus },
  });

  return (
    <Flex direction={"column"} gap={"5"}>
      <Flex justify={"between"}>
        <IssueStatusFilter />
        <Button>
          <Link color="white" href={"/issues/new"}>
            New Issue
          </Link>
        </Button>
      </Flex>

      <IssueTable issues={issues} searchParams={searchParams} />

      <Pagination
        pageSize={pageSize}
        itemCount={issueCount}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";
// export const revalidate = 60;

export default IssuesPage;
