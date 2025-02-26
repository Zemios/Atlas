import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import AOS from 'aos'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consulting',
  imports: [NgClass, RouterLink],
  templateUrl: './consulting.component.html',
  styleUrls: ['consulting.component.scss'],
})
export class ConsultingComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }
  activeCategory: string = 'redes';

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) { AOS.init(); }
  }
  setActiveCategory(category: string): void {
    this.activeCategory = category;
  }

  isActiveCategory(category: string): boolean {
    return this.activeCategory === category;
  }
}
