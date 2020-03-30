import { Component } from "@angular/core";
import { LocationStrategy } from "@angular/common";
import { ScriptStoreService } from "src/services/script-store.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(
    private dynamicScriptLoader: ScriptStoreService,
    public location: LocationStrategy
  ) {
    location.onPopState(() => {
      window.location.reload();
      this.loadScripts();
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
}
