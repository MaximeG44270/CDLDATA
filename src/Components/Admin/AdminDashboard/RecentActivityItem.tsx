import React from "react";

interface Props {
  color: string;
  title: string;
  createdAt: string;
  timeAgoFn: (date: string) => string;
}

export const RecentActivityItem: React.FC<Props> = ({ color, title, createdAt, timeAgoFn }) => (
  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
    <div className={`w-2 h-2 ${color} rounded-full`}></div>
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-800">{title}</p>
      <p className="text-xs text-gray-500">{timeAgoFn(createdAt)}</p>
    </div>
  </div>
);