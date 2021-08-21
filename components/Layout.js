import React, { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    },
}));

const Layout = ({ children }) => {
    const classes = useStyles();
    const { state, dispatch } = useContext(DataContext)
    const { auth } = state

    return (
        <Container className={classes.root}>
            {Object.keys(auth).length == 0 ?
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-end"
                >
                    <Typography variant="h4">
                        Hãy đăng nhập
                    </Typography>
                </Grid>
                :
                children
            }
        </Container>
    )
}

export default Layout
