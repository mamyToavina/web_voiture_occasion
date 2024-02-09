import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstant } from '../AppConstant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = AppConstant.apiUrl;

  constructor(private http: HttpClient) { }

  getSalesStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/statistics`);
  }

}
