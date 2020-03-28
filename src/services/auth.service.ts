import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "src/models/user.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { FirestoreService } from "./firestore.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    public auth: AngularFireAuth,
    public jwtHelper: JwtHelperService,
    public firestore: FirestoreService,
    public router: Router
  ) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  register(user: User, password: string) {
    console.log("User Object", user);
    return this.auth
      .createUserWithEmailAndPassword(user.email, password)
      .then(res => {
        res.user.getIdToken().then(data => {
          this.firestore.registerNewUser(res.user.uid, user, data);
        });
        return res;
      })
      .catch(error => {
        return error;
      });
  }

  signIn(user: User, password: string) {
    return this.auth
      .signInWithEmailAndPassword(user.email, password)
      .then(res => {
        res.user.getIdToken().then(data => {
          localStorage.setItem("token", data);
          this.router.navigate(["dashboard"]);
        });
        return res;
      })
      .catch(error => {
        return error;
      });
  }
}
