import { Ingredient } from "./ingredient";

export interface Medicine{
	id: number;
    name: string;
    category: string;
    ingredients: Ingredient[];
}