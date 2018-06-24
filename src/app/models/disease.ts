import { Symptom } from "./symptom";

export interface Disease{
    id:number;
    name:String;
    temperatureMin: number;
    temperatureMax: number;
	category: String;
	simptons: Symptom[];
}