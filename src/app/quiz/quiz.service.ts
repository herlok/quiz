import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'https://opentdb.com/api.php';
  constructor(private http: HttpClient) {}

  getQuizQuestions(): Observable<any> {
    const categoryId = localStorage.getItem('selectedCategoryId');
    const url = `${this.apiUrl}?amount=5&category=${categoryId}&type=multiple`;
    return this.http.get(url);
  }
}
