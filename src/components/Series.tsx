import React, {useEffect, useState} from 'react'
import axios from 'axios';
import moment from 'moment';

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

  const formatTime = (str: string) => {
    return moment(str).format('hh:mm');
  }

  const filteredRows = () => {
    const titleRegex = new RegExp(title, 'i');
    const tournamentRegex = new RegExp(tournament, 'i');
    return series.filter((s:any) => {
      return s['title'].match(titleRegex) && s['tournament']['name'].match(tournamentRegex);
    });
  }

  const renderHeadRow = () => {
    const headerCells = ['title', 'time', 'team1', 'team2', 'tournament'];
    return <tr className="Series__row--head">{ headerCells.map(c => <th className="Series__cell-head" key={c}>{c}</th>) }</tr>;
  }

  const renderBodyRows = () => {
    return filteredRows().map((s:any)=> {
      return (
        <tr className="Series__row--body" key={s.id}>
          <td className="Series__cell-body" >{s.title}</td>
          <td className="Series__cell-body" >{formatTime(s.startTime)}</td>
          {
            s.teams.map((t:any) => (
               <td className="Series__cell-body"  key={t.id}>
                <span className="Series__team-name" >{t.name}</span>
                <img className="Series__team-logo"  src={t.logoUrl} alt="logo"/>
              </td>
            ))
          }
          <td className="Series__cell-body" >{s.tournament.shortName}</td>
        </tr>
      );
    });
  }


  return (
    <div className="Series">
      <h1 className="Series__heading">On Going Games</h1>
      <div className="Series__filters">
        <input className="Series__filter" type="text" value={title} placeholder="Filter By Title..." onChange={e => setTitle(e.target.value) }/>
        <input className="Series__filter" type="text" value={tournament} placeholder="Filter By Tournament..." onChange={e => setTournament(e.target.value) }/>
      </div>
      <table className="Series__table">
        <thead>
          {renderHeadRow()}
        </thead>
        <tbody >
          {renderBodyRows()}
        </tbody>
      </table>
    </div>
  )
}

export default Series;
