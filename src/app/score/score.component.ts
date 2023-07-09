import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  name: string;
  category: string;
  score: number;
}

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent {
  name: string | null = '';
  score: any | null = '';
  quizCategory: any | null = '';
  temp: any | null = '';
  array: User[] = [];


  constructor(private router: Router) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    const storedData = localStorage.getItem('categories');
  
    if (storedData) {
      const allScores: User[] = JSON.parse(storedData);
  
      const categoryScores = new Map<string, number>();
  
      allScores.forEach(user => {
        if (user.name === this.name) { // Check if the user matches the currently logged-in user
          const category = user.category;
          const score = user.score;
  
          if (!categoryScores.has(category) || score > categoryScores.get(category)!) {
            categoryScores.set(category, score);
          }
        }
      });
  
      this.array = [];
      categoryScores.forEach((score, category) => {
        this.array.push({ name: this.name!, category: category, score: score });
      });
    }
  }
  
  
  
  
  
  backToCategories() {
    this.router.navigate(['/menu']);
  }

}
