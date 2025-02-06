import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CoursesInterface } from '../../../interfaces/courses-interface';


@Component({
  selector: 'app-course',
  imports: [CommonModule],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  courseData: CoursesInterface | null = null;

  constructor() { }

  ngOnInit(): void {
    const jsonData = {
      id: 1,
      title: "Angular",
      description: "Angular is a JavaScript-based open-source web framework used for developing single-page applications",
      creation_date: new Date(),
      modules: [
        {}
      ]
    };

    this.courseData = jsonData;
  }

  checkAnswer(contentItem: any, userAnswer: any): void {
    switch (contentItem.exerciseType) {
      case 'multipleChoice':
      case 'trueFalse':
      case 'fillInTheBlank':
        contentItem.isCorrect = userAnswer === contentItem.correctAnswer;
        break;

      case 'slider':
        // Si la respuesta correcta es un rango o una lista de valores válidos
        contentItem.isCorrect = contentItem.correctAnswer.includes(Number(userAnswer));
        break;

      default:
        contentItem.isCorrect = false;
    }
  }
}



