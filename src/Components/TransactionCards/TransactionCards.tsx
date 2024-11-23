import { ITransition } from '../../types';
import TransactionCard from './TransactionCard/TransactionCard.tsx';
import React from 'react';
import { Container } from '@mui/joy';

interface Props {
  transactions: ITransition[];
}

const TransactionCards:React.FC<Props> = ({transactions}) => {
  return (
    <Container>
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction}/>
      ))}
    </Container>
  );
};

export default TransactionCards;