import { Diagnosis } from "./diagnosis";
import { User } from "./user";
import { SymptomForExamination } from "./symptom-for-examination";
import { Patient } from "./patient";

export interface MedicalExamination{
    id:number;
    diagnosis:Diagnosis;
    temperature:number;
    doctor:User;
    sympom:SymptomForExamination[];
    patient:Patient;
}