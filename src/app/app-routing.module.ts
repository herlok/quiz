import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { QuizComponent } from './quiz/quiz.component';
import { ScoreComponent } from './score/score.component';

const routes: Routes = [
  {path: 'menu', component: MenuComponent },
  {path: 'quiz', component: QuizComponent },  
  {path: 'score', component: ScoreComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
