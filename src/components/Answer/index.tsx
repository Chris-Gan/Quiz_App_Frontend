/* eslint-disable react/no-array-index-key */
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { Accordion, AccordionDetails, AccordionSummary, Box, CardMedia, List, ListItem, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { QuizAnswerResponse, QuizPersonalAndActualAnswer, SingleQuizAnswer } from 'interfaces/quiz';
import { FC, useState } from 'react';

interface Props {
    questionsWithAnswer: QuizPersonalAndActualAnswer[];
}
const Answer: FC<Props> = ({ questionsWithAnswer }) => {
    const [expanded, setExpanded] = useState<number | null>(0);

    const handleChange = (panel: number) => (event: React.SyntheticEvent<Element, Event>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : null);
    };
    const markCorrectOrNot = (qna: QuizPersonalAndActualAnswer, idx: number) => {
        if ([(qna as QuizAnswerResponse).answer, (qna as SingleQuizAnswer).selectedOptionIndex].includes(idx)) {
            return { sx: { color: (qna as QuizAnswerResponse).answer === idx ? green[500] : red[500] } };
        }
        return undefined;
    };

    return (
        <Box sx={{ mt: 5, width: '100%', maxWidth: 640, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom sx={{ textDecoration: 'underline', textUnderlineOffset: 4 }}>
                Solutions
            </Typography>
            {questionsWithAnswer.length > 0 &&
                questionsWithAnswer.map((item, index) => (
                    <Accordion disableGutters key={index} expanded={expanded === index} onChange={handleChange(index)}>
                        <AccordionSummary
                            expandIcon={
                                <ExpandCircleDownIcon
                                    sx={{
                                        color:
                                            (item as QuizAnswerResponse).answer === (item as SingleQuizAnswer).selectedOptionIndex
                                                ? green[500]
                                                : red[500],
                                    }}
                                />
                            }
                        >
                            <Typography sx={{ width: '90%', flexShrink: 0 }}>{(item as QuizAnswerResponse).questionWords}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {(item as QuizAnswerResponse).imageName && (
                                <CardMedia
                                    component="img"
                                    image={`${process.env.REACT_APP_BASE_URL}images/${(item as QuizAnswerResponse).imageName}`}
                                    sx={{ m: '10px auto', width: 'auto' }}
                                />
                            )}
                            <List>
                                {(item as QuizAnswerResponse)?.options?.map((x, i) => (
                                    <ListItem key={i}>
                                        <Typography {...markCorrectOrNot(item, i)}>
                                            <b>{`${String.fromCharCode(65 + i)}. `}</b>
                                            {x}
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                ))}
        </Box>
    );
};

export default Answer;
