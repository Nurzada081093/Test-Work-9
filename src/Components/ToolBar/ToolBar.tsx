import { ColorPaletteProp } from '@mui/joy/styles';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import { useState } from 'react';
import { Container } from '@mui/joy';
import { NavLink } from 'react-router-dom';
import ModalWindow from '../ModalWindow/ModalWindow.tsx';
import TransactionForm from '../TransactionForm/TransactionForm.tsx';

const ToolBar = () => {
  const [color, setColor] = useState<ColorPaletteProp>('primary');
  const [openModal, setOpenModal] = useState<boolean>(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <ModalWindow showModal={openModal} closeModal={closeModal}>
        <TransactionForm/>
      </ModalWindow>
      <Sheet
        variant="solid"
        color={color}
        invertedColors
        sx={[
          {
            p: 3,
            minWidth: 'min-content',
          },
          color !== 'warning' &&
          ((theme) => ({
            background: `linear-gradient(to top, ${theme.vars.palette[color][600]}, ${theme.vars.palette[color][500]})`,
          })),
        ]}
      >
        <Container sx={[
          {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
          },
        ]}>
          <IconButton
            variant="soft"
            size="sm"
            onClick={() => {
              const colors: ColorPaletteProp[] = [
                'primary',
                'neutral',
                'danger',
                'success',
                'warning',
              ];
              const nextColorIndex = colors.indexOf(color) + 1;
              setColor(colors[nextColorIndex] ?? colors[0]);
            }}
          >
            <ColorLensRoundedIcon fontSize="small"/>
          </IconButton>
          <Box sx={{flex: 1, display: 'flex', gap: 1, px: 2}}>
            <Dropdown>
              <NavLink to={'/'} style={{
                textDecoration: 'none',
                color: 'white',
                fontSize: '30px',
                fontStyle: 'italic',
                fontWeight: '600'
              }}>
                Finance Tracker
              </NavLink>
            </Dropdown>
          </Box>
          <Box sx={{display: 'flex', flexShrink: 0, gap: 2, alignItems: 'center'}}>
            <NavLink to={'/categories'} style={{color: 'white', fontSize: '20px', textDecoration: 'none'}}>Categories</NavLink>
            <NavLink to={''}  style={{color: 'white', fontSize: '20px', textDecoration: 'none'}} onClick={() => setOpenModal(true)}>Add</NavLink>
            <Badge badgeContent={0} variant="solid" color="danger" to={'/admin/orders'} component={NavLink}>
              <IconButton variant="soft" sx={{borderRadius: '50%'}}>
                <NotificationsIcon/>
              </IconButton>
            </Badge>
          </Box>
        </Container>
      </Sheet>
    </>
  );
};

export default ToolBar;