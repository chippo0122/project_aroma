import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import axios from 'axios'
import { Card, Typography, TextField, Box, Button, Container, styled, Grid, ClickAwayListener } from "@mui/material"
import BackgroundSet from "../../components/BackgroundSet"
import RouteController from "../../components/RouteController"

const InnerContainer = styled(Container)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '90%',
    },
    [theme.breakpoints.up('sm')]: {
        width: '70%',
    },
    [theme.breakpoints.up('lg')]: {
        width: '396px',
    }
}))

const CustomOutput = styled(Typography)(({ theme }) => ({
    mx: 1,
    backgroundColor: '#e0e0e0',
    fontSize: '2.5rem',
    width: '100%',
    height: '71px'
}))

export default function VerifyID() {
    const router = useRouter();

    const [checked, setChecked] = useState(true);
    const [keyPair, setKeyPair] = useState('');
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [isFocus, setFocus] = useState(false);

    const [timer, setTimer] = useState(null);
    const [left, setLeft] = useState(10);
    const [expire, setExpire] = useState(true);


    const CustomBorder = styled('div')(({ theme }) => ({
        backgroundColor: isFocus ? '#1976d2' : 'unset',
        width: '100%',
        height: '1px'
    }))

    const showCode = (e) => {
        const { value } = e.target;
        const newCode = value.split('');

        if (newCode.length > 7) {
            e.target.value = code.join('');
            return
        }

        while (newCode.length < 6) {
            newCode.push('');
        }

        setCode(newCode);
    }

    //cuz it doesn't need to make verify code by self,
    //i make a dumb function to keep this page can be used
    const createSuckPairKey = () => {
        const arr = [];

        for (let i = 0; i < 6; i++) {
            const digit = Math.floor(Math.random() * 9);
            arr.push(digit);
        }

        setKeyPair(arr.join(''));
    }

    const verifyCode = async() => {
        if (keyPair !== code.join('')) {
            setChecked(false);
        } else {
            //if code is match, then go to next page
            setChecked(true);
            const value = JSON.parse(localStorage.getItem('userToken')).value || '';
            const user = await axios.get('/api/getuser', {
                headers: {
                    'Authorization': value
                }
            });
            const res = await user.data;
            //if the validate pass, go to login success page directly,
            //or back to login page
            if(res.uid) {
                router.push(`/user/${user.data.uid}`);
            } else {
                router.push('/');
            }
        }
    }

    const retryVerify = () => {
        //reset left[state] as 10 to trigger the timer work 
        createSuckPairKey();
        setLeft(10);
    }

    useEffect(() => {
        createSuckPairKey();

        return () => {
            //clear interval func when the component is about to unmount
            clearInterval(timer);
            setTimer(null);
        }
    }, [])

    useEffect(() => {
        if(left >= 10 && expire ) {
            //when left[state] has reset to 10, timer will be triggered
            const interval = setInterval(() => {
                setLeft(prev => prev - 1);
            }, 1000);

            setTimer(interval);
            setExpire(false);
        } else if(left < 1) {
            // when left[state] is less than 0, stop decreament and clear timer
            clearInterval(timer);
            setExpire(true);
        }
    }, [left])

    return (
        <BackgroundSet>
            <RouteController />
            <Card sx={{ pt: 3, pb: 6 }}>
                <InnerContainer>
                    <Typography sx={{ fontSize: '24px', textAlign: 'center', p: 1 }} color={'#333333'}>
                        Verify Your E-mail
                    </Typography>
                    <Box sx={{ display: 'flex', position: 'relative', justifyContent: 'space-between', color: checked ? '#1976d2' : '#940505' }}>
                        <Grid container spacing={1}>
                            <Grid item xs={2} sx={{ textAlign: 'center' }}>
                                <CustomOutput>{code[0]}</CustomOutput>
                                <CustomBorder />
                            </Grid>
                            <Grid item xs={2} sx={{ textAlign: 'center' }}>
                                <CustomOutput>{code[1]}</CustomOutput>
                                <CustomBorder />
                            </Grid>
                            <Grid item xs={2} sx={{ textAlign: 'center' }}>
                                <CustomOutput>{code[2]}</CustomOutput>
                                <CustomBorder />
                            </Grid>
                            <Grid item xs={2} sx={{ textAlign: 'center' }}>
                                <CustomOutput>{code[3]}</CustomOutput>
                                <CustomBorder />
                            </Grid>
                            <Grid item xs={2} sx={{ textAlign: 'center' }}>
                                <CustomOutput>{code[4]}</CustomOutput>
                                <CustomBorder />
                            </Grid>
                            <Grid item xs={2} sx={{ textAlign: 'center' }}>
                                <CustomOutput>{code[5]}</CustomOutput>
                                <CustomBorder />
                            </Grid>
                        </Grid>
                        <ClickAwayListener onClickAway={() => { setFocus(false) }}>
                            <TextField
                                onChange={showCode}
                                onFocus={() => { setFocus(true) }}
                                type="number"
                                sx={{ position: 'absolute', zIndex: 3, opacity: 0 }}
                                fullWidth
                                variant="filled"
                            />
                        </ClickAwayListener>
                    </Box>

                    <Typography sx={{ textAlign: 'center', my: 3 }} variant="caption" display="block">
                        <>
                            Please enter 6 digital code below <br />
                            {keyPair}
                        </>
                    </Typography>

                    <Button onClick={verifyCode} sx={{ backgroundColor: '#1976d2', mt: 1 }} fullWidth variant="contained">VERIFY</Button>
                    <Button onClick={retryVerify} sx={{ mt: 1 }} disabled={!expire} fullWidth variant="outlined">{`RETRY${!expire ? '...' : ''}${!expire ? left : ''}`}</Button>
                    {
                        checked ?
                            '' :
                            <Typography sx={{ textAlign: 'center', my: 3, color: '#940505' }} variant="caption" display="block">
                                Wrong code , Please try agian
                            </Typography>
                    }
                </InnerContainer>
            </Card>
        </BackgroundSet>
    )
}
