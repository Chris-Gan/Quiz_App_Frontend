import axios from 'axios';
import { LoginForm } from 'interfaces/login';
import { ParticipantResponse } from 'interfaces/participant';

export const postParticipant: (payload: LoginForm) => Promise<ParticipantResponse> = async (payload) => {
    const result = await axios.post<ParticipantResponse>(`${process.env.REACT_APP_BASE_URL}api/participants/`, payload);
    return result.data;
};
export const getParticipants: () => Promise<ParticipantResponse> = async () => {
    const result = await axios.get<ParticipantResponse>(`${process.env.REACT_APP_BASE_URL}api/participants/`);
    return result.data;
};

export const putParticipant: (participantId: number, updatedParticipant: ParticipantResponse) => Promise<ParticipantResponse> = async (
    participantId,
    updatedParticipant
) => {
    const result = await axios.put<ParticipantResponse>(`${process.env.REACT_APP_BASE_URL}api/participants/${participantId}/`, updatedParticipant);
    return result.data;
};
