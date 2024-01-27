import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})

export class AssignmentsComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ajoutActive = true;
  formVisible = false;
  assignments!: MatTableDataSource<Assignment>;
  searchQuery: string = '';
  private pageBeforeSearch: number | null = null;

  filteredAssignments: MatTableDataSource<Assignment> | null = null;
  renduFilter: boolean = false;

  page: number = 1;
  limit: number = 10;
  totalDocs!: number;
  totalPages!: number;

  constructor(private assignmentService: AssignmentsService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.assignments = new MatTableDataSource<Assignment>([]);
    this.searchAssignments();
    setTimeout(() => {
      this.ajoutActive = true;
    }, 2000)
  }

  getDataSource() {
    return this.filteredAssignments || this.assignments;
  }

  applyRenduFilter() {
    if (this.renduFilter) {
      const currentSort = this.getDataSource().sort;
      const filteredData = this.getDataSource().data.filter((assignment) => assignment.rendu);
      this.filteredAssignments = new MatTableDataSource<Assignment>(filteredData);
      this.filteredAssignments.sort = currentSort;
    } else {
      this.filteredAssignments = null;
    }
  }


  searchAssignments() {
    // this.assignmentService.isLoading = true;
    const search = this.searchQuery.trim();

    if (search) {
      if (this.pageBeforeSearch === null) {
        this.pageBeforeSearch = this.page;
        this.page = 1;
        this.paginator.pageIndex = 0;
      }
    } else {
      if (this.pageBeforeSearch !== null) {
        this.page = this.pageBeforeSearch;
        this.pageBeforeSearch = null;
        this.paginator.pageIndex = this.page;
      }
    }

    this.assignmentService.getAssignmentPagine(this.page, this.limit, search)
      .subscribe(
        data => {
          // this.assignmentService.isLoading = false;
          this.cdr.detectChanges(); 
          const newDataSource = new MatTableDataSource<Assignment>(data.docs);
          this.assignments.data = newDataSource.data;
          console.log(this.assignments.data);

          this.totalDocs = data.totalDocs;
          this.totalPages = Math.ceil(this.totalDocs / this.limit);
          this.assignments.sort = this.sort;
          this.sort.disableClear = true;
          
        }
      );
  }


  onLimitResult(event: PageEvent) {
    if (event.pageSize !== this.limit) {
      this.limit = event.pageSize;
      this.searchAssignments();
    }
  }

  onPageChange(event: PageEvent) {
    const newPageIndex = event.pageIndex;
    this.page = newPageIndex + 1;
    this.searchAssignments();

  }

  getIsLoading(): boolean {
    return !this.assignmentService.isLoading;
  }
}