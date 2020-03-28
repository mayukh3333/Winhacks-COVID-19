import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/services/auth.service";
import { User } from "src/models/user.model";
import { Router, NavigationEnd, Event } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ScriptStoreService } from "src/services/script-store.service";
declare var $: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public user: User;
  public password: string;
  public retypedPassword: string;
  public errorTitle: string;
  public errorMessage: string;
  public error: Array<any> = [
    {
      title: "Missing Email",
      message: "Please ensure that you have added a proper email"
    },
    {
      title: "Password Mismatch",
      message: "Please ensure that you have typed both passwords correctly"
    }
  ];
  constructor(
    private auth: AuthService,
    private dynamicScriptLoader: ScriptStoreService,
    private router: Router
  ) {
    this.user = new User();
    this.user.type = "receiver";
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.loadScripts();
      }
    });
  }

  private loadScripts() {
    this.dynamicScriptLoader
      .load("appjs")
      .then(data => {
        console.log(data);
        console.log("Scripts loaded succesfully");
      })
      .catch(error => console.log(error));
  }
  public signIn() {
    if (this.user.email === undefined) {
      this.errorTitle = this.error[0].title;
      this.errorMessage = this.error[0].message;
      $("#modal").modal();
    } else {
      this.auth.signIn(this.user, this.password).then(data => {
        if (data.code) {
          this.errorTitle = "Error";
          this.errorMessage = data.message;
          $("#modal").modal();
        }
      });
    }
  }

  public register() {
    if (this.retypedPassword !== this.password) {
      this.errorTitle = this.error[1].title;
      this.errorMessage = this.error[1].message;
      $("#modal").modal();
    } else if (this.user.email === undefined) {
      this.errorTitle = this.error[0].title;
      this.errorMessage = this.error[0].message;
      $("#modal").modal();
    } else {
      this.auth.register(this.user, this.password).then(data => {
        if (data.code) {
          this.errorTitle = "Error";
          this.errorMessage = data.message;
          $("#modal").modal();
        }
      });
    }
  }
}
