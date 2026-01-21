import React, { useState } from "react";
import ImportExcel from "../components/ImportExcel";
import Question from "../components/Question";
import Progress from "../components/Progress";
import Result from "../components/Result";
import parseExcel from "../utils/parseExcel";
import Button from "@mui/material/Button";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleImport = async (file) => {
    const data = await parseExcel(file);
    setQuestions(data);
    setUserAnswers(Array(data.length).fill(null));
  };

  const handleStart = () => setIsStarted(true);

  const handleSelect = (value) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = value;
    setUserAnswers(newAnswers);
    // auto next if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleSubmit = () => {
    const unanswered = userAnswers.findIndex(ans => ans === null);
    if (unanswered !== -1) {
      setCurrentIndex(unanswered);
      alert('Vui lòng trả lời hết câu hỏi!');
    } else {
      setIsSubmitted(true);
    }
  };

  const handleJump = (idx) => setCurrentIndex(idx);

  const answeredIndexes = userAnswers
  .map((ans, idx) => (ans !== null ? idx : null))
  .filter(idx => idx !== null);

  const handleReset = () => {
    setUserAnswers(Array(questions.length).fill(null));
    setCurrentIndex(0);
    setIsSubmitted(false);
    setIsStarted(false);
  };

  const handleExit = () => window.location.reload();

  if (!questions.length) {
    return <ImportExcel onImport={handleImport} />;
  }

  if (!isStarted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl mb-4">Đã import thành công!</p>
        <Button variant="contained" onClick={handleStart}>Bắt đầu làm bài</Button>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-4">
        <Result
          questions={questions}
          userAnswers={userAnswers}
          onReset={handleReset}
          onExit={handleExit}
        />

        <Question
          question={questions[currentIndex].question}
          options={questions[currentIndex].options}
          selected={userAnswers[currentIndex]}
          correct={questions[currentIndex].correct}
          isResult={true}
        />

        <Progress
          total={questions.length}
          current={currentIndex}
          onJump={handleJump}
          isResult={true}
          questions={questions}
          userAnswers={userAnswers}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Question
        question={questions[currentIndex].question}
        options={questions[currentIndex].options}
        selected={userAnswers[currentIndex]}
        onSelect={handleSelect}
      />
      <Progress total={questions.length} answered={answeredIndexes} current={currentIndex} onJump={handleJump} />
      <Button variant="contained" color="primary" onClick={handleSubmit} className="mt-4">Nộp bài</Button>
    </div>
  );
}