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

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'learning',
    children: [
      { path: '', component: LearningComponent },
      { path: 'course/:id', component: CourseComponent },
    ],
  },
  { path: 'contact', component: ContactComponent },
  { path: 'help', component: HelpComponent },
  { path: 'consulting', component: ConsultingComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    children: [
      { path: '', component: ProfileComponent },
      { path: ':id', component: ProfileComponent },
    ],
  },

  { path: 'profile/:id', component: ProfileComponent },


  { path: '404', component: Error404Component },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
