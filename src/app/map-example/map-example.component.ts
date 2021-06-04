import { startOfDay } from 'date-fns';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as L from 'leaflet';
import * as moment from 'moment';

interface stop{
  distance: number,
  location: {
    latitude: number,
    longitude: number
  },
  name: string,
  count: number
}

@Component({
  selector: 'app-map-example',
  templateUrl: './map-example.component.html',
  styleUrls: ['./map-example.component.css']
})
export class MapExampleComponent implements OnInit {

  map;
  result: any;
  stops: stop[];
  requests;
  Info: FormGroup;
  tomorrow  = moment(moment().add(1,'days').startOf('day'), "MM/DD/YYYY HH:mm").valueOf();
  circles = [];
  totalSeats = 0;
  
  constructor(private http: HttpClient,private fb: FormBuilder) {
    this.Info = fb.group({
      routeNumber: [],
      runningDate: []
    })
   }

  ngOnInit(){
    this.Info.get('routeNumber').setValue("HB01");
    this.createMap();
    this.getAllStops();
  }

  getAllStops(routeNumber="HB01",runningDate=this.tomorrow){
    var header = new HttpHeaders()
    header = header.set('Authorization',localStorage.getItem('jwt_token'));
    
    this.http.get('http://localhost:8080/api/v1/route/'+routeNumber,{headers: header,observe:"response"})
    .subscribe((res)=>{
      this.result = res.body;
      this.stops = [];
      for(let i=0;i<this.result.stops.length;i++){
        this.stops.push({
          distance: this.result.stops[i].distance,
          location: {
            latitude: this.result.stops[i].location.latitude,
            longitude: this.result.stops[i].location.longitude
          },
          name: this.result.stops[i].name,
          count: 0
        });
      }
      this.http.get('http://localhost:8080/api/v1/bus/requestForBus',{"headers": header,observe: 'response'})
      .subscribe((resRFB)=>{
        this.requests = resRFB.body;
        for(let j = 0;j<this.requests.length;j++){
          for(let i=0;i<this.stops.length;i++){
            let date = moment(moment(this.requests[j].travelDate).startOf('day'),"MM/DD/YYYY HH:mm").valueOf();
            if(this.requests[j].source === this.stops[i].name && date == runningDate){
              this.stops[i].count =  this.stops[i].count + this.requests[j].numberOfSeats;
            }
          }
        }
        this.popUpCircle();
      });
      
      
    },
    (err)=>{
      console.log("error!!!!");
      this.clearMarkers();
    })
  }

  popUpCircle(){
    this.totalSeats = 0;
    for(let i=0;i<this.stops.length;i++){
      if(this.stops[i].count<1){
        continue;
      }
      this.totalSeats = this.totalSeats + this.stops[i].count;
      let circle = L.circle([this.stops[i].location.latitude, this.stops[i].location.longitude], {
        color: 'rgb(0, 102, 255)',
        fillColor: 'rgb(0, 102, 255)',
        fillOpacity: 0.5,
        radius: 100+50*this.stops[i].count
      }).addTo(this.map);
      circle.bindPopup(this.stops[i].name+": <h3>"+this.stops[i].count+"</h3>");
      this.circles.push(circle);
    }
  }

  OnSubmit(){
    this.clearMarkers();
    let runDate = moment(this.Info.value.runningDate, "MM/DD/YYYY HH:mm").valueOf();
    this.getAllStops(this.Info.value.routeNumber,runDate);
  }

  clearMarkers(){
    for(var i=0;i<this.circles.length;i++){
      this.circles[i].remove();
    }
    this.circles = [];
  }


  createMap(){
      const latlong = {
        lat: 12.9716,
        long: 77.5946
      };

      var street = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGF4bWFuLW0iLCJhIjoiY2twZzdsaGRiMmRjZTJ5b2dhanZnZmZlaCJ9.DNSYB9Q3GWMGyBGiPqXhYA', {
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibGF4bWFuLW0iLCJhIjoiY2twZzdsaGRiMmRjZTJ5b2dhanZnZmZlaCJ9.DNSYB9Q3GWMGyBGiPqXhYA'
      });

      var satellite = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGF4bWFuLW0iLCJhIjoiY2twZzdsaGRiMmRjZTJ5b2dhanZnZmZlaCJ9.DNSYB9Q3GWMGyBGiPqXhYA', {
        maxZoom: 18,
        id: 'mapbox/satellite-v9',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibGF4bWFuLW0iLCJhIjoiY2twZzdsaGRiMmRjZTJ5b2dhanZnZmZlaCJ9.DNSYB9Q3GWMGyBGiPqXhYA'
      });

      this.map = L.map('mapid', {
        center: [latlong.lat, latlong.long],
        zoom: 12,
        layers: [street]
      });

      var baseMaps = {
          "Streets": street,
          "Satellite": satellite
      };
      L.control.layers(baseMaps).addTo(this.map);

      
      // var polyline = L.polyline([[13.042949,77.591427],[13.042320,77.613391],[13.041220,77.620797]], {color: 'red'}).addTo(this.map);
      // this.map.fitBounds(polyline.getBounds());

      // let marker = L.marker([12.9716, 77.5946]).addTo(this.map);
      // let circle = L.circle([12.9716, 77.5946], {
      //   color: 'red',
      //   fillColor: '#f03',
      //   fillOpacity: 0.5,
      //   radius: 0
      // }).addTo(this.map);

      // let polygon = L.polygon([
      //     [51.509, -0.08],
      //     [51.503, -0.06],
      //     [51.51, -0.047]
      // ]).addTo(this.map);

      //marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
      //circle.bindPopup("I am a circle.");
      // polygon.bindPopup("I am a polygon.");

      // L.popup()
      // .setLatLng([51.5, -0.09])
      // .setContent("I am a standalone popup.")
      // .openOn(this.map);

      
      // function onMapClick(e) {
      //   //alert("You clicked the map at " + e.latlng);
      //   L.popup()
      //   .setLatLng(e.latlng)
      //     .setContent("You clicked the map at " + e.latlng.toString())
      //     .openOn(this.map);
      // }
    
      // this.map.on('click', onMapClick, this);
  }
}
