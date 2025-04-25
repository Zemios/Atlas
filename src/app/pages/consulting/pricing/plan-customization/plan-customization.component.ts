import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-plan-customization',
  imports: [ReactiveFormsModule],
  templateUrl: './plan-customization.component.html',
  styleUrl: './plan-customization.component.scss'
})
export class PlanCustomizationComponent {
  form: FormGroup;
  price = 0;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      type: [''],
      design: [''],
      extras: this.fb.group({
        blog: [false],
        admin: [false],
        seo: [false],
      }),
    });

    this.form.valueChanges.subscribe(() => this.calculatePrice());
  }

  calculatePrice() {
    let total = 0;
    const { type, design, extras } = this.form.value;

    total += +type || 0;
    total += +design || 0;

    if (extras.blog) total += 200;
    if (extras.admin) total += 400;
    if (extras.seo) total += 150;

    this.price = total;
  }
}
