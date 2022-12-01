import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(response => response.json())
    .then(fetchedQuestions => setQuestions(fetchedQuestions))
  }, [])

  function handleAddQuestion(newQuestion){
    setQuestions([...questions, newQuestion])
  }

  function handleDeleteQuestion(deletedQuestion){
    const questionsToDisplay = questions.filter(question => {
      return question !== deletedQuestion
    })
    setQuestions(questionsToDisplay)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion}/> : <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion}/>}
    </main>
  );
}

export default App;
