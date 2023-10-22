import React from "react";
import { Skeleton } from "@/app/components";

const IssueFormSkeleton = () => {
  return (
    <div className="max-w-xl">
      <div className="space-y-3">
        <Skeleton height={"2.5rem"} />

        <Skeleton height={"20rem"} className="mt-5" />
        <Skeleton width={"8rem"} height={"2.5rem"} className="mt-14" />
      </div>
    </div>
  );
};

export default IssueFormSkeleton;
