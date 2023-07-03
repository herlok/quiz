import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface QuizCategory {
  id: number;
  name: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  username: string | null = '';
  categories: QuizCategory[] = [
    { id: 31, name: 'Japanese Anime & Manga' },
    { id: 32, name: 'Cartoons & Animations' }
  ];
  selectedCategoryId: number | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.username = localStorage.getItem('name');
  }

  quizStart(): void {
    console.log('categoryid menucomponent ', this.selectedCategoryId)
    if (this.selectedCategoryId) {
      localStorage.setItem('selectedCategoryId', this.selectedCategoryId.toString());
      this.router.navigate(['/quiz']);
    } else {
      alert('Please choose a category');
    }
  }
}
