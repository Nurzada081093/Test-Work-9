import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import FormControl from '@mui/material/FormControl';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { allCategories } from '../../store/Slices/categoriesSlices.ts';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { getCategories } from '../../store/Thunks/categoriesThunks.ts';
import { ITransitionForm } from '../../types';
import { toast } from 'react-toastify';

const initialTransactionState = {
  type: '',
  category: '',
  amount: 0,
};

const TransactionForm = () => {
  const [newTransaction, setNewTransaction] = useState<ITransitionForm>(initialTransactionState);
  const categories = useAppSelector(allCategories);
  const dispatch = useAppDispatch();

  const income = categories.filter(item => item.type === 'income');
  const expense = categories.filter(item => item.type === 'expense');

  const getAllCategories = useCallback(async () => {
    await dispatch(getCategories());

  }, [dispatch]);

  useEffect(() => {
    void getAllCategories();
  }, [getAllCategories]);

  const onChangeTransition = (e: SelectChangeEvent<string> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTransaction((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onSubmitTransition = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTransaction.type.trim().length === 0 || newTransaction.category.trim().length === 0 || newTransaction.amount <= 0) {
      toast.error('If you want to add a new transaction, please fill out all fields!');
      toast.error('The amount of the transition should be more than 0!');
    } else {
      console.log(newTransaction);
    }

  };


  return (
    <form onSubmit={onSubmitTransition} style={{
      width: '100%',
      padding: '20px 0',
      margin: '0 auto',
      borderRadius: '20px',
      backgroundColor: 'transparent'
    }}>
      <Typography variant="h4" sx={{flexGrow: 1, textAlign: 'center', marginBottom: '20px'}}>
        {/*{theCategory ? 'Edit ' : 'Add new '}*/}
        transaction
      </Typography>
      <Grid container spacing={2} sx={{mx: 'auto', width: '80%'}}>
        <Grid size={12}>
          <FormControl sx={{width: '100%'}}>
            <InputLabel id="Type">Type</InputLabel>
            <Select
              labelId="Type"
              id="demo-simple-select-label"
              name="type"
              value={newTransaction.type}
              onChange={onChangeTransition}
              input={<OutlinedInput label="Type"/>}
              variant="outlined"
            >
              <MenuItem value="" disabled>Select the type!</MenuItem>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <FormControl sx={{width: '100%'}}>
            <InputLabel id="Type">Category</InputLabel>
            <Select
              labelId="Type"
              id="demo-simple-select-label"
              name="category"
              value={newTransaction.category}
              onChange={onChangeTransition}
              input={<OutlinedInput label="Category"/>}
              variant="outlined"
            >
              <MenuItem value="" disabled>Select the category!</MenuItem>
              {newTransaction.type === 'income' ?
                income.map((category) => (
                  <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
              )) :
                expense.map((category) => (
                  <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <TextField
            sx={{width: '100%'}}
            id="outlined-basic"
            label="Amount"
            name="amount"
            variant="outlined"
            value={newTransaction.amount}
            onChange={onChangeTransition}
            type="number"
          />
        </Grid>
        <Grid size={12}>
          <Box sx={{textAlign: 'center'}}>
            <Button
              // disabled={isLoading}
              type="submit" variant="contained"
              sx={{fontWeight: 'bold', width: '200px', height: '50px', textAlign: 'center'}}>
              <span>
                Save
                {/*{isMeal ? 'Edit' : 'Add'}*/}
              </span>
              {/*{isLoading ? <ButtonLoadingStyle/> : null}.*/}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default TransactionForm;