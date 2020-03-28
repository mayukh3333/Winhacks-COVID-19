import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "src/models/user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  register(user: User, password: string) {
    this.auth.createUserWithEmailAndPassword(user.email, password).then(res => {
      console.log(res);
    });
  }

  signIn(user: User, password: string) {
    this.auth.signInWithEmailAndPassword(user.email, password).then(res => {
      console.log(res);
    });
  }
}
