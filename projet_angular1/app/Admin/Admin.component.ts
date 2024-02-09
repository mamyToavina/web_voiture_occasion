import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-Admin',
  templateUrl: './Admin.component.html',
  styleUrls: ['./Admin.component.css']
})
export class AdminComponent implements OnInit {

  statisticsData: any;
  title!: string;
  totalCarsSold: number | undefined;

  constructor(private statisticsService: AdminService) { }

  ngOnInit(): void {
    this.statisticsService.getSalesStatistics().subscribe(data => {
      this.title = data.title;
      this.statisticsData = data.data;
      this.totalCarsSold = data.totalCarsSold;
    });
  }

}
