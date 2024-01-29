import React, { useState } from 'react';
import { InputStyles } from '../styles/InputStyles';
import { SelectStyles } from '../styles/SelectStyles';
import { FormStyles } from '../styles/ComponentStyles';
import { DateTime } from 'luxon';

export default function Form({ onSubmitted }) {
  const initialFormState = {
    description: '',
    amount: '',
    currency: 'HUF',
  };

  const [state, setState] = useState(initialFormState);

  function handleChange(e) {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!state.description) {
      alert('Description should not be empty.');
      return;
    }

    if (!state.amount) {
      alert('Amount should not be empty.');
      return;
    }

    fetch(`http://localhost:5000/spendings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...state, 'spent_at': DateTime.now().toISO() }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
        else 
          throw new Error(response.statusText);
      })
      .then((data) => {
        onSubmitted(data);
        console.log('Form submitted:', state);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setState(initialFormState);
      });
  }

  return (
    <>
      <FormStyles onSubmit={handleSubmit}>
        <InputStyles
          type='text'
          placeholder='description'
          name='description'
          value={state.description}
          onChange={handleChange}
        />
        <InputStyles
          type='number'
          placeholder='amount'
          name='amount'
          value={state.amount}
          onChange={handleChange}
        />
        <SelectStyles
          name='currency'
          value={state.currency}
          onChange={handleChange}
        >
          <option value='HUF'>HUF</option>
          <option value='USD'>USD</option>
        </SelectStyles>
        <InputStyles type='submit' value='Save' />
      </FormStyles>
    </>
  );
}
