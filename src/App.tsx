import Layout from './Components/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from './Containers/Home/Home.tsx';
import CategoriesPage from './Containers/CategoriesPage/CategoriesPage.tsx';
import { Typography } from '@mui/material';
import './App.css';

const App = () => {

  return (
    <>
     <Layout>
       <Routes>
         <Route path="/" element={<Home/>}></Route>
         <Route path="/categories" element={<CategoriesPage/>}></Route>
         <Route path="*" element={<Typography variant="h1">Not found</Typography>} ></Route>
       </Routes>
     </Layout>
    </>
  );
};

export default App;
