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

  const renderRow = () => {
    return series.map((s:any )=> {
      return (
        <tr>
          <td>{s.title}</td>
          <td>{s.startTime}</td>
          <td>
            <span>{s.teams[0].name}</span>
            <img src={s.teams[0].logoUrl} alt="logo"/>
          </td>
          <td>
            <span>{s.teams[1].name}</span>
            <img src={s.teams[1].logoUrl} alt="logo"/>
          </td>
          <td>{s.tournament.name}</td>
        </tr>
      );
    });
  }


  return (
    <div className="Series">
      <table className="series-table">
        <thead>
          <tr>
            <th>title</th>
            <th>time</th>
            <th>team1</th>
            <th>team2</th>
            <th>tournament</th>
          </tr>
        </thead>
          <tbody>
           {renderRow()}
          </tbody>
      </table>
    </div>
  )
}

export default Series;
