import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IManufacturer } from '../_models/manufacturer.models';
import { IVaccination } from '../_models/vaccination.models';

const V_API = environment.api + '/Vaccination/';
const MA_API = environment.api + '/Manufacturer/';

@Injectable({
  providedIn: 'root'
})
export class CoronaService {

  constructor(private http: HttpClient) { }
  
  getAllManufacturers(): Observable<IManufacturer[]> {
    return this.http.get<IManufacturer[]>(MA_API + 'Manufacturers');
  }
  getManufacturer(manufacturerId:number): Observable<IManufacturer> {
    return this.http.get<IManufacturer>(MA_API + `ManufacturerById/${manufacturerId}`);
  }
  getVaccinationById(vaccinationId: number): Observable<IVaccination> {
    return this.http.get<IVaccination>(V_API + `VaccinationById/${vaccinationId}`);
  }
  addVaccination(vaccination:IVaccination) :  Observable<boolean>{
    return this.http.post<boolean>(V_API + 'add',vaccination);
  }
  updateVaccination(vaccinationId: number,vaccination:IVaccination) :  Observable<boolean>{
    return this.http.put<boolean>(V_API + `update/${vaccinationId}`,vaccination);
  }
}
