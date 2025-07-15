// src/components/Table/TableDataBillMaterial.jsx

import { Fragment } from "react";
import { useEffect, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { SkeletonTable } from "@/components/Skeleton/SkeletonTable";

const TableDataBillMaterial = ({ items, isLoading }) => {
  const [dataBill, setDataBill] = useState([]);

  useEffect(() => {
    setDataBill(items);
  }, [items]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Element Name</th>
          <th className="flex items-center space-x-1">
            <span>Part Number</span>
            <ArrowUpDown className="size-4" />
          </th>
          <th>Accessories</th>
          <th>Element Quantity</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
            // Show skeleton rows when loading
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonTable key={index} headerCount={5}/>
            ))
            ) :
          dataBill.map((parent) => {
          return (
            <Fragment key={parent.id}>
              <tr className={`border-t border-neutral-300  !bg-gray-200`}>
                <td>{parent.type}</td>
                <td></td>
                <td></td>
                <td></td>
                <td>{parent.quantity}</td>
              </tr>

              {parent.data?.map((data) => (
                <Fragment key={data.id}>
                  <tr className={`border-t border-neutral-300 v`}>
                    <td>
                      {data.superCategory && (
                        <span className="text-secondary">
                          {data.superCategory}
                        </span>
                      )}
                      <p>{data.category}</p>
                    </td>
                    <td>{data.element}</td>
                    <td>{data.partNumber}</td>
                    <td>{data.accessories}</td>
                    <td>{data.quantity}</td>
                  </tr>

                  {data.subdata?.map((subdata) => (
                    <tr
                      key={subdata.id}
                      className={`border-t border-neutral-300`}
                    >
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{subdata.accessories}</td>
                      <td>{subdata.quantity}</td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </Fragment>
          );
        })}

        {dataBill.length === 0 && (
          <tr className="!border-none">
            <td colSpan={5}>
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
  );
};

export default TableDataBillMaterial;
