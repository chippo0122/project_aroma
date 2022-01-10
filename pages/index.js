import { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { Card, Typography, TextField, Box, Button, Link, styled, Container } from "@mui/material"
import BackgroundSet from "../components/BackgroundSet"

import { setUser } from '../redux/currentUserSlice'
import { pushMsg } from '../redux/message'

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

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState({ email: '', password: '' });


  const loginApply = async () => {
    //reset meg
    setErrorMsg({ email: '', password: '' });
    const rule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    //every input supossed to be inserted
    if (!(email && password)) {
      const msg = {
        email: email ? '' : 'Account should no be empty',
        password: password ? '' : 'Password should not be empty'
      }
      setErrorMsg(msg);
      return
    }
    //email incorrect
    if (email.search(rule) === -1) {
      setErrorMsg(state => ({ ...state, email: 'Email format is incorrect' }));
      return
    }

    const data = {
      email,
      password
    }

    try {
      const result = await axios.post('/api/userlog', data);
      const res = await result.data;


      if (res.operationType === 'signIn') {
        const { uid, displayName, email } = res.user;
        const token = res.user.stsTokenManager.accessToken;
        //set current user & token to client side
        localStorage.setItem('userToken', JSON.stringify({ value: token }));
        localStorage.setItem('currentUser', JSON.stringify({ uid, displayName, email }));

        await dispatch(setUser({ uid, displayName, email }));
        dispatch(setUser({ uid, displayName, email }));
        //if it success, router psuh to user success page
        router.push(`/user/${uid}`);
      } else {
        //if error occur, show the error mesaage
        const { code } = res;
        if (code.includes('email')) {
          setErrorMsg(state => ({ ...state, email: code }));
        } else if (code.includes('password')) {
          setErrorMsg(state => ({ ...state, password: code }));
        } else if (code.includes('user')) {
          setErrorMsg(state => ({ ...state, email: code }));
        } else {
          dispatch(pushMsg({ value: code, success: false }));
        }
      }
    } catch (err) {
      dispatch(pushMsg({ value: code, success: false }));
    }

  }

  const setInfo = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'email':
        setEmail(value);
        return
      case 'password':
        setPassword(value);
        return
    }
  }

  return (
    <BackgroundSet>
      <Card sx={{ pt: 3, pb: 6 }}>
        <InnerContainer>
          <Typography sx={{ fontSize: '24px', textAlign: 'center', p: 1 }} color={'#333333'}>
            Login
          </Typography>
          <TextField
            id="email"
            label="Account"
            type="email"
            sx={{ my: 1 }}
            fullWidth
            required
            error={errorMsg.email ? true : false}
            helperText={errorMsg.email}
            onChange={setInfo}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            sx={{ my: 1 }}
            fullWidth
            required
            error={errorMsg.password ? true : false}
            helperText={errorMsg.password}
            onChange={setInfo}
          />
          <Button onClick={loginApply} sx={{ backgroundColor: '#1976d2', my: 1 }} fullWidth variant="contained">Login</Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link sx={{ color: '#666666', fontSize: '13px', display: 'block' }} href="/forgot" underline="hover">
              {'Forgot Password?'}
            </Link>
            <Link sx={{ color: '#666666', fontSize: '13px', display: 'block' }} href="/signup" underline="hover">
              {'Sign Up'}
            </Link>
          </Box>
        </InnerContainer>
      </Card>
    </BackgroundSet>
  )
}
