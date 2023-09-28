export interface SingleQuizAnswer {
    id: number;
    selectedOptionIndex: number;
}
export interface QuizContextInterface {
    timeTaken: number | null;
    selectedOptions: SingleQuizAnswer[] | null;
}

export interface QuestionInteface {
    id: number;
    questionWords: string;
    imageName: string;
    options: string[];
}

export interface QuizAnswerResponse extends QuestionInteface {
    answer: number;
}

export type QuizPersonalAndActualAnswer = QuizAnswerResponse | SingleQuizAnswer;
