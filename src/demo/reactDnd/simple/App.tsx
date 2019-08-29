import React, { Component } from 'react';
import CardItem from './CardItem';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <CardItem title="firstCard" content="this is first card!" />
    </DndProvider>
  );
}

export default App;
