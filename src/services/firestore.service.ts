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
  public requestsCollection: AngularFirestoreCollection = this.firestore.collection(
    "Requests"
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

  requestSupplies(latitude: number, longitude: number, formValues: any) {
    const data = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [latitude, longitude]
      },
      properties: {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        institution: formValues.institution,
        city: formValues.city,
        country: formValues.country,
        address: formValues.address,
        extraInformation: formValues.extraInformation,
        uid: localStorage.getItem("uid")
      }
    };
    this.requestsCollection.add(JSON.parse(JSON.stringify(data)));
  }
  async getRequestedSupplies() {
    return this.firestore
      .collection("Requests")
      .snapshotChanges()
      .subscribe(res => {
        return res;
      });
  }
}
