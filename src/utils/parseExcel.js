import React from 'react'
import * as XLSX from 'xlsx';

export const parseExcel = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target.result; 
        const workbook = XLSX.read(arrayBuffer, { type: 'array' }); 

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const questions = json.slice(1).map(row => ({
          question: row[0] || '',
          options: [row[1], row[2], row[3], row[4]].filter(Boolean), // loại bỏ empty
          correct: row[5] || ''
        }));

        resolve(questions);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (err) => reject(err);

    reader.readAsArrayBuffer(file);
  });
};

export default parseExcel;