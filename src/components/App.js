import React, { useEffect, useState } from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(deletedQuestionId) {
    const updatedQuestions = questions.filter(q => q.id !== deletedQuestionId);
    setQuestions(updatedQuestions);
  }

function handleUpdateAnswer(updatedQuestion) {
  const updatedQuestions = questions.map((q) =>
    q.id === updatedQuestion.id ? updatedQuestion : q
  );
  setQuestions(updatedQuestions);
}


  return (
    <main>
      <nav>
        <button onClick={() => setPage("Form")}>New Question</button>
        <button onClick={() => setPage("List")}>View Questions</button>
      </nav>
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateAnswer={handleUpdateAnswer}
        />
      )}


      
    </main>
  );
}

export default App;
