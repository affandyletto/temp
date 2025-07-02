// src/components/Table/TableDataSurvey.jsx

import { useEffect, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { SkeletonTable } from "@/components/Skeleton/SkeletonTable";

const TableDataSurvey = ({ items, isLoading }) => {
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
            <th>Status</th>
            <th className="flex items-center space-x-1">
              <span>Label</span>
              <ArrowUpDown className="size-4" />
            </th>
            <th>Category</th>
            <th>Descriptive Location</th>
            <th>Element Height</th>
            <th>Mounting Surface</th>
            <th>Budget Labor Cost</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            // Show skeleton rows when loading
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonTable key={index} headerCount={9}/>
            ))
            ):
          dataSurvey.map((data) => (
            <tr
              key={data.id}
              className={`border-t border-neutral-300 hover:bg-neutral-200 `}
            >
              <td>{data.floorplan}</td>
              <td className="text-blue-100">{data.eid}</td>
              <td>{data.status}</td>
              <td>{data.label}</td>
              <td>{data.category}</td>
              <td>{data.descriptiveLocation}</td>
              <td>{data.elementHeight}</td>
              <td>{data.mountingSurface}</td>
              <td>{data.budgetLaborCost}</td>
            </tr>
          ))}

          {dataSurvey.length === 0 && (
            <tr className="!border-none">
              <td colSpan={9}>
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

export default TableDataSurvey;
