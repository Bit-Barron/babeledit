import React, { useState } from "react";
import { FiUpload, FiFile } from "react-icons/fi";

interface FileUploadProps {
  maxSize: number;
  acceptedTypes: string[];
  onUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFile = (file: File) => {
    if (file.name.endsWith(".json")) {
      setSelectedFile(file);
      onUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div
      className="w-full max-w-md mx-auto rounded-lg shadow-sm"
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 transition-colors
          ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          ${selectedFile ? "text-white" : "text-white hover:border-blue-400"}
        `}
      >
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />

        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          {selectedFile ? (
            <div className="flex items-center text-gray-600">
              <FiFile className="w-6 h-6 mr-2" />
              <span>{selectedFile.name}</span>
            </div>
          ) : (
            <>
              <FiUpload className="w-12 h-12 mb-3 text-gray-400" />
              <p className="text-sm text-gray-600 text-center">
                Drag and drop your JSON file here
                <br />
                <span className="text-gray-500">or click to browse</span>
              </p>
            </>
          )}
        </label>
      </div>
    </div>
  );
};

export default FileUpload;
