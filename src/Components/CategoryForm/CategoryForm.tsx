import FormControl from '@mui/material/FormControl';
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
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { ICategoryForm } from '../../types';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../app/hooks.ts';
import { createLoadingSlice, editLoadingSlice } from '../../store/Slices/categoriesSlices.ts';
import ButtonSpinner from '../UI/ButtonSpinner/ButtonSpinner.tsx';

interface ICategoryProps {
  editOrCreateCategory: (category: ICategoryForm) => void;
  oneCategory?: ICategoryForm;
  theCategory?: boolean;
}

const initialCategoryState = {
  type: '',
  name: '',
};

const CategoryForm:React.FC<ICategoryProps> = ({editOrCreateCategory, oneCategory = initialCategoryState, theCategory = false}) => {
  const [newCategory, setNewCategory] = useState<ICategoryForm>(oneCategory);
  const addLoading = useAppSelector(createLoadingSlice);
  const editLoading = useAppSelector(editLoadingSlice);

  const onChange = (e: SelectChangeEvent<string> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCategory((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newCategory.name.trim().length === 0 || newCategory.type.trim().length === 0) {
      toast.error('If you want to add a new category, please fill out all fields!');
    } else {
      editOrCreateCategory({...newCategory});
      setNewCategory(initialCategoryState);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{
      width: '100%',
      padding: '20px 0',
      margin: '0 auto',
      borderRadius: '20px',
      backgroundColor: 'transparent'
    }}>
      <Typography variant="h4" sx={{flexGrow: 1, textAlign: 'center', marginBottom: '20px'}}>
        {theCategory ? 'Edit ' : 'Add new '} category
      </Typography>
      <Grid container spacing={2} sx={{mx: 'auto', width: '80%'}}>
        <Grid size={12}>
          <FormControl sx={{width: '100%'}}>
            <InputLabel id="Type">Category</InputLabel>
            <Select
              labelId="Type"
              id="demo-simple-select-label"
              name="type"
              value={newCategory.type}
              onChange={onChange}
              input={<OutlinedInput label="Category"/>}
              variant="outlined"
            >
              <MenuItem value="" disabled>Select the category!</MenuItem>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <TextField
            sx={{width: '100%'}}
            id="outlined-basic"
            label="Name"
            name="name"
            variant="outlined"
            value={newCategory.name}
            onChange={onChange}
          />
        </Grid>
        <Grid size={12}>
          <Box sx={{textAlign: 'center'}}>
            <Button
              disabled={addLoading}
              type="submit" variant="contained"
                    sx={{fontWeight: 'bold', width: '200px', height: '50px', textAlign: 'center'}}>
              <span>
                Save
              </span>
              {addLoading || editLoading ? <ButtonSpinner/> : null}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default CategoryForm;