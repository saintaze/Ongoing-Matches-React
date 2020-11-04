import React, {useEffect, useState} from 'react'
import axios from 'axios';

import './Series.scss';

const Series = () => {

  const [series, setSeries] = useState([]);

  const fetchSeries = async () => {
    try {
      const {data} = await axios.get('http://localhost:3001/series');
      setSeries(data);
    }catch(e){
      console.log(e);
    }
   }
  
  useEffect(() => {
   fetchSeries();
  },[]);


  return (
    <div>
      <h1>hello</h1>
    </div>
  )
}

export default Series;
