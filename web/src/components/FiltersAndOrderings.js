import React from 'react';

import { FiltersWrapper, Orderings, CurrencyFilters, CurrencyButton } from '../styles/ComponentStyles';

export default function CurrencyFilter({ orderBy, setOrderBy, setSelectedCurrency }) {
  return (
    <>
      <FiltersWrapper>
        <Orderings>
          <select
            value={orderBy}
            onChange={(event) => {
              setOrderBy(event.target.value);
            }}
          >
            <option value='-date'>Sort by Date descending (default)</option>
            <option value='date'>Sort by Date ascending</option>
            <option value='-amount_in_huf'>Sort by Amount descending</option>
            <option value='amount_in_huf'>Sort by Amount ascending</option>
          </select>
        </Orderings>
        <CurrencyFilters
          onClick={(event) => {
            setSelectedCurrency(event.target.name);
          }}
        >
          <li>
            <CurrencyButton name=''>ALL</CurrencyButton>
          </li>
          <li>
            <CurrencyButton name='HUF'>HUF</CurrencyButton>
          </li>
          <li>
            <CurrencyButton name='USD'>USD</CurrencyButton>
          </li>
        </CurrencyFilters>
      </FiltersWrapper>
    </>
  );
}
