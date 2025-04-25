import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProfileComponent } from './pages/auth/profile/profile.component';
import { HelpComponent } from './pages/help/help.component';
import { Error404Component } from './pages/error404/error404.component';
import { LearningComponent } from './pages/learning/learning.component';
import { CourseComponent } from './pages/learning/course/course.component';
import { ConsultingComponent } from './pages/consulting/consulting.component';
import { PricingComponent } from './pages/consulting/pricing/pricing.component';
import { AboutUsComponent } from './pages/consulting/about-us/about-us.component';
import { ConsultingGuard } from './guards/consulting.guard';
import { PlanCustomizationComponent } from './pages/consulting/pricing/plan-customization/plan-customization.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [ConsultingGuard] },
  {
    path: 'learning',
    children: [
      { path: '', component: LearningComponent },
      { path: 'course/:id', component: CourseComponent },
    ],
    canActivate: [ConsultingGuard],
  },
  { path: 'contact', component: ContactComponent, canActivate: [ConsultingGuard] },
  { path: 'help', component: HelpComponent, canActivate: [ConsultingGuard] },
  {
    path: 'consulting',
    children: [
      { path: '', component: ConsultingComponent },
      { path: 'contact', component: AboutUsComponent },
      { path: 'pricing', component: PricingComponent },
      { path: 'test', component: PlanCustomizationComponent },
    ],
  },

  { path: 'login', component: LoginComponent, canActivate: [ConsultingGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [ConsultingGuard] },
  {
    path: 'profile',
    children: [
      { path: '', component: ProfileComponent },
      { path: ':id', component: ProfileComponent },
    ],
    canActivate: [ConsultingGuard],
  },

  /* TODO: Esto de aqui??  por qué hay dos?*/
  { path: 'profile/:id', component: ProfileComponent },

  { path: '404', component: Error404Component, canActivate: [ConsultingGuard] },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
