import React from "react";
import { RecentActivityItem } from "./RecentActivityItem";
import { timeAgo } from "../../../utils/timeAgo";
import { TeamActivity } from "../../../hooks/useRecentTeamActivities";

interface Props {
  activities: TeamActivity[];
}

export const RecentTeamActivityList: React.FC<Props> = ({ activities }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-xl font-semibold text-gray-700 mb-4">Activité récente des équipes</h3>
    <div className="space-y-3">
      {activities.map((team) => (
        <RecentActivityItem
          key={team.id}
          color="bg-green-500"
          title={`Équipe "${team.name}" modifiée`}
          createdAt={team.updated_at}
          timeAgoFn={timeAgo}
        />
      ))}
    </div>
  </div>
);
