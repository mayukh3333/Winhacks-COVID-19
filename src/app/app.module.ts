import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { LoginComponent } from "./login/login.component";
import { FormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
import { JwtHelperService } from "@auth0/angular-jwt";
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        // tokenGetter: tokenGetter
        // whitelistedDomains: ["example.com"],
        // blacklistedRoutes: ["example.com/examplebadroute/"]
      }
    })
  ],
  providers: [JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule {}
