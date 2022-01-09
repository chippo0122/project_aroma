import { useState } from 'react'
import { useRouter } from "next/router"
import axios from 'axios'

import { Card, Typography, TextField, Button, Container, styled } from "@mui/material"
import BackgroundSet from "../components/BackgroundSet"
import RouteController from "../components/RouteController"

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

export default function Forgot() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [errCheck, setErrCheck] = useState(false);

  const editEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  }

  const sendResetMail = async () => {
    //reset error message
    setErrCheck(false);
    const rule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    //email validate
    if(email.search(rule) === -1) {
      setErrCheck(true);
      return
    }

    try {
      await axios.post('/api/passwordreset', {email});
      router.push('/');
    } catch (error) {
      alert(error)
    }
  }

  return (
    <BackgroundSet>
      <RouteController />
      <Card sx={{ pt: 3, pb: 6 }}>
        <InnerContainer>
          <Typography sx={{ fontSize: '24px', textAlign: 'center', p: 1 }} color={'#333333'}>
            Forgot Password
          </Typography>
          <TextField
            id="email"
            label="Email"
            type="email"
            sx={{ my: 1 }}
            fullWidth
            onChange={editEmail}
            error={errCheck}
            helperText={errCheck ? 'Email format is incorrect' : ''}
            required
          />
          <Button onClick={sendResetMail} sx={{ backgroundColor: '#1976d2', my: 1 }} fullWidth variant="contained">SEND</Button>
        </InnerContainer>
      </Card>
    </BackgroundSet>
  )
}
