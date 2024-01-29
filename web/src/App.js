import React, { useState } from 'react';
import Form from './components/Form';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './components/Layout';

export default function App() {
  const [spendings, setSpendings] = useState([]);
  const [orderBy, setOrderBy] = useState('-date');
  const [selectedCurrency, setSelectedCurrency] = useState('');

  function onSubmitted(newSpending) {
    setSpendings((prevSpendings) => [...prevSpendings, newSpending]);
  }

  return (
    <>
      <Layout>
        <Form onSubmitted={onSubmitted} />
        <FiltersAndOrderings
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          setSelectedCurrency={setSelectedCurrency}
        />
        <SpendingList
          spendings={spendings}
          setSpendings={setSpendings}
          orderBy={orderBy}
          selectedCurrency={selectedCurrency}
        />
      </Layout>
    </>
  );
}
