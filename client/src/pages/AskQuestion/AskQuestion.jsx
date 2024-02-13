import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./AskQuestion.css";
import { askQuestion } from "../../actions/question";

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [videoURL, setVideoURL] = useState("");

  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (User) {
      if (questionTitle && questionBody && questionTags) {
        dispatch(
          askQuestion(
            {
              questionTitle,
              questionBody: questionBody + (codeSnippet ? "\n\nCode:\n" + codeSnippet : "") + (videoURL ? "\n\nVideo URL: " + videoURL : ""),
              questionTags,
              userPosted: User.result.name,
            },
            navigate
          )
        );
      } else {
        alert("Please enter all the fields");
      }
    } else {
      alert("Login to ask question");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };

  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you’re asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                value={questionTitle}
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              <textarea name=""
              
                id="ask-ques-body"
                contentEditable="true"
                className="question-body"
                onInput={(e) => {
                  setQuestionBody(e.target.innerHTML);
                }}
              ></textarea>
            </label>
            <label htmlFor="ask-ques-code">
              <h4>Code Snippet</h4>
              <textarea
                id="ask-ques-code"
                value={codeSnippet}
                onChange={(e) => {
                  setCodeSnippet(e.target.value);
                }}
                placeholder="Paste your code snippet here"
              ></textarea>
            </label>
            <label htmlFor="ask-ques-video">
              <h4>Video URL</h4>
              <input
                type="text"
                id="ask-ques-video"
                value={videoURL}
                onChange={(e) => {
                  setVideoURL(e.target.value);
                }}
                placeholder="Paste video URL here"
              />
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type="text"
                id="ask-ques-tags"
                value={questionTags}
                onChange={(e) => {
                  setQuestionTags(e.target.value.split(" "));
                }}
                placeholder="e.g. (xml typescript wordpress)"
              />
            </label>
          </div>
          <input
            type="submit"
            value="Reivew your question"
            className="review-btn"
          />
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
