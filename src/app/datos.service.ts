import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DatosService {

  
	 people: Array<Object>;
 
    constructor(private http:Http) {
        //this.http.get('assets/data/usuario.json')
                //.subscribe(res => this.data = res.json());
    }

    getMessajePeople() {
    return this.http.get('assets/data/usuario.json')
    			 .map((response: Response) => {
            console.log("mensajeros" + response.json());
            return response.json();
        });
  	}
    getMessajes() {
    return this.http.get('assets/data/msj.json')
    			 .map((response: Response) => {
            console.log("mensajes" + response.json());
            return response.json();
        });
  	}
    getTravels() {
    return this.http.get('assets/data/viajes.json')
    			 .map((response: Response) => {
            console.log("viajes" + response.json());
            return response.json();
        });
  	}
    getClients() {
    return this.http.get('assets/data/cliente.json')
    			 .map((response: Response) => {
            console.log("clientes" + response.json());
            return response.json();
        });
  	}

   /*public getJSON(): Observable<any> {
         return this.http.get("assets/data/usuario.json")
                         .map((res:any) => res.json())
                         .catch((err: Response, caught: Observable<any>) => {
                         	return Observable.throw(caught);
                         })

     }
     */


}
