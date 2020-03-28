import { Injectable } from "@angular/core";

import { User } from "src/models/user.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFirestoreCollection } from "@angular/fire/firestore/public_api";
import "firebase/firestore";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class FirestoreService {
  public usersCollection: AngularFirestoreCollection = this.firestore.collection(
    "Users"
  );

  constructor(private firestore: AngularFirestore, private router: Router) {}

  registerNewUser(uid: string, user: User, token: string) {
    const email = user.email;
    const type = user.type;
    this.usersCollection
      .doc(uid)
      .set({
        email,
        type
      })
      .then(data => {
        localStorage.setItem("token", token);
        this.router.navigate(["dashboard"]);
      });
  }
}
