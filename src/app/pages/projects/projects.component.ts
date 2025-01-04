import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectInterface } from '../../interfaces/project-interface';
import { ProjectsService } from '../../services/projects.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  private readonly projectsSvc = inject(ProjectsService);
  projects: Observable<ProjectInterface[]> = this.projectsSvc.show();
}
