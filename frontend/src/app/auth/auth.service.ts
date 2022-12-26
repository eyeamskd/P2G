import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserData } from './auth-data.model';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isAuthenticated: boolean = false;
    private token: string = "";
    private tokenTimer: any;
    private user = [];
    private authStatusListener = new Subject<boolean>();
    private userUpdated = new Subject<any>();

    constructor(private http: HttpClient, private router: Router) { }

    getIsToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    createUser(name: string, phoneNo: string, email: string, address: string, password: string, pgName: string, pgGender: string, pgPrice: number, pgRoomType: string, pgLocation: string, pgFullAddress: string, fileListUpdated: FileList) {
        const data = { name: name, phoneNo: phoneNo, email: email, address: address, password: password, pgName: pgName, pgGender: pgGender, pgPrice: pgPrice, pgRoomType: pgRoomType, pgFullAddress: pgFullAddress, pgLocation: pgLocation };
        const formData = new FormData();
        this.http.post<{
            message: string, result: {
                gender: string,
                location: string,
                name: string,
                ownerId: string,
                price: number,
                roomType: string,
                _id: string
            }
        }>("http://localhost:3000/api/user/signup", data).subscribe(response => {
            if (response) {
                for (let index = 0; index < fileListUpdated.length; index++) {
                    if (index > 4) {
                        break;
                    }
                    formData.append("files", fileListUpdated[index]);
                }

                formData.append("roomId", response.result._id);
                this.http.post("http://localhost:3000/api/uploadpgimage", formData).subscribe(response => {
                    alert("Account Created Successfully! Login to Continue");
                    this.router.navigate(['/login']);
                })

            }
        })
    }

    login(email: string, password: string) {
        const userData: UserData = { name: "", phoneNo: "", email: email, address: "", password: password }
        this.http.post<{ token: string, expiresIn: number, userId: string, message: string }>("http://localhost:3000/api/user/login", userData).subscribe({
            next: (response) => {
                this.token = response.token;
                const message: string = response.message;
                const userId: string = response.userId;
                if (this.token) {
                    const expiresDuration = response.expiresIn;
                    this.setAuthTimer(expiresDuration);
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    const nowDate = new Date();
                    const expirationDate = new Date(nowDate.getTime() + expiresDuration * 1000);
                    this.saveAuthData(this.token, expirationDate, userId);
                    alert(message)
                    this.router.navigate(['/userDashboard', userId]);
                }
            }
            , error: (err) => {
                alert(err.error.message)
            }
        })
    }

    logout() {
        this.token = "";
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/login']);
    }

    getUserData(id: string | null) {
        return this.http.get<{ _id: string, name: string, phoneNo: string, email: string, address: string, password: string }>("http://localhost:3000/api/user/getUser/" + id);
    }

    editUserData(id: string | null, name: string, phoneNo: string, email: string, address: string, password: string) {
        const user = { _id: id, name: name, phoneNo: phoneNo, email: email, address: address, password: password }
        this.http.put("http://localhost:3000/api/user/editUser/" + id, user).subscribe(response => {
            console.log(response);
        });
    }

    private setAuthTimer(duration: number) {
        // console.log("timer:" + duration);
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, exppirationDate: Date, userId: string) {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("expiration", exppirationDate.toISOString());
    }

    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("expiration");
    }

    private getAuthData() {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const expirationDate = localStorage.getItem("expiration");

        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            id: userId
        }
    }
}
