// course.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Lesson {
  type: 'lesson';
  title: string;
  text: string;
}

interface MultipleChoiceExercise {
  type: 'exercise';
  exerciseType: 'multipleChoice';
  question: string;
  options: string[];
}

interface TrueFalseExercise {
  type: 'exercise';
  exerciseType: 'trueFalse';
  question: string;
}

interface FillInTheBlankExercise {
  type: 'exercise';
  exerciseType: 'fillInTheBlank';
  question: string;
}

interface SliderExercise {
  type: 'exercise';
  exerciseType: 'slider';
  question: string;
  min: number;
  max: number;
}

type ContentItem =
  | Lesson
  | MultipleChoiceExercise
  | TrueFalseExercise
  | FillInTheBlankExercise
  | SliderExercise;

interface Module {
  title: string;
  content: ContentItem[];
}

@Component({
  selector: 'app-course',
  imports: [CommonModule],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  courseData: any;

  constructor() { }

  ngOnInit(): void {
    const jsonData = {
      modules: [
        {
          title: 'Módulo 1: Introducción',
          content: [
            {
              type: 'lesson',
              title: 'Bienvenida',
              text: '¡Bienvenido al curso!'
            },
            {
              type: 'exercise',
              exerciseType: 'multipleChoice',
              question: '¿Cuánto es 2 + 2?',
              options: ['3', '4', '5'],
              correctAnswer: '4' // Respuesta correcta
            },
            {
              type: 'exercise',
              exerciseType: 'trueFalse',
              question: 'El cielo es azul.',
              correctAnswer: true // Respuesta correcta
            },
            {
              type: 'exercise',
              exerciseType: 'fillInTheBlank',
              question: 'Escribe tu nombre:',
              correctAnswer: 'Ismael' // Respuesta correcta
            },
            {
              type: 'exercise',
              exerciseType: 'slider',
              question: 'Selecciona tu nivel de satisfacción:',
              min: 0,
              max: 10,
              correctAnswer: [7, 8] // Respuestas válidas (puede ser un rango o valores específicos)
            }
          ]
        },
        {
          title: 'Módulo 2: Contenido Avanzado',
          content: [
            {
              type: 'lesson',
              title: 'Tema Avanzado',
              text: 'Aquí explicamos conceptos avanzados.'
            }
          ]
        }
      ]
    };

    // Aquí puede ser necesario transformar el objeto si necesitas modificarlo,
    // ya que con "as const" todas las propiedades son readonly.
    // Si solo vas a leerlo, puedes asignarlo directamente:
    this.courseData = jsonData as unknown as { modules: Module[] };
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



