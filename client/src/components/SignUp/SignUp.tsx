import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { signUpMutation } from '../../model/Mutations';

import { useToken } from '../../auth/useToken';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenIconOutlined from '@mui/icons-material/LockOpenOutlined';
import LoginIconOutlined from '@mui/icons-material/LoginOutlined';
import { useIndicator } from '../../providers/IndicatorProvider';

const SignUp: React.FC = () => {
	const navigate = useNavigate();
	const [, setToken] = useToken();
	const indicator = useIndicator();
	const [signUp, { data: serverData, loading }] = useMutation(signUpMutation);

	const [showAlert, setShowAlert] = useState<boolean>(false);
	const [alertMessage, setAlertMessage] = useState<string>('');

	useEffect(() => {
		console.log('serverToken', serverData);
		if (serverData && serverData.users && serverData.users.signUp) {
			setToken(serverData.users.signUp.token);
			navigate('/');
		}
	}, [serverData]);

	interface IFieldValidation {
		error: boolean;
		message: string;
	}
	const defaultValidation: IFieldValidation = { error: false, message: '' };
	
	const [email, setEmail] = useState<string>('');
	const [emailValidation, setEmailValidation] = useState<IFieldValidation>(defaultValidation);

	const [userName, setUserName] = useState<string>('');
	const [userNameValidation, setUserNameValidation] = useState<IFieldValidation>(defaultValidation);

	const [password, setPassword] = useState<string>('');
	const [passwordValidation, setPasswordValidation] = useState<IFieldValidation>(defaultValidation);

	const [repeatPassword, setRepeatPassword] = useState<string>('');
	const [repeatPasswordValidation, setRepeatPasswordValidation] = useState<IFieldValidation>(defaultValidation);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		let isValidated = true;

		if (!email) {
			setEmailValidation({ error: true, message: 'E-Mail cannot be empty.' });
			isValidated = false;
		} else {
			setEmailValidation(defaultValidation);
		}

		if (!userName) {
			setUserNameValidation({ error: true, message: 'User Name cannot be empty.' });
			isValidated = false;
		} else {
			setUserNameValidation(defaultValidation);
		}

		if (!password) {
			setPasswordValidation({ error: true, message: 'Password cannot be empty.' });
			isValidated = false;
		} else if (password.length < 5) {
			setPasswordValidation({ error: true, message: 'Password cannot be shorter than 5 characters.' });
			isValidated = false;
		} else {
			setPasswordValidation(defaultValidation);
		}

		if (!repeatPassword) {
			setRepeatPasswordValidation({ error: true, message: 'Repeat Password cannot be empty.' });
			isValidated = false;
		} else if (password !== repeatPassword) {
			setRepeatPasswordValidation({ error: true, message: 'Passwords should match' });
			isValidated = false;
		} else {
			setRepeatPasswordValidation(defaultValidation);
		}

		if (!isValidated) return;

		indicator.setShowIndicator(true);

		signUp({ variables: { email, userName, password }}).catch((error) => {
			setAlertMessage(error.message);
			setShowAlert(true);
			indicator.setShowIndicator(false);
		});
	}

	const onLoginButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		navigate('/login');
	}

	return (
		<Container component="main" maxWidth="xs">
			<Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				{showAlert ? <Alert sx={{ marginBottom: 1, marginTop: 2 }} severity="error">{alertMessage}</Alert> : ''}
			</Box>
			<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							value={email}
							onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => { setEmail((prevEmail: string) => event.target.value); }}
							autoComplete="email"
							name="email"
							required
							fullWidth
							id="email"
							label="E-Mail"
							autoFocus
							error={emailValidation.error}
							helperText={emailValidation.message}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							value={userName}
							onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => { setUserName((prevUserName: string) => event.target.value); }}
							autoComplete="user-name"
							name="userName"
							required
							fullWidth
							id="userName"
							label="User Name"
							error={userNameValidation.error}
							helperText={userNameValidation.message}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							value={password}
							onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => { setPassword((prevPassword: string) => event.target.value); }}
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="new-password"
							error={passwordValidation.error}
							helperText={passwordValidation.message}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							value={repeatPassword}
							onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => { setRepeatPassword((prevRepeatPassword: string) => event.target.value); }}
							required
							fullWidth
							name="repeatPassword"
							label="Repeat Password"
							type="password"
							id="repeatPassword"
							autoComplete="repeat-password"
							error={repeatPasswordValidation.error}
							helperText={repeatPasswordValidation.message}
						/>
					</Grid>
				</Grid>
				<Button type="submit" fullWidth size="large" variant="contained" sx={{ mt: 3, mb: 2 }} endIcon={<LockOpenIconOutlined />}>
					Sign Up
				</Button>
				<Button onClick={onLoginButtonClick} fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }} endIcon={<LoginIconOutlined />}>
					Already have an account? Login here!
				</Button>
			</Box>
		</Container>
	)
}

export default SignUp;