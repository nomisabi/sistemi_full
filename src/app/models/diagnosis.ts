import { Disease } from "./disease";
import { Medicine } from "./medicine";

export interface Diagnosis{
    id:number;
    dateOfDiagnosis: Date;
	disease: Disease;
	medicines: Medicine[]
	operation: boolean;
	dateOfHealing: Date;
	healed: boolean;
}