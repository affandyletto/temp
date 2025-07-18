import {Topnav} from "@/apps/Survey/Topnav";
import {LibrarySidebar} from "@/apps/Survey/LibrarySidebar";

export const Survey = () => {
  return (
    <div className="h-screen overflow-y-hidden flex flex-col">
      <Topnav/>
      <LibrarySidebar/>
    </div>
  );
};