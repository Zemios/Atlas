import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-about-us',
  imports: [ReactiveFormsModule],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements AfterViewInit {
  contactForm: FormGroup;

  @ViewChild('formElement', { static: false }) formElement!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      message: ['']
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const queryParams = { id: params['id'], title: params['title'] };
      if (queryParams) {

        const formMessage = `Estoy interesado en el plan ${queryParams.title} en relación a los servicios de ${queryParams.id}. 
Agradecería recibir información detallada sobre sus condiciones y beneficios.`;

        this.contactForm.patchValue({
          message: formMessage || '',
        });
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      /* TODO: Se repite la llamada al queryParams, pero no he encontrado otra forma de solucionarlo ya que si no no realiza el scroll */
      this.route.queryParams.subscribe((params) => {
        const queryParams = { id: params['id'], title: params['title'] };
        if (queryParams && this.formElement && this.formElement.nativeElement instanceof HTMLElement) {
          setTimeout(() => {
            const elementPosition = this.formElement.nativeElement.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            });
          }, 100);
        }
      });
    }
  }
}
