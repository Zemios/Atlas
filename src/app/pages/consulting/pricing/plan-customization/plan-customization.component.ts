import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plan-customization',
  templateUrl: './plan-customization.component.html',
  imports: [FormsModule],
  styleUrl: './plan-customization.component.css',
})
export class PlanCustomizationComponent {
  selectedWeb: string = '';
  selectedSoftware: string = '';
  selectedDesign: string = 'default';
  selectedExtras: string[] = [];

  // Sección Web
  webOptions = [
    { id: 'web-basic', name: 'Página web básica', price: 300 },
    { id: 'web-basic-mensual', name: 'Web básica (mensual)', price: 30, monthly: true },
  ];

  // Sección Software
  softwareOptions = [
    { id: 'app-web', name: 'App web con backend', price: 1200, monthly: false },
  ];

  // Sección Redes Sociales
  socialOptions = [
    { id: 'social-base', name: 'Red social base', price: 100, monthly: true },
  ];

  // Extras generales
  extraOptions = [
    // Web
    { id: 'paginas-extra', name: 'Páginas extra (x2)', price: 100 },
    { id: 'seo', name: 'SEO', price: 50 },
    { id: 'blog', name: 'Blog', price: 100 },
    { id: 'tienda', name: 'Tienda online', price: 200 },
    { id: 'multilenguaje', name: 'Multilenguaje (2 idiomas)', price: 100 },
    { id: 'analytics', name: 'Google Analytics', price: 25 },
    // Web mensual
    { id: 'paginas-extra-mensual', name: 'Páginas extra (x2)', price: 10, monthly: true },
    { id: 'tienda-mensual', name: 'Tienda online', price: 15, monthly: true },
    { id: 'seo-mensual', name: 'SEO', price: 5, monthly: true },
    { id: 'multilenguaje-mensual', name: 'Multilenguaje (2 idiomas)', price: 10, monthly: true },
    // Software
    { id: 'login-roles', name: 'Login con roles', price: 100 },
    { id: 'gestion-usuarios', name: 'Gestión de usuarios', price: 150 },
    { id: 'dashboard', name: 'Dashboard con estadísticas', price: 200 },
    { id: 'api-rest', name: 'API REST', price: 250 },
    // Redes Sociales
    { id: 'red-adicional', name: 'Red adicional', price: 50, monthly: true },
    { id: 'publicaciones-3', name: '3 publicaciones semanales', price: 30, monthly: true },
    { id: 'publicaciones-4', name: '4 publicaciones semanales', price: 60, monthly: true },
    { id: 'publicaciones-5', name: '5 publicaciones semanales', price: 90, monthly: true },
    { id: 'historias', name: 'Historias (por red)', price: 20, monthly: true },
    { id: 'reels-pack', name: 'Reels/Tiktoks (Pack 4/mes)', price: 100, monthly: true },
    { id: 'reels-unitario', name: 'Reels/Tiktoks (unidad)', price: 30 },
    { id: 'informe', name: 'Informe de rendimiento', price: 20, monthly: true },
    { id: 'mensajes', name: 'Atención a mensajes (básico)', price: 40, monthly: true },
    { id: 'campanas', name: 'Gestión de campañas publicitarias', price: 50 },
    { id: 'branding', name: 'Diseño branding redes', price: 60 },
  ];

  get price(): number {
    let total = 0;

    // Precio base
    const web = this.webOptions.find((w) => w.id === this.selectedWeb);
    if (web) total += web.price;

    const software = this.softwareOptions.find((s) => s.id === this.selectedSoftware);
    if (software) total += software.price;

    const social = this.socialOptions.find((s) => s.id === 'social-base');
    if (social) total += social.price;

    if (this.selectedDesign === 'custom') total += 300;

    this.selectedExtras.forEach((extraId) => {
      const extra = this.extraOptions.find((e) => e.id === extraId);
      if (extra) total += extra.price;
    });

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
      software: this.selectedSoftware,
      design: this.selectedDesign,
      extras: this.selectedExtras,
      total: this.price,
    });
  }
}
