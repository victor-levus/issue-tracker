"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Skeleton from "@/app/components/Skeleton";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const [assignError, setAssignError] = useState(false);
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const assignIssue = async (userId: string) => {
    try {
      await axios.patch("/api/issues/" + issue.id, {
        assignedToUserId: userId === "unassigned" ? null : userId,
      });
    } catch (error) {
      setAssignError(true);
      toast.error("Changes could not be saved");
    }
  };

  console.log(assignError);
  return (
    <>
      <Select.Root
        onValueChange={assignIssue}
        defaultValue={
          !assignError ? issue.assignedToUserId || "unassigned" : "unassigned"
        }
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;
