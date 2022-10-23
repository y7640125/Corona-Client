import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberDetailsComponent } from './_components/member-details/member-details.component';
import { MembersComponent } from './_components/members/members.component';

const routes: Routes = [
  {path:"",component:MembersComponent},
  {path:"Details/:memberId",component:MemberDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 