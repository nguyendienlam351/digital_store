import Head from 'next/head'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Image from 'next/image'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
    },
    item: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: "40%"
    }
}));

const Login = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <Container className={classes.root}>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <Typography variant="h2">Digital Store</Typography>
                    <Image src="/favicon.ico"
                        alt="logo"
                        width={150}
                        height={150} />
                </Grid>
                <Grid
                    className={classes.root}
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center">
                    <TextField
                        className={classes.item}
                        label="Tài khoản"
                        variant="outlined"
                        placeholder="Nhập tài khoản..."
                    />
                    <FormControl className={classes.item} variant="outlined">
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment posiFtion="end">
                                    <IconButton
                                    onClick={()=>{setShowPassword(!showPassword)}}
                                        aria-label="toggle password visibility"
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                    <Button onClick={() => { }} variant="contained" color="primary">
                        Đăng nhập
                    </Button>
                </Grid>
            </Container>
        </div>
    )
}

export default Login