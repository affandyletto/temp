// src/components/Table/TableClientSnap.jsx

import { useEffect, useState } from "react";

const TableClientSnap = ({ items }) => {
  const [snaps, setSnaps] = useState([]);

  useEffect(() => {
    setSnaps(items);
  }, [items]);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Creator</th>
            <th>Created Date</th>
            <th>Photos</th>
          </tr>
        </thead>
        <tbody>
          {snaps.map((snap, i) => (
            <tr
              key={snap.id}
              className={`border-t border-neutral-300 hover:bg-neutral-200 `}
            >
              <td>{i + 1}</td>
              <td>{snap.title}</td>
              <td>{snap.creator}</td>
              <td>{snap.createdAt}</td>
              <td>
                <img
                  src={snap.image}
                  alt={`thumbnail-${snap.id}`}
                  className="size-14 bg-center object-cover bg-gray-200 rounded-lg"
                />
              </td>
            </tr>
          ))}
          {snaps.length === 0 && (
            <tr className="!border-none">
              <td colSpan={4}>
                <div className="space-y-1 text-center py-14">
                  <p className="text-sm font-semibold">
                    The project you are looking for was not found
                  </p>
                  <span className="text-xs text-secondary">
                    Try checking the spelling of the project name or using other
                    keywords.
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

export default TableClientSnap;
