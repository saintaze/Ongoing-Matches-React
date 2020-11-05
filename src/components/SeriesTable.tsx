import React, {useEffect, useState} from 'react'
import axios from 'axios';
import moment from 'moment';
import {Series} from '../models';

import './SeriesTable.scss';

const SeriesTable: React.FC = (): JSX.Element => {

  const [series, setSeries] = useState<Series[]>([]);
  const [title, setTitle] = useState<string>('');
  const [tournament, setTournament] = useState<string>('');

  const fetchSeries = async (): Promise<void> => {
    try {
      const {data} = await axios.get('http://localhost:3001/series');
      setSeries(data);
    }catch(e){
      console.log(e);
    }
   }
  
  useEffect(() => {
   fetchSeries();
  }, []);

  const formatTime = (dateTime: string): string => {
    return moment(dateTime).format('hh:mm');
  }

  const isValidSearch = (str: string): boolean => {
    return /^[a-zA-Z\d\s]*$/.test(str);
  }

  const filteredRows = (): Series[] => {
    if(!isValidSearch(title) || !isValidSearch(tournament)) return [];
    const titleRegex = new RegExp(title, 'i');
    const tournamentRegex = new RegExp(tournament, 'i');
    return series.filter((s: Series) => {
      return s['title'].match(titleRegex) && s['tournament']['shortName'].match(tournamentRegex);
    });
  }

  const renderBodyRows = (): JSX.Element[] => {
    if(!filteredRows().length){
      return [<tr className="Series__no-match Series__row Series__row--body"><td colSpan={5}>No Match... :(</td></tr>];
    }
    return filteredRows().map((s: Series)=> {
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

export default SeriesTable;
