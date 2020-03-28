import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/services/auth.service";
import { User } from "src/models/user.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public user: User;
  public password: string;
  constructor(private auth: AuthService) {
    this.user = new User();
  }

  ngOnInit(): void {}

  public signIn() {
    this.auth.signIn(this.user, this.password);
  }

  public register() {
    this.auth.register(this.user, this.password);
  }
}
