import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/news/news.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { ProfileComponent } from './pages/auth/profile/profile.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { PostComponent } from './pages/explore/post/post.component';
import { ArticleComponent } from './pages/news/article/article.component';
import { ProjectComponent } from './pages/projects/project/project.component';
import { HelpComponent } from './pages/help/help.component';
import { Error404Component } from './pages/error404/error404.component';
import { LearningComponent } from './pages/learning/learning.component';
import { CourseComponent } from './pages/learning/course/course.component';
import { backendStatusGuard } from './guards/backend-status.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', component: MaintenanceComponent },
  {
    path: 'news',
    canActivate: [backendStatusGuard],
    children: [
      { path: '', component: NewsComponent },
      { path: 'article/:id', component: ArticleComponent },
    ],
  },
  {
    path: 'learning',
    canActivate: [backendStatusGuard],
    children: [
      { path: '', component: LearningComponent },
      { path: 'course/:id', component: CourseComponent },
    ],
  },
  {
    path: 'projects',
    canActivate: [backendStatusGuard],
    children: [
      { path: '', component: ProjectsComponent },
      { path: 'project/:id', component: ProjectComponent },
    ],
  },
  { path: 'contact', component: ContactComponent },
  {
    path: 'explore',
    canActivate: [backendStatusGuard],
    children: [
      { path: '', component: ExploreComponent },
      { path: 'post/:id', component: PostComponent },
    ],
  },
  { path: 'help', component: HelpComponent },

  { path: 'sign-in', component: SigninComponent, canActivate: [backendStatusGuard] },
  { path: 'sign-up', component: SignupComponent, canActivate: [backendStatusGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [backendStatusGuard] },

  { path: '404', component: Error404Component },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
