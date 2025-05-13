import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  webExtrasSelected: string[] = [];
  selectedSocial: string = 'no-social';
  postPerWeek: number = 2;
  socialExtrasSelected: string[] = [];

  // Sección Web
  webOptions: planOption[] = [
    { id: 'no-web', name: 'Sin página web', price: 0, type: inputType.RADIO, group: 'web' },
    { id: 'web-basic', name: 'Página web básica', price: 300, type: inputType.RADIO, group: 'web' },
    { id: 'tienda', name: 'Tienda online', price: 500, type: inputType.RADIO, group: 'web' },
    { id: 'app-web', name: 'App web con backend', price: 1200, type: inputType.RADIO, group: 'web' },
    { id: 'web-personalizada', name: 'Página web personalizada', type: inputType.CHECKBOX, group: 'web' },
  ];

  webOptionsExtra: planOption[] = [
    { id: 'paginas-extra', name: 'Páginas extra (x2)', price: 100, type: inputType.CHECKBOX, group: 'web-extra' },
    { id: 'seo', name: 'SEO', price: 50, type: inputType.CHECKBOX, group: 'web-extra' },
    { id: 'blog', name: 'Blog', price: 100, type: inputType.CHECKBOX, group: 'web-extra' },
    { id: 'multilenguaje', name: 'Multilenguaje (2 idiomas)', price: 100, type: inputType.CHECKBOX, group: 'web-extra' },
    { id: 'analytics', name: 'Google Analytics', price: 25, type: inputType.CHECKBOX, group: 'web-extra' },
  ]

  // Sección Redes Sociales
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

    const social = this.socialOptionsExtra.find((s) => s.id === this.selectedSocial);
    if (social && social.price) total += social.price;

    return total;
  }
  get price(): number {
    let total = 0;

    // Precio base
    const web = this.webOptions.find((w) => w.id === this.selectedWeb);
    if (this.paymentMode === paymentModeEnum.ONE_TIME) {
      if (web && web.price) total += web.price;
    }

    // const social = this.socialOptions.find((s) => s.id === this.selectedSocial);
    // if (social) total += social.price;

    return total;
  }

  submit() {
    console.log({
      web: this.selectedWeb,
      social: this.selectedSocial,
      total: this.price,
    });
  }
}
