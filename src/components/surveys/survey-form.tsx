"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const questionTypes = [
  { label: "Multiple Choice", value: "multiple_choice" },
  { label: "Text", value: "text" },
  { label: "Rating", value: "rating" },
] as const

const surveySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  questions: z.array(z.object({
    text: z.string().min(1, "Question text is required"),
    type: z.enum(["multiple_choice", "text", "rating"]),
    options: z.array(z.string()).default([""]),
    required: z.boolean().default(true),
  })).min(1, "At least one question is required"),
})

type FormData = z.infer<typeof surveySchema>

export function SurveyForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      title: "",
      description: "",
      questions: [
        {
          text: "",
          type: "multiple_choice",
          options: [""],
          required: true,
        },
      ],
    },
  })

  const { fields: questionFields, append: appendQuestion, remove: removeQuestion } = 
    useFieldArray({
      name: "questions",
      control: form.control,
    })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    try {
      const response = await fetch("/api/surveys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to create survey")
      }

      const survey = await response.json()
      router.push(`/dashboard/surveys/${survey.id}`)
    } catch (error) {
      console.error("Error creating survey:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium" htmlFor="title">
            Survey Title
          </label>
          <input
            id="title"
            {...form.register("title")}
            className="w-full rounded-md border p-2 mt-1"
            placeholder="Enter survey title"
          />
          {form.formState.errors.title && (
            <p className="text-sm text-red-500 mt-1">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="description">
            Description (Optional)
          </label>
          <textarea
            id="description"
            {...form.register("description")}
            className="w-full rounded-md border p-2 mt-1"
            placeholder="Enter survey description"
            rows={3}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Questions</h2>
          <button
            type="button"
            onClick={() =>
              appendQuestion({
                text: "",
                type: "multiple_choice",
                options: [""],
                required: true,
              })
            }
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
          >
            Add Question
          </button>
        </div>

        {questionFields.map((field: Record<string, any>, index: number) => (
          <div key={field.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-4">
                <div>
                  <label className="text-sm font-medium">
                    Question {index + 1}
                  </label>
                  <input
                    {...form.register(`questions.${index}.text`)}
                    className="w-full rounded-md border p-2 mt-1"
                    placeholder="Enter your question"
                  />
                  {form.formState.errors.questions?.[index]?.text && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.questions[index]?.text?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Question Type</label>
                  <select
                    {...form.register(`questions.${index}.type`)}
                    className="w-full rounded-md border p-2 mt-1"
                  >
                    {questionTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {form.watch(`questions.${index}.type`) === "multiple_choice" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Options</label>
                    {field.options?.map((_: string, optionIndex: number) => (
                      <input
                        key={optionIndex}
                        {...form.register(
                          `questions.${index}.options.${optionIndex}`
                        )}
                        className="w-full rounded-md border p-2"
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        form.setValue(`questions.${index}.options`, [
                          ...(field.options || []),
                          "",
                        ])
                      }
                      className="text-sm text-blue-500 hover:text-blue-600"
                    >
                      Add Option
                    </button>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...form.register(`questions.${index}.required`)}
                    id={`required-${index}`}
                  />
                  <label
                    htmlFor={`required-${index}`}
                    className="text-sm font-medium"
                  >
                    Required
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="text-red-500 hover:text-red-600 ml-4"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 w-full items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
      >
        {isLoading ? "Creating Survey..." : "Create Survey"}
      </button>
    </form>
  )
}