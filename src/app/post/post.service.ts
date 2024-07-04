import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL = "https://localhost:7197/api/VillaAPI/villa";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
  getAll(currentpage:number,pageSize: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/?pageIndex=${currentpage}&pageSize=${pageSize}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  delete(id:number){
    return this.httpClient.delete(this.apiURL +'/'+ id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  find(id:number): Observable<any> {
    return this.httpClient.get(this.apiURL +'/'+ id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(id:number,post:Post): Observable<any>{
    console.log(post);
    post.id = id;
    return this.httpClient.put(this.apiURL +'/'+ id,JSON.stringify(post), this.httpOptions)
    .pipe
    (
      catchError(this.errorHandler)
    )
  }
  create(post:Post):Observable<any>{
    return this.httpClient.post(this.apiURL, JSON.stringify(post),this.httpOptions)
    .pipe
    (
      catchError(this.errorHandler)
    )
  }
  searchPosts(currentpage:number,pageSize: number,query: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}?pageIndex=${currentpage}&pageSize=${pageSize}&search=${query}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  errorHandler(error:any) {
    // let errorMessage = '';
    // if(error.error instanceof ErrorEvent) {
    //   errorMessage = error.error.message;
    // } else {
    //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    // }
    // return throwError(errorMessage);"
    return "";
 }
}
