import { Container } from '@mui/joy';
import { Typography } from '@mui/material';
import Box from '@mui/joy/Box';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/joy/Button';
import { useCallback, useEffect, useState } from 'react';
import ModalWindow from '../../Components/ModalWindow/ModalWindow.tsx';
import CategoryForm from '../../Components/CategoryForm/CategoryForm.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { allCategories, getLoadingSlice } from '../../store/Slices/categoriesSlices.ts';
import { createCategory, getCategories } from '../../store/Thunks/categoriesThunks.ts';
import CategoryCards from '../../Components/CategoryCards/CategoryCards.tsx';
import { ICategoryForm } from '../../types';
import { toast } from 'react-toastify';
import Loader from '../../Components/UI/Loader/Loader.tsx';

const CategoriesPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const categories = useAppSelector(allCategories);
  const loader = useAppSelector(getLoadingSlice);
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
      {loader ? <Loader/> :
        <Container>
          <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', margin: '50px 0 20px'}}>
            <Typography variant="h3">Categories</Typography>
            <Button startDecorator={<AddIcon/>} sx={{fontSize: '18px'}} onClick={() => setOpenModal(true)}>
              Add new Dish
            </Button>
          </Box>
          <Box sx={{marginTop: '50px'}}>
            {categories.length > 0 ? <CategoryCards categories={categories}/> :
              <Typography variant="h4" sx={{margin: '50px auto', textAlign: 'center', fontStyle: 'italic'}}>You haven't categories at the moment!</Typography>}
          </Box>
        </Container>
      }
    </>
  );
};

export default CategoriesPage;