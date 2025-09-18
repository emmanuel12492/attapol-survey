import { SurveyForm } from "@/components/surveys/survey-form"

export default function CreateSurveyPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Create New Survey</h1>
      <SurveyForm />
    </div>
  )
}