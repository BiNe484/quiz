import React from 'react'
import Button from "@mui/material/Button";

export default function Progress({
  total,
  answered,
  current,
  onJump,
  isResult = false,
  questions = [],
  userAnswers = []
}) {
  const getColor = (idx) => {
    if (!isResult) {
      if (idx === current) return "primary";
      if (answered.includes(idx)) return "success";
      return "inherit";
    }

    // Khi xem kết quả
    if (userAnswers[idx] === questions[idx].correct) return "success";
    if (userAnswers[idx] !== null) return "error";
    return "inherit";
  };

  return (
    <div className="flex gap-2 mt-4 justify-center flex-wrap">
      {Array.from({ length: total }).map((_, idx) => (
        <Button
          key={idx}
          variant="contained"
          color={getColor(idx)}
          onClick={() => onJump(idx)}
          sx={{ minWidth: 40, height: 40, borderRadius: "50%" }}
        >
          {idx + 1}
        </Button>
      ))}
    </div>
  );
}
