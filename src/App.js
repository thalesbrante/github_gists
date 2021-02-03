import { useEffect } from 'react';
import './App.css';
import { Gists } from './components/Gists';
import { APP_TITLE } from './config/config';

function App() {

  useEffect(() => {
    document.title = APP_TITLE;
 }, []);

  return (
    <Gists/>
  );
}

export default App;
