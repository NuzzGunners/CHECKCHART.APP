import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationService } from '../../shared/utils/notification.service';
import { ItemsService } from '../../shared/utils/items.service';

import { UserService } from '../shared/services/user.service';
import { User } from '../shared/services/user';

import { MaterializeAction } from 'angular2-materialize';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/Observable/of';
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  form: FormGroup;
  user: User = new User();
  users: User[];
  cc: number;
  modalActions = new EventEmitter<string | MaterializeAction>();
  modalHeader: string;
  selectRoleOptions: any;
  selectPositionOptions: any;
  onEdit: boolean = false;
  dataUsername: any;
  dataUsernameCheck: boolean = false;
  usernameCheck: string;
  searchTerms = new Subject<string>();
  UngetRoles: Subscription;
  UngetUsers: Subscription;
  userLogin: any;

  constructor(
    private userService: UserService,
    formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private itemsService: ItemsService
  ) {
    this.form = formBuilder.group({
      username: ['', [
        Validators.required
      ]],
      usernameCheck: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]],
      passwordConfirm: ['', [
        Validators.required
      ]],
      fullname: ['', [
        Validators.required
      ]],
      roleuser: ['', [
        Validators.required
      ]]
    });
  }

  ngOnInit() {
    this.userLogin = JSON.parse(sessionStorage.getItem('userLogin'));

    this.dataUsername = this.searchTerms
      .debounceTime(1000)
      .distinctUntilChanged()
      .switchMap((search) => {
        return this.userService.searchUsers(search);
      }
      );

    setTimeout(() => {
      this.getRoles();
      this.getUsers();
    }, 500);
  }

  getRoles(): void {
    this.UngetRoles = this.userService.getRoles()
      .subscribe(data => {
        this.selectRoleOptions = data
      },
      error => {
        this.notificationService.printErrorMessageBl('Failed to load Roles. ' + error)
      });
  }

  getUsers(): void {
    this.UngetUsers = this.userService.getUsers()
      .subscribe(data => {
        this.users = data, this.cc = data.length
      },
      error => {
        this.notificationService.printErrorMessageBl('Failed to load Users. ' + error);
      });
  }

  add(): void {
    this.modalActions.emit({ action: "modal", params: ['open'] });
    this.modalHeader = 'Add';
    this.form.get('username').enable();
    this.onEdit = false;
    this.user = new User();
  }

  save(): void {
    var result, data = this.form.value;

    if (this.onEdit) {
      data.username = this.user.username;
      this.userService.updateUser(data).subscribe((resUpdated) => {
        this.itemsService.setItem<User>(this.users, (u) => u.username == data.username, resUpdated[0]);
        this.notificationService.printSuccessMessageBl(data.username + ' has been update');
      });
    } else {
      this.userService.addUser(data).subscribe((resCreated) => {
        this.itemsService.setItem<User>(this.users, (u) => u.username == "", resCreated[0]);
        this.cc = this.cc + 1;
        this.notificationService.printSuccessMessageBl(data.username + ' has been create');
      });
    }

  }

  update(user, event): void {
    this.modalActions.emit({ action: "modal", params: ['open'] });
    this.modalHeader = 'Edit';
    this.form.get('username').disable();
    this.onEdit = true;
    event.preventDefault();
    this.userService.getUser(user.username)
      .subscribe(data => {
        this.user = data[0];
        this.usernameCheck = data[0].username;
      },
      error => {
        this.notificationService.printErrorMessageBl('Failed to load Users. ' + error);
      });
  }

  delete(user, event): void {
    event.preventDefault();
    this.notificationService.openConfirmationDialog('Are you sure you want to remove '
      + user.fullname + '?',
      () => {
        this.userService.deleteUser(user.username)
          .subscribe(() => {
            this.itemsService.removeItemFromArray<User>(this.users, user);
            this.cc = this.cc - 1;
            this.notificationService.printSuccessMessageBl(user.username + ' has been deleted');
          });
      });
  }

  closeModal(): void {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }

  filterUesr(event: any): void {
    let query = event.target.value;
    this.usernameCheck = null;
    if (query.trim().length > 0) {
      this.searchTerms.next(event.target.value);
      this.dataUsernameCheck = true;
    } else {
      this.dataUsernameCheck = false;
    }
  }

  selectUser(item, event): void {
    event.preventDefault();
    this.user.username = item.userid;
    this.user.fullname = item.fullname;
    this.dataUsernameCheck = false;

    if (this.users.length > 0) {
      for (let itemCheck of this.users) {
        if (itemCheck.username == item.userid) {
          this.usernameCheck = null;
          return;
        } else {
          this.usernameCheck = item.userid;
        }
      }
    } else {
      this.usernameCheck = item.userid;
    }
  }

  ngOnDestroy(){
    this.UngetRoles.unsubscribe();
    this.UngetUsers.unsubscribe();
  }
}