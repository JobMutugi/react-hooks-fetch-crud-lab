import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => onDeleteQuestion(id));
  }

  function handleAnswerChange(e) {
    const newCorrectIndex = parseInt(e.target.value);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        // Update parent state with the updated question
        onUpdateAnswer(updatedQuestion);
      });
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>{prompt}</h5>
      <label>
        Correct Answer:
        <select
          value={correctIndex.toString()}
          onChange={handleAnswerChange}
          aria-label="Correct Answer" 
        >
          {answers.map((answer, index) => (
            <option key={index} value={index.toString()}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
