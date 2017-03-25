import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-send-multiple-form-sendtoposition',
    templateUrl: './send-multiple-form-sendtoposition.component.html',
    styleUrls: ['./send-multiple-form-sendtoposition.component.css']
})
export class SendMultipleFormSendtopositionComponent {

    @Input() sendtouser: any;
    @Input() position: number;

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
}