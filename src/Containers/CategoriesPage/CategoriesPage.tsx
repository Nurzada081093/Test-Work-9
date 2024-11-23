import { Container } from '@mui/joy';
import { Typography } from '@mui/material';
import Box from '@mui/joy/Box';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/joy/Button';
import { useState } from 'react';
import ModalWindow from '../../Components/ModalWindow/ModalWindow.tsx';
import CategoryForm from '../../Components/CategoryForm/CategoryForm.tsx';

const CategoriesPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <ModalWindow showModal={openModal} closeModal={closeModal}>
        <CategoryForm/>
      </ModalWindow>
      <Container>
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', margin: '50px 0 20px'}}>
          <Typography variant="h3">Categories</Typography>
          <Button startDecorator={<AddIcon/>} sx={{fontSize: '18px'}} onClick={() => setOpenModal(true)}>
            Add new Dish
          </Button>
        </Box>
        Все категории!
      </Container>
    </>
  );
};

export default CategoriesPage;