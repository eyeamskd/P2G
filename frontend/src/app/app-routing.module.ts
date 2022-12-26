import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './location/location.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { VerifyComponent } from './verify/verify.component';


const routes: Routes = [
    { path: "", redirectTo: "/verify", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "signUp", component: SignupComponent },
    { path: "userDashboard/:id", component: UserDashboardComponent, canActivate: [AuthGuard] },
    { path: "home", component: HomeComponent },
    { path: "verify", component: VerifyComponent },
    { path: "contactus", component: ContactUsComponent },
    { path: "roomdetails/:id", component: RoomDetailsComponent },
    { path: "location/:id", component: LocationComponent },
    { path: "**", component: PageNotFoundComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
