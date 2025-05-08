import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [RouterLink],
  templateUrl: './contact.component.html',
  styleUrls: [],
})
export class ContactComponent {
  teamList = [
    {
      name: 'Ismael',
      title: 'Founder',
      photo: 'images/pfp/ismael_photo.webp',
      url: 'https://www.linkedin.com/in/ismadev/',
    },
    {
      name: 'Eliceo',
      title: 'Co-Founder',
      photo: 'images/pfp/eliceo_photo.webp',
      url: 'https://www.linkedin.com/in/eliceo-leon/',
    },
  ];
}
