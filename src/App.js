import React from 'react'
import { UseState } from './UseState'
import { UseReducer } from './useReducer';
import './App.css';

function App() {
  return (
    <div className="App">
    <UseState name="UseState"/>
    <UseReducer name="UseReducer"/>
    </div>
  );
}

export default App;
