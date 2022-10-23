import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MembersComponent } from './_components/members/members.component';
import { MemberModalComponent } from './_components/member-modal/member-modal.component';
import { MemberDetailsComponent } from './_components/member-details/member-details.component';
import { SummaryViewComponent } from './_components/summary-view/summary-view.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberService } from './_services/member.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoronaService } from './_services/corona.service';
import { VaccinationModalComponent } from './_components/vaccination-modal/vaccination-modal.component';
import { ActivatedRoute, Router, RouterModule} from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    MemberModalComponent,
    MemberDetailsComponent,
    SummaryViewComponent,
    VaccinationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,MatCheckboxModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSelectModule,
    MatListModule,
    MatRadioModule,
    MatTableModule,
    MatAutocompleteModule,
  ],
  providers: [
    MemberService,
    CoronaService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
