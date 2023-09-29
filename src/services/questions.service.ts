import axios from 'axios';
import { QuestionInterface, QuizAnswerResponse } from 'interfaces/quiz';

export const getQuestions: () => Promise<QuestionInterface[]> = async () => {
    const result = await axios.get<QuestionInterface[]>(`${process.env.REACT_APP_BASE_URL}api/questions/`);
    return result.data;
};

export const getResults: (questionIndexArr: number[]) => Promise<QuizAnswerResponse[]> = async (questionIndexArr) => {
    const result = await axios.post<QuizAnswerResponse[]>(`${process.env.REACT_APP_BASE_URL}api/questions/getAnswers/`, questionIndexArr);
    return result.data;
};
