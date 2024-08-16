import { Section } from '@radix-ui/themes'
import React, { FC, useState } from 'react'

import AssessmentNav from '../components/topBars/AssessmentNav'
import { useAssessmentParams } from '../hooks/assessmentParams'
import { useAnswers, useAssessmentHeading, useQuestions } from '../hooks/candidate'
import FrontCover from './FrontCover'
import QuestionPage from './QuestionPage'

const Answerbook: FC = () => {
  const [currentPage, setCurrentPage] = useState('frontcover')
  const { assessmentID } = useAssessmentParams()
  const { heading, headingIsLoaded } = useAssessmentHeading(assessmentID)
  const { questions, questionsAreLoaded } = useQuestions(assessmentID)
  const { lookupAnswer, answersAreLoaded, updateAnswer } = useAnswers(assessmentID)

  function renderFrontCover() {
    if (!headingIsLoaded) return <div>Loading...</div>
    if (!heading) return <div>Error</div>
    return <FrontCover heading={heading} />
  }

  function renderQuestionPage(questionNumber: number) {
    if (!questionsAreLoaded) return <div>Loading...</div>
    let selectedQuestion = questions?.[questionNumber]
    if (!selectedQuestion) return <div>Error</div>
    return (
      <QuestionPage
        questionNumber={questionNumber}
        question={selectedQuestion}
        lookupAnswer={lookupAnswer(questionNumber)}
        onAnswerChange={updateAnswer(questionNumber)}
      />
    )
  }

  function renderPage() {
    if (currentPage === 'frontcover') return renderFrontCover()
    const [questionNumber] = currentPage.match(/\d+/) as RegExpMatchArray
    return renderQuestionPage(Number(questionNumber))
  }

  return (
    <>
      <AssessmentNav currentPage={currentPage} onPageChange={setCurrentPage} questionCount={3} />
      <Section pt="7">{renderPage()}</Section>
    </>
  )
}

export default Answerbook
