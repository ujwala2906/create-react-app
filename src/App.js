import React from 'react';
import "./App.css";

import { SideBar, Endorsement } from "./component";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        {/* <SideBar /> */}
        <Endorsement />
      </header>
    </div>
  );
}

export default App;
