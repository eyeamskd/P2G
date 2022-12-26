import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { elementAt, filter } from 'rxjs';
import { HomeService } from '../home.service';
import { PGData } from '../pg-data.model';
import { PgService } from '../pg.service';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

    constructor(private router: Router, private homeService: HomeService, private route: ActivatedRoute, private pgService: PgService) {

        this.pgService.getLocationPGs(this.location).subscribe(data => {
            this.pgData.push(data);
            this.displayLocation = this.location;
            if (this.pgData[0].message === "No PG found right now") {
                this.noPg = true;
            }
            else {
                this.noPg = false;
                this.pgData[0].result.forEach((value: any, key: any) => {
                    this.pgDataCleared.push(value);
                });
                this.backuppgDataCleared = this.pgDataCleared;
            }
        })
    }

    ngOnInit(): void {
    }

    citiesName: { cityName: string, cityIcon: string }[] = this.homeService.citiesData;
    location: string | null = this.route.snapshot.paramMap.get('id');
    noPg!: boolean;
    pgData: any = [];
    pgDataCleared: PGData[] = [];
    backuppgDataCleared: PGData[] = [];
    selectedLocation: string = "Select the location";
    displayLocation: string | null = "";
    selectedGender: string = "Sex";
    selectedRoomType: string = "Occupancy";
    selectedPrice: string = "Price Range";

    onLocationChange(event: Event) {
        this.pgData = [];
        this.pgDataCleared = [];
        this.pgService.getLocationPGs(this.selectedLocation).subscribe(data => {
            this.displayLocation = this.selectedLocation;
            this.pgData.push(data);
            if (this.pgData[0].message === "No PG found right now") {
                this.noPg = true;
            }
            else {
                this.noPg = false;
                this.pgData[0].result.forEach((value: any, key: any) => {
                    this.pgDataCleared.push(value);
                    // console.log(value)
                });
            }
        })
        this.selectedGender = "Sex";
        this.selectedRoomType = "Occupancy";
        this.selectedPrice = "Price Range";
        this.router.navigate(['/location', this.selectedLocation])
    }

    onDetails(id: string) {
        console.log(id);
        this.router.navigate(['/roomdetails', id]);
    }
    filterChange() {
        this.pgDataCleared = this.backuppgDataCleared;
        console.log(this.pgDataCleared);
        let filteredData: PGData[] = [];
        if (this.selectedGender !== "Sex") {
            this.pgDataCleared.forEach(element => {
                if (element.gender.toLowerCase() === this.selectedGender) {
                    filteredData.push(element);
                }
            })
            this.pgDataCleared = filteredData;
        }
        if (this.selectedRoomType !== "Occupancy") {
            filteredData = [];
            this.pgDataCleared.forEach(element => {
                if (element.roomType === this.selectedRoomType) {
                    filteredData.push(element);
                }
            })
            this.pgDataCleared = filteredData;
        }
        if (this.selectedPrice !== "Price Range") {
            filteredData = [];
            this.pgDataCleared.forEach(element => {
                let range = this.selectedPrice.split('-');
                let low = range[0], high = range[1];
                if (element.price >= parseInt(low) && element.price <= parseInt(high)) {
                    filteredData.push(element);
                }
            })
            this.pgDataCleared = filteredData;
        }
        console.log(this.pgDataCleared);
    }
}
