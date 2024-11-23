import { Container } from '@mui/joy';
import { Typography } from '@mui/material';
import Box from '@mui/joy/Box';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/joy/Button';
import { useCallback, useEffect, useState } from 'react';
import ModalWindow from '../../Components/ModalWindow/ModalWindow.tsx';
import CategoryForm from '../../Components/CategoryForm/CategoryForm.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { allCategories } from '../../store/Slices/categoriesSlices.ts';
import { createCategory, getCategories } from '../../store/Thunks/categoriesThunks.ts';
import CategoryCards from '../../Components/CategoryCards/CategoryCards.tsx';
import { ICategoryForm } from '../../types';
import { toast } from 'react-toastify';

const CategoriesPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const categories = useAppSelector(allCategories);
  const dispatch = useAppDispatch();

  const getAllCategories = useCallback(async () => {
    await dispatch(getCategories());

  }, [dispatch]);

  useEffect(() => {
    void getAllCategories();
  }, [getAllCategories]);

  const closeModal = () => {
    setOpenModal(false);
  };

  const editOrCreateCategory = async (newCategory: ICategoryForm) => {
    await dispatch(createCategory(newCategory));
    toast.success(`This category has been successfully added`);
    await dispatch(getCategories());
  };

  return (
    <>
      <ModalWindow showModal={openModal} closeModal={closeModal}>
        <CategoryForm editOrCreateCategory={editOrCreateCategory}/>
      </ModalWindow>
      <Container>
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', margin: '50px 0 20px'}}>
          <Typography variant="h3">Categories</Typography>
          <Button startDecorator={<AddIcon/>} sx={{fontSize: '18px'}} onClick={() => setOpenModal(true)}>
            Add new Dish
          </Button>
        </Box>
        <Box sx={{marginTop: '50px'}}>
          <CategoryCards categories={categories}/>
        </Box>
      </Container>
    </>
  );
};

export default CategoriesPage;