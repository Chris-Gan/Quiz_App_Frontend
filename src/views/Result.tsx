import { Box, Button, Card, CardContent, CardMedia, Snackbar, Tooltip, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import Answer from 'components/Answer';
import CircularLoader from 'components/CircularLoader';
import { useQuiz } from 'context/QuizContext';
import { getFormattedTime } from 'helper/general';
import { ParticipantResponse } from 'interfaces/participant';
import { QuizAnswerResponse, QuizPersonalAndActualAnswer, SingleQuizAnswer } from 'interfaces/quiz';
import { useEffect, useState } from 'react';
import { putParticipant } from 'services/participants.service';
import { getResults } from 'services/questions.service';

const Result = () => {
    const quizContextDetails = useQuiz();

    const { selectedOptions, timeTaken } = quizContextDetails;
    const questionArr = selectedOptions?.map((item) => item.id);
    const [questionsWithAnswer, setQuestionsWithAnswer] = useState<QuizPersonalAndActualAnswer[]>([]);
    const [score, setScore] = useState<number>(0);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const restart = () => {
        sessionStorage.removeItem('context');
        window.location.href = '/quiz';
    };

    const submit = async () => {
        setIsSubmitting(true);
        const storedUserDetails = sessionStorage.getItem('user');
        if (storedUserDetails) {
            const userDetails = JSON.parse(storedUserDetails) as ParticipantResponse;
            const modifiedUserDetails: ParticipantResponse = { ...userDetails, score, timeTaken: timeTaken ?? 0 };
            sessionStorage.setItem('user', JSON.stringify(modifiedUserDetails));

            putParticipant(userDetails.id, modifiedUserDetails).then(() => {
                setShowSnackbar(true);
                setShowCorrectAnswers(true);
                setIsSubmitting(false);
            });
        }
    };

    const closeSnackbar = () => {
        setShowSnackbar(false);
    };

    const calculateScore = (qna: QuizPersonalAndActualAnswer[]) => {
        const tempScore = qna.reduce((acc, curr) => {
            return (curr as QuizAnswerResponse).answer === (curr as SingleQuizAnswer).selectedOptionIndex ? acc + 1 : acc;
        }, 0);
        setScore(tempScore);
    };
    useEffect(() => {
        setIsLoading(true);
        if (questionArr) {
            getResults(questionArr)
                .then((res) => {
                    const qna = selectedOptions?.map((x) => ({
                        ...x,
                        ...res.find((y) => y.id === x.id),
                    })) as QuizPersonalAndActualAnswer[];
                    setQuestionsWithAnswer(qna);
                    calculateScore(qna);
                    setIsLoading(false);
                })
                .catch((err) => console.log(err));
        }
    }, []);

    return (
        <>
            <Card sx={{ mt: 5, display: 'flex', width: '100%', maxWidth: 640, mx: 'auto' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
                        <Typography variant="h4">Congratulations!</Typography>
                        <Typography variant="h6">YOUR SCORE</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            <Typography component="span" color={green[500]}>
                                {score}
                            </Typography>
                            /5
                        </Typography>
                        <Typography variant="h6">Took {`${getFormattedTime(timeTaken ?? 0)} mins`}</Typography>
                        <Tooltip title="Submit to view correct answers" arrow>
                            <Button disabled={showCorrectAnswers} variant="contained" sx={{ mx: 1 }} size="small" onClick={submit}>
                                Submit
                            </Button>
                        </Tooltip>
                        <Button variant="contained" sx={{ mx: 1 }} size="small" onClick={restart}>
                            Re-try
                        </Button>
                        <Snackbar
                            open={showSnackbar}
                            autoHideDuration={6000}
                            onClose={closeSnackbar}
                            message="Score updated"
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        />
                    </CardContent>
                </Box>
                <CardMedia component="img" sx={{ width: 220 }} image="./result.png" />
            </Card>
            {showCorrectAnswers && <Answer questionsWithAnswer={questionsWithAnswer} />}
            <CircularLoader isLoading={isSubmitting || isLoading} />
        </>
    );
};

export default Result;
