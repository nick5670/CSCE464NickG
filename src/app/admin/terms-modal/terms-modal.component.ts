import { Component, OnInit } from '@angular/core';
import { DialogRef } from 'ngx-modialog-7';
import { BSModalContext } from 'ngx-modialog-7/plugins/bootstrap';


export class TermsModalContext extends BSModalContext
{
  public title!: string;
}

@Component({
  selector: 'app-terms-modal',
  templateUrl: './terms-modal.component.html',
  styleUrls: ['./terms-modal.component.css']
})
export class TermsModalComponent implements OnInit {

  constructor(public dialog: DialogRef<TermsModalContext>) { }

  ngOnInit(): void {
  }

  onSubmit()
  {
    this.dialog.close();
  }

}
