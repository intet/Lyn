import {Component, OnInit, ViewChild} from "@angular/core";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {merge} from 'rxjs/observable/merge';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {WordService} from "../../../service/word.service";
import {ResponsePagingWrapper} from "../../../../util/entity";
import {WordLink} from "../../../service/entity/word";

@Component({
  selector: 'grid-word',
  templateUrl: './grid.word.component.html',
  styleUrls: ['./grid.word.component.css']
})
export class WordGridComponent implements OnInit {
  displayedColumns = ['id', 'original', 'translation'];
    dataSource = new MatTableDataSource<WordLink>();
  totalCount = 0;
  isLoadingResults = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private wordService: WordService) {
  }

  ngOnInit() {
    //this.dataSource.paginator = this.paginator;
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.wordService!.getWords(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map(data => {
            let items: ResponsePagingWrapper<WordLink> = data;
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.totalCount = items.total;
          return items.rows;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }
}
