import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import Handsontable, * as handsontable from 'handsontable';
import { DataItem } from 'src/app/core/models/data';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: DataItem[] = [];
  hotSettings: Handsontable.GridSettings = {
    manualRowResize: true,
    manualColumnResize: true,
    startCols: 0,
    afterChange: (c, s) => this.afterEdit(c, s)
  };

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.api.getTableData().subscribe(data => {
      this.data = data;
    });
  }

  afterEdit(changes: Handsontable.CellChange[] | null, source: Handsontable.ChangeSource): void {
    console.log(changes, source);
    if (changes) {
      const changeId = changes?.length > 0 ? changes[0][0] : 0;
      this.editData(changeId, changes[0][1].toString(), changes[0][3]);
    }
  }

  editData(rowIndex: number, column: string, value: string): void {
    const val = this.data.find(x => x.id === rowIndex + 1);
    if (val) {
      val[column] = value;
      setTimeout(() => {
        this.api.editTableData(val).subscribe(_ => {
          this.getData();
        });
      }, 40);
    }
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
