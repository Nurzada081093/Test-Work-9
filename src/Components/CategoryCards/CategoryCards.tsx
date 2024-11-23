import { ICategory } from '../../types';
import React from 'react';
import CategoryCard from './CategoryCard/CategoryCard.tsx';

interface Props {
  categories: ICategory[];
}

const CategoryCards:React.FC<Props> = ({categories}) => {
  return (
    <>
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </>
  );
};

export default CategoryCards;