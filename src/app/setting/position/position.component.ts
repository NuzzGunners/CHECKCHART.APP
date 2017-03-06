import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationService } from '../../shared/utils/notification.service';
import { ItemsService } from '../../shared/utils/items.service';

import { PositionService } from '../shared/services/position.service';
import { Position } from '../shared/services/position';

import { MaterializeAction } from 'angular2-materialize';

@Component({
    selector: 'app-position',
    templateUrl: './position.component.html',
    styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

    form: FormGroup;
    position: Position = new Position();
    positions: Position[];
    cc: number;
    modalActions = new EventEmitter<string | MaterializeAction>();
    modalHeader:string;
    userLogin: any;

    constructor(
        formBuilder: FormBuilder,
        private positionService: PositionService,
        private notificationService: NotificationService,
        private itemsService: ItemsService
    ) {
        this.form = formBuilder.group({
            id: ['', [
            ]],
            englishname: ['', [
                Validators.required
            ]],
            localname: ['', [
                Validators.required
            ]]
        });
    }

    ngOnInit() {
        this.userLogin = JSON.parse(sessionStorage.getItem('userLogin'));

        this.positionService.getPositions()
            .subscribe(data => {
                this.positions = data, this.cc = data.length
            },
            error => {
                this.notificationService.printErrorMessageBl('Failed to load Positions. ' + error);
            });
    }

    add(): void {
        this.modalActions.emit({ action: "modal", params: ['open'] });
        this.modalHeader = 'Add';
        this.position = new Position();
    }

    save(): void {
        var result, data = this.form.value;
        if (data.id) {
            this.positionService.updatePosition(data).subscribe(() => {
                this.itemsService.setItem<Position>(this.positions, (u) => u.id == data.id, data);
                this.notificationService.printSuccessMessageBl(data.name + ' has been update');
            });
        } else {
            this.positionService.addPosition(data).subscribe((resCreated) => {
                this.itemsService.setItem<Position>(this.positions, (u) => u.id == -1, resCreated);
                this.cc = this.cc + 1;
                this.notificationService.printSuccessMessageBl(data.name + ' has been create');
            });
        }        
    }

    update(position, event): void {
        this.modalActions.emit({ action: "modal", params: ['open'] });
        this.modalHeader = 'Edit';
        event.preventDefault();
        this.positionService.getPosition(position.id)
            .subscribe(data => this.position = data);
    }

    delete(position, event): void {
        event.preventDefault();
        this.notificationService.openConfirmationDialog('Are you sure you want to remove '
            + position.localname + '?',
            () => {
                this.positionService.deletePosition(position.id)
                    .subscribe(() => {
                        this.itemsService.removeItemFromArray<Position>(this.positions, position);
                        this.cc = this.cc - 1;
                        this.notificationService.printSuccessMessageBl(position.name + ' has been deleted');
                    });
            });
    }

    closeModal() {
        this.modalActions.emit({ action: "modal", params: ['close'] });
    }
}