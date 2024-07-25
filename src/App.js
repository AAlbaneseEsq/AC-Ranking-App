import React from 'react';
import { MyChart } from './features/chart/MyChart';
import MyRadio from './features/chart/MyRadio';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCSV } from './features/chart/chartSlice';
import Results from './features/chart/Results';
import Submit from './features/chart/Submit';
import styles from './features/chart/myChart.module.css'

function App() {

  const dispatch = useDispatch()
  useEffect(() => {

  dispatch(fetchCSV())

  }, [])

  return (
    <div className={styles.App}>
        <Submit  />        
        <MyRadio />
        <MyChart />
        <Results />
    </div>
  );
}

export default App;
