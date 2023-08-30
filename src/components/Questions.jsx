import { useState } from "react";
import { Stack, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import Question from "./Question";
import Results from "./Results";
import { appActionTypes, useAppContext } from "../context";

function Questions() {
  const { state, dispatch } = useAppContext();
  const { questions } = state;
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const activeQuestion = questions[activeQuestionIdx];
  const showResultPage = activeQuestionIdx === questions.length;

  const handlePrev = () => {
    setActiveQuestionIdx((prev) => prev - 1);
  };

  console.log(
    "hello",
    activeQuestion?.correct_answer,
    state.userSelectedAnswer
  );
  console.log("answer,", state.correctAnswers);
  const handleNext = () => {
    setActiveQuestionIdx((prev) => prev + 1);
    if (activeQuestion.correct_answer === state.userSelectedAnswer) {
      dispatch({
        type: appActionTypes.UPDATE_CORRECT_ANSWERS,
      });
    }
  };

  if (questions.length === 0) {
    return <Typography sx={{ position: "absolute" }}>Loading</Typography>;
  }
  return (
    <Stack sx={{ position: "absolute" }}>
      <AnimatePresence mode="wait">
        {!showResultPage && (
          <Question
            key={activeQuestionIdx}
            ques={activeQuestion}
            handleNext={handleNext}
            handlePrev={handlePrev}
            activeQuestionIdx={activeQuestionIdx}
          />
        )}
        {showResultPage && <Results />}
      </AnimatePresence>
    </Stack>
  );
}

export default Questions;
