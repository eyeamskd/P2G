import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateNumberOfFileUploaded } from 'src/shared/fileUpload.validator';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    buttonActivate: boolean = false;

    signupForm!: FormGroup;
    pgForm!: FormGroup;
    fileListUpdated!: FileList;


    constructor(public authService: AuthService, private router: Router) {
        this.signupForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+(([,. -][a-zA-Z ])?[a-zA-Z]*)*$')]),
            phoneNo: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
            email: new FormControl('', [Validators.required, Validators.email]),
            addressNo: new FormControl('', [Validators.required]),
            streetName: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required]),
            pincode: new FormControl('', [Validators.required, Validators.min(110000), Validators.max(999999)]),
            password: new FormControl('', Validators.required)
        })
        this.pgForm = new FormGroup({
            pgName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+(([,. -][a-zA-Z ])?[a-zA-Z]*)*$')]),
            gender: new FormControl('male', [Validators.required]),
            price: new FormControl(500, [Validators.required, Validators.min(500)]),
            roomType: new FormControl('1bhk', [Validators.required]),
            fullAddress: new FormControl('', Validators.required),
            location: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+(([,. -][a-zA-Z ])?[a-zA-Z]*)*$')])
        })
    }

    ngOnInit(): void {
    }

    signUp() {
        let fullAddress: string = this.signupForm.value.addressNo + ", " + this.signupForm.value.streetName + ", " + this.signupForm.value.city + "-" + this.signupForm.value.pincode;
        this.authService.createUser(this.signupForm.value.name, this.signupForm.value.phoneNo, this.signupForm.value.email, fullAddress, this.signupForm.value.password,
            this.pgForm.value.pgName, this.pgForm.value.gender, this.pgForm.value.price, this.pgForm.value.roomType, this.pgForm.value.location.toLowerCase(), this.pgForm.value.fullAddress, this.fileListUpdated
        );
    }
    imageFile(event: Event) {
        const element = event.target as HTMLInputElement;
        if (element.files != null) {
            this.fileListUpdated = element.files;
        }
        this.buttonActivate = true;
    }


    get name() {
        return this.signupForm.get('name');
    }
    get phoneNo() {
        return this.signupForm.get('phoneNo');
    }
    get email() {
        return this.signupForm.get('email');
    }
    get addressNo() {
        return this.signupForm.get('addressNo');
    }
    get streetName() {
        return this.signupForm.get('streetName');
    }
    get city() {
        return this.signupForm.get('city');
    }
    get pincode() {
        return this.signupForm.get('pincode');
    }
    get password() {
        return this.signupForm.get('password');
    }
    get pgName() {
        return this.pgForm.get('pgName');
    }
    get gender() {
        return this.pgForm.get('gender');
    }
    get price() {
        return this.pgForm.get('price');
    }
    get roomType() {
        return this.pgForm.get('roomType');
    }
    get fullAddress() {
        return this.pgForm.get('fullAddress');
    }
    get location() {
        return this.pgForm.get('location');
    }
}
