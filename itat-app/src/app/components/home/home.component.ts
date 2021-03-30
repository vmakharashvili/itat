import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  data: any[] = [];

  constructor(private api: ApiService, private ch: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.api.getTableData().subscribe(data => {
      this.data = data;
      this.ch.detectChanges();
    });
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
