import { getInitialData } from "../../utils/api";
import {
  addUserQuestion,
  saveUserAnswer,
  receiveUsers
} from "../actions/users";
import {
  addQuestion,
  receiveQuestions,
  saveQuestionAnswer
} from "../actions/questions";
import { _saveQuestionAnswer, _saveQuestion } from "../../utils/_DATA";

export function handleInitialData() {
  return dispatch => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const theQuestion = {
      optionOneText,
      optionTwoText,
      author: authedUser
    };
    return _saveQuestion(theQuestion).then(question => {
      console.log("debuddgin: ", question);
      dispatch(addQuestion(question));
      dispatch(addUserQuestion(authedUser, question.id));
    });
  };
}

export function handleAnswer(qid, option) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    console.log("option: ", option);
    const info = {
      authedUser: authedUser,
      qid,
      answer: option
    };
    _saveQuestionAnswer(info).then(() => {
      dispatch(saveQuestionAnswer(authedUser, qid, option));
      dispatch(saveUserAnswer(authedUser, qid, option));
    });
  };
}
