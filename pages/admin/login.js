import Head from 'next/head'
import { useState, useContext } from 'react'
import Image from 'next/image'
import { DataContext } from '../../store/GlobalState'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import fetchJson from '../../lib/fetchJson'
import useUser from '../../lib/useUser'
import withSession from '../../lib/session'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
        alignItems: 'center',
    },
    item: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}));

const Login = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false)
    const initialState = { user_name: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { user_name, password } = userData
    const { state, dispatch } = useContext(DataContext)

    const { mutateUser } = useUser({
        redirectTo: '/admin/products',
        redirectIfFound: true,
    })

    const handleChange = (e) => {
        const target = e.target
        const value = target.value
        const name = target.name

        setUserData({ ...userData, [name]: value })
    }

    const handleLogin = async () => {

        try {
            mutateUser(
                await fetchJson('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify(userData),
                })
            )
        } catch (error) {
            dispatch({ type: 'NOTIFY', payload: { type: "error", message: "Đăng nhập không thành công" } })
        }
    }

    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <Container maxWidth='sm' className={classes.root}>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <Typography align='center' variant="h2">Digital Store</Typography>
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
                        fullWidth
                        label="Tài khoản"
                        variant="outlined"
                        placeholder="Nhập tài khoản..."
                        name="user_name"
                        value={user_name}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.item}
                        fullWidth
                        label="Mật khẩu"
                        variant="outlined"
                        placeholder="Nhập mật khẩu..."
                        name="password"
                        value={password}
                        onChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    onClick={() => { setShowPassword(!showPassword) }}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>,
                        }}
                    />
                    <Button
                        className={classes.item}
                        fullWidth
                        onClick={() => { handleLogin() }}
                        variant="contained"
                        color="primary">
                        Đăng nhập
                    </Button>
                </Grid>
            </Container>
        </div>
    )
}

export const getServerSideProps = withSession(async (context) => {
    const user = context.req.session.get('user')

    if (user) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            },
        }
    }
    return { props: {} }
})

export default Login