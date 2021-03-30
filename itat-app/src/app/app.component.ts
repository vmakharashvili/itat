import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'itat-app';
  data: any[] = [];

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.getTableData().subscribe(data => this.data = data);
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
