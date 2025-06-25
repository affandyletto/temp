// src/components/Badge/UserTypeBadge.jsx

const typeColorMap = {
  Client: "bg-green-100 text-green-800",
  Consultant: "bg-purple-100 text-purple-800",
  Associate: "bg-orange-100 text-orange-800",
  Employee: "bg-navy-100 text-navy-800",
};

const UserTypeBadge = ({ type }) => {
  const colorClass = typeColorMap[type] || "bg-gray-100 text-gray-800";

  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full ${colorClass}`}
    >
      {type}
    </span>
  );
};

export default UserTypeBadge;
