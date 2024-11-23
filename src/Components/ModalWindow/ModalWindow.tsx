import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { ModalClose } from '@mui/joy';
import React, { ReactNode } from 'react';

interface Props {
  showModal: boolean;
  closeModal: () => void;
  children: ReactNode
}

const ModalWindow:React.FC<Props> = ({showModal, closeModal, children}) => {
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
        {children}
      </ModalDialog>
    </Modal>
  );
};

export default ModalWindow;