import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuardService } from "src/services/auth-guard.service";
import { RequestSuppliesComponent } from "./request-supplies/request-supplies.component";
import { DonationPageComponent } from "./donation-page/donation-page.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "dashboard",
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "request-supplies",
    component: RequestSuppliesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "donate-supplies",
    component: DonationPageComponent,
    canActivate: [AuthGuardService]
  },
  { path: "**", redirectTo: "dashboard", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
