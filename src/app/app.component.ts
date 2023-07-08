import { Component, OnInit  } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

interface QuizCategory {
  id: number;
  categoryName: string;
}

interface QuizQuestion {
  question: string;
  answers: string[];
  correctAnswer: string;
  selectedAnswer: string | null;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Quiz';
  name: string = '';
  page: string = '/';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.page = event.url;
      }
    });
  }

  nameSubmit() {
    this.name = (<HTMLInputElement>document.getElementById('name')).value;
    localStorage.setItem('name', this.name);
    this.router.navigate(['/menu']);
    console.log(localStorage.getItem('name'));
  }

  quizStart() {
    console.log(this.name);
    this.router.navigate(['/quiz']);
  }

  
}
