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
import { ChangeEvent, FormEvent, useState } from 'react';
import { ICategory } from '../../types';

const categoryState = {
  type: '',
  name: '',
};

const CategoryForm = () => {
  const [newCategory, setNewCategory] = useState<ICategory>(categoryState);

  const onChange = (e: SelectChangeEvent<string> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCategory((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onSubmitMeal = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newCategory);

  };

  return (
    <form onSubmit={onSubmitMeal} style={{
      width: '100%',
      padding: '20px 0',
      margin: '0 auto',
      borderRadius: '20px',
      backgroundColor: 'transparent'
    }}>
      <Typography variant="h4" sx={{flexGrow: 1, textAlign: 'center', marginBottom: '20px'}}>
        Add new category
        {/*{editDish ? 'Edit ' : 'Add new '} dish*/}
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

export default CategoryForm;