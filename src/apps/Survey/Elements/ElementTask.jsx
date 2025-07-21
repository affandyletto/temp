
import Maintenance from "@/components/Maintenance";

export const ElementTask=()=>{
	return(
		<>
		<div className="flex justify-between items-center">
	        <h2 className="text-base font-semibold text-gray-800">Tasks</h2>
	      </div>
		<div
	        className="flex items-center justify-center"
	      >
	        <Maintenance
	          title={"Tasks Are Coming Soon!"}
	          description={`We're working on a powerful task management system to help you stay on track. Stay tuned, it's on the way!`}
	          type="task"
	        />
	      </div>
	    </>
	)
}