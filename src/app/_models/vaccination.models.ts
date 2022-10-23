import { IManufacturer } from "./manufacturer.models";

export interface IVaccination {
    id: number;
    memberId: number;
    receivedDate: Date;
    manufacturerId: number;
  }