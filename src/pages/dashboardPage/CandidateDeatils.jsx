import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { candidatesData } from "./Candidate";

const tabs = ["Overview", "Documents", "Compliance", "CV"];

const CandidateDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");

  // Fetch actual candidate from data
  const candidateObj = candidatesData.find((c) => c.id === parseInt(id));

  // Fallback or mapping
  const candidate = candidateObj ? {
    name: candidateObj.name,
    role: candidateObj.position,
    status: candidateObj.status,
    completion: candidateObj.compliance + "%",
  } : {
    name: "Unknown Candidate",
    role: "N/A",
    status: "N/A",
    completion: "0%",
  };

  return (
    <div className="w-full">
      {/* Back Button */}
      <div 
        className="flex items-center text-[#4A5565] gap-2 cursor-pointer mb-6 w-fit hover:text-gray-800 transition-colors"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft size={14} />
        <p className="font-medium text-sm">Back to Candidates</p>
      </div>

      {/* Details Card with Tabs */}
      <div className="bg-white  shadow-lg rounded-xl w-full">
        {/* Top Info Section */}
        <div className="p-6 pb-2 flex justify-between items-start">
          <div>
            <h1 className="text-[#101828] text-[22px] font-semibold">{candidate.name}</h1>
            <p className="text-[#6A7282] text-sm mt-1">{candidate.role} - {candidate.status}</p>
          </div>
          
          <div className="bg-[#EBFDF3] text-[#027A48] px-3.5 py-1.5 rounded-full text-sm font-medium">
            {candidate.completion} Complete
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex px-6 border-b border-gray-100 gap-8 mt-4 ">
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer pb-3 text-[15px] font-medium transition-colors relative whitespace-nowrap ${
                activeTab === tab 
                  ? "text-[#2B7FFF]" 
                  : "text-[#667085] hover:text-gray-800"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#2B7FFF] rounded-t-sm z-10"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Content Section based on Active Tab */}
      <div className="mt-6">
        {activeTab === "Overview" && (
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold text-[#101828]">Overview Content</h2>
            <p className="text-gray-500 mt-2 text-sm">Placeholder for overview details...</p>
          </div>
        )}
        
        {activeTab === "Documents" && (
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold text-[#101828]">Documents Content</h2>
            <p className="text-gray-500 mt-2 text-sm">List of uploaded documents...</p>
          </div>
        )}

        {activeTab === "Compliance" && (
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold text-[#101828]">Compliance Checks</h2>
            <p className="text-gray-500 mt-2 text-sm">Verification statuses and certificates...</p>
          </div>
        )}

        {activeTab === "CV" && (
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold text-[#101828]">CV Viewer</h2>
            <p className="text-gray-500 mt-2 text-sm">PDF viewer for CV will go here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateDetails;
