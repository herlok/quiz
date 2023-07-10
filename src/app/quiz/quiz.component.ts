import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';
import { Router } from '@angular/router';

interface QuizQuestion {
  question: string;
  answers: string[];
  correct_answer: string;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
}
interface User {
  name: string;
  category: string;
  score: number;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizQuestions: QuizQuestion[] = [];
  name: string | null = '';
  score: any | null = null;
  multiDimArray: User[] = [

  ];

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.getQuizQuestions();
  }

  getQuizQuestions(): void {
    this.quizService.getQuizQuestions().subscribe(response => {
      this.quizQuestions = response.results.map((result: any) => {
        const answers = result.incorrect_answers.concat(result.correct_answer);
        const shuffledAnswers = this.shuffleArray(answers);

        return {
          question: result.question,
          answers: shuffledAnswers,
          correct_answer: result.correct_answer,
          selectedAnswer: null,
          isCorrect: null
        };
      });
    });
  }

  onSubmit(): void {
    const name = localStorage.getItem('name');
    let category = localStorage.getItem('selectedCategory');
    if (category) {
      category = JSON.parse(category).name;
    }
  
    if (name && category) {
      let score = 0;
  
      this.quizQuestions.forEach(question => {
        question.isCorrect = question.selectedAnswer === question.correct_answer;
  
        if (question.isCorrect) {
          score++;
        }
      });
  
      this.score = score;
      const user: User = { name: name, category: category, score: score };
  
      let storedData = localStorage.getItem('categories');
      let multiDimArray: User[] = (storedData) ? JSON.parse(storedData) : [];
      multiDimArray.push(user);
      localStorage.setItem('categories', JSON.stringify(multiDimArray));
    }
  }
  
  

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  backToCategories() {
    this.router.navigate(['/menu']);
  }
}
