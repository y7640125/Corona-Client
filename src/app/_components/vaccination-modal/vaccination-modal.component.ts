import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IManufacturer } from 'src/app/_models/manufacturer.models';
import { IVaccination } from 'src/app/_models/vaccination.models';
import { CoronaService } from 'src/app/_services/corona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vaccination-modal',
  templateUrl: './vaccination-modal.component.html',
  styleUrls: ['./vaccination-modal.component.scss']
})
export class VaccinationModalComponent implements OnInit {

  @Input() number!: string;
  @Input() memberId!: number;
  @Input() currentVaccination: IVaccination | undefined;
  @Output() sendVaccination: EventEmitter<any>=new EventEmitter<any>();
  vaccination!: IVaccination;
  manufacturers!: IManufacturer[];
  openForm!: boolean;
  isVaccination!: boolean;
  form: FormBuilder | any = this.fb.group({
    receivedDate: this.fb.control(null, [Validators.required]),
    manufacturerId: this.fb.control(null, [Validators.required]),
  });
  constructor(private coronaService: CoronaService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.openForm = this.currentVaccination ? true : false;
    this.isVaccination = this.currentVaccination ? true : false;
    this.getManufacturers();
    if (this.currentVaccination) {
      this.form = this.fb.group(this.currentVaccination );
      const currentTime = new Date();
      this.form.patchValue({
        receivedDate:new Date(new Date(this.currentVaccination.receivedDate).getTime() - currentTime.getTimezoneOffset() * 60000).toISOString().substring(0, 10),
      });
    }
  }
  getManufacturers() {
    this.coronaService.getAllManufacturers().subscribe((x) => {
      this.manufacturers = x;
    })
  }
  addVaccination() {
    this.vaccination = this.form.value;
    if(!this.memberId){
      this.sendVaccination.emit(this.vaccination);
      Swal.fire('', 'השמירה בוצעה בהצלחה', 'success').then(() => {
        this.isVaccination = true;
      });
    }
    else{
      this.vaccination.memberId = this.memberId;
    this.coronaService.addVaccination(this.vaccination).subscribe((x) => {
      Swal.fire('', 'השמירה בוצעה בהצלחה', 'success').then(() => {
        this.isVaccination = true;
      });
    })
    } 
  }

  updateVaccination() {
    this.vaccination = this.form.value;
    this.coronaService.updateVaccination(this.vaccination.id, this.vaccination).subscribe((x) => {
      Swal.fire('', 'השמירה בוצעה בהצלחה', 'success').then(() => {
      });
    })
  }

}

