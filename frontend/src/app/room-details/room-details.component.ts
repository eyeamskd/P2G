import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HomeService } from '../home.service';
import { PgService } from '../pg.service';

@Component({
    selector: 'app-room-details',
    templateUrl: './room-details.component.html',
    styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {

    constructor(private pgService: PgService, private route: ActivatedRoute, private authService: AuthService) {
        this.pgService.getSingleRoomDetails(this.roomId).subscribe(data => {
            this.roomData = data[0];
            this.authService.getUserData(this.roomData.ownerId).subscribe(data => {
                this.userData = data;
            })
        })
    }

    ngOnInit(): void {
    }

    roomId: string | null = this.route.snapshot.paramMap.get('id');
    roomData!: {
        gender: string,
        fulladdress: string,
        location: string,
        name: string,
        ownerId: string,
        price: number,
        roomType: string,
        _id: string, images: string[]
    };
    userData!: { _id: string, name: string, phoneNo: string, email: string, address: string, password: string };

    onSchedule() {
        alert("You have scheduled a visit to " + this.roomData.name.toUpperCase() + " PG.");
    }


}
