import React, { useState } from 'react';
import { requestFetch } from '../utils/ApiFetch';
import { URL } from '../utils/Config';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Snackbar
} from '@mui/material';

const LoginPage = () => {
  const [tab, setTab] = useState(0); // 0: 학생, 1: 선생님
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleTabChange = (_: any, newValue: React.SetStateAction<number>) => {
    setTab(newValue);
    setId('');
    setName('');
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (id.trim() === '' || name.trim() === '') {
      setSnackbarMsg('ID와 이름을 모두 입력해주세요.')
      setOpen(true)
      return;
    }

    const role = tab === 0 ? 'user' : 'admin'
    const requestBody = {
      id: id,
      name: name, // name도 email과 동일하게 보냄
      role: role
    };

    try {
        requestFetch(URL.LOGIN, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }, (resp) => {
          if (resp == false) {
            setSnackbarMsg("로그인 실패!")
            setOpen(true)
          } else {
            login({
              id: id,
              role: role
            });
            navigate('/main');
          }
        }, (err) => {
            console.log(err);
        });
    } catch (err) {
        console.log(err);
    }
  };

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          로그인
        </Typography>

        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="user" />
          <Tab label="admin" />
        </Tabs>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            label="아이디"
            type="id"
            fullWidth
            required
            margin="normal"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <TextField
            label="이름"
            type="name"
            fullWidth
            required
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            {tab === 0 ? '학생 로그인' : '선생님 로그인'}
          </Button>
        </Box>
      </Paper>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={snackbarMsg}
      />
    </Container>
  );
};

export default LoginPage;
