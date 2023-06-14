import { useState } from 'react';
import './App.css';
import Form from './Components/Form/Form';
import Quiz from './Components/Quiz/Quiz';

function App() {

  const [url, setUrl] = useState("");
  const [displayForm, setDisplayForm] = useState(true);

  function handleSubmit(data: { category: string, difficulty: string }) {
    setUrl(`https://opentdb.com/api.php?amount=10&category=${data.category}&difficulty=${data.difficulty}&type=multiple&encode=base64`);
    setDisplayForm(false);
  }

  return (
    <div className="App">
      {displayForm &&
        <div className="container">
          <h1>Quiz game</h1>
          <Form onSubmit={handleSubmit} />
        </div>
      }
      {!displayForm &&
        <Quiz url={url} />}
    </div>
  );
}

export default App;
