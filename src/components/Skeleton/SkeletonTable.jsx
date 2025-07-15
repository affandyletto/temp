export const SkeletonTable = ({ headerCount }) => (
  <tr className="border-t border-neutral-300 animate-pulse">
    {Array.from({ length: headerCount }).map((_, index) => (
      <td key={index}>
        <div className="h-6 bg-neutral-300 rounded w-3/5"></div>
      </td>
    ))}
  </tr>
);