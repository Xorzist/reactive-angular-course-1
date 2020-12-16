import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { LoadingService } from "./loading.service";
import { messageService } from "./message.service";

@Injectable({
    providedIn : 'root'
})
export class courseStoreService{
    private subjet = new BehaviorSubject<Course[]>([])
    courses$: Observable<Course[]> = this.subjet.asObservable();

    constructor(private http:HttpClient,
        private loading: LoadingService,
        private messageService: messageService){
            this.loadAllcourses();

    }
    
    private loadAllcourses(){
        const loadCourses$= this.http.get<Course []>('/api/courses')
        .pipe(
                map(response => response["payload"]),
                catchError(err => {
                  const message = " couldnt load stuff error occured";
                  this.messageService.showErrors(message);
                  console.log(message,err);
                  return throwError(err);
                }),
                tap(courses => this.subjet.next(courses))
               
              );

              this.loading.showLoaderUntilCompleted(loadCourses$).
              subscribe();
        
        
    }

    saveCourse(courseId:string , changes:Partial<Course>): Observable<any> {
        const courses = this.subjet.getValue();
        const index = courses.findIndex(course=> course.id == courseId);
        const newCourse: Course = {
            ...courses[index],
            ...changes
        };

        const newCourses: Course[] = courses.slice(0);
        newCourse[index] = newCourse;
        this.subjet.next(newCourses)

        return this.http.put(`/api/courses/${courseId}`, changes)
        .pipe(
            shareReplay()
        );
    }

    filterByCategory(category:string):Observable<Course[]>{
        return this.courses$.pipe(
            map(courses => courses.filter(
                course => course.category == category
            ).sort(sortCoursesBySeqNo))
        )
    }
}