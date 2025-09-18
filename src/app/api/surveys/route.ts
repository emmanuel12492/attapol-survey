import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "../../../lib/auth"
import { prisma } from "../../../lib/prisma"
import { QuestionData, SurveyFormData } from "../../../types/survey"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const json = (await req.json()) as SurveyFormData
    const survey = await prisma.survey.create({
      data: {
        title: json.title,
        description: json.description,
        userId: session.user.id,
        questions: {
          create: json.questions.map((q: QuestionData) => ({
            text: q.text,
            type: q.type,
            options: JSON.stringify(q.options || []),
            required: q.required,
          })),
        },
      },
      include: {
        questions: true,
      },
    })

    return NextResponse.json(survey)
  } catch (error) {
    console.error("[SURVEYS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}