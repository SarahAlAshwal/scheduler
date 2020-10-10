import { useState } from 'react';
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //This function performs the push and replace operations of a stack 
  function transition(newMode, replace = false) {
    if (!replace) {
      setHistory([...history, newMode]);
    } else {
      const temp = history.slice(0, history.length - 1);
      setHistory([...temp, newMode]);
    }
    setMode(newMode);
  }

  //This function performs the pop operation in a stack  
  function back() {

    if (history.length > 1) {
      const temp = history.slice(0, history.length - 1);

      setHistory(temp);
      setMode(temp[temp.length - 1]);
    }
  }


  return { mode, transition, back };
}