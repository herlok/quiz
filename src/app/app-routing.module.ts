import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  {path: 'menu', component: MenuComponent },
  {path: 'quiz', component: QuizComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
