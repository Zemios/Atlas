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
          price: '149 €',
          description: 'Sitio web de 1 a 3 páginas con diseño responsivo y soporte básico.',
          features: ['1-3 páginas', 'Diseño responsivo', 'Soporte básico', 'Optimización móvil'],
        },
        {
          name: 'Profesional',
          price: '299 €',
          description: 'Sitio web personalizado con funcionalidades avanzadas, optimizado para SEO.',
          features: ['5-7 páginas', 'Diseño personalizado', 'Integración de CMS', 'SEO básico', 'Análisis de tráfico'],
        },
        {
          name: 'Empresarial',
          price: '499 €',
          description: 'Solución integral para empresas con múltiples funcionalidades avanzadas y soporte premium.',
          features: ['10+ páginas', 'Diseño exclusivo', 'Integración de APIs', 'Soporte 24/7', 'Mantenimiento mensual'],
        },
      ],
    },
    {
      id: 'software',
      name: 'Desarrollo de Software',
      plans: [
        {
          name: 'Básico',
          price: '249 €',
          description: 'Aplicación sencilla con funcionalidades esenciales y soporte limitado.',
          features: ['Funcionalidades básicas', 'Mantenimiento limitado', 'Soporte técnico básico'],
        },
        {
          name: 'Avanzado',
          price: '499 €',
          description: 'Aplicación robusta con integración de APIs y soporte extendido.',
          features: ['Integración API', 'Funcionalidades avanzadas', 'Soporte extendido', 'Escalabilidad moderada'],
        },
        {
          name: 'Enterprise',
          price: '799 €',
          description: 'Solución personalizada para grandes empresas, escalabilidad y soporte especializado.',
          features: ['Escalabilidad', 'Seguridad avanzada', 'Soporte dedicado', 'Personalización total'],
        },
      ],
    },
    {
      id: 'social',
      name: 'Gestión de Redes Sociales',
      plans: [
        {
          name: 'Starter',
          price: '79 €',
          description: 'Gestión básica de redes con publicaciones semanales y monitoreo básico.',
          features: ['3 publicaciones/semana', 'Monitoreo básico', 'Reportes mensuales', 'Optimización de perfil'],
        },
        {
          name: 'Standard',
          price: '149 €',
          description: 'Plan integral con contenido personalizado, análisis detallado y aumento de engagement.',
          features: ['Publicaciones diarias', 'Estrategia de contenido', 'Análisis y reportes', 'Gestión de comentarios'],
        },
        {
          name: 'Premium',
          price: '299 €',
          description: 'Gestión completa con campañas publicitarias, atención al cliente y optimización avanzada.',
          features: ['Campañas publicitarias', 'Atención en tiempo real', 'Análisis avanzado', 'Gestión de crisis'],
        },
      ],
    },
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


  updateCurrentPricing(): void {
    this.currentPricing = this.pricingCategories.find((category) => category.id === this.selectedCategory);
  }
}
