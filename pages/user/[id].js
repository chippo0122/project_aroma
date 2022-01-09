import { useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { clearUser, setUser } from '../../redux/currentUserSlice'
import { pushMsg } from '../../redux/message'

import { styled, Container, Typography, Button, Box, Grid } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LogoutIcon from '@mui/icons-material/Logout'

import BackgroundSet from '../../components/BackgroundSet'
import UserBadge from '../../components/UserBadge'

import IconS from '../../assets/Group1060.png'
import IconM from '../../assets/Group1060@2x.png'
import IconL from '../../assets/Group1060@3x.png'

const CustomContainer = styled(Container)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '90%',
    },
    [theme.breakpoints.up('sm')]: {
        width: '70%',
    },
    [theme.breakpoints.up('lg')]: {
        width: '485px',
    }
}))

const SuccessSign = styled('img')(() => ({
    width: '100%'
}))

const theme = createTheme({
    palette: {
        light: {
            main: '#fff',
            contrastText: '#ddd',
        },
        tail: {
            main: '#74b9ff',
            contrastText: '#fff'
        }
    },
});


export default function id() {
    //router & redux
    const router = useRouter();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);
    const viewWidth = useSelector(state => state.view.viewWidth);
    //set viewWidth 
    const iconPath = viewWidth > 900 ? IconL.src : (viewWidth > 600 ? IconM.src : IconS.src);
    
    const signOut = async () => {
        const res = await axios.post('/api/signout');
        //clear current data after signout
        dispatch(clearUser());
        dispatch(pushMsg({value: 'Logout successfully', success: true}));
        if (res) {
            router.push('/');
        } else {
            alert('Signout Fail');
        }
    }

    const verify = async () => {
        //sent verification mail
        try {
            await axios.post('/api/accountverify');
            dispatch(pushMsg({value: 'Verification Mail has been sent to your box', success: true}));
        } catch (err) {
            alert(err);
        }
    }

    useEffect(async () => {
         //get user info from session storage
        const value = JSON.parse(localStorage.getItem('userToken')).value || '';
        const userInfo = JSON.parse(localStorage.getItem('currentUser')) || '';

        //reset user info
        dispatch(setUser(userInfo));

        const result = await axios.get('/api/getuser', {
            headers: {
                'Authorization': value
            }
        });
        const res = await result.data;

        //if user did not pass verify
        if (!res.uid) {
            alert('Please Login First');
            dispatch(clearUser());
            localStorage.setItem('userToken', JSON.stringify({value: ''}));
            localStorage.setItem('currentUser', JSON.stringify({
                displayName: '',
                uid: '',
                email: ''
            }));
            router.replace('/');
        } 
    }, [])

    return (
        <BackgroundSet loginSuccess={true}>
            <UserBadge>
                {`${currentUser.displayName}`}
            </UserBadge>
            <CustomContainer>
                <SuccessSign src={iconPath} />
                <Typography sx={{ textAlign: 'center', color: '#fff', my: 3 }} variant="h4">
                    LOGIN SUCCESS!
                </Typography>
                <ThemeProvider theme={theme}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button onClick={verify} variant="contained" sx={{ mx: 'auto' }} color="tail">
                                    Verify
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button onClick={signOut} variant="outlined" sx={{ mx: 'auto' }} color="light" startIcon={<LogoutIcon />}>
                                    Logout
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </CustomContainer>
        </BackgroundSet>
    )
}
