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
  price: number;
  paymentMode?: paymentModeEnum;
  type?: inputType.RADIO | inputType.CHECKBOX;
  group?: string;
};

@Component({
  selector: 'app-plan-customization',
  templateUrl: './plan-customization.component.html',
  imports: [FormsModule, CommonModule],
  styleUrl: './plan-customization.component.css',
})



export class PlanCustomizationComponent {
  priceAjustment = 0;
  selectedWeb: string = '';
  paymentModeEnum = paymentModeEnum
  paymentMode: paymentModeEnum = paymentModeEnum.ONE_TIME;

  selectedSocial: string = '';
  selectedExtras: string[] = [];

  // Sección Web
  webOptions: planOption[] = [
    { id: 'web-basic', name: 'Página web básica', price: 300, type: inputType.RADIO, group: 'web', paymentMode: paymentModeEnum.ONE_TIME },
    { id: 'tienda', name: 'Tienda online', price: 500, type: inputType.RADIO, group: 'web', paymentMode: paymentModeEnum.ONE_TIME },
    { id: 'app-web', name: 'App web con backend', price: 1200, type: inputType.RADIO, group: 'web', paymentMode: paymentModeEnum.ONE_TIME },

    { id: 'paginas-extra', name: 'Páginas extra (x2)', price: 100, type: inputType.CHECKBOX, group: 'web-extra', paymentMode: paymentModeEnum.ONE_TIME },
    { id: 'seo', name: 'SEO', price: 50, type: inputType.CHECKBOX, group: 'web-extra', paymentMode: paymentModeEnum.ONE_TIME },
    { id: 'blog', name: 'Blog', price: 100, type: inputType.CHECKBOX, group: 'web-extra', paymentMode: paymentModeEnum.ONE_TIME },
    { id: 'multilenguaje', name: 'Multilenguaje (2 idiomas)', price: 100, type: inputType.CHECKBOX, group: 'web-extra', paymentMode: paymentModeEnum.ONE_TIME },
    { id: 'analytics', name: 'Google Analytics', price: 25, type: inputType.CHECKBOX, group: 'web-extra', paymentMode: paymentModeEnum.ONE_TIME },
  ];

  // Sección Redes Sociales
  socialOptions: planOption[] = [
    { id: 'social-base', name: 'Red social base', price: 100, paymentMode: paymentModeEnum.MONTHLY },
    { id: 'red-adicional', name: 'Red adicional', price: 50, paymentMode: paymentModeEnum.MONTHLY },
    { id: 'publicaciones-3', name: '3 publicaciones semanales', price: 30, paymentMode: paymentModeEnum.MONTHLY },
    { id: 'publicaciones-4', name: '4 publicaciones semanales', price: 60, paymentMode: paymentModeEnum.MONTHLY },
    { id: 'publicaciones-5', name: '5 publicaciones semanales', price: 90, paymentMode: paymentModeEnum.MONTHLY },
    { id: 'historias', name: 'Historias (por red)', price: 20, paymentMode: paymentModeEnum.MONTHLY },
    { id: 'reels-pack', name: 'Reels/Tiktoks (Pack 4/mes)', price: 100, paymentMode: paymentModeEnum.MONTHLY },
    { id: 'reels-unitario', name: 'Reels/Tiktoks (unidad)', price: 30 },
    { id: 'informe', name: 'Informe de rendimiento', price: 20, paymentMode: paymentModeEnum.MONTHLY },
    { id: 'mensajes', name: 'Atención a mensajes (básico)', price: 40, paymentMode: paymentModeEnum.MONTHLY },
    { id: 'campanas', name: 'Gestión de campañas publicitarias', price: 50 },
    { id: 'branding', name: 'Diseño branding redes', price: 60 },
  ];

  get priceMonthly(): number {
    let total = 0;

    // Precio base
    const web = this.webOptions.find((w) => w.id === this.selectedWeb);
    if (this.paymentMode === paymentModeEnum.MONTHLY) {
      if (web) total += web.price / 10 - 5;
    }

    const social = this.socialOptions.find((s) => s.id === this.selectedSocial);
    if (social) total += social.price;

    return total;
  }
  get price(): number {
    let total = 0;

    // Precio base
    const web = this.webOptions.find((w) => w.id === this.selectedWeb);
    if (this.paymentMode === paymentModeEnum.ONE_TIME) {
      if (web) total += web.price;
    }

    // const social = this.socialOptions.find((s) => s.id === this.selectedSocial);
    // if (social) total += social.price;

    return total;
  }

  toggleExtra(extra: string) {
    this.selectedExtras = this.selectedExtras.includes(extra)
      ? this.selectedExtras.filter((e) => e !== extra)
      : [...this.selectedExtras, extra];
  }

  submit() {
    console.log({
      web: this.selectedWeb,
      social: this.selectedSocial,
      extras: this.selectedExtras,
      total: this.price,
    });
  }
}
