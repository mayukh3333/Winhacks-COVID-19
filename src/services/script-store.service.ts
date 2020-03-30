import { Injectable } from "@angular/core";

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: "vendorjs", src: "../assets/js/vendor.js" },
  { name: "appjs", src: "../assets/js/app.js" }
];

declare var document: any;
declare var $: any;

@Injectable({
  providedIn: "root"
})
export class ScriptStoreService {
  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach(script => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      // if (!this.scripts[name].loaded) {
      //load script
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = this.scripts[name].src;
      if (script.readyState) {
        //IE
        script.onreadystatechange = () => {
          if (
            script.readyState === "loaded" ||
            script.readyState === "complete"
          ) {
            script.onreadystatechange = null;
            this.scripts[name].loaded = true;
            resolve({ script: name, loaded: true, status: "Loaded" });
          }
        };
      } else {
        //Others
        script.onload = () => {
          this.scripts[name].loaded = true;
          resolve({ script: name, loaded: true, status: "Loaded" });
        };
      }
      script.onerror = (error: any) =>
        resolve({ script: name, loaded: false, status: "Loaded" });
      document.getElementsByTagName("head")[0].appendChild(script);
      // }
      // else {
      //     resolve({ script: name, loaded: true, status: 'Already Loaded' });

      // }
    });
  }

  forceReloadJS(srcUrlContains) {
    $.each($('script:empty[src*="' + srcUrlContains + '"]'), function(
      index,
      el
    ) {
      var oldSrc = $(el).attr("src");
      var t = +new Date();
      var newSrc = oldSrc + "?" + t;

      console.log(oldSrc, " to ", newSrc);

      $(el).remove();
      $("<script/>")
        .attr("src", newSrc)
        .appendTo("body");
    });
  }
}
