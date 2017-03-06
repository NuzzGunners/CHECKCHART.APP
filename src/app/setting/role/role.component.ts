import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationService } from '../../shared/utils/notification.service';
import { ItemsService } from '../../shared/utils/items.service';

import { RoleService } from '../shared/services/role.service';
import { Role } from '../shared/services/role';

import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  form: FormGroup;
  role: Role = new Role();
  roles: Role[];
  cc: number;
  modalActions = new EventEmitter<string | MaterializeAction>();
  modalHeader: string;
  userLogin: any;

  constructor(
    private roleService: RoleService,
    formBuilder: FormBuilder,
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

    this.roleService.getRoles()
      .subscribe(data => {
        this.roles = data, this.cc = data.length
      },
      error => {
        this.notificationService.printErrorMessageBl('Failed to load Roles. ' + error);
      });
  }

  add(): void {
    this.modalActions.emit({ action: "modal", params: ['open'] });
    this.modalHeader = 'Add';
    this.role = new Role();
  }

  save(): void {
    var result, data = this.form.value;
    if (data.id) {
      this.roleService.updateRole(data).subscribe(() => {
        this.itemsService.setItem<Role>(this.roles, (u) => u.id == data.id, data);
        this.notificationService.printSuccessMessageBl(data.name + ' has been update');
      });
    } else {
      this.roleService.addRole(data).subscribe((resCreated) => {
        this.itemsService.setItem<Role>(this.roles, (u) => u.id == -1, resCreated);
        this.cc = this.cc + 1;
        this.notificationService.printSuccessMessageBl(data.name + ' has been create');
      });
    }
  }

  update(role, event): void {
    this.modalActions.emit({ action: "modal", params: ['open'] });
    this.modalHeader = 'Edit';
    event.preventDefault();
    this.roleService.getRole(role.id)
      .subscribe(data => this.role = data);
  }

  delete(role, event): void {
    event.preventDefault();
    this.notificationService.openConfirmationDialog('Are you sure you want to remove '
      + role.name + '?',
      () => {
        this.roleService.deleteRole(role.id)
          .subscribe(() => {
            this.itemsService.removeItemFromArray<Role>(this.roles, role);
            this.cc = this.cc - 1;
            this.notificationService.printSuccessMessageBl(role.name + ' has been deleted');
          });
      });
  }

  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }
}