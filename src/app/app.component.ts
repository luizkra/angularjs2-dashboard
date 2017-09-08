import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DatosService } from './datos.service';
import { TruncateModule } from 'ng2-truncate';


  declare var google;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    lat: any;
    lon : any;
    zoom: any;
    infoWindows: any;
	people: any;
	clients: any;
	mjs: any;
	travels: any;
	zona: any;
	zone_count: number;
	DateToday: any;
  	countFinish : number;
  	countActive : number;
  	countPendient : number;
  	countInactivePeople : number;
  	countActivePeople : number;
  	countNewClient : number;
  	countNormalClient : number;
  	countNewMsj : number;
  	public doughnutDataTravel:number[]=[0, 0, 0] ;
  	public doughnutDataPeople:number[]=[0, 0] ;
  	public doughnutDataClient:number[]=[0, 0] ;
  	public doughnutDataZone:number[]=[0, 0] ;
  	public doughnutChartLabels:string[] = ['Activos', 'Finalizados', 'Espera'];
  	public doughnutChartLabelsPeople:string[] = ['Activos', 'Inactivos'];
  	public doughnutChartLabelsClients:string[] = ['Nuevos', 'Normal'];
    public doughnutChartType:string = 'doughnut';
    public pieChartType:string = 'pie';
    public barChartType:string = 'bar';
    public pieChartLabels:string[] = ['Zona A', 'Zona B'];
    public barChartLabels:string[] = ['2005', '2008', '2010', '2012', '2015', '2016', '2017'];
    public barChartLegend:boolean = true;
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';
    public barChartOptions:any = {
     scaleShowVerticalLines: false,
     responsive: true
    }; 
    public barChartData:any[] = [
     {data: [65, 59, 80, 81, 56, 55, 40], label: 'Zona A'},
     {data: [28, 48, 40, 19, 86, 27, 90], label: 'Zona B'}
    ];
    public lineChartData:Array<any> = [
	    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
	    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
	    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  	];
    public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions:any = {
      responsive: true
    };
  

	constructor(private _dataLoadService: DatosService) {
         //_dataLoadService.getMessajes().subscribe(data => {this.mjs=data; console.log(this.mjs.mensajes.length);}, error => console.log(error));
  		this.countFinish =0;
		this.countActive =0;
		this.countPendient =0;
		this.countActivePeople =0;
		this.countInactivePeople =0;
		this.countNewClient =0;
		this.countNormalClient =0;
		this.countNewMsj =0;
		var current = new Date();
    	current.setHours(0, 0, 0);
		this.DateToday = current;
		this.lat = 20.3974674;
		this.lon = -102.0897634;
		this.zoom=8;
		this.infoWindows = [];
	}
  ngOnInit() {
    this.loadTravel();
    this.loadPeople();
    this.loadClients();
    this.loadZonas();
    this.loadMap(this.lat, this.lon, this.zoom);
    this.loadMensajes();
  }

  title = 'Dashborad-app';
  nuevo = 'Gus';
  public verific(data,id):number{

  	for (var i = 0; i < this.mjs.mensajes.length; i++) {
  		var text;
  		if (this.mjs.mensajes[i]['Iduser'] === id && this.mjs.mensajes[i]['Etiqueta'] === data) {
  			console.log("true");
  			return 1;
  		}else{
  			return 0;
  		}
  	}
  	
  	console.log("false");
  }

  // events
  public getClientName(id):string { 	
  	for (var i = 0; i < this.clients.cliente.length; i++) {
	  	if(this.clients.cliente[i]['IdCliente'] === id)
	  		return this.clients.cliente[i]['Nombre'];
  	}
    return '';
  }
  public loadMsj(id_user):void {

  	for (var i = 0; i < this.mjs.mensajes.length; i++) {
  		var text;
  		if (this.mjs.mensajes[i]['Iduser'] === id_user && this.mjs.mensajes[i]['Texto'] != '')
  			return text = this.mjs.mensajes[i]['Texto'];
  	}
  }
  public loadTravel():void {
  	this._dataLoadService.getTravels().subscribe(data => {
  	 this.travels=data;
  	 for (var i = 0; i < this.travels.viajes.length; i++) {

  		if (this.travels.viajes[i]['Estatus'] === 'Finalizado') {
  			this.countFinish++;
  		}
  		if (this.travels.viajes[i]['Estatus'] === 'Pendiente') {
  			this.countPendient++;
  		}
  		if (this.travels.viajes[i]['Estatus'] === 'Activo') {
  			this.countActive++;
  		}
  		
  		this.doughnutDataTravel = [this.countFinish, this.countPendient, this.countActive];
  	 }
  	}, error => console.log(error));
    
  }
  public loadPeople():void {
  	this._dataLoadService.getMessajePeople().subscribe(data => {
  	 this.people=data;
  	 for (var i = 0; i < this.people.mensajeros.length; i++) {
  		if (this.people.mensajeros[i]['Estatus'] === 'InActivo')
  			this.countInactivePeople++;
  		if (this.people.mensajeros[i]['Estatus'] === 'Activo')
  			this.countActivePeople++;  		
  		this.doughnutDataPeople = [this.countInactivePeople, this.countActivePeople];
  	 }
  	}, error => console.log(error));
    
  }
  public loadClients():void {
  	this._dataLoadService.getClients().subscribe(data => {
  	 this.clients=data;
  	 for (var i = 0; i < this.clients.cliente.length; i++) {
  		if (this.clients.cliente[i]['Etiqueta'] === 'Nuevo')
  			this.countNewClient++;
  		if (this.clients.cliente[i]['Etiqueta'] === 'Normal')
  			this.countNormalClient++;  		
  		this.doughnutDataClient = [this.countNewClient, this.countNormalClient];
  	 }
  	}, error => console.log(error));
    
  }
  public loadMensajes():void {
  	this._dataLoadService.getMessajes().subscribe(data => {
  	 this.mjs=data;
  	 for (var i = 0; i < this.mjs.mensajes.length; i++) {
  		if (this.mjs.mensajes[i]['Etiqueta'] === 'Nuevo')
  			this.countNewMsj++; 		
  	}	
  	 console.log(this.mjs);
  	}, error => console.log(error));
    
  }

  //load zonas
  public loadZonas():void {
  	 this._dataLoadService.getTravels().subscribe(data => {
  	 this.zona=data;  	 
  	 this.doughnutDataZone= [
  	 this.loadZona(this.zona, 1), 
  	 this.loadZona(this.zona, 2)]  	 
  	}, error => console.log(error));
    
  }
  //get count zones
  public loadZona(data, zona):number {
  	var count_zona = 0;
  	 for (var i = 0; i < data.viajes.length; i++) {
  		if (data.viajes[i]['Zona'] === zona)
  			count_zona++;
  	 }
    return count_zona;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }
 
  public randomizes():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  public loadTravelPosition(mapa):void {
  	this._dataLoadService.getTravels().subscribe(data => {
  	 this.travels=data;
  	 for (var i = 0; i < this.travels.viajes.length; i++) {

  		if(typeof this.travels.viajes[i]['ActualPos'] !=  "undefined"){
            var array = JSON.parse("[" + this.travels.viajes[i]['ActualPos'] + "]");
            console.log(array[0]);
            this.addmerker(mapa, array[0], array[1],this.travels.viajes[i]['IdViaje'],this.travels.viajes[i]['Estatus']); 
          }
  		
  	 }
  	}, error => console.log(error));
    
  }
  		addmerker(mapa, latitud, longitud, id, status) {

                var lat;
                var lon;
                var sal;
                var contentString = '<div>'+status+'</div>';

                var position = new google.maps.LatLng(latitud, longitud);
                var marker = new google.maps.Marker({position: position, title: status});


                let infoWindow = new google.maps.InfoWindow({
                  content : contentString
                });

                marker.addListener('click', () => {
                  this.closeAllInfoWindows();
                  infoWindow.open(mapa, marker);
                });
                this.infoWindows.push(infoWindow);
                marker.setMap(mapa);
        }
        closeAllInfoWindows() {
        	for(let window of this.infoWindows) {
        		window.close();
        	}
        }

      loadMap(lat ,lon, zoom) {
        var mapProp = {
            center: new google.maps.LatLng(lat, lon),
            zoom: zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
      this.map = new google.maps.Map(document.getElementById("gmap"), mapProp);

              this.loadTravelPosition(this.map);
                
                
        }



 
}
