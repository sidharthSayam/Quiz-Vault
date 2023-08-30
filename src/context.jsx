import { Typography } from "@mui/material";
import { useEffect, useContext, useReducer, createContext } from "react";

const AppContext = createContext(null);

const initialState = {
  questions: [],
  userSelectedAnswer: null, // This is the answer user selected. Here it will be 0 or 1
  correctAnswers: 0,
};

const appActionTypes = {
  ADD_QUESTIONS: "ADD_QUESTIONS",
  UPDATE_CORRECT_ANSWERS: "UPDATE_CORRECT_ANSWERS",
  UPDATE_USER_SELECTED_ANSWER: "UPDATE_USER_SELECTED_ANSWER",
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case appActionTypes.ADD_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
      };
    case appActionTypes.UPDATE_CORRECT_ANSWERS: {
      return {
        ...state,
        correctAnswers: state.correctAnswers + 1,
      };
    }
    case appActionTypes.UPDATE_BTN_INDEX: {
      return {
        ...state,
        userSelectedAnswer: action.answer,
      };
    }
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const getQustions = async () => {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=10&category=20&type=boolean"
      );
      const data = await res.json();

      dispatch({ type: appActionTypes.ADD_QUESTIONS, questions: data.results });
    };
    getQustions();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  return useContext(AppContext);
}

export { appActionTypes, AppProvider, AppContext, useAppContext };
