import { useRef, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { HiOutlineDocumentDownload } from "react-icons/hi";

const UploadPDF = ({ onFileSelect }) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFile = (file) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    setFileName(file.name);
    onFileSelect?.(file); // optional callback
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div className="bg-white p-10">
      <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center gap-2 transition bg-[#F9FAFB]
        ${isDragging ? "border-[#2D468A] bg-blue-50" : "border-[#A0A0A0]"}`}
    >
      <FaFilePdf className="w-12 h-12 text-[#A0A0A0]" />

      <p className="text-[#4A5565] text-center">
        {fileName ? fileName : "Drop CVs here or click to browse"}
      </p>

      <p className="text-[#7C7C7C] text-xs">
        Support for PDF, DOC, DOCX formats
      </p>

      <p className="text-[#4A5565] text-center">or</p>

      <button
        type="button"
        onClick={() => inputRef.current.click()}
        className="bg-[#2D468A] text-white px-10 py-2 rounded-md flex items-center gap-2 hover:bg-[#354e92] cursor-pointer"
      >
        <HiOutlineDocumentDownload className="w-6 h-6" />
        Select a file
      </button>

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        className="hidden"
      />
    </div>
    </div>
  );
};

export default UploadPDF;
