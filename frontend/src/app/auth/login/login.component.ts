import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    // email: string = "";
    // password: string = "";
    loginForm!: FormGroup;

    constructor(private authService: AuthService) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required)
        })
    }

    ngOnInit(): void {
    }

    login() {
        // console.log(this.loginForm.value.password);
        this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        this.loginForm.reset();
    }

    get email() {
        return this.loginForm.get('email');
    }
    get password() {
        return this.loginForm.get('password');
    }

}
