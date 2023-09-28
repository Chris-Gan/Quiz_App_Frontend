export interface Participant {
    name: string;
    email: string;
}

export interface ParticipantResponse extends Participant {
    id: number;
    score: number;
    timeTaken: number;
}
