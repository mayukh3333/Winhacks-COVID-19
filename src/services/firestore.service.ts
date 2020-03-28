import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore/firestore";
import { AngularFirestoreCollection } from "@angular/fire/firestore/public_api";

@Injectable({
  providedIn: "root"
})
export class FirestoreService {
  public usersCollection: AngularFirestoreCollection = this.firestore.collection(
    "Users"
  );

  constructor(private firestore: AngularFirestore) {}
}
