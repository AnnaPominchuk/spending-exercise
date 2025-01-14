import React, { useState, useEffect } from "react";
import { FiDollarSign } from "react-icons/fi";
import { DateTime } from "luxon";
import Loader from "./Loader";
import {
  ErrorMessage,
  Spending,
  IconWrapper,
  TextWrapper,
  Amount,
  AmountWrapper,
} from "../styles/ComponentStyles";

export default function SpendingList({ spendings, setSpendings, orderBy, selectedCurrency }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/spendings`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (res) => {
        const body = await res.json();
        return {
          status: res.status,
          body,
        };
      })
      .then((response) => {
        if (response.status === 200) {
          setSpendings(response.body);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  const toHUF = (spending) => {
    return (
      spending.currency === 'HUF' ? spending.amount : spending.amount * 357
    )
  }

  return (
    <>
      {error && (
        <ErrorMessage>
          The server is probably down. Please try again later.
        </ErrorMessage>
      )}
      {!spendings.length && !error && (
        <h1 style={{ textAlign: 'center', marginTop: '4rem' }}>
          Yay!{' '}
          <span role='img' aria-label='jsx-a11y/accessible-emoji'>
            🎉
          </span>{' '}
          No spendings!
        </h1>
      )}
      {spendings.length > 0 &&
        spendings
          .filter((spending) => {
            return !selectedCurrency || spending.currency === selectedCurrency;
          })
          .sort((a, b) => {
            if (orderBy === 'date') {
              return (
                DateTime.fromISO(a.spent_at) - DateTime.fromISO(b.spent_at)
              );
            } else if (orderBy === '-date') {
              return DateTime.fromISO(b.spent_at) - DateTime.fromISO(a.spent_at);
            } else if (orderBy === 'amount_in_huf') {
              return toHUF(a) - toHUF(b);
            } else if (orderBy === '-amount_in_huf') {
              return toHUF(b) - toHUF(a);
            }
          })
          .map((spending) => (
            <Spending key={spending.id}>
              <IconWrapper>
                <FiDollarSign color='var(--color-blue)' />
              </IconWrapper>
              <TextWrapper>
                <h3>{spending.description}</h3>
                <p>
                  {DateTime.fromISO(spending.spent_at).toFormat(
                    't - MMMM dd, yyyy'
                  )}
                </p>
              </TextWrapper>
              <AmountWrapper>
                <Amount currency={spending.currency}>
                  {(spending.amount / 100).toFixed(2)}
                </Amount>
              </AmountWrapper>
            </Spending>
          ))}
    </>
  );
}
