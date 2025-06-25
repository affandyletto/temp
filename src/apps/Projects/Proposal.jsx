// src/apps/Projects/Proposal.jsx

import Maintenance from "@/components/Maintenance";

const Proposal = () => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: "calc(100vh - 280px)" }}
    >
      <Maintenance
        title={"Something Exciting is Coming Soon!"}
        description={`We’re working hard to bring you a new experience. Stay tuned it’s going to be worth the wait!`}
      />
    </div>
  );
};

export default Proposal;
