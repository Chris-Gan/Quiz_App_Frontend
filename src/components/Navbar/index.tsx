import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { ReactNode, FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    children: ReactNode;
}
const Navbar: FC<Props> = ({ children }) => {
    const navigate = useNavigate();
    const logout = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('context');
        navigate('/');
    };
    return (
        <>
            <AppBar position="sticky">
                <Toolbar sx={{ width: 640, m: 'auto' }}>
                    <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>
                        Quiz App
                    </Typography>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: 'white',
                            color: 'white',
                        }}
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            {children}
        </>
    );
};

export default Navbar;
