import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSE" } });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"} mt={"8"}>
      <Flex direction={"column"} gap={"5"}>
        <IssueSummary closed={closed} inProgress={inProgress} open={open} />
        <IssueChart closed={closed} inProgress={inProgress} open={open} />
      </Flex>

      <LatestIssues />
    </Grid>
  );
}
