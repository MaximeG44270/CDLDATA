import React from "react";
import { RecentActivityItem } from "./RecentActivityItem";

interface Activity {
  color: string;
  title: string;
  createdAt: string;
}

interface Props {
  activities: Activity[];
  timeAgoFn: (date: string) => string;
}

export const RecentActivityList: React.FC<Props> = ({ activities, timeAgoFn }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-xl font-semibold text-gray-700 mb-4">Activité récente</h3>
    <div className="space-y-3">
      {activities.map((a, index) => (
        <RecentActivityItem key={index} {...a} timeAgoFn={timeAgoFn} />
      ))}
    </div>
  </div>
);