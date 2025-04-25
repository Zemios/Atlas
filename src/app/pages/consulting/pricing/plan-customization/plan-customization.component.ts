import { Component } from '@angular/core';

@Component({
  selector: 'app-plan-customization',
  imports: [],
  templateUrl: './plan-customization.component.html',
  styleUrl: './plan-customization.component.scss'
})
export class PlanCustomizationComponent {
  selectedType: string = '';
  selectedDesign: string = '';
  selectedExtras: string[] = [];

  get price(): number {
    let total = 0;

    const typePrices: any = {
      landing: 500,
      corporate: 1000,
      ecommerce: 2000,
    };

    const designPrices: any = {
      custom: 300,
      default: 0,
    };

    const extraPrices: any = {
      blog: 200,
      admin: 400,
      seo: 150,
    };

    if (this.selectedType) total += typePrices[this.selectedType];
    if (this.selectedDesign) total += designPrices[this.selectedDesign];
    this.selectedExtras.forEach(extra => total += extraPrices[extra]);

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
