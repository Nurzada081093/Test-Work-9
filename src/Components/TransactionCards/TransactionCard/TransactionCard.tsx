import React, { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks.ts';
import { ITransition } from '../../../types';
import ModalWindow from '../../ModalWindow/ModalWindow.tsx';
import { Card } from '@mui/joy';
import Box from '@mui/joy/Box';
import TransactionForm from '../../TransactionForm/TransactionForm.tsx';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import Button from '@mui/joy/Button';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { deleteTransaction, getOneTransaction, getTransitions } from '../../../store/Thunks/transitionsThunks.ts';
import { toast } from 'react-toastify';

interface Props {
  transaction: ITransition;
}

const TransactionCard: React.FC<Props> = ({transaction}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  // const categoryFromAPI = useAppSelector(oneCategory);

  const deleteTheTransaction = async (id: string) => {
    console.log(id);
    await dispatch(deleteTransaction(id));
    toast.success(`The transaction has been successfully deleted!`);
    await dispatch(getTransitions());
  };

  const editTheTransaction = async (id: string) => {
    await dispatch(getOneTransaction(id));
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const addOrEditTransition = async () => {


    // if (categoryFromAPI) {
    //   await dispatch(categoryFromAPI({ id: category.id, categoryFromAPI }));
    //   await dispatch(getCategories());
    //   setOpenModal(false);
    // }
  };

  return (
    <>
      <ModalWindow showModal={openModal} closeModal={closeModal}>
        <TransactionForm addOrEditTransition={addOrEditTransition}/>
      </ModalWindow>
      <Card variant="outlined" sx={{margin: '20px 0'}}>
        <Box sx={{width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap'}}>
          <Box sx={{
            width: '50%',
            margin: '20px 5px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <span style={{fontSize: '20px', marginRight: '30px'}}>{dayjs(transaction.data).format('DD.MM.YYYY HH.mm.ss')}</span>
            <Typography sx={{fontSize: '20px'}}>{transaction.category}</Typography>
          </Box>
          <Box sx={{
            width: '300px',
            margin: '20px 5px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap'
          }}>
            <Typography sx={{ fontSize: '20px', fontWeight: '600', color: `${transaction.type === 'expense' ? 'red' : 'green'}`}}>{transaction.type === 'expense' ? `- ${transaction.amount}` : `+ ${transaction.amount}`} KGS</Typography>
            <Button sx={{backgroundColor: '#3949ab', fontSize: '18px'}} onClick={() => editTheTransaction(transaction.id)}><CiEdit /></Button>
            <Button sx={{backgroundColor: '#3949ab', fontSize: '18px'}} onClick={() => deleteTheTransaction(transaction.id)}><RiDeleteBin5Fill /></Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default TransactionCard;