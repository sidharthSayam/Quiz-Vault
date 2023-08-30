import { Stack, Typography, Button, styled } from "@mui/material";
import { motion } from "framer-motion";

import ChoiceButton from "./ChoiceButton";
import { useAppContext } from "../context";

function Question({ ques, activeQuestionIdx, handleNext, handlePrev }) {
  const { state, dispatch } = useAppContext();
  const { questions } = state;
  const { question, correct_answer: correctAnswer } = ques;
  return (
    <Stack
      p={4}
      spacing={2}
      sx={{
        maxWidth: "350px",
        background: "#fff",
        color: "#000",
        borderRadius: "1rem",
        opacity: 0.9,
        boxShadow: "4px 4px 10px 10px #fff, 4px 4px 10px 10px #0ff",
      }}
      component={motion.div}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-300%" }}
    >
      <Typography>{question}</Typography>
      {/* <Typography>{correctAnswer}</Typography> */}
      <Stack spacing={2}>
        <ChoiceButton />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button onClick={handlePrev} disabled={activeQuestionIdx === 0}>
          Previous
        </Button>
        <Button onClick={handleNext}>
          {activeQuestionIdx === questions.length - 1 ? "Results" : "Next"}
        </Button>
      </Stack>
    </Stack>
  );
}

export default Question;
