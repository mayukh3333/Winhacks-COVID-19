import { Component, OnInit, ViewChild } from "@angular/core";
import { Map } from "mapbox-gl";
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  @ViewChild("map") map: Map;

  constructor() {}

  ngOnInit(): void {
    (mapboxgl as any).accessToken =
      "pk.eyJ1IjoibWVuZG96YW5tYXJ0aW4iLCJhIjoiY2p3bm45enM5MHB3NjN5cDhyYjc3dDI3bCJ9.tZmq7oSfeni7-whG9aaajw";
    this.map = new Map({
      container: "map",
      style: "mapbox://styles/mendozanmartin/ck8bwchuv2flt1iqiiyr9x7iz",
      zoom: 3,
      center: [-79.4162979, 43]
    });
    const map = this.map;
    console.log(map);
    setTimeout(() => {
      this.onLoad(map);
    }, 1000);

    map.on("click", "trees-point", function(e) {
      new mapboxgl.Popup()
        .setLngLat(e.features[0].geometry.coordinates)
        .setHTML("<b>DBH:</b> " + e.features[0].properties.dbh)
        .addTo(map);
    });
  }

  onLoad(map) {
    map.addSource("trees", {
      type: "geojson",
      data: "../../assets/trees.geojson"
    });

    console.log("Added trees");
    map.addLayer(
      {
        id: "trees-heat",
        type: "heatmap",
        source: "trees",
        maxzoom: 15,
        paint: {
          // increase weight as diameter breast height increases
          "heatmap-weight": {
            property: "dbh",
            type: "exponential",
            stops: [
              [1, 0],
              [62, 1]
            ]
          },
          // increase intensity as zoom level increases
          "heatmap-intensity": {
            stops: [
              [11, 1],
              [15, 3]
            ]
          },
          // assign color values be applied to points depending on their density
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(236,222,239,0)",
            0.2,
            "rgb(208,209,230)",
            0.4,
            "rgb(166,189,219)",
            0.6,
            "rgb(103,169,207)",
            0.8,
            "rgb(28,144,153)"
          ],
          // increase radius as zoom increases
          "heatmap-radius": {
            stops: [
              [11, 15],
              [15, 20]
            ]
          },
          // decrease opacity to transition into the circle layer
          "heatmap-opacity": {
            default: 1,
            stops: [
              [14, 1],
              [15, 0]
            ]
          }
        }
      },
      "waterway-label"
    );
    console.log("Added Layer 1");
    map.addLayer(
      {
        id: "trees-point",
        type: "circle",
        source: "trees",
        minzoom: 14,
        paint: {
          // increase the radius of the circle as the zoom level and dbh value increases
          "circle-radius": {
            property: "dbh",
            type: "exponential",
            stops: [
              [{ zoom: 15, value: 1 }, 5],
              [{ zoom: 15, value: 62 }, 10],
              [{ zoom: 22, value: 1 }, 20],
              [{ zoom: 22, value: 62 }, 50]
            ]
          },
          "circle-color": {
            property: "dbh",
            type: "exponential",
            stops: [
              [0, "rgba(236,222,239,0)"],
              [10, "rgb(236,222,239)"],
              [20, "rgb(208,209,230)"],
              [30, "rgb(166,189,219)"],
              [40, "rgb(103,169,207)"],
              [50, "rgb(28,144,153)"],
              [60, "rgb(1,108,89)"]
            ]
          },
          "circle-stroke-color": "white",
          "circle-stroke-width": 1,
          "circle-opacity": {
            stops: [
              [14, 0],
              [15, 1]
            ]
          }
        }
      },
      "waterway-label"
    );
    console.log("Added layer 2");
  }
}
