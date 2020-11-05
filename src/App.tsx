import React from 'react'
import SeriesTable from './components/SeriesTable'

import './App.scss';

const App: React.FC = (): JSX.Element => {
  return (
     <div className="App">
      <SeriesTable />
    </div>
  )
}

export default App;
