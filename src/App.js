import React from 'react';
import { MyChart } from './features/chart/MyChart';
import MyRadio from './features/chart/MyRadio';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCSV } from './features/chart/chartSlice';
import Results from './features/chart/Results';
import Submit from './features/chart/Submit';
import MyCarousel from './features/chart/MyCarousel';
import styles from './features/chart/myChart.module.css'

function App() {

  const dispatch = useDispatch()
  useEffect(() => {

  dispatch(fetchCSV())

  }, [])

  return (
    <div>
        <Submit  />        
        <MyRadio />
        <MyChart />
        <Results />
        <div className={styles.MyCarousel}><MyCarousel /></div>
    </div>
  );
}

export default App;
