import React from "react";
import Skeleton from "react-loading-skeleton";

const LoadingIssuePage = () => {
  return (
    <div className="max-w-xl">
      <div className="space-y-3">
        <Skeleton height={"3rem"} />

        <Skeleton height={"18rem"} />
        <Skeleton width={"8rem"} height={"3rem"} />
      </div>
    </div>
  );
};

export default LoadingIssuePage;
