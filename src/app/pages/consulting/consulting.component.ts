import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
// import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consulting',
  imports: [NgClass],
  templateUrl: './consulting.component.html',
  styleUrls: ['consulting.component.scss'],
})
export class ConsultingComponent {
  activeCategory: string = 'redes';

  setActiveCategory(category: string): void {
    this.activeCategory = category;
  }

  isActiveCategory(category: string): boolean {
    return this.activeCategory === category;
  }
}
