import React from "react";
import { FaUsers } from "react-icons/fa";
import { FiUsers, FiAlertCircle } from "react-icons/fi";
import { GrDocumentMissing } from "react-icons/gr";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";





const alertsData = [
  {
    id: 1,
    type: "warning",
    message: "DBS certificate for John Smith expires in 5 days",
    time: "2 hours ago",
    iconColor: "text-[#FF6900]",
  },
  {
    id: 2,
    type: "error",
    message: "Sarah Johnson missing ID verification",
    time: "5 hours ago",
    iconColor: "text-[#FB2C36]",
  },
  {
    id: 3,
    type: "warning",
    message: "First Aid certificate for Mike Davis expires in 10 days",
    time: "1 day ago",
    iconColor: "text-[#FF6900]",
  },
  {
    id: 4,
    type: "warning",
    message: "First Aid certificate for Mike Davis expires in 10 days",
    time: "1 day ago",
    iconColor: "text-[#FF6900]",
  },
];

const activityData = [
  {
    id: 1,
    title: "Document uploaded",
    description: "Emma Wilson - DBS Certificate",
    time: "10 mins ago",
  },
  {
    id: 2,
    title: "Compliance pack generated",
    description: "Tom Harris - Healthcare Pack",
    time: "1 hour ago",
  },
  {
    id: 3,
    title: "CV formatted",
    description: "Lisa Brown - Candidate CV processed",
    time: "2 hours ago",
  },
  {
    id: 4,
    title: "Reference received",
    description: "David Clark - Reference from NHS Trust",
    time: "3 hours ago",
  },
];

const Overview = () => {
  return (
    <div>
     <div className="grid grid-cols-12 gap-x-15 gap-y-7">

      <div className="bg-white shadow-md rounded-lg p-6 col-span-3">
        <div className="p-3 rounded-xl bg-[#2B7FFF] w-fit">
        <FiUsers size={24} className="text-white " />

        </div>
        <h1 className="text-black text-3xl font-semibold mt-3.5">124</h1>
        <p className="text-gray-600 mt-1.5">Total Candidates</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 col-span-3">
        <div className="p-3 rounded-xl bg-[#FB2C36] w-fit">
        <GrDocumentMissing size={24} className="text-white " />

        </div>
        <h1 className="text-black text-3xl font-semibold mt-3.5">14</h1>
        <p className="text-gray-600 mt-1.5">Missing Docs</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 col-span-3">
        <div className="p-3 rounded-xl bg-[#FF6900] w-fit">
        <MdErrorOutline  size={24} className="text-white " />

        </div>
        <h1 className="text-black text-3xl font-semibold mt-3.5">4</h1>
        <p className="text-gray-600 mt-1.5">Quality failed</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 col-span-3">
        <div className="p-3 rounded-xl bg-[#00C950] w-fit">
        <IoMdCheckmarkCircleOutline size={24} className="text-white " />

        </div>
        <h1 className="text-black text-3xl font-semibold mt-3.5">69</h1>
        <p className="text-gray-600 mt-1.5">Completed</p>
      </div>


      <div className="bg-white shadow-md rounded-lg p-6 col-span-6">
        <h3 className="text-lg font-semibold text-[#101828] mb-4">Alerts</h3>

        <div className="flex flex-col gap-3">
          {alertsData.map((alert) => (
            <div key={alert.id} className="flex gap-3 bg-[#F9FAFB] p-3 rounded-xl">
              <FiAlertCircle size={20} className={`${alert.iconColor} flex-shrink-0 mt-0.5`} />
              <div>
                <h4 className="text-[#101828] text-base">{alert.message}</h4>
                <p className="text-[#6A7282] text-sm mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="bg-white shadow-md rounded-lg p-6 col-span-6">
        <h3 className="text-lg font-semibold text-[#101828] mb-4">Activity Feed</h3>

        <div className="flex flex-col gap-6 mt-2">
          {activityData.map((activity) => (
            <div key={activity.id} className="flex gap-3 items-start">
              <div className="w-2 h-2 rounded-full bg-[#2563EB] mt-1.5 flex-shrink-0"></div>
              <div className="flex flex-col">
                <h4 className="text-[#101828] font-medium text-base">{activity.title}</h4>
                <p className="text-[#4A5565] text-sm mt-0.5">{activity.description}</p>
                <p className="text-[#6A7282] text-xs mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

     </div>
    </div>
  );
};

export default Overview;
