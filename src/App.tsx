import { useState } from 'react';
import './Styles/App.css';
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
          <Form onSubmit={handleSubmit} />
        </div>
      }
      {!displayForm &&
        <div className="container">
          <Quiz url={url} />
        </div>
      }
    </div>
  );
}

export default App;
