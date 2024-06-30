import { useState } from 'react';
import Form from './Components/Form/Form';
import Quiz from './Components/Quiz/Quiz';

function App() {

  const [url, setUrl] = useState("");
  const [started, setStarted] = useState(false);

  function handleSubmit(category: string, difficulty: string) {
    setUrl(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple&encode=base64`);
    setStarted(true);
  }

  return (
    <div className="h-dvh w-full bg-stone-200 md:bg-white flex flex-col items-center justify-center">
      {
        !started &&
          <Form onSubmit={handleSubmit} />
      }
      {
        started &&
          <Quiz url={url} />
      }
    </div>
  );
}

export default App;
