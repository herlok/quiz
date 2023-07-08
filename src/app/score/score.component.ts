import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent {
  name: string | null = '';
  score: any | null = '';
  quizCategory: any | null = '';
  categoryName: string | null = '';
  categoryScore: number = 0;
  temp: any | null = '';
  array: any = [];


  constructor(private router: Router) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.score = localStorage.getItem('score');
    this.quizCategory = localStorage.getItem('categories');
    this.array = JSON.parse(this.quizCategory.split(','));
  }
  backToCategories() {
    this.router.navigate(['/menu']);
  }

}
