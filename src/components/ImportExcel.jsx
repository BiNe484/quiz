import React from 'react'
import Button from "@mui/material/Button";

export default function ImportExcel({ onImport }) {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) onImport(file);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input type="file" accept=".xlsx" onChange={handleFileChange} className="hidden" id="excel-input" />
      <label htmlFor="excel-input">
        <Button variant="contained" component="span" className="bg-blue-500 hover:bg-blue-600">
          Import Excel
        </Button>
      </label>
    </div>
  );
}