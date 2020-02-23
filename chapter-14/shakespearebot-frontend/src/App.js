import React from 'react';
import TalkingHeadLayout from './components/talkinghead/talkinghead'
import ChatPanel from './components/chatpanel/chatpanel'

import './App.css';

function App() {
  return (
    <div className="App">
      <ChatPanel />
      <TalkingHeadLayout />
    </div>
  );
}

export default App;
