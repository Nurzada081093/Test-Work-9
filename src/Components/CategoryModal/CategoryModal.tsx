import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { ModalClose } from '@mui/joy';
import React from 'react';
import CategoryForm from '../CategoryForm/CategoryForm.tsx';

interface Props {
  showModal: boolean;
  closeModal: () => void;
}

const CategoryModal:React.FC<Props> = ({showModal, closeModal}) => {
  return (
    <Modal open={showModal} onClose={closeModal}>
      <ModalDialog
        aria-labelledby="nested-modal-title"
        aria-describedby="nested-modal-description"
        sx={(theme) => ({
          [theme.breakpoints.only('xs')]: {
            top: 'unset',
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            transform: 'none',
            maxWidth: 'unset',
          },
        })}
      >
        <ModalClose />
        <CategoryForm/>
      </ModalDialog>
    </Modal>
  );
};

export default CategoryModal;