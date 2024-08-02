// pages/index.tsx

import React from 'react';
import AddDanceForm from '../../../components/AddDanceForm';
import ContestDanceList from '../../../components/ContestDanceList';

const Main: React.FC = () => {
  return (
    <div>
      <h1>Dance Contest</h1>
      <AddDanceForm />
      <ContestDanceList />
    </div>
  );
};

export default Main;
