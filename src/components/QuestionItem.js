import React from "react";

function QuestionItem({ question, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete(){
    onDeleteQuestion(question)

    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
    .then(response => response.json())
    .then(() => console.log('deleted!'))
  }

  function handleOptionsChange(e){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({correctIndex: e.target.value})
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleOptionsChange}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
