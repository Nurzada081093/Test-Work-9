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
import { oneCategory, oneLoadingSlice } from '../../../store/Slices/categoriesSlices.ts';
import ModalWindow from '../../ModalWindow/ModalWindow.tsx';
import CategoryForm from '../../CategoryForm/CategoryForm.tsx';
import DeleteButtonSpinner from '../../UI/DeleteButtonSpinner/DeleteButtonSpinner.tsx';
import Loader from '../../UI/Loader/Loader.tsx';

interface Props {
  category: ICategory;
}

const CategoryCard: React.FC<Props> = ({category}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const categoryFromAPI = useAppSelector(oneCategory);
  const loading = useAppSelector(oneLoadingSlice);
  const [deleteLoading, setDeleteLoading] = useState<{index: string | null; loading: boolean}>({
    index: null,
    loading: false,
  });


  const deleteTheCategory = async (id: string) => {
    setDeleteLoading(prevState => ({...prevState, loading: true, index: id}));
    await dispatch(deleteCategory(id));
    toast.success(`The category has been successfully deleted!`);
    await dispatch(getCategories());
    setDeleteLoading(prevState => ({...prevState, loading: false, index: null}));
  };

  const editTheCategory = async (id: string) => {
    await dispatch(getOneCategory(id));
    setOpenModal(true);
  };

  const closeModal = async () => {
    setOpenModal(false);
    await dispatch(getCategories());
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
      {loading ? <Loader/> :
        <Card variant="outlined" sx={{margin: '20px 0'}}>
          <Box sx={{width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap'}}>
            <Typography sx={{width: '50%', fontSize: '25px', fontWeight: '600'}}>{category.name}</Typography>
            <Box sx={{width: '300px', margin: '20px 5px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap'}}>
              <Typography sx={{ fontSize: '25px', fontWeight: '600', color: `${category.type === 'expense' ? 'red' : 'green'}`}}>{category.type}</Typography>
              <Button sx={{backgroundColor: '#3949ab', fontSize: '18px'}} onClick={() => editTheCategory(category.id)}><CiEdit /></Button>
              <Button disabled={deleteLoading.loading && category.id === deleteLoading.index} sx={{backgroundColor: '#3949ab', fontSize: '18px'}} onClick={() => deleteTheCategory(category.id)}>
                <RiDeleteBin5Fill />
                {deleteLoading.loading && category.id === deleteLoading.index ? <DeleteButtonSpinner/> : null}
              </Button>
            </Box>
          </Box>
        </Card>
      }
    </>
  );
};

export default CategoryCard;