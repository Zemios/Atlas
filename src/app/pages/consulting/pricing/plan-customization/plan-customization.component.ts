import { Component } from '@angular/core';

@Component({
  selector: 'app-plan-customization',
  templateUrl: './plan-customization.component.html',
  styleUrl: './plan-customization.component.scss',
  standalone: true,
})
export class PlanCustomizationComponent {
  selectedType: string = '';
  selectedDesign: string = '';
  selectedExtras: string[] = [];

  typeOptions = [
    { id: 'landing', name: 'Landing Page', price: 500 },
    { id: 'corporate', name: 'Web Corporativa', price: 1000 },
    { id: 'ecommerce', name: 'Tienda Online', price: 2000 },
  ];

  designOptions = [
    { id: 'custom', name: '¡Sí, por favor!', price: 300 },
    { id: 'default', name: 'No, diseño básico', price: 0 },
  ];

  extraOptions = [
    { id: 'blog', name: 'Blog', price: 200 },
    { id: 'admin', name: 'Panel Admin', price: 400 },
    { id: 'seo', name: 'SEO Básico', price: 150 },
  ];

  get price(): number {
    let total = 0;

    const type = this.typeOptions.find(t => t.id === this.selectedType);
    if (type) total += type.price;

    const design = this.designOptions.find(d => d.id === this.selectedDesign);
    if (design) total += design.price;

    this.selectedExtras.forEach(extraId => {
      const extra = this.extraOptions.find(e => e.id === extraId);
      if (extra) total += extra.price;
    });

    return total;
  }

  toggleExtra(extra: string) {
    if (this.selectedExtras.includes(extra)) {
      this.selectedExtras = this.selectedExtras.filter(e => e !== extra);
    } else {
      this.selectedExtras.push(extra);
    }
  }
}
