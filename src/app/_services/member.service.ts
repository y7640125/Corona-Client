import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IManufacturer } from '../_models/manufacturer.models';
import { IMember } from '../_models/member.models';
import { IVaccination } from '../_models/vaccination.models';

const M_API = environment.api + '/Member/';
const V_API = environment.api + '/Vaccination/';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) {}
  
  getAllMembers(): Observable<IMember[]> {
    return this.http.get<IMember[]>(M_API + 'Members');
  }
  getMemberById(memberId: number): Observable<IMember> {
    return this.http.get<IMember>(M_API + `MemberById/${memberId}`);
  }
  getMemberByTz(tz:string): Observable<IMember> {
    return this.http.get<IMember>(M_API + `MemberByTz/${tz}`);
  }
  addMember(member:IMember) :  Observable<boolean>{
    return this.http.post<boolean>(M_API + 'add',member);
  }
  updateMember(memberId: number,member:IMember) :  Observable<boolean>{ 
    return this.http.put<boolean>(M_API + `update/${memberId}`,member);
  }
  deleteMember(memberId: number) :  Observable<boolean>{
    return this.http.delete<boolean>(M_API + `delete/${memberId}`);
  }
  getVaccinationById(memberId: number): Observable<IVaccination[]> {
    return this.http.get<IVaccination[]>(V_API + `Vaccinations/${memberId}`);
  }
}
