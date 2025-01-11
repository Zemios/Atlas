import { ProjectInterface } from './../../../interfaces/project-interface';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../../services/projects.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-project',
  imports: [AsyncPipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  private readonly projectsSvc = inject(ProjectsService);
  route = inject(ActivatedRoute);
  id: string | null = this.route.snapshot.paramMap.get('id');
  project: Observable<ProjectInterface> = this.projectsSvc.get(Number(this.id));
}
