/* eslint-disable react/no-array-index-key */
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, LinearProgress, List, ListItemButton, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { useQuiz, useQuizUpdate } from 'context/QuizContext';
import { getFormattedTime } from 'helper/general';
import { QuestionInteface } from 'interfaces/quiz';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStopwatch } from 'react-timer-hook';
import { getQuestions } from 'services/questions.service';

const Quiz = () => {
    const quizContextDetails = useQuiz();
    const { selectedOptions } = quizContextDetails;
    const updateQuizContext = useQuizUpdate();

    const navigate = useNavigate();
    const [questions, setQuestions] = useState<QuestionInteface[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const { totalSeconds } = useStopwatch({ autoStart: true });

    const buttonText = currentQuestion === 4 ? 'Submit' : 'Next';

    const currentQuestionSelectedOption = useMemo(
        () => selectedOptions?.find((option) => option.id === questions[currentQuestion]?.id)?.selectedOptionIndex,
        [selectedOptions, currentQuestion]
    );

    useEffect(() => {
        getQuestions()
            .then((res) => {
                setQuestions(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleAnswerSelected = (id: number, answerIndex: number) => {
        if (!selectedOptions) {
            updateQuizContext({
                ...quizContextDetails,
                selectedOptions: [{ id, selectedOptionIndex: answerIndex }],
            });
            return; // Exit the function after updating context if there were no previous selectedOptions
        }

        const foundExistingQuestion = selectedOptions?.find((quizOutcome) => quizOutcome.id === id);

        if (foundExistingQuestion) {
            // Update the selectedOptionIndex for the existing question
            const updatedOptions = selectedOptions.map((quizOutcome) => {
                if (quizOutcome.id === id) {
                    return {
                        ...quizOutcome,
                        selectedOptionIndex: answerIndex,
                    };
                }
                return quizOutcome;
            });
            updateQuizContext({ ...quizContextDetails, selectedOptions: updatedOptions });
        } else {
            // Add the new question and selected answer to the selectedOptions array
            const newOptions = [...selectedOptions, { id, selectedOptionIndex: answerIndex }];
            updateQuizContext({ ...quizContextDetails, selectedOptions: newOptions });
        }
    };

    const handleNextButton = () => {
        if (currentQuestion < 4) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            updateQuizContext({ ...quizContextDetails, timeTaken: totalSeconds });
            navigate('/result');
        }
    };

    const handlePrevButton = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    return questions.length !== 0 ? (
        <Card sx={{ maxWidth: 640, mx: 'auto', mt: 5, '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}>
            <CardHeader title={`Question ${currentQuestion + 1} of 5`} action={<Typography>{getFormattedTime(totalSeconds)}</Typography>} />
            <Box>
                <LinearProgress variant="determinate" value={((currentQuestion + 1) * 100) / 5} />
            </Box>
            {questions[currentQuestion].imageName !== null && (
                <CardMedia
                    component="img"
                    image={`${process.env.REACT_APP_BASE_URL}images/${questions[currentQuestion].imageName}`}
                    sx={{ width: 'auto', m: '20px auto 10px' }}
                />
            )}
            <CardContent>
                <Typography variant="h6">{questions[currentQuestion].questionWords}</Typography>
                <List>
                    {questions[currentQuestion]?.options?.map((description, index) => (
                        <ListItemButton
                            disableRipple
                            sx={{
                                color: currentQuestionSelectedOption === index ? green[500] : 'default',
                            }}
                            key={`${questions[currentQuestion].questionWords} ${index}`}
                            onClick={() => handleAnswerSelected(questions[currentQuestion].id, index)}
                        >
                            <div>
                                <b>{`${String.fromCharCode(65 + index)} . `}</b>
                                {description}
                            </div>
                        </ListItemButton>
                    ))}
                </List>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                <Button variant="contained" disabled={currentQuestion === 0} onClick={handlePrevButton}>
                    Previous
                </Button>
                <Button variant="contained" onClick={handleNextButton}>
                    {buttonText}
                </Button>
            </CardActions>
        </Card>
    ) : null;
};

export default Quiz;
