import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import AOS from 'aos';

enum inputType {
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
}

enum paymentModeEnum {
  ONE_TIME = 'one-time',
  MONTHLY = 'monthly',
}

type planOption = {
  id: string;
  name: string;
  price?: number;
  type?: inputType.RADIO | inputType.CHECKBOX;
  group?: string;
  options?: planOption[]
};

@Component({
  selector: 'app-plan-customization',
  templateUrl: './plan-customization.component.html',
  imports: [FormsModule, CommonModule],
  styleUrl: './plan-customization.component.css',
})



export class PlanCustomizationComponent {
  priceAjustment = 0;
  paymentModeEnum = paymentModeEnum
  paymentMode: paymentModeEnum = paymentModeEnum.ONE_TIME;

  selectedWeb: string = 'no-web';
  pagesCount: number = 1;
  selectedWebExtras: string[] = [];
  selectedSocialPlatforms: string[] = []
  selectedSocialExtras: string[] = [];
  postPerWeek: number = 2;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
  ) { }
  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
  }

  // Sección Web
  webOptions: planOption[] = [
    { id: 'web_basic', name: 'Web Básica', price: 500, type: inputType.RADIO, group: 'web' },
    { id: 'web_ecommerce', name: 'Tienda Online', price: 1500, type: inputType.RADIO, group: 'web' },
    { id: 'web_app', name: 'Aplicación Web', price: 2000, type: inputType.RADIO, group: 'web' },
  ];

  webOptionsExtra: planOption[] = [
    { id: 'paginas-extra', name: 'Páginas extra (x2)', price: 100, type: inputType.CHECKBOX, group: 'web-extra' },
    { id: 'seo', name: 'SEO', price: 50, type: inputType.CHECKBOX, group: 'web-extra' },
    { id: 'blog', name: 'Blog', price: 100, type: inputType.CHECKBOX, group: 'web-extra' },
    { id: 'multilenguaje', name: 'Multilenguaje (2 idiomas)', price: 100, type: inputType.CHECKBOX, group: 'web-extra' },
    { id: 'analytics', name: 'Google Analytics', price: 25, type: inputType.CHECKBOX, group: 'web-extra' },
  ]

  // Sección Redes Sociales

  socialPlatforms = [
    { id: 'facebook', name: 'Facebook', price: 50, class: 'bg-blue-700', hoverClass: 'focus-visible:bg-blue-700 active:bg-blue-800' },
    {
      id: 'instagram', name: 'Instagram', price: 50,
      class: 'bg-gradient-to-bl from-purple-500 to-orange-500',
      hoverClass: 'focus-visible:bg-gradient-to-bl focus-visible:from-purple-500 focus-visible:to-orange-500 active:bg-gradient-to-bl active:from-purple-600 active:to-orange-600'
    },
    { id: 'twitter-x', name: 'Twitter / X', price: 50, class: 'bg-black', hoverClass: 'focus-visible:bg-black active:bg-neutral-800' },
    { id: 'linkedin', name: 'LinkedIn', price: 60, class: 'bg-blue-600', hoverClass: 'focus-visible:bg-blue-600 active:bg-blue-700' },
    { id: 'tiktok', name: 'TikTok', price: 60, class: 'bg-black', hoverClass: 'focus-visible:bg-black active:bg-neutral-800' },
  ]
  socialOptionsExtra: planOption[] = [
    { id: 'informe', name: 'Informe de rendimiento', price: 20 },
    { id: 'mensajes', name: 'Atención a mensajes (básico)', price: 40 },
    { id: 're-branding', name: 'Diseño branding redes', price: 60 },
  ];


  get priceMonthly(): number {
    let total = 0;

    // Precio base
    const web = this.webOptions.find((w) => w.id === this.selectedWeb);
    if (this.paymentMode === paymentModeEnum.MONTHLY) {
      if (web && web.price) total += web.price / 10 - 5;
    }

    const webExtras = this.webOptionsExtra.filter((w) => this.selectedWebExtras.includes(w.id));
    if (this.paymentMode === paymentModeEnum.MONTHLY) {
      webExtras.forEach((w) => {
        if (w.price && ((w.price / 10 - 5) > 0)) total += w.price / 10 - 5;
        else if (w.price) total += 5;
      });
    }

    // Precio por páginas
    if (this.paymentMode === paymentModeEnum.MONTHLY) {
      if (this.pagesCount > 1) {
        total += (this.pagesCount - 1) * 5;
      }
    }


    // Precio redes sociales
    const social = this.socialPlatforms.filter((s) => this.selectedSocialPlatforms.includes(s.id));
    social.forEach((s) => {
      if (s.price) total += s.price;
    });

    // Post per week
    if (this.postPerWeek > 2 && social.length > 0) {
      total += (this.postPerWeek - 2) * 50;
    }

    const socialExtras = this.socialOptionsExtra.filter((s) => this.selectedSocialExtras.includes(s.id));
    socialExtras.forEach((s) => {
      if (s.price && social.length > 0) total += s.price;
    });

    return total;
  }
  get price(): number {
    let total = 0;

    // Precio base
    const web = this.webOptions.find((w) => w.id === this.selectedWeb);
    if (this.paymentMode === paymentModeEnum.ONE_TIME) {
      if (web && web.price) total += web.price;
    }

    // Precio por páginas
    if (this.paymentMode === paymentModeEnum.ONE_TIME) {
      if (this.pagesCount > 1) {
        total += (this.pagesCount - 1) * 50;
      }
    }

    const webExtras = this.webOptionsExtra.filter((w) => this.selectedWebExtras.includes(w.id));
    if (this.paymentMode === paymentModeEnum.ONE_TIME) {
      webExtras.forEach((w) => {
        if (w.price) total += w.price;
      });
    }

    return total;
  }

  get socialPlatformsPrice(): number {
    let total = 0;

    const social = this.socialPlatforms.filter((s) => this.selectedSocialPlatforms.includes(s.id));
    social.forEach((s) => {
      if (s.price) total += s.price;
    });

    return total;
  }

  deleteWeb() {
    this.selectedWeb = 'no-web';
    this.pagesCount = 1;
    this.selectedWebExtras = [];
  }

  deleteSocial() {
    this.selectedSocialPlatforms = [];
    this.postPerWeek = 2;
    this.selectedSocialExtras = [];
  }

  submit() {
    const data = {
      web: this.selectedWeb,
      pagesCount: this.pagesCount,
      selectedWebExtras: this.selectedWebExtras,
      selectedSocialPlatforms: this.selectedSocialPlatforms,
      postPerWeek: this.postPerWeek,
      selectedSocialExtras: this.selectedSocialExtras,
    };

    console.log(data);
  }
}
