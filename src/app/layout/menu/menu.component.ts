import { UserInterface } from './../../interfaces/user-interface';
import { AuthService } from './../../services/auth.service';
import { Component, HostListener, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, TranslateModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() pages: { title: string; url: string; icon: string }[] = [];
  menuVisibility = false;
  isDropdownOpen = false;
  user: UserInterface = new Object as UserInterface

  constructor(
    public router: Router,
    private translate: TranslateService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.translate.setDefaultLang('es');
    this.authService.getActualUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  translateText(lang: string) {
    this.translate.use(lang);
  }

  toggleMenu() {
    this.menuVisibility = !this.menuVisibility;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const isMenu = target.closest('app-menu');
    const isMenuItem = target.closest('li');
    if (this.menuVisibility && (!isMenu || isMenuItem)) {
      this.menuVisibility = false;
    }
  }

  @HostListener('window:scroll', [])
  @HostListener('window:touchmove', [])
  closeMenu() {
    if (this.menuVisibility) {
      this.menuVisibility = false;
    }
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false
    }
  }
}