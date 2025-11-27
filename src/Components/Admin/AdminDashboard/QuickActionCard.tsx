import React from "react";
import { Link } from "react-router-dom";

interface Props {
  label: string;
  to: string;
}

export const QuickActionCard: React.FC<Props> = ({ label, to }) => (
  <Link
    to={to}
    className="px-4 py-3 bg-[#2495d8] text-white rounded-lg hover:bg-[#1a73b8] transition font-medium inline-block text-center"
  >
    {label}
  </Link>
);