import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMember } from 'src/app/_models/member.models';
import { IVaccination } from 'src/app/_models/vaccination.models';
import { CoronaService } from 'src/app/_services/corona.service';
import { MemberService } from 'src/app/_services/member.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member-modal',
  templateUrl: './member-modal.component.html',
  styleUrls: ['./member-modal.component.scss']
})
export class MemberModalComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MemberModalComponent>,
    private memberService: MemberService,
    private coronaService: CoronaService
  ) { }

  mone = 0;
  vaccinations: IVaccination[] = [];
  newVaccinations: IVaccination[] = [];
  numbers = ['ראשון', 'שני', 'שלישי', 'רביעי'];
  memberId!: number;
  currentMember!: IMember;
  member!: IMember;
  form: FormBuilder | any = this.fb.group({
    firstName: this.fb.control(null, [Validators.required]),
    lastName: this.fb.control(null, [Validators.required]),
    tz: this.fb.control(null, [Validators.required]),
    city: this.fb.control(null, [Validators.required]),
    street: this.fb.control(null, [Validators.required]),
    number: this.fb.control(null, [Validators.required]),
    birthDate: this.fb.control(null, [Validators.required]),
    phone: this.fb.control(null, Validators.compose([Validators.required, Validators.pattern('[0-9]{9}')])),
    mobilePhone: this.fb.control(null, Validators.compose([Validators.required, Validators.pattern('[0-9]{10}')])),
    picture: this.fb.control(null),
    positiveAnswerDate: this.fb.control(null),
    recoveryDate: this.fb.control(null),
  });

  ngOnInit(): void {
    if (this.data && this.data.memberId) {
      this.memberId = this.data.memberId;
      this.memberService.getMemberById(this.data.memberId).subscribe((x) => {
        this.currentMember = x;
        this.form = this.fb.group(x);
        let PAD, RD;
        const currentTime = new Date();
        if (x.positiveAnswerDate && x.positiveAnswerDate != null) {
          PAD = new Date(new Date(x.positiveAnswerDate).getTime() - currentTime.getTimezoneOffset() * 60000).toISOString().substring(0, 10);
        }
        if (x.recoveryDate && x.recoveryDate != null) {
          RD = new Date(new Date(x.recoveryDate).getTime() - currentTime.getTimezoneOffset() * 60000).toISOString().substring(0, 10);
        }
        this.form.patchValue({
          number: '' + x.number,
          birthDate: new Date(new Date(x.birthDate).getTime() - currentTime.getTimezoneOffset() * 60000).toISOString().substring(0, 10),
          positiveAnswerDate: PAD,
          recoveryDate: RD
        });
      })
      this.getVaccinations();
    }
  }

  getVaccination() {
    return this.vaccinations[this.mone] ? this.vaccinations[this.mone++] : undefined
  }

  addVaccination(vaccination: IVaccination) {
    this.newVaccinations.push(vaccination);
  }

  addVaccinations() {
    for (let v of this.newVaccinations) {
      this.memberService.getMemberByTz(this.form.controls.tz.value).subscribe((x) => {
        v.memberId = x.id;
      })
      this.coronaService.addVaccination(v).subscribe((x) => {
        console.log(x)
      })
    }
  }

  getVaccinations() {
    this.memberService.getVaccinationById(+this.memberId).subscribe((x) => {
      this.vaccinations = x;
    })
  }

  imageAttr = 'הוסף תמונה';
  imageData = '';
  uploadImageEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.imageAttr = '';
      const reader = new FileReader();
      reader.onloadend = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        const base64Index = image.src.indexOf(';base64,') + ';base64,'.length;
        this.imageData = e.target.result.substring(base64Index);
        this.form.controls['picture'].setValue(this.imageData);
      };
      reader.readAsDataURL(imgFile.target.files[0])
    } else {
      this.imageAttr = 'הוסף תמונה';
    }
  }

  close() {
    if (this.dialogRef && this.dialogRef.close) {
      this.dialogRef.close({ data: 'Order' });
    }
  }

  addMemeber() {
    this.memberService.addMember(this.member).subscribe((x) => {
      Swal.fire('', 'השמירה בוצעה בהצלחה', 'success').then(() => {
        this.close();
      });
    });
  }

  updateMemeber() {
    this.memberService.updateMember(this.memberId, this.member).subscribe((x) => {
      Swal.fire('', 'השמירה בוצעה בהצלחה', 'success').then(() => {
        this.close();
      });
    });
  }

  saveMember() {
    this.member = this.form.value;
    if (!this.memberId) {
      this.addMemeber();
      this.addVaccinations();
    }
    else {
      this.updateMemeber();
    }
  }
}

