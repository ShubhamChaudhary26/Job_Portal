import { Badge } from "./ui/badge";
import React from "react";
import {
  TableBody,
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div>
      <Table>
        <TableCaption>A List Of Your Applied Jobs </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Comapany</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length > 0 ? (
            allAppliedJobs?.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                <TableCell>{appliedJob?.job?.title}</TableCell>
                <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                <TableCell className="text-right ">
                  <Badge
                    className={
                      appliedJob?.status === "rejected"
                        ? "bg-red-500"
                        : appliedJob?.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }
                  >
                    {appliedJob?.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <span>Not Applied Any Job Yet</span>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
