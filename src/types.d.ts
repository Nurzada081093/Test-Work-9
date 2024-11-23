export interface ICategoryForm {
  type: string;
  name: string;
}

export interface ICategory extends ICategoryForm {
  id: string;
}

export interface APICategory {
  [id: string] : ICategory;
}

export interface ITransitionForm {
  type: string;
  category: string;
  amount: number;
}