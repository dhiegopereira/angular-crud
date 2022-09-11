import { CoursesService } from './../services/courses.service';
import { Course } from '../model/course';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  displayedColumns: string[];

  //injeção de dependência
  constructor(
    private courseService: CoursesService,
    public dialog: MatDialog
  ) {
    this.courses$ = this.courseService.getAll()
      .pipe(
        catchError(error => {
          this.onError('Error ao carrgar cursos.')

          return of([])
        })
      );
    this.displayedColumns = ['name', 'category'];
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
  }

}
