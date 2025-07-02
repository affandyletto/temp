// src/components/Table/TableDataElement.jsx

import { useEffect, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { SkeletonTable } from "@/components/Skeleton/SkeletonTable";

const TableDataElement = ({ items, isLoading }) => {
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
            <th>Classification</th>
            <th className="flex items-center space-x-1">
              <span>Part Number</span>
              <ArrowUpDown className="size-4" />
            </th>
            <th>Accessories</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            // Show skeleton rows when loading
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonTable key={index} headerCount={7}/>
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
              <td>{data.classification}</td>
              <td>{data.partNumber}</td>
              <td>{data.accessories}</td>
              <td>{data.price}</td>
            </tr>
          ))}


          {dataSurvey.length === 0 && (
            <tr className="!border-none">
              <td colSpan={7}>
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

export default TableDataElement;
