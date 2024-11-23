import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { allTransitions, getLoadingSlice } from '../../store/Slices/transactionsSlices.ts';
import { useCallback, useEffect } from 'react';
import { getTransitions } from '../../store/Thunks/transitionsThunks.ts';
import TransactionCards from '../../Components/TransactionCards/TransactionCards.tsx';
import { Typography } from '@mui/material';
import { Container } from '@mui/joy';
import Loader from '../../Components/UI/Loader/Loader.tsx';

const Home = () => {
  const transitions = useAppSelector(allTransitions);
  const loading = useAppSelector(getLoadingSlice);
  const dispatch = useAppDispatch();

  const getAllTransitions = useCallback(async () => {
    await dispatch(getTransitions());

  }, [dispatch]);

  useEffect(() => {
    void getAllTransitions();
  }, [getAllTransitions]);


  const netProfit: number = transitions.reduce((acc, profit) => {
    if (profit.type === 'income') {
      acc += profit.amount;
    } else if (profit.type === 'expense') {
      acc -= profit.amount;
    }
    return acc;
  }, 0);

  return (
    <>
      {loading ? <Loader/> :
        <Container>
          <Typography sx={{width: '50%', fontSize: '25px', fontWeight: '600', margin: '20px 0'}}>Total: {netProfit} KGS</Typography>
          <hr/>
          {transitions.length > 0 ? <TransactionCards transactions={transitions}/> :
            <Typography variant="h4" sx={{margin: '50px auto', textAlign: 'center', fontStyle: 'italic'}}>You haven't transactions at the moment!</Typography>
          }
        </Container>
      }
    </>
  );
};

export default Home;