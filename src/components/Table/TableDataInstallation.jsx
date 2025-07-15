// src/components/Table/TableDataInstallation.jsx

import { useEffect, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { SkeletonTable } from "@/components/Skeleton/SkeletonTable";

const TableDataInstallation = ({ items, isLoading }) => {
  const [dataSurvey, setDataSurvey] = useState([]);

  useEffect(() => {
    setDataSurvey(items);
  }, [items]);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th className="flex items-center space-x-1">
              <span>Floorplan</span>
              <ArrowUpDown className="size-4" />
            </th>
            <th>EID#</th>
            <th className="flex items-center space-x-1">
              <span>Label</span>
              <ArrowUpDown className="size-4" />
            </th>
            <th>Installation</th>
            <th>Assigned</th>
            <th>Installed On</th>
            <th>Installed By</th>
            <th>Technician Assigned</th>
            <th>Estimated Installation Time</th>
            <th>Tech Type Required</th>
            <th>Specific Installtion Notes</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            // Show skeleton rows when loading
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonTable key={index} headerCount={11}/>
            ))
            ) :
          dataSurvey.map((data) => (
            <tr
              key={data.id}
              className={`border-t border-neutral-300 hover:bg-neutral-200 `}
            >
              <td>{data.floorplan}</td>
              <td className="text-blue-100">{data.eid}</td>
              <td>{data.label}</td>
              <td>{data.installation}</td>
              <td>{data.assigned}</td>
              <td>{data.installedOn}</td>
              <td>{data.installedBy}</td>
              <td>{data.technicianAssigned}</td>
              <td>{data.estimatedTime}</td>
              <td>{data.techTypeRequired}</td>
              <td>{data.specificInstallationNote}</td>
            </tr>
          ))}
          {dataSurvey.length === 0 && (
            <tr className="!border-none">
              <td colSpan={11}>
                <div className="space-y-1 text-center py-14">
                  <p className="text-sm font-semibold">
                    The keyword you are searching for was not found
                  </p>
                  <span className="text-xs text-secondary">
                    Try checking the spelling or using other keywords.
                  </span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableDataInstallation;
