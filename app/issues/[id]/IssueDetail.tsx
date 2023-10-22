import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const IssueDetail = ({ issue }: { issue: Issue }) => {
  return (
    <div>
      <Heading as="h1">{issue.title}</Heading>
      <Flex gap={"2"} my={"2"}>
        <IssueStatusBadge status={issue.status} />
        <Text className="text-sm">{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full mt-5">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetail;
