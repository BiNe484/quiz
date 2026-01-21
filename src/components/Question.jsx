import React from "react";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function Question({
  question,
  options,
  selected,
  onSelect,
  isResult = false,
  correct
}) {
  const getVariant = (opt) => {
    if (!isResult) {
      return selected === opt ? "contained" : "outlined";
    }
    return "contained";
  };

  const getColor = (opt) => {
    if (!isResult) {
      return selected === opt ? "primary" : "inherit";
    }

    // Sau khi nộp bài
    if (opt === correct) return "success";
    if (opt === selected && opt !== correct) return "error";
    return "inherit";
  };

  const renderIcon = (opt) => {
    if (!isResult) return null;
    if (opt === correct) return <CheckCircleIcon fontSize="small" className="ml-2" />;
    if (opt === selected && opt !== correct)
      return <CancelIcon fontSize="small" className="ml-2" />;
    return null;
  };

  return (
    <div className="p-4 bg-white rounded shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{question}</h2>

      <div className="flex flex-col gap-3">
        {options.map((opt, idx) => (
          <Button
            key={idx}
            variant={getVariant(opt)}
            color={getColor(opt)}
            onClick={() => {
              if (!isResult) onSelect(opt);
            }}
            className="justify-between"
            fullWidth
          >
            <span>{opt}</span>
            {renderIcon(opt)}
          </Button>
        ))}
      </div>
    </div>
  );
}
