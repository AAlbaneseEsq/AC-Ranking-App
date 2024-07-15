import React from 'react';
import { MyChart } from './features/chart/MyChart';
import MyRadio from './features/chart/MyRadio';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCSV } from './features/chart/chartSlice';
import Results from './features/chart/Results';

import './App.css';
import Submit from './features/chart/Submit';

function App() {

  const dispatch = useDispatch()
  useEffect(() => {

  dispatch(fetchCSV())

  }, [])

  return (
    <div className="App">
      <h1 style={{margin: "20px", fontSize: "3vw"}}>Album Club Correlation App</h1>
        <MyRadio />
        <MyChart />
        <Submit  />
        <Results />
    </div>
  );
}

export default App;
