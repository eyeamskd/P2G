import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { PgService } from 'src/app/pg.service';
import { UserData } from '../../auth/auth-data.model';

@Component({
    selector: 'app-user-dashboard',
    templateUrl: './user-dashboard.component.html',
    styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {


    buttonActivate: boolean = false;
    editUserForm!: FormGroup;
    clickedUpdatePG!: string;
    pgForm!: FormGroup;
    fileListUpdated!: FileList;
    userData!: UserData;
    userId: string | null = this.route.snapshot.paramMap.get('id');
    randomNumber: number = Math.floor(Math.random() * 10) + 1;
    pgData!: [{ gender: string; fulladdress: string; location: string; name: string; ownerId: string; price: number; roomType: string; _id: string; images: string[]; available: boolean }];

    constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, private pgService: PgService) {

        this.authService.getUserData(this.userId).subscribe(data => {
            if (data != undefined) {
                this.userData = data;
            }
        });
        this.pgService.roomsAddedBySingleUser(this.userId).subscribe(data => {
            this.pgData = data.result;
            console.log(this.pgData)
        });
        this.editUserForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+(([,. -][a-zA-Z ])?[a-zA-Z]*)*$')]),
            phoneNo: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
            email: new FormControl('', [Validators.required, Validators.email]),
            addressNo: new FormControl('', [Validators.required]),
            streetName: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required]),
            pincode: new FormControl('', [Validators.required, Validators.min(110000), Validators.max(999999)]),
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

    editUser() {
        let fulladdress: string = this.editUserForm.value.addressNo + ", " + this.editUserForm.value.streetName + ", " + this.editUserForm.value.city + "-" + this.editUserForm.value.pincode;
        this.authService.editUserData(this.userId, this.editUserForm.value.name, this.editUserForm.value.phoneNo, this.editUserForm.value.email, fulladdress, this.userData.password);
        this.router.navigateByUrl('/userDashboard', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/userDashboard', this.userId]);
        })
    }

    newPg() {
        this.pgService.addNewPg(this.userId, this.pgForm.value.pgName, this.pgForm.value.gender, this.pgForm.value.price, this.pgForm.value.roomType, this.pgForm.value.location.toLowerCase(), this.pgForm.value.fullAddress, this.fileListUpdated);
        this.router.navigateByUrl('/userDashboard', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/userDashboard', this.userId]);
        })
    }

    editPg(element: { gender: string; fulladdress: string; location: string; name: string; ownerId: string; price: number; roomType: string; _id: string; images: string[]; }) {
        // This will make PG unavailable
        this.pgService.editPg(element._id, element.ownerId, element.name, element.gender, element.price, element.roomType, element.location, element.fulladdress, element.images, false);

    }
    getClickedUpdatePG(id: string) {
        this.clickedUpdatePG = id;
    }
    updatePg() {
        // Update any information of PG
        // console.log(this.clickedUpdatePG)
        this.pgService.updatePGData(this.clickedUpdatePG, this.userId, this.pgForm.value.pgName, this.pgForm.value.gender, this.pgForm.value.price, this.pgForm.value.roomType, this.pgForm.value.location.toLowerCase(), this.pgForm.value.fullAddress, this.fileListUpdated);
        this.router.navigateByUrl('/userDashboard', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/userDashboard', this.userId]);
        })
    }

    signOut() {
        this.authService.logout();
        this.router.navigate(['/verify']);
    }

    imageFile(event: Event) {
        const element = event.target as HTMLInputElement;
        if (element.files != null) {
            this.fileListUpdated = element.files;
        }
        this.buttonActivate = true;
    }

    get name() {
        return this.editUserForm.get('name');
    }
    get phoneNo() {
        return this.editUserForm.get('phoneNo');
    }
    get email() {
        return this.editUserForm.get('email');
    }
    get addressNo() {
        return this.editUserForm.get('addressNo');
    }
    get streetName() {
        return this.editUserForm.get('streetName');
    }
    get city() {
        return this.editUserForm.get('city');
    }
    get pincode() {
        return this.editUserForm.get('pincode');
    }
    get password() {
        return this.editUserForm.get('password');
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
