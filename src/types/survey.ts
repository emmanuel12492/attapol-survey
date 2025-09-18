export interface QuestionData {
  text: string
  type: string
  options?: string[]
  required: boolean
}

export interface SurveyFormData {
  title: string
  description: string
  questions: QuestionData[]
}