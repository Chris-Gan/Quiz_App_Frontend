export const getFormattedTime = (sec: number) => {
    return `${Math.floor(sec / 60)
        .toString()
        .padStart(2, '0')}:${Math.floor(sec % 60)
        .toString()
        .padStart(2, '0')}`;
};
