import React from 'react'
import Button from "@mui/material/Button";

export default function Result({ questions, userAnswers, onReset, onExit }) {
  const correctCount = userAnswers.filter((ans, idx) => ans === questions[idx].correct).length;
  const score = (correctCount / questions.length * 10).toFixed(1);

  return (
    <div className="p-4 bg-white rounded shadow-md w-full max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Kết quả</h2>
      <p>Số câu đúng: {correctCount} / {questions.length}</p>
      <p>Điểm: {score} / 10</p>
      <div className="mt-4 flex justify-center gap-4">
        <Button variant="contained" color="primary" onClick={onReset}>Làm lại</Button>
        <Button variant="outlined" color="secondary" onClick={onExit}>Thoát</Button>
      </div>
    </div>
  );
}