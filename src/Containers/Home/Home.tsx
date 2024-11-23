import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { allTransitions } from '../../store/Slices/transactionsSlices.ts';
import { useCallback, useEffect } from 'react';
import { getTransitions } from '../../store/Thunks/transitionsThunks.ts';

const Home = () => {
  const transitions = useAppSelector(allTransitions);
  const dispatch = useAppDispatch();

  const getAllTransitions = useCallback(async () => {
    await dispatch(getTransitions());

  }, [dispatch]);

  useEffect(() => {
    void getAllTransitions();
  }, [getAllTransitions]);


  console.log(transitions);


  return (
    <div>
      Главная страница
    </div>
  );
};

export default Home;