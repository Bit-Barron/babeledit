import React, { useState } from "react";
import { FiUpload, FiFile, FiX } from "react-icons/fi";
import { useFileUploadStore } from "@/store/file-upload-store";

interface FileUploadProps {
  maxSize: number;
  acceptedTypes: string[];
  onUpload: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const { selectedFiles, removeFile, setSelectedFiles } = useFileUploadStore();

  const handleFiles = (files: FileList) => {
    const jsonFiles = Array.from(files).filter((file) =>
      file.name.endsWith(".json")
    );
    setSelectedFiles([...selectedFiles, ...jsonFiles]);
    onUpload([...selectedFiles, ...jsonFiles]);
  };

  const handleFileRemove = (index: number) => {
    removeFile(index);
    onUpload(selectedFiles.filter((_, i) => i !== index));
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
    handleFiles(e.dataTransfer.files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div
        className="rounded-lg shadow-sm"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div
          className={`
            border-2 border-dashed rounded-lg p-8 transition-colors
            ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
            text-white hover:border-blue-400
          `}
        >
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            multiple
          />

          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <FiUpload className="w-12 h-12 mb-3 text-gray-400" />
            <p className="text-sm text-gray-600 text-center">
              Drag and drop your JSON files here
              <br />
              <span className="text-gray-500">or click to browse</span>
            </p>
          </label>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-800 rounded-lg"
            >
              <div className="flex items-center text-gray-300">
                <FiFile className="w-4 h-4 mr-2" />
                <span className="text-sm">{file.name}</span>
              </div>
              <button
                onClick={() => handleFileRemove(index)}
                className="text-gray-400 hover:text-gray-200"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
