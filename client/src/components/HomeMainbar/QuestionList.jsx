import React from "react";
import Questions from "./Questions";
const QuestionList = ({ questionsList }) => {
  console.log("Value of questionsList:", questionsList);

  return (
    <>
      {questionsList?.map((question) => (
        <Questions question={question} key={question._id} />
      ))}
    </>
  );
};


export default QuestionList;