import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import AOS from 'aos';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consulting',
  imports: [NgClass, RouterLink, FormsModule],
  templateUrl: './consulting.component.html',
  styleUrls: ['consulting.component.scss'],
})
export class ConsultingComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) { }
  activeCategory: string = 'redes';

  designCards = [
    {
      icon: 'bi bi-bezier2',
      title: 'Diseño UX/UI',
      description: 'Interfaces intuitivas centradas en la experiencia del usuario',
    },
    {
      icon: 'bi bi-lightning-charge',
      title: 'Alto Rendimiento',
      description: 'Sitios web optimizados para máxima velocidad y eficiencia',
    },
    {
      icon: 'bi bi-shield-check',
      title: 'Seguridad Integral',
      description: 'Protección avanzada contra amenazas digitales',
    },
    {
      icon: 'bi bi-graph-up',
      title: 'SEO Avanzado',
      description: 'Optimización para motores de búsqueda desde el inicio',
    },
    {
      icon: 'bi bi-phone',
      title: 'Diseño Mobile',
      description: 'Experiencias perfectas en dispositivos móviles',
    },
    {
      icon: 'bi bi-gear',
      title: 'Mantenimiento',
      description: 'Actualizaciones y soporte técnico continuo',
    },
  ];

  socialCards = [
    {
      icon: 'bi bi-instagram',
      title: 'Instagram',
      description: 'Diseño de feeds y estrategias visuales',
    },
    {
      icon: 'bi bi-facebook',
      title: 'Facebook',
      description: 'Gestión de comunidades y campañas ADS',
    },
    {
      icon: 'bi bi-linkedin',
      title: 'LinkedIn',
      description: 'Branding corporativo y estrategias B2B',
    },
    {
      icon: 'bi bi-tiktok',
      title: 'TikTok',
      description: 'Contenido viral y desafíos creativos',
    },
  ];

  pricingCategories = [
    {
      id: 'redes',
      name: 'Redes Sociales',
      plans: [
        {
          title: 'Básico',
          price: '159€',
          period: '/mes',
          features: ['Hasta 3 Redes Sociales', '15 Publicaciones/mes', 'Creación de contenido'],
          buttonText: 'Elegir',
        },
        {
          title: 'Estándar',
          price: '299€',
          period: '/mes',
          features: ['Hasta 5 Redes Sociales', '30 Publicaciones/mes', 'Gestión de anuncios'],
          buttonText: 'Elegir',
          highlighted: true,
        },
        {
          title: 'Premium',
          price: '499€',
          period: '/mes',
          features: ['Redes ilimitadas', 'Contenido diario', 'Planes de fidelización'],
          buttonText: 'Elegir',
        },
      ],
    },
    {
      id: 'web',
      name: 'Desarrollo Web',
      plans: [
        {
          title: 'Landing Page',
          price: '699€',
          period: '/único',
          features: ['Diseño personalizado', 'Optimización SEO', 'Formulario de contacto'],
          buttonText: 'Elegir',
        },
        {
          title: 'Web Corporativa',
          price: '1.999€',
          period: '/único',
          features: ['Hasta 10 secciones', 'CMS personalizado', 'Certificado SSL'],
          buttonText: 'Elegir',
          highlighted: true,
        },
        {
          title: 'Tienda Online',
          price: '2.999€',
          period: '/único',
          features: ['Hasta 100 productos', 'Pasarela de pago', 'Carrito inteligente'],
          buttonText: 'Elegir',
        },
      ],
    },
    {
      id: 'software',
      name: 'Software a Medida',
      plans: [
        {
          title: 'Sistema Básico',
          price: 'Desde 999€',
          period: '',
          features: ['Desarrollo a medida', '3 módulos básicos', 'Soporte 6 meses'],
          buttonText: 'Consultar',
        },
        {
          title: 'Sistema Empresarial',
          price: 'Desde 2.999€',
          period: '',
          features: ['ERP/CRM personalizado', 'Integración API', 'Soporte 1 año'],
          buttonText: 'Consultar',
          highlighted: true,
        },
        {
          title: 'Solución Premium',
          price: 'Desde 3.999€',
          period: '',
          features: ['Desarrollo completo', 'Multiplataforma', 'Soporte 24/7'],
          buttonText: 'Contactar',
        },
      ],
    },
  ];

  softwareProperties = [
    {
      text: 'ERP & CRM personalizados para una gestión integral.',
      color: 'text-blue-400',
    },
    {
      text: 'APIs seguras y eficientes para integración continua.',
      color: 'text-green-400',
    },
    {
      text: 'Arquitectura de microservicios para una escalabilidad sin límites.',
      color: 'text-yellow-400',
    },
    {
      text: 'Integración de sistemas legacy y soluciones en la nube.',
      color: 'text-red-400',
    },
  ];

  /* TODO: WIP Custom plan creation */
  /*   customFeatures = [
      { id: 'feature1', name: 'Publicaciones ilimitadas', selected: false, price: 50 },
      { id: 'feature2', name: 'Gestión de campañas ADS', selected: false, price: 70 },
      { id: 'feature3', name: 'Análisis de métricas', selected: false, price: 40 },
    ];
    customPlan = {
      publicaciones: 15,
      precioBase: 100,
    };
  
    totalPrice = this.customPlan.precioBase; */

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
  }
  setActiveCategory(category: string): void {
    this.activeCategory = category;
  }

  isActiveCategory(category: string): boolean {
    return this.activeCategory === category;
  }

  getActiveCategoryPlans() {
    const category = this.pricingCategories.find((cat) => cat.id === this.activeCategory);
    return category ? category.plans : [];
  }
  /*   updatePrice() {
      this.totalPrice = this.customPlan.precioBase;
  
      this.customFeatures.forEach((feature) => {
        if (feature.selected) {
          this.totalPrice += feature.price;
        }
      });
  
      // Añade un costo adicional basado en el número de publicaciones
      this.totalPrice += (this.customPlan.publicaciones - 5) * 2; // Por cada publicación extra, sumamos un costo adicional
    } */

  goToContact(id: string, title: string) {
    this.router.navigate(['/consulting/contact'], { queryParams: { id, title } });
  }
}
