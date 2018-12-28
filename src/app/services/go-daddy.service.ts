import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class GoDaddyService {

  constructor( private http: HttpClient ) { }


  getQuery( query: string ){

    const url = `https://api.godaddy.com/v1/domains/${ query }`;  
    
    const headers = new HttpHeaders({
      'Authorization': 'sso-key 3mM44UYhwVbtpN_HfYs3STNfsBmhPrbunvTyW:HfYvwzcYY2aZYM22wnL4Fn',
      'Access-Control-Allow-Origin': 'https://test.crownsports.mx/',
      'Cache-control': 'no-cache'
    });

    return this.http.get(url, {headers});

}

getAvailableDomain( domain: string ){

  return this.getQuery(`available?domain=${domain}`);

 }

}
