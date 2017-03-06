import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/utils/notification.service';
import { LoginService } from '../shared/services/login.service';
import { Login, Position, User } from '../shared/services/login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    isLogin: boolean = false;
    isMultiplePosition: boolean = false;
    loginData: Login;
    selectPositionOptions: any;
    changeposition = 0;
    changepositionname = '';
    changepositionlocalname = '';
    positionlogindata: any;
    imgLogin: string = "../../assets/icon-user-default.png";
    isLoading: boolean = false;
    updatePassword: User;

    constructor(
        private loginService: LoginService,
        private notificationService: NotificationService
    ) {
        this.resetForm();
    }

    ngOnInit() {
        if (!sessionStorage.getItem('userLogin')) {
            this.isLogin = false;
        } else {
            this.loginData = JSON.parse(sessionStorage.getItem('userLogin'));
            this.isLogin = true;
        }
    }

    resetForm() {
        this.loginData = new Login();
        this.updatePassword = new User();
        this.changeposition = 0;
        this.changepositionname = '';
        this.changepositionlocalname = '';
    }

    login(event) {
        if (event.username.length > 0) {
            this.isLoading = true;
            this.loginService.getUser(event.username)
                .subscribe(res => {
                    if (res.length > 0) {
                        if (res[0].password == event.password) {

                            this.positionlogindata = res[0];

                            this.loginService.getUserpositionLogin(event.username)
                                .subscribe(userp => {

                                    if (userp.length > 1) {
                                        //login success with multi position

                                        this.selectPositionOptions = userp;
                                        this.isMultiplePosition = true;
                                        this.isLogin = true;

                                    } else {
                                        //login success  

                                        this.isMultiplePosition = false;
                                        this.isLogin = true;

                                        if (userp[0]) {
                                            this.loginData.username = res[0].username;
                                            this.loginData.fullname = res[0].fullname;
                                            this.loginData.position = userp[0].position;
                                            this.loginData.positionName = userp[0].positionName;
                                            this.loginData.positionLocalName = userp[0].positionLocalName;
                                            this.loginData.roleuser = res[0].roleuser;
                                            this.loginData.roleuserName = res[0].roleuserName;

                                            sessionStorage.setItem("userLogin", JSON.stringify(this.loginData));

                                            this.notificationService.printSuccessMessage('Login User. Success');    
                                        }
                                    }

                                    this.isLoading = false;

                                }, error => {

                                    this.isLoading = false;
                                    this.notificationService.printErrorMessage('Failed to check Position. Please refresh page. ');
                                });

                        } else {

                            this.isLoading = false;
                            this.notificationService.printErrorMessage('Failed to login User. Password is invalid');
                        }

                    } else {

                        this.isLoading = false;
                        this.notificationService.printErrorMessage('Failed to login User. Not found');
                    }

                }, error => {

                    this.isLoading = false;
                    this.notificationService.printErrorMessage('Failed to login User. ' + error);
                });

        }
    }

    changedPassword(password) {
        this.updatePassword = {
            username: this.loginData.username,
            password: password.newpassword.trim()
        };

        this.loginService.updatePassword(this.updatePassword)
            .subscribe(() => {
                this.notificationService.printSuccessMessage('Change password. Success');
            }, error => {
                this.notificationService.printErrorMessage('Change password. Failed ' + error);
            });
    }

    changedposition(position) {
        this.loginService.getPosition(position)
            .subscribe(res => {
                this.changeposition = res.id;
                this.changepositionname = res.englishname;
                this.changepositionlocalname = res.localname;
            }, error => {
                this.notificationService.printErrorMessage('Failed to change Position. ' + error);
            });
    }

    position(event) {
        if (this.changeposition == 0) {
            this.notificationService.printErrorMessage('Plese select position.');
            return;
        }

        this.loginData.username = this.positionlogindata.username;
        this.loginData.fullname = this.positionlogindata.fullname;
        this.loginData.position = this.changeposition;
        this.loginData.positionName = this.changepositionname;
        this.loginData.positionLocalName = this.changepositionlocalname;
        this.loginData.roleuser = this.positionlogindata.roleuser;
        this.loginData.roleuserName = this.positionlogindata.roleuserName;

        sessionStorage.setItem("userLogin", JSON.stringify(this.loginData));

        this.notificationService.printSuccessMessage('Login User. Success');
        this.isMultiplePosition = false;
    }

    logout(event) {
        this.resetForm();
        this.isLogin = false;
        sessionStorage.removeItem("userLogin");
    }
}