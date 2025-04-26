import { Component } from '@angular/core';

@Component({
  selector: 'app-plan-customization',
  templateUrl: './plan-customization.component.html',
  styleUrl: './plan-customization.component.scss',
  standalone: true,
})
export class PlanCustomizationComponent {
  selectedType: string = '';
  selectedDesign: string = 'default';
  selectedExtras: string[] = [];

  typeOptions = [
    { id: 'landing', name: 'Landing Page', price: 500 },
    { id: 'corporate', name: 'Web Corporativa', price: 1000 },
    { id: 'ecommerce', name: 'Tienda Online', price: 2000 },
  ];

  designPrice = 300;

  extraOptions = [
    { id: 'blog', name: 'Blog', price: 200 },
    { id: 'admin', name: 'Panel Admin', price: 400 },
    { id: 'seo', name: 'SEO Básico', price: 150 },
  ];

  get price(): number {
    let total = 0;

    const type = this.typeOptions.find(t => t.id === this.selectedType);
    if (type) total += type.price;
    if (this.selectedDesign === 'custom') total += this.designPrice;
    this.selectedExtras.forEach(extraId => {
      const extra = this.extraOptions.find(e => e.id === extraId);
      if (extra) total += extra.price;
    });

    return total;
  }

  selectType(typeId: string) {
    this.selectedType = this.selectedType === typeId ? '' : typeId;
  }

  toggleExtra(extra: string) {
    this.selectedExtras = this.selectedExtras.includes(extra)
      ? this.selectedExtras.filter(e => e !== extra)
      : [...this.selectedExtras, extra];
  }

  submit() {
    console.log({
      type: this.selectedType,
      design: this.selectedDesign,
      extras: this.selectedExtras,
      total: this.price
    });
  }
}
