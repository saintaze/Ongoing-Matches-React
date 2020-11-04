import React, {useEffect, useState} from 'react'
import axios from 'axios';

import './Series.scss';

const Series = () => {

  const [series, setSeries] = useState([]);
  const [title, setTitle] = useState('');
  const [tournament, setTournament] = useState('');

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

  const filteredRows = () => {
    const titleRegex = new RegExp(title, 'i');
    const tournamentRegex = new RegExp(tournament, 'i');
    return series.filter((s:any) => {
      return s['title'].match(titleRegex) && s['tournament']['name'].match(tournamentRegex);
    });
  }

  const renderHeadRow = () => {
    const headerCells = ['title', 'time', 'team1', 'team2', 'tournament'];
    return <tr>{ headerCells.map(c => <th key={c}>{c}</th>) }</tr>;
  }

  const renderBodyRows = () => {
    return filteredRows().map((s:any )=> {
      return (
        <tr key={s.id}>
          <td>{s.title}</td>
          <td>{s.startTime}</td>
          {
            s.teams.map((t:any) => (
               <td key={t.id}>
                <span>{t.name}</span>
                <img src={t.logoUrl} alt="logo"/>
              </td>
            ))
          }
          <td>{s.tournament.name}</td>
        </tr>
      );
    });
  }


  return (
    <div className="Series">
      <div>
        <input type="text" value={title} placeholder="Filter By Title..." onChange={e => setTitle(e.target.value) }/>
        <input type="text" value={tournament} placeholder="Filter By Tournament..." onChange={e => setTournament(e.target.value) }/>
      </div>
      <table className="series-table">
        <thead>
          {renderHeadRow()}
        </thead>
        <tbody>
          {renderBodyRows()}
        </tbody>
      </table>
    </div>
  )
}

export default Series;
