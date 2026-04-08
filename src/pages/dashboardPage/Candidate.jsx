import React, { useState, useRef, useEffect } from 'react';
import { FiFilter, FiEye, FiChevronDown } from 'react-icons/fi';
import Table from '../../components/Table';
import { Link } from 'react-router-dom';

export const candidatesData = [
  {
    id: 1,
    name: "John Smith",
    position: "Nurse",
    status: "Available",
    compliance: 95,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    position: "Doctor",
    status: "Unavailable",
    compliance: 60,
  },
  {
    id: 3,
    name: "Mike Davis",
    position: "Doctor",
    status: "Available",
    compliance: 100,
  },
  {
    id: 4,
    name: "Emma Wilson",
    position: "Nurse",
    status: "Available",
    compliance: 85,
  },
  {
    id: 5,
    name: "Tom Harris",
    position: "Doctor",
    status: "Unavailable",
    compliance: 70,
  },
  {
    id: 6,
    name: "Lisa Brown",
    position: "Doctor",
    status: "Available",
    compliance: 90,
  },
  {
    id: 7,
    name: "Sarah Johnson",
    position: "Doctor",
    status: "Unavailable",
    compliance: 60,
  },
  {
    id: 8,
    name: "Mike Davis",
    position: "Doctor",
    status: "Available",
    compliance: 100,
  },
  {
    id: 9,
    name: "Emma Wilson",
    position: "Nurse",
    status: "Available",
    compliance: 85,
  },
  {
    id: 10,
    name: "Tom Harris",
    position: "Doctor",
    status: "Unavailable",
    compliance: 70,
  },
  {
    id: 11,
    name: "Lisa Brown",
    position: "Doctor",
    status: "Available",
    compliance: 90,
  },
];

const CustomSelect = ({ value, onChange, options, minWidth = "140px" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref} style={{ minWidth }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-2.5 bg-white cursor-pointer hover:border-gray-300 transition-colors"
      >
        <span className="text-[#344054] text-sm font-medium">{value}</span>
        <FiChevronDown className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-full bg-white border border-gray-100 rounded-lg shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] z-50 overflow-hidden py-1">
          {options.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => { onChange(opt.value); setIsOpen(false); }}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${value === opt.value ? 'bg-[#F5F8FF] text-[#2B7FFF] font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const StatusBadgeDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium cursor-pointer transition-colors ${value === 'Available' ? 'bg-[#EBFDF3] text-[#027A48] hover:bg-[#D1FADF]' : 'bg-[#FEF0C7] text-[#DC6803] hover:bg-[#FDEAD7]'
          }`}
      >
        {value}
        <FiChevronDown size={14} className={`mt-0.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className={`absolute top-full mt-1.5 left-0 w-36 bg-white border border-gray-100 rounded-lg shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] z-50 overflow-hidden py-1`}>
          {["Available", "Unavailable"].map((opt, idx) => (
            <div
              key={idx}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className={`px-3 py-2 text-[13px] cursor-pointer flex items-center gap-2 transition-colors ${value === opt ? 'bg-gray-50 font-medium' : 'hover:bg-gray-50'}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${opt === 'Available' ? 'bg-[#027A48]' : 'bg-[#DC6803]'}`}></div>
              <span className={opt === 'Available' ? 'text-[#027A48]' : 'text-[#DC6803]'}>{opt}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Candidate = () => {
  const [candidates, setCandidates] = useState(candidatesData);
  const [roleFilter, setRoleFilter] = useState("All role");
  const [statusFilter, setStatusFilter] = useState("Status");

  const columnFilters = [];
  if (roleFilter && roleFilter !== "All role") {
    columnFilters.push({ id: "position", value: roleFilter });
  }
  if (statusFilter && statusFilter !== "Status") {
    columnFilters.push({ id: "status", value: statusFilter });
  }

  const handleStatusChange = (id, newStatus) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const getComplianceColor = (value) => {
    if (value >= 90) return "text-[#00C950]";
    if (value >= 70) return "text-[#E04F16]";
    return "text-[#FB2C36]";
  };

  const tableHeads = [
    {
      key: "name",
      Title: "Name",
      width: "25%",
      render: (row) => <span className="font-medium text-[#101828] text-left block w-full">{row.name}</span>,
      sortable: true,
    },
    {
      key: "position",
      Title: "Position",
      width: "20%",
      render: (row) => <span className="text-[#667085] text-left block w-full">{row.position}</span>,
      sortable: true,
    },
    {
      key: "status",
      Title: "Status",
      filterFn: (row, columnId, filterValue) => {
        return row.getValue(columnId) === filterValue;
      },
      width: "20%",
      render: (row) => (
        <div className="flex justify-start w-full">
          <StatusBadgeDropdown value={row.status} onChange={(val) => handleStatusChange(row.id, val)} />
        </div>
      ),
      sortable: true,
    },
    {
      key: "compliance",
      Title: "Compliance",
      width: "20%",
      render: (row) => (
        <span className={`font-bold block text-left w-full ${getComplianceColor(row.compliance)}`}>
          {row.compliance}%
        </span>
      ),
      sortable: true,
    },
    {
      key: "action",
      Title: "Action",
      width: "15%",
      render: (row) => (
        <div className="flex justify-start w-full">
          <Link to={`/candidate/details/${row.id}`} >
          <button className="flex items-center gap-2 bg-[#2B7FFF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm">
            <FiEye size={16} />
            View
          </button>
          </Link>
        </div>
      ),
      sortable: false,
    },
  ];

  const filtersComponent = (
    <>
      <CustomSelect
        value={roleFilter}
        onChange={setRoleFilter}
        options={[
          { label: "All role", value: "All role" },
          { label: "Nurse", value: "Nurse" },
          { label: "Doctor", value: "Doctor" }
        ]}
      />

      <CustomSelect
        value={statusFilter}
        onChange={setStatusFilter}
        options={[
          { label: "Status", value: "Status" },
          { label: "Available", value: "Available" },
          { label: "Unavailable", value: "Unavailable" }
        ]}
      />

      <button className="flex items-center gap-2 bg-[#2B7FFF] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm">
        <FiFilter />
        Filter
      </button>
    </>
  );

  return (
    <div className="w-full">
      <div className="bg-white w-full shadow-lg rounded-lg p-6">
        <Table
          TableHeads={tableHeads}
          TableRows={candidates}
          searchPlaceholder="Search candidates..."
          filtersComponent={filtersComponent}
          externalColumnFilters={columnFilters}
        />
      </div>
    </div>
  );
};

export default Candidate;