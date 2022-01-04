import './assets/styles/custom.scss';
import Routes from 'Routes';
import { useState } from 'react';

import { AuthContext, AuthContextData } from 'AuthContext';

import './App.css';

const App = () => {

  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false
  });

  return (
    <AuthContext.Provider value={{authContextData, setAuthContextData}}>
   <Routes />
   </AuthContext.Provider>
  );
}

export default App;
