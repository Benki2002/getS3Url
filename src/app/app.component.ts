import { getLocalePluralCase } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 's3ImageUpload';
  private readonly baseUrl = window.location.origin + '/.netlify/functions/getS3Url';

  constructor(private http:HttpClient){
  }

  getUrl(){
    this.http.get(this.baseUrl).pipe().subscribe({
      next:(value)=>{console.log(value)},
      error:(error)=>{console.log(error)}
    })
  }
}
