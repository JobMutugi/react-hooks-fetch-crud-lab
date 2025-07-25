import React, { useState, useRef, useEffect } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  const isMounted = useRef(true);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      isMounted.current = false;
    };
  }, []);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "correctIndex" ? parseInt(value) : value,
    }));
  }

  function handleAnswerChange(index, value) {
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index] = value;
    setFormData((prev) => ({
      ...prev,
      answers: updatedAnswers,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: formData.prompt,
        answers: formData.answers,
        correctIndex: formData.correctIndex,
      }),
    })
      .then((r) => r.json())
      .then((newQuestion) => {
        onAddQuestion(newQuestion);
        // Only update form state if component is still mounted
        if (isMounted.current) {
          setFormData({
            prompt: "",
            answers: ["", "", "", ""],
            correctIndex: 0,
          });
        }
      });
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit} data-testid="question-form">
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleInputChange}
          />
        </label>
        {formData.answers.map((answer, index) => (
          <label key={index}>
            Answer {index + 1}:
            <input
              type="text"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
          </label>
        ))}
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleInputChange}
          >
            {formData.answers.map((_, index) => (
              <option key={index} value={index}>
                {index}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
