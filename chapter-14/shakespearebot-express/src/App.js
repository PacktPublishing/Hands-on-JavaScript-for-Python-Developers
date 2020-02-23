import React from 'react';
import TalkingHeadLayout from './components/talkinghead/talkinghead'
import ChatPanel from './components/chatpanel/chatpanel'

import './App.css';

function App() {
  return (
    <>
      <h1>Banter with the Bard</h1>
      <div className="App">
        <ChatPanel />
        <TalkingHeadLayout />
      </div>
    </>
  );
}

export default App;
