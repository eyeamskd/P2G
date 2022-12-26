import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PGData } from './pg-data.model';

@Injectable({
    providedIn: 'root'
})
export class PgService {

    constructor(private http: HttpClient, private router: Router) { }

    getLocationPGs(locationName: string | null) {
        return this.http.get<[{
            ownerId: string,
            name: string,
            gender: string,
            price: number,
            roomType: string,
            location: string,
            fulladdress: string,
            available: boolean,
            images: string
        }]>("http://localhost:3000/api/" + locationName);
    }

    addNewPg(ownerid: string | null, pgName: string, pgGender: string, pgPrice: number, pgRoomType: string, pgLocation: string, pgFullAddress: string, fileListUpdated: FileList) {
        const data = { ownerId: ownerid, name: pgName, gender: pgGender, price: pgPrice, roomType: pgRoomType, fulladdress: pgFullAddress, location: pgLocation };
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
        }>("http://localhost:3000/api/uploadpg", data).subscribe(response => {
            if (response) {
                for (let index = 0; index < fileListUpdated.length; index++) {
                    if (index > 4) {
                        break;
                    }
                    formData.append("files", fileListUpdated[index]);
                }

                formData.append("roomId", response.result._id);
                this.http.post("http://localhost:3000/api/uploadpgimage", formData).subscribe(response => {
                    alert("New PG added");
                })
            }
            else {
                console.log("error");
            }
        })
    }

    getSingleRoomDetails(id: string | null) {
        return this.http.get<[{
            gender: string,
            fulladdress: string,
            location: string,
            name: string,
            ownerId: string,
            price: number,
            roomType: string,
            _id: string, images: string[]
        }]>("http://localhost:3000/api/getRoom/" + id);
    }

    updatePGData(_id: string, ownerid: string | null, pgName: string, pgGender: string, pgPrice: number, pgRoomType: string, pgLocation: string, pgFullAddress: string, fileListUpdated: FileList) {
        const data = { _id: _id, ownerId: ownerid, name: pgName, gender: pgGender, price: pgPrice, roomType: pgRoomType, fulladdress: pgFullAddress, location: pgLocation, available: true, images: [] };
        const formData = new FormData();
        this.http.put<{
            message: string, result: {
                gender: string,
                location: string,
                name: string,
                ownerId: string,
                price: number,
                roomType: string,
                _id: string,
                avialable: boolean,
            }
        }>("http://localhost:3000/api/editpg/" + _id, data).subscribe(response => {
            if (response) {
                for (let index = 0; index < fileListUpdated.length; index++) {
                    if (index > 4) {
                        break;
                    }
                    formData.append("files", fileListUpdated[index]);
                }
                formData.append("roomId", _id);
                this.http.post("http://localhost:3000/api/uploadpgimage", formData).subscribe(response => {
                    alert("New PG added");
                })
            }
            else {
                console.log("error");
            }
        })
    }

    editPg(_id: string, ownerid: string | null, pgName: string, pgGender: string, pgPrice: number, pgRoomType: string, pgLocation: string, pgFullAddress: string, images: string[], available: boolean) {
        const data = { _id: _id, ownerId: ownerid, name: pgName, gender: pgGender, price: pgPrice, roomType: pgRoomType, fulladdress: pgFullAddress, location: pgLocation, images: images, available: available };
        this.http.put<{
            message: string
        }>("http://localhost:3000/api/editpg/" + _id, data).subscribe(response => {
            if (response) {
                console.log(response);
            }
            else {
                console.log("error");
            }
        })
    }

    roomsAddedBySingleUser(userId: string | null) {
        return this.http.get<{
            result: [{
                gender: string,
                fulladdress: string,
                location: string,
                name: string,
                ownerId: string,
                price: number,
                roomType: string,
                _id: string, images: string[], available: boolean,
            }], message: string
        }>("http://localhost:3000/api/getRooms/" + userId);
    }

}
