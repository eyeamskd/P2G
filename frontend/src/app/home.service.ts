import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor() { }

    citiesData = [
        {
            "cityName": "Bengaluru",
            "cityIcon": "./assets/bengaluru.webp"
        },
        {
            "cityName": "Chennai",
            "cityIcon": "./assets/chennai.webp"
        },
        {
            "cityName": "Dehradun",
            "cityIcon": "./assets/dehradun.webp"
        },
        {
            "cityName": "Delhi",
            "cityIcon": "./assets/delhi.webp"
        },
        {
            "cityName": "Mumbai",
            "cityIcon": "./assets/mumbai.webp"
        },
        {
            "cityName": "Hyderabad",
            "cityIcon": "./assets/hyderabad.webp"
        },
        {
            "cityName": "Kolkata",
            "cityIcon": "./assets/kolkata.webp"
        },
        {
            "cityName": "Coimbatore",
            "cityIcon": "./assets/coimbatore.webp"
        },
        {
            "cityName": "Pune",
            "cityIcon": "./assets/pune.webp"
        },
        {
            "cityName": "Gurgaon",
            "cityIcon": "./assets/gurgaon.webp"
        },
        {
            "cityName": "Kochi",
            "cityIcon": "./assets/kochi.webp"
        },
        {
            "cityName": "Jaipur",
            "cityIcon": "./assets/jaipur.webp"
        },
    ];

    getCityData() {
        return this.citiesData;
    }

}