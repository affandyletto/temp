// src/components/Maintenance.js

const Maintenance = ({ title, description, type }) => {
  return (
    <div className="w-[528px] space-y-4 p-5">
      <img
        src={"/images/icon-maintenance.webp"}
        alt="Logo"
        className="mx-auto w-24"
      />
      <div className="space-y-3 text-center">
        <h5 className={`${type==="task"?'text-md':'text-2xl'} font-bold`}>{title}</h5>
        <p className={`${type==="task"?'text-[12px]':'text-base'} text-secondary`}>{description}</p>
      </div>
    </div>
  );
};

export default Maintenance;
