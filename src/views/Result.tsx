import { Box, Button, Card, CardContent, CardMedia, Tooltip, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import Answer from 'components/Answer';
import { useQuiz, useQuizUpdate } from 'context/QuizContext';
import { getFormattedTime } from 'helper/general';
import { useEffect } from 'react';

const Result = () => {
    const quizContextDetails = useQuiz();
    const { score, areAnswersDisplayed, timeTaken, questionsWithAnswers } = quizContextDetails;
    const updateQuizContext = useQuizUpdate();

    const restart = () => {
        sessionStorage.removeItem('context');
        window.location.href = '/quiz';
    };

    const showAnswer = () => {
        updateQuizContext({ ...quizContextDetails, areAnswersDisplayed: true });
    };

    useEffect(() => {
        console.log({ quizContextDetails });
    }, [quizContextDetails]);
    return (
        <>
            <Card sx={{ mt: 5, display: 'flex', width: '100%', maxWidth: 640, mx: 'auto' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
                        <Typography variant="h4">Congratulations!</Typography>
                        <Typography variant="h6">YOUR SCORE</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            <Typography component="span" color={green[500]}>
                                {score ?? 0}
                            </Typography>
                            /5
                        </Typography>
                        <Typography variant="h6">Took {`${getFormattedTime(timeTaken ?? 0)} mins`}</Typography>
                        <Tooltip title="Submit to view correct answers" arrow>
                            <Button disabled={areAnswersDisplayed} variant="contained" sx={{ mx: 1 }} size="small" onClick={showAnswer}>
                                View Result
                            </Button>
                        </Tooltip>
                        <Button variant="contained" sx={{ mx: 1 }} size="small" onClick={restart}>
                            Re-try
                        </Button>
                    </CardContent>
                </Box>
                <CardMedia component="img" sx={{ width: 220 }} image="./result.png" />
            </Card>
            {areAnswersDisplayed && <Answer questionsWithAnswer={questionsWithAnswers ?? []} />}
        </>
    );
};

export default Result;
