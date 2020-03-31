import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { FirestoreService } from "src/services/firestore.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-request-supplies",
  templateUrl: "./request-supplies.component.html",
  styleUrls: ["./request-supplies.component.css"]
})
export class RequestSuppliesComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
  extraInformation: string;
  address: string;
  constructor(
    private http: HttpClient,
    private firestore: FirestoreService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  async onSubmit(f: NgForm) {
    console.log(f.value);
    await this.http
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${f.value.address}&key=AIzaSyCXzMORl4ktI8XTbY63w2clCgpEj2eHaJE`
      )
      .subscribe(data => {
        const res: any = data;
        const latitude = res.results[0].geometry.location.lat;
        const longitude = res.results[0].geometry.location.lng;
        this.firestore.requestSupplies(latitude, longitude, f.value);
        this.router.navigate(["dashboard"]);
      });
  }
}
