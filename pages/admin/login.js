import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Cookie from 'js-cookie'
import { DataContext } from '../../store/GlobalState'
import { postData } from '../../lib/fetchData'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

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
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const initialState = { user_name: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { user_name, password } = userData
    const { state, dispatch } = useContext(DataContext)
    const { auth } = state

    useEffect(() => {
        if (Object.keys(auth).length !== 0) router.push("/admin/products")
    }, [auth, router])

    const handleChange = (e) => {
        const target = e.target
        const value = target.value
        const name = target.name

        setUserData({ ...userData, [name]: value })
    }

    const handleLogin = async () => {
        dispatch({type: 'NOTIFY', payload:{loading:true}})
        const res = await postData('auth/login', userData)

        if (res.err) return dispatch({type: 'NOTIFY', payload: {type: "error",message: "Đăng nhập không thành công"}})

        dispatch({
            type: 'AUTH', payload: {
                token: res.access_token,
                user: res.user
            }
        })

        Cookie.set('refreshtoken', res.refresh_token, {
            path: '/',
            expires: 7
        })

        localStorage.setItem('firstLogin', true)
        
        dispatch({type: 'NOTIFY', payload:{message: "Đăng nhập thành công"}})
    }

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
                        name="user_name"
                        value={user_name}
                        onChange={handleChange}
                    />
                    <FormControl className={classes.item} variant="outlined">
                        <InputLabel>Mật khẩu</InputLabel>
                        <OutlinedInput
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment posiFtion="end">
                                    <IconButton
                                        onClick={() => { setShowPassword(!showPassword) }}
                                        aria-label="toggle password visibility"
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <Button className={classes.item} onClick={() => { handleLogin() }} variant="contained" color="primary">
                        Đăng nhập
                    </Button>
                </Grid>
            </Container>
        </div>
    )
}

export default Login