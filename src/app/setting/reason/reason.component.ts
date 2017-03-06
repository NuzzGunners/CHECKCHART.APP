import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationService } from '../../shared/utils/notification.service';
import { ItemsService } from '../../shared/utils/items.service';

import { ReasonService } from '../shared/services/reason.service';
import { Reason } from '../shared/services/reason';

import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.css']
})
export class ReasonComponent implements OnInit {

  form: FormGroup;
  reason: Reason = new Reason();
  reasons: Reason[];
  cc: number;
  modalActions = new EventEmitter<string | MaterializeAction>();
  modalHeader: string;
  userLogin: any;

  constructor(
    formBuilder: FormBuilder,
    private reasonService: ReasonService,
    private notificationService: NotificationService,
    private itemsService: ItemsService
  ) {
    this.form = formBuilder.group({
      id: ['', [
      ]],
      name: ['', [
        Validators.required
      ]]
    });
  }

  ngOnInit() {
    this.userLogin = JSON.parse(sessionStorage.getItem('userLogin'));

    this.reasonService.getReasons()
      .subscribe(data => {
        this.reasons = data, this.cc = data.length
      },
      error => {
        this.notificationService.printErrorMessageBl('Failed to load Reasons. ' + error);
      });
  }

  add(): void {
    this.modalActions.emit({ action: "modal", params: ['open'] });
    this.modalHeader = 'Add';
    this.reason = new Reason();
  }

  save(): void {
    var result, data = this.form.value;
    if (data.id) {
      this.reasonService.updateReason(data).subscribe(() => {
        this.itemsService.setItem<Reason>(this.reasons, (u) => u.id == data.id, data);
        this.notificationService.printSuccessMessageBl(data.name + ' has been update');
      });
    } else {
      this.reasonService.addReason(data).subscribe((resCreated) => {
        this.itemsService.setItem<Reason>(this.reasons, (u) => u.id == -1, resCreated);
        this.cc = this.cc + 1;
        this.notificationService.printSuccessMessageBl(data.name + ' has been create');
      });
    }
  }

  update(reason, event): void {
    this.modalActions.emit({ action: "modal", params: ['open'] });
    this.modalHeader = 'Edit';
    event.preventDefault();
    this.reasonService.getReason(reason.id)
      .subscribe(data => this.reason = data);
  }

  delete(reason, event): void {
    event.preventDefault();
    this.notificationService.openConfirmationDialog('Are you sure you want to remove '
      + reason.name + '?',
      () => {
        this.reasonService.deleteReason(reason.id)
          .subscribe(() => {
            this.itemsService.removeItemFromArray<Reason>(this.reasons, reason);
            this.cc = this.cc - 1;
            this.notificationService.printSuccessMessageBl(reason.name + ' has been deleted');
          });
      });
  }

  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }
}