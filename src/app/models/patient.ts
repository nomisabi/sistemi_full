import { Allergy } from "./allergy";
import { MedicalExamination } from "./medical-examination";

export interface Patient{
    id:number;
	firstName:String;
	lastName:String;
	listOfAllergy: Allergy[]
	examinations: MedicalExamination[];
}