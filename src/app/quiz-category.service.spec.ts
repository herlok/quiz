import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizCategoryService {
  private selectedCategoryIdSubject: Subject<number | null> = new Subject<number | null>();
  selectedCategoryId$ = this.selectedCategoryIdSubject.asObservable();

  setSelectedCategoryId(categoryId: number | null): void {
    this.selectedCategoryIdSubject.next(categoryId);
  }
}
