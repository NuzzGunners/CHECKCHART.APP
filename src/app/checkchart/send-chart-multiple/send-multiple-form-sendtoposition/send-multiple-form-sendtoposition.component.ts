import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
    selector: 'app-send-multiple-form-sendtoposition',
    templateUrl: './send-multiple-form-sendtoposition.component.html',
    styleUrls: ['./send-multiple-form-sendtoposition.component.css']
})
export class SendMultipleFormSendtopositionComponent implements OnChanges {

    @Input() sendtouser: any;
    @Input() position: number;
    @Input() isPopupclose: boolean;

    @Output() ddlsendtouser: EventEmitter<string> = new EventEmitter();
    @Output() changePositionToSend: EventEmitter<string> = new EventEmitter();

    groupPosition: any;
    isSendCoder: boolean = false;
    sendtouserSelected: string;

    changeddlsendtouser() {
        this.ddlsendtouser.emit(this.sendtouserSelected);
    }

    changegroupPosition(event) {
        if (event.target.value === '0') {
            this.isSendCoder = true;
        } else {
            this.isSendCoder = false;
        }
        this.changePositionToSend.emit(event.target.value);
        this.sendtouserSelected = '';
    }

    // Only called if there is an [input] variable set by parent.
    ngOnChanges() {
        this.isSendCoder = false;
        if (this.position == 55) {
            this.sendtouserSelected = '';
            this.ddlsendtouser.emit();
        }
    }
}