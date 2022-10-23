import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IMember } from 'src/app/_models/member.models';
import { MemberService } from 'src/app/_services/member.service';
import { MemberModalComponent } from '../member-modal/member-modal.component';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MemberDetailsComponent } from '../member-details/member-details.component';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  members!: IMember[];
  dataSource!: MatTableDataSource<IMember>;
  displayedColumns: string[] = [
    'picture',
    'fullName',
    'actions',
  ];
  constructor(private memberService: MemberService,
    private dialog: MatDialog,
    private router: Router,
    private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getMembers();
  }

  imagePath(picture:any){
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + picture);
  }

  getMembers() {
    this.memberService.getAllMembers().subscribe((x) => {
      this.members = x;
      this.dataSource = new MatTableDataSource(this.members);
    })
  }

  openModal(memberId?: number) {
    const dialogRef = this.dialog.open(MemberModalComponent, {
      data: { memberId: memberId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getMembers();
    });
  }

  showDetails(memberId: number) {
    debugger
    this.router.navigate(['/Details',memberId]);
  }

  deleteMember(memberId: number) {
    Swal.fire({
      title: 'מחיקת משתמש',
      text: 'האם את/ה בטוח/ה שאת/ה רוצה למחוק את המשתמש מהמערכת?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'כן',
      cancelButtonText: 'לא'
    }).then((result) => {
      if (result.value) {
        this.memberService.deleteMember(memberId).subscribe(x => {
          if (x) {
            Swal.fire("", "השמירה בוצעה בהצלחה", 'success');
      this.getMembers();
          }
        });
      }
    })
    
  }

}
