import { Ingredient } from "./ingredient";
import { Medicine } from "./medicine";

export interface Allergy{
    id:number;
	ingredient:Ingredient;
	medicine:Medicine;
}