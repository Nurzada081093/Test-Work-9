import { ICategory, ICategoryForm } from '../../../types';
import React, { useState } from 'react';
import { Button, Card } from '@mui/joy';
import { Typography } from '@mui/material';
import Box from '@mui/joy/Box';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { deleteCategory, getCategories, getOneCategory } from '../../../store/Thunks/categoriesThunks.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { toast } from 'react-toastify';
import { oneCategory } from '../../../store/Slices/categoriesSlices.ts';
import ModalWindow from '../../ModalWindow/ModalWindow.tsx';
import CategoryForm from '../../CategoryForm/CategoryForm.tsx';

interface Props {
  category: ICategory;
}

const CategoryCard: React.FC<Props> = ({category}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const categoryFromAPI = useAppSelector(oneCategory);

  const deleteTheCategory = async (id: string) => {
    await dispatch(deleteCategory(id));
    toast.success(`The category has been successfully deleted!`);
    await dispatch(getCategories());
  };

  const editTheCategory = async (id: string) => {
    await dispatch(getOneCategory(id));
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const editOrCreateCategory = async (categoryFromAPI: ICategoryForm) => {
    console.log(categoryFromAPI);

    // if (categoryFromAPI) {
    //   await dispatch(categoryFromAPI({ id: category.id, categoryFromAPI }));
    //   await dispatch(getCategories());
    //   setOpenModal(false);
    // }
  };

  return (
    <>
      <ModalWindow showModal={openModal} closeModal={closeModal}>
        {categoryFromAPI && <CategoryForm oneCategory={categoryFromAPI} theCategory editOrCreateCategory={editOrCreateCategory}/>}
      </ModalWindow>
      <Card variant="outlined" sx={{margin: '20px 0'}}>
        <Box sx={{width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap'}}>
          <Typography sx={{width: '50%', fontSize: '25px', fontWeight: '600'}}>{category.name}</Typography>
          <Box sx={{width: '300px', margin: '20px 5px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap'}}>
            <Typography sx={{ fontSize: '25px', fontWeight: '600', color: `${category.type === 'expense' ? 'red' : 'green'}`}}>{category.type}</Typography>
            <Button sx={{backgroundColor: '#3949ab', fontSize: '18px'}} onClick={() => editTheCategory(category.id)}><CiEdit /></Button>
            <Button sx={{backgroundColor: '#3949ab', fontSize: '18px'}} onClick={() => deleteTheCategory(category.id)}><RiDeleteBin5Fill /></Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default CategoryCard;