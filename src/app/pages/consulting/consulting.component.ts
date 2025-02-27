import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import AOS from 'aos'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consulting',
  imports: [NgClass, RouterLink],
  templateUrl: './consulting.component.html',
  styleUrls: ['consulting.component.scss'],
})
export class ConsultingComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }
  activeCategory: string = 'redes';

  designCards = [
    {
      "icon": "bi bi-bezier2",
      "title": "Diseño UX/UI",
      "description": "Interfaces intuitivas centradas en la experiencia del usuario"
    },
    {
      "icon": "bi bi-lightning-charge",
      "title": "Alto Rendimiento",
      "description": "Sitios web optimizados para máxima velocidad y eficiencia"
    },
    {
      "icon": "bi bi-shield-check",
      "title": "Seguridad Integral",
      "description": "Protección avanzada contra amenazas digitales"
    },
    {
      "icon": "bi bi-graph-up",
      "title": "SEO Avanzado",
      "description": "Optimización para motores de búsqueda desde el inicio"
    },
    {
      "icon": "bi bi-phone",
      "title": "Diseño Mobile",
      "description": "Experiencias perfectas en dispositivos móviles"
    },
    {
      "icon": "bi bi-gear",
      "title": "Mantenimiento",
      "description": "Actualizaciones y soporte técnico continuo"
    }
  ]

  socialCards = [
    {
      "icon": "bi bi-instagram",
      "title": "Instagram",
      "description": "Diseño de feeds y estrategias visuales"
    },
    {
      "icon": "bi bi-facebook",
      "title": "Facebook",
      "description": "Gestión de comunidades y campañas ADS"
    },
    {
      "icon": "bi bi-linkedin",
      "title": "LinkedIn",
      "description": "Branding corporativo y estrategias B2B"
    },
    {
      "icon": "bi bi-tiktok",
      "title": "TikTok",
      "description": "Contenido viral y desafíos creativos"
    }
  ]


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) { AOS.init(); }
  }
  setActiveCategory(category: string): void {
    this.activeCategory = category;
  }

  isActiveCategory(category: string): boolean {
    return this.activeCategory === category;
  }
}
