export type TaskCategoryType =
  | "school"
  | "distanceLearning"
  | "personal"
  | "tutor"
  | "electives";

export const SchoolCategory: TaskCategoryType = "school";
export const DistanceLearningCategory: TaskCategoryType = "distanceLearning";
export const PersonalCategory: TaskCategoryType = "personal";
export const TutorCategory: TaskCategoryType = "tutor";
export const ElectivesCategory: TaskCategoryType = "electives";

export enum Category {
  SchoolCategory = "school",
  DistanceLearningCategory = "distanceLearning",
  PersonalCategory = "personal",
  TutorCategory = "tutor",
  ElectivesCategory = "electives",
}

export const CategoryToColor = {
  [Category.SchoolCategory]: "#FAA139",
  [Category.DistanceLearningCategory]: "#69AFC6",
  [Category.PersonalCategory]: "#4CDA4A",
  [Category.TutorCategory]: "#CE4ED1",
  [Category.ElectivesCategory]: "#F95151",
};
