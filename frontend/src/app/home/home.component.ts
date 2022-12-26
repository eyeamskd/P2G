import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../home.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    citiesData!: { cityName: string, cityIcon: string }[];


    constructor(private homeService: HomeService, private router: Router) { this.citiesData = this.homeService.citiesData; }

    ngOnInit(): void {
    }

    onClick(locationName: string) {
        // router navigate and send the location to location pg
        this.router.navigate(['/location', locationName])
    }
}
