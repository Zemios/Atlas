export interface CourseInterface {
  id: number;
  title: string;
  description?: string;
  modules?: ModuleInterface[];
  creation_date: Date;
}


export interface ModuleInterface {
  title: string;
  description?: string;
  lessons: LessonInterface[];
}

export interface LessonInterface {
  title: string;
  content?: string;
  teachings?: TeachingInterface[];
  exercises?: ExerciseInterface[];
}


export interface TeachingInterface {
  title: string;
  content?: string;
  exercises?: ExerciseInterface[];
}

export interface ExerciseInterface {
  title: string;
  description?: string;
  type: TypeExercise;
  options?: string[];
  correctAnswer: string[] | string | boolean | number;
}

export enum TypeExercise {
  INPUT = "Input",
  SELECT = "Select",
  RADIO = "Radio",
  CHECKBOX = "Checkbox",
  BOOLEAN = "Boolean",
  NUMBER = "Number",
  SLIDER = "Slider",
}
