export interface SingleQuizAnswer {
    id: number;
    selectedOptionIndex: number;
}
export interface QuizContextInterface {
    timeTaken: number | null;
    selectedOptions: SingleQuizAnswer[] | null;
    questionsWithAnswers: QuizPersonalAndActualAnswer[] | null;
    areAnswersDisplayed: boolean;
    score: number | null;
}
export interface QuizAnswerResponse extends QuestionInterface {
    answer: number;
}

export type QuizPersonalAndActualAnswer = QuizAnswerResponse | SingleQuizAnswer;
export interface QuestionInterface {
    id: number;
    questionWords: string;
    imageName: string;
    options: string[];
}
