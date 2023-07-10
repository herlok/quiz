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
  summaryUserScores: { [key: string]: {score: number, quizCount: number} } = {};
  summaryUserScoresLength: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    const storedData = localStorage.getItem('categories');
    const allScores: User[] = (storedData) ? JSON.parse(storedData) : [];
    
       
    allScores.forEach(item => {
      // Csak annak a scorejait gyujtom ki aki be van lepve
      if (item.name === this.name) {         
        if (this.summaryUserScores[item.category]) {
          this.summaryUserScores[item.category].score += item.score;        
          this.summaryUserScores[item.category].quizCount++;   
        }
        else {
          this.summaryUserScores[item.category] = {
            score: item.score,
            quizCount: 1,
          };
        }
      }
    });
  
    this.summaryUserScoresLength = Object.keys(this.summaryUserScores).length;
    console.log(this.summaryUserScoresLength);
  }
  
  backToCategories() {
    this.router.navigate(['/menu']);
  }

}
