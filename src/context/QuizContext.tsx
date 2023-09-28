import { quizContextInitialValue } from 'constant/quiz';
import { QuizContextInterface } from 'interfaces/quiz';
import { FC, ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';

interface Props {
    children: ReactNode;
}
export const quizContext = createContext<QuizContextInterface>(quizContextInitialValue);
export const updateQuizContext = createContext<(newQuizContext: QuizContextInterface) => void>({} as (newQuizContext: QuizContextInterface) => void);

export const useQuiz = () => useContext(quizContext);
export const useQuizUpdate = () => useContext(updateQuizContext);

export const useQuizContext: FC<Props> = ({ children }) => {
    const [quizContextDetails, setQuizContextDetails] = useState<QuizContextInterface>(quizContextInitialValue);

    const updateContextDetails = useCallback((newContextDetails: QuizContextInterface) => {
        setQuizContextDetails((prev) => {
            const newQuizContext = { ...prev, ...newContextDetails };
            sessionStorage.setItem('context', JSON.stringify(newQuizContext));
            return newQuizContext;
        });
    }, []);

    useEffect(() => {
        const storedContext = sessionStorage.getItem('context');
        if (!storedContext) {
            sessionStorage.setItem('context', JSON.stringify(quizContextDetails));
        }
        setQuizContextDetails(storedContext ? JSON.parse(storedContext) : quizContextInitialValue);
    }, []);

    return (
        <quizContext.Provider value={quizContextDetails}>
            <updateQuizContext.Provider value={updateContextDetails}>{children}</updateQuizContext.Provider>
        </quizContext.Provider>
    );
};
