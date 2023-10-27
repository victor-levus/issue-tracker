import prisma from "@/prisma/client";
import { Button, Flex, Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import React from "react";
import NextLink from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";
import { Issue, Status } from "@prisma/client";
import { IoChevronUp } from "react-icons/io5";
import Pagination from "@/app/components/Pagination";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
    {
      label: "Assign To",
      value: "assignedToUserId",
      className: "hidden md:table-cell",
    },
  ];

  const statuses = Object.values(Status);
  const filterStatus = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
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
    <div>
      <Flex mb={"5"} justify={"between"}>
        <IssueStatusFilter />
        <Button>
          <Link color="white" href={"/issues/new"}>
            New Issue
          </Link>
        </Button>
      </Flex>

      <Table.Root variant="surface" mb={"5"}>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.label}
                className={column.className}
              >
                <NextLink
                  href={{ query: { ...searchParams, orderBy: column.value } }}
                >
                  {column.label}{" "}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <IoChevronUp className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link color="black" href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.assignedToUserId || "Not Assigned"}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination
        pageSize={pageSize}
        itemCount={issueCount}
        currentPage={page}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";
// export const revalidate = 60;

export default IssuesPage;
