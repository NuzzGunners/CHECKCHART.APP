import { Injectable } from '@angular/core';
import { Predicate } from '../../shared/interfaces'

declare var alertify: any;

@Injectable()
export class NotificationService {
    private _notifier: any = alertify;

    constructor() { }

    /*
    Opens a confirmation dialog using the alertify.js lib
    */
    openConfirmationDialog(message: string, okCallback: () => any) {
        this._notifier.confirm(message, function (e) {
            if (e) {
                okCallback();
            } else {
            }
        });
    }

    /*
    Prints a success message using the alertify.js lib
    */
    printSuccessMessage(message: string) {
        this._notifier.logPosition("bottom right").success(message);
    }

    printSuccessMessageBl(message: string) {
        this._notifier.logPosition("bottom left").success(message);
    }

    /*
    Prints an error message using the alertify.js lib
    */
    printErrorMessage(message: string) {
        this._notifier.logPosition("bottom right").error(message);
    }

    printErrorMessageBl(message: string) {
        this._notifier.logPosition("bottom left").error(message);
    }
}
