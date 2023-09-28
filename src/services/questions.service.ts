import axios from 'axios';
import { QuestionInteface, QuizAnswerResponse } from 'interfaces/quiz';

export const getQuestions: () => Promise<QuestionInteface[]> = async () => {
    const result = await axios.get<QuestionInteface[]>(`${process.env.REACT_APP_BASE_URL}api/questions/`);
    return result.data;
};

export const getResults: (questionIndexArr: number[]) => Promise<QuizAnswerResponse[]> = async (questionIndexArr) => {
    const result = await axios.post<QuizAnswerResponse[]>(`${process.env.REACT_APP_BASE_URL}api/questions/getAnswers/`, questionIndexArr);
    return result.data;
};
