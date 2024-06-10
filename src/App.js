import React, { useReducer } from 'react';
import DashboardContext from './contexts/generalContext';
import initState from './store/initState';
import DashboardReducer from './store/dashboardReducer';
import { Header, Container } from './components';
import './App.css';

const App =() => {
  const [state, dispatch] = useReducer(
    DashboardReducer,
    initState
  );
  
  return (
    <DashboardContext.Provider value={[state, dispatch]}>
      <div className="App">
        <Header/>
        <Container/>
      </div>
    </DashboardContext.Provider>
  );
}

export default App;
