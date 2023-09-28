import { Backdrop, CircularProgress, SxProps } from '@mui/material';
import { FC } from 'react';

interface Props {
    isLoading: boolean;
    rootStyle?: SxProps;
    loaderColor?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    loaderSize?: number | string;
    loaderThickness?: number;
}
const CircularLoader: FC<Props> = ({ isLoading, rootStyle, loaderColor, loaderSize, loaderThickness }) => {
    return (
        <Backdrop open={isLoading} sx={rootStyle}>
            <CircularProgress color={loaderColor} size={loaderSize} thickness={loaderThickness} />
        </Backdrop>
    );
};

export default CircularLoader;

CircularLoader.defaultProps = {
    rootStyle: { position: 'absolute', inset: 0, justifyContent: 'center', alignItems: 'center' },
    loaderColor: 'primary',
    loaderSize: '40px',
    loaderThickness: 3.6,
};
