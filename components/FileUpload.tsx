import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      toast.success("File uploaded successfully!");
    } else {
      toast.error("Please select a file to upload");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{
            marginTop: '10px',
            maxWidth: '200px', // Set a smaller max width
            maxHeight: '200px', // Set a smaller max height
            width: 'auto',
            height: 'auto',
          }}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default FileUpload;
