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

  const formatTime = (dateTime: string) => {
    return moment(dateTime).format('hh:mm');
  }

  const isValidSearch = (char: string) => {
    return /^[a-zA-Z\d\s]+$/.test(char);
  }

  const handleTitleChange = e => {
    
  }

  const filteredRows = () => {
    // if(!isValidSearch(title) || !isValidSearch(tournament)) return series
    const titleRegex = new RegExp(title, 'i');
    const tournamentRegex = new RegExp(tournament, 'i');
    return series.filter((s:any) => {
      return s['title'].match(titleRegex) && s['tournament']['shortName'].match(tournamentRegex);
    });
  }

  const renderBodyRows = () => {
    if(!filteredRows().length){
      return <tr className="Series__no-match Series__row Series__row--body"><td colSpan={5}>No Match... :(</td></tr>;
    }
    return filteredRows().map((s:any)=> {
      return (
        <tr className="Series__row Series__row--body" key={s.id}>
          <td className="Series__cell--body" >{s.title}</td>
          <td className="Series__cell--body" >{formatTime(s.startTime)}</td>

          <td className="Series__cell--body Series__cell--body-team-1" >
            <span className="Series__team-name" >{s.teams[0].name}</span>
            <img className="Series__team-logo" draggable={false} src={s.teams[0].logoUrl} />
            <span className="Series__cross">&times;</span>
          </td>

          <td className="Series__cell--body Series__cell--body-team-2" >
            <img className="Series__team-logo" draggable={false} src={s.teams[1].logoUrl} />
            <span className="Series__team-name" >{s.teams[1].name}</span>
          </td>

          <td className="Series__cell--body" >{s.tournament.shortName}</td>
        </tr>
      );
    });
  }

  return (
    <div className="Series">
      <h1 className="Series__heading">On Going Games</h1>
      <div className="Series__filters">
        <input className="Series__filter" type="text" value={title} placeholder="Filter By Title" onChange={e => setTitle(e.target.value) }/>
        <input className="Series__filter" type="text" value={tournament} placeholder="Filter By Tournament" onChange={e => setTournament(e.target.value) }/>
      </div>
      <table className="Series__table">
        <thead>
          <tr className="Series__row Series__row--head">
            <th className="Series__cell--head">title</th>
            <th className="Series__cell--head">time</th>
            <th className="Series__cell--head Series__cell--head-team-1">team 1</th>
            <th className="Series__cell--head Series__cell--head-team-2">team 2</th>
            <th className="Series__cell--head">tournament</th>
          </tr>
        </thead>
        <tbody >
          {renderBodyRows()}
        </tbody>
      </table>
    </div>
  )
}

export default Series;
