import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
}

interface PricingCategory {
  id: string;
  name: string;
  plans: PricingPlan[];
}

@Component({
  selector: 'app-pricing',
  imports: [FormsModule, NgClass],
  templateUrl: './pricing.component.html',
  styleUrls: [],
})
export class PricingComponent implements OnInit {
  pricingCategories: PricingCategory[] = [
    {
      id: 'web',
      name: 'Desarrollo Web',
      plans: [
        {
          name: 'Básico',
          price: '$99',
          description: 'Sitio web de 1 a 3 páginas, diseño responsivo y soporte básico.',
          features: ['1-3 páginas', 'Diseño responsivo', 'Soporte básico'],
        },
        {
          name: 'Profesional',
          price: '$199',
          description: 'Sitio web personalizado con funcionalidades avanzadas.',
          features: ['5-7 páginas', 'Diseño personalizado', 'Integración de CMS', 'SEO básico'],
        },
        {
          name: 'Empresarial',
          price: '$299',
          description: 'Solución integral para empresas con múltiples funcionalidades.',
          features: ['10+ páginas', 'Diseño exclusivo', 'Integración de APIs', 'Soporte 24/7'],
        },
      ],
    },
    {
      id: 'software',
      name: 'Desarrollo de Software',
      plans: [
        {
          name: 'Básico',
          price: '$199',
          description: 'Aplicación sencilla con funcionalidades esenciales.',
          features: ['Funcionalidades básicas', 'Mantenimiento limitado'],
        },
        {
          name: 'Avanzado',
          price: '$399',
          description: 'Aplicación robusta con integración de APIs y mayor rendimiento.',
          features: ['Integración API', 'Funcionalidades avanzadas', 'Soporte extendido'],
        },
        {
          name: 'Enterprise',
          price: '$599',
          description: 'Solución a medida para grandes empresas con alta escalabilidad.',
          features: ['Escalabilidad', 'Seguridad avanzada', 'Soporte dedicado'],
        },
      ],
    },
    {
      id: 'social',
      name: 'Gestión de Redes Sociales',
      plans: [
        {
          name: 'Starter',
          price: '$49',
          description: 'Gestión básica de redes con publicaciones semanales.',
          features: ['3 publicaciones/semana', 'Monitoreo básico', 'Reportes mensuales'],
        },
        {
          name: 'Standard',
          price: '$99',
          description: 'Plan integral con contenido personalizado y análisis detallado.',
          features: ['Publicaciones diarias', 'Estrategia de contenido', 'Análisis y reportes'],
        },
        {
          name: 'Premium',
          price: '$199',
          description: 'Gestión completa con campañas, publicidad y atención al cliente.',
          features: ['Campañas publicitarias', 'Atención en tiempo real', 'Análisis avanzado'],
        },
      ],
    },
    // Puedes agregar más categorías según lo requieras...
  ];

  selectedCategory: string = 'web';
  currentPricing: PricingCategory | undefined;

  ngOnInit(): void {
    this.updateCurrentPricing();
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
    this.updateCurrentPricing();
  }

  onCategoryChange(): void {
    this.updateCurrentPricing();
  }

  updateCurrentPricing(): void {
    this.currentPricing = this.pricingCategories.find(
      (category) => category.id === this.selectedCategory
    );
  }
}
