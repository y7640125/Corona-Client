import { IVaccination } from "./vaccination.models";

export interface IMember {
  id: number;
  firstName: string;
  lastName: string;
  tz: string;
  city: string;
  street: string;
  number: number;
  birthDate:Date;
  phone: string;
  mobilePhone: string;
  picture: string;
  positiveAnswerDate:Date;
  recoveryDate:Date;
}