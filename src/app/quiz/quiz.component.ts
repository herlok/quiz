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

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizQuestions: QuizQuestion[] = [];
  name: string | null = '';
  score: any | null = null;

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
    let score = 0;
    let arr = [];
    let category = localStorage.getItem('selectedCategory');
   
    
    const temp = localStorage.getItem('categories');   

    this.quizQuestions.forEach(question => {
      question.isCorrect = question.selectedAnswer === question.correct_answer;

      if (question.isCorrect) {
        score++;
      }
    });

    if(temp && temp.trim() !== ""){
      arr = JSON.parse(temp);
      if(category) {
        arr.push(JSON.parse(category).name);
      }
      arr.push(score);
      localStorage.setItem('categories', JSON.stringify(arr));
    }
    else {
      if(category) {
      arr.push(JSON.parse(category).name);
      }
      arr.push(score);
      localStorage.setItem('categories', JSON.stringify(arr));
    }
    this.score = score;
    localStorage.setItem('score', this.score);
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
