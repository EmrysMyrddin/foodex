import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

function App() {
  const { data } = useQuery(gql`{ user { id, username } }`)
  return (
    <div className="App">
      <p>
        List of users :
        <ul>{data?.user?.map(({ id, username }) => (
          <li key={id}>{username}</li>
        ))}</ul>
      </p>
    </div>
  );
}

export default App;
