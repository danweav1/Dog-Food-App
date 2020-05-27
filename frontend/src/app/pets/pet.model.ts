import { Food } from '../food-list/food.model';

export interface Pet {
  id: string;
  name: string;
  badIngredients?: string[];
  favoriteFoods?: Food[];
  owner: string;
  key?: string;
  imagePath?: string;
}
