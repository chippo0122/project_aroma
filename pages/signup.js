import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Typography, TextField, Container, Button, styled } from "@mui/material"
import MuiLink from '@mui/material/Link'
import BackgroundSet from "../components/BackgroundSet"
import RouteController from "../components/RouteController"
import { useRouter } from 'next/router'
import { setUser } from '../redux/currentUserSlice'
import axios from 'axios';

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

export default function signup() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [hasSign, setSign] = useState(false);
  const [inputStorage, setStorage] = useState({ email: '', password: '', username: '', check: '' });
  const [errorMsg, setErrorMsg] = useState({ email: '', password: '', username: '', check: '' });
  const uid = useSelector(state => state.currentUser.uid);

  const setInfo = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'email':
        setStorage(state => ({ ...state, email: value }));
        return
      case 'username':
        setStorage(state => ({ ...state, username: value }));
        return
      case 'password':
        setStorage(state => ({ ...state, password: value }));
        return
      case 'check':
        setStorage(state => ({ ...state, check: value }));
        return
    }
  }

  const signup = async () => {
    setErrorMsg({ email: '', password: '', username: '', check: '' });
    //reset msg
    const rule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    const { email, password, username, check } = inputStorage;
    //every input supossed to be inserted
    if (!(email && username && password && check)) {
      const msg = {
        email: email ? '' : 'Account should not be empty',
        username: username ? '' : 'Name should not be empty',
        password: password ? '' : 'Password should not be empty',
        check: check ? '' : 'Comfirm your password again'
      }

      setErrorMsg(msg);
      return
    }
    //email format incorrect
    if (email.search(rule) === -1) {
      setErrorMsg(state => ({ ...state, email: 'Email format is incorrect' }));
      return
    }
    //password and check password doesn't match
    if (password !== check) {
      const str = 'Please CHECK your password again';
      setErrorMsg(state => ({ ...state, password: str, check: str }))
      return
    }

    const data = { email, password, username };

    try {
      const result = await axios.post('/api/sign', data);
      const res = await result.data;

      if (res.uid) {
        //if res has a user info, then keep going
        const { uid, displayName, email } = res;
        const token = res.stsTokenManager.accessToken;

        localStorage.setItem('userToken', JSON.stringify({ value: token }));
        localStorage.setItem('currentUser', JSON.stringify({ uid, displayName, email }));

        await dispatch(setUser({ uid, displayName, email }));
        setSign(true);

      } else {
        //if error occur, show the error message
        const { code } = res;
        if (code.includes('email')) {
          setErrorMsg(state => ({ ...state, email: code }));
        } else if (code.includes('password')) {
          setErrorMsg(state => ({ ...state, password: code }));
        } else {
          alert(code);
        }
      }
    } catch (err) {
      alert(err);
    }
  }

  const loginDirect = () => {
    router.push(`/user/${uid}`)
  }

  return (
    <BackgroundSet>
      <RouteController />
      <Card sx={{ pt: 3, pb: 6 }}>
        <InnerContainer>
          <Typography sx={{ fontSize: '24px', textAlign: 'center', p: 1 }} color={'#333333'}>
            Signup
          </Typography>
          {
            !hasSign ? (
              <>
                <TextField
                  id="email"
                  label="E-mail"
                  type="email"
                  sx={{ my: 1 }}
                  fullWidth
                  required
                  error={errorMsg.email ? true : false}
                  helperText={errorMsg.email}
                  onChange={setInfo}
                />
                <TextField
                  id="username"
                  label="User name"
                  type="text"
                  sx={{ my: 1 }}
                  fullWidth
                  required
                  error={errorMsg.username ? true : false}
                  helperText={errorMsg.username}
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
                <TextField
                  id="check"
                  label="Password again"
                  type="password"
                  sx={{ my: 1 }}
                  fullWidth
                  required
                  error={errorMsg.check ? true : false}
                  helperText={errorMsg.check}
                  onChange={setInfo}
                />
                <Button onClick={signup} sx={{ backgroundColor: '#1976d2', my: 1 }} fullWidth variant="contained">SIGNUP</Button>
              </>
            ) :
              (
                <>
                  <Typography sx={{ textAlign: 'center', pt: 3 }}>
                    Send confirm to your E-mail aleardy or
                  </Typography>
                  <MuiLink onClick={loginDirect} sx={{ display: 'block', textAlign: 'center', cursor: 'pointer' }}>
                    skip
                  </MuiLink>
                </>
              )
          }
        </InnerContainer>
      </Card>
    </BackgroundSet>
  )
}
