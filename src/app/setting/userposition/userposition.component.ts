import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationService } from '../../shared/utils/notification.service';
import { ItemsService } from '../../shared/utils/items.service';

import { UserpositionService } from '../shared/services/userposition.service';
import { Userposition } from '../shared/services/userposition';
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
  selector: 'app-userposition',
  templateUrl: './userposition.component.html',
  styleUrls: ['./userposition.component.css']
})
export class UserpositionComponent implements OnInit, OnDestroy {

  form: FormGroup;
  userposition: Userposition = new Userposition();
  userpositions: Userposition[];
  user: User = new User();
  users: User[];
  cc: number;
  modalActions = new EventEmitter<string | MaterializeAction>();
  modalHeader: string;
  selectRoleOptions: any;
  selectUserOptions: any;
  selectPositionOptions: any;
  onEdit: boolean = false;
  dataUsername: any;
  dataUsernameCheck: boolean = false;
  usernameCheck: string;
  searchTerms = new Subject<string>();
  UngetPositions: Subscription;
  UngetUserpositions: Subscription;
  userLogin: any;

  constructor(
    private userService: UserpositionService,
    formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private itemsService: ItemsService
  ) {
    this.form = formBuilder.group({
      username: ['', [
        Validators.required
      ]],
      position: ['', [
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
      this.getPositions();
      this.getUserpositions();
    }, 500);
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
    this.user.username = item.username;
    this.user.fullname = item.fullname;
    this.dataUsernameCheck = false;
  }

  delete(user, event): void {
    event.preventDefault();
    this.notificationService.openConfirmationDialog('Are you sure you want to remove '
      + user.fullname + '?',
      () => {
        this.userService.deleteUserposition(user.id)
          .subscribe(() => {
            this.itemsService.removeItemFromArray<Userposition>(this.userpositions, user);
            this.cc = this.cc - 1;
            this.notificationService.printSuccessMessageBl(user.username + ' has been deleted');
          });
      });
  }

  save(): void {
    var result, data = this.form.value;
    this.userposition.id = 0;
    this.userposition.username = data.username;
    this.userposition.position = data.position;
    //console.log(this.userposition);
    if (this.onEdit) {
      data.username = this.user.username;
      this.userService.updateUserposition(this.userposition).subscribe((resUpdated) => {
        this.getUserpositions();
        this.notificationService.printSuccessMessageBl(data.username + ' has been update');
      });
    } else {
      this.userService.addUserposition(this.userposition).subscribe((resCreated) => {
        this.getUserpositions();
        this.cc = this.cc + 1;
        this.notificationService.printSuccessMessageBl(data.username + ' has been create');
      });
    }

  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(data => {
        this.selectUserOptions = data
        console.log(data);
      },
      error => {
        this.notificationService.printErrorMessageBl('Failed to load Positions. ' + error)
      });
  }

  getPositions(): void {
    this.UngetPositions = this.userService.getPositions()
      .subscribe(data => {
        this.selectPositionOptions = data
      },
      error => {
        this.notificationService.printErrorMessageBl('Failed to getPositions. ' + error)
      });
  }

  getUserpositions(): void {
    this.UngetUserpositions = this.userService.getUserpositions()
      .subscribe(data => {
        this.userpositions = data, this.cc = data.length
        //console.log(data);
      },
      error => {
        this.notificationService.printErrorMessageBl('Failed to load Userpositions. ' + error);
      });
  }

  add(): void {
    this.modalActions.emit({ action: "modal", params: ['open'] });
    this.modalHeader = 'Add';
    this.onEdit = false;
    this.userposition = new Userposition();
  }

  closeModal(): void {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }

  ngOnDestroy() {
    this.UngetPositions.unsubscribe();
    this.UngetUserpositions.unsubscribe();
  }

}
