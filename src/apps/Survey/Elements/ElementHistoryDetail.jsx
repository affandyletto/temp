import { ElementPhotos } from "@/apps/Survey/Elements/ElementPhotos"
import { ElementHistoryInformation } from "@/apps/Survey/Elements/ElementHistoryInformation"
import SurveyComment from "@/components/Section/SurveyComment"
import ToggleTabs from "@/components/Toggle/ToggleTabs";
import React, { useState } from 'react';

export const ElementHistoryDetail = () => {
	const [activeTab, setActiveTab] = useState(0)
	
	const renderTabContent = () => {
		switch (activeTab) {
			case 0: // Photos
				return <ElementPhotos isHistory={true} />
			case 1: // Comment
				return <SurveyComment isHistory={true} />
			case 2: // Info
				return <ElementHistoryInformation />
			default:
				return <ElementPhotos isHistory={true} />
		}
	}

	return (
		<>
		<div className="w-72 bg-white border-l border-slate-200 h-full flex flex-col relative">
		      {/* Header */}
		      <div className="px-3 pt-4 pb-3 border-b border-slate-200 flex items-center justify-between flex-shrink-0">

		        <div className="flex-1">
		          <h2 className="text-base font-bold text-gray-800">Element-02</h2>
		          <p className="text-xs text-zinc-500">ID: 63115</p>
		        </div>

		      </div>

		      {/* Scrollable Content */}
		      <div className="flex-1 overflow-y-auto min-h-0">
		        <div className="px-3 py-4 space-y-4">
		          {/* Input Field */}
		          	<div className="space-y-1">
			            <label className="text-sm text-gray-800">Element Label</label>
			            <div className="p-3 bg-slate-100 rounded-lg">
			              <span className="text-sm text-zinc-500">Input label</span>
			            </div>
		          	</div>
					<div className="w-full">
					<ToggleTabs
							tabs={["Photos", "Comment", "Info"]}
							value={activeTab}
							onChange={setActiveTab}
							isSurvey={true}
						/>
					</div>

					{renderTabContent()}
				</div>
		      </div>
	    </div>
		</>
	)
}