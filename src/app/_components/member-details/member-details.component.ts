import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IMember } from 'src/app/_models/member.models';
import { MemberService } from 'src/app/_services/member.service';
import { MemberModalComponent } from '../member-modal/member-modal.component';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { CoronaService } from 'src/app/_services/corona.service';
import { IVaccination } from 'src/app/_models/vaccination.models';
import { DomSanitizer } from '@angular/platform-browser';
import { IManufacturer } from 'src/app/_models/manufacturer.models';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {

  memberId:any;
  member!:IMember;
  vaccinations!:IVaccination[];
  manufacturer!:IManufacturer;

  constructor(private memberService: MemberService,
    private coronaService: CoronaService,
    private dialog: MatDialog,
    private router: ActivatedRoute,
    private _sanitizer: DomSanitizer) {   }

  ngOnInit(): void {
    this.router.paramMap.subscribe((x)=>{
      this.memberId=x.get('memberId');
      this.getMember();
      this.getVaccinations();
      });
    }
  
  getMember(){
    this.memberService.getMemberById(+this.memberId).subscribe((x)=>{
      this.member=x;
    });
  }

  getVaccinations(){
    this.memberService.getVaccinationById(+this.memberId).subscribe((x)=>{
      this.vaccinations=x;
    })
  }

  getManufacturer(manufacturerId:number){
    this.coronaService.getManufacturer(manufacturerId).subscribe((x)=>{
      this.manufacturer=x;
    })
    return this.manufacturer.manufacturerName;
  }

  imagePath(picture:any){
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + picture);
  }
  
  openModal() {
    const dialogRef = this.dialog.open(MemberModalComponent, {
      data: { memberId: this.memberId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getMember();
    });
  }
}
