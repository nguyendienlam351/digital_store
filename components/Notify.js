import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import { makeStyles } from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Notify = () => {
    const classes = useStyles()
    const { state, dispatch } = useContext(DataContext)
    const { notify } = state


    const handleClose = () => {
        dispatch({ type: 'NOTIFY', payload: {} })
    }

    return (
        <div>
            <Backdrop className={classes.backdrop} open={notify.loading ? true : false}>
                <CircularProgress />
            </Backdrop>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                open={notify.message ? true : false}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert style={{ whiteSpace: "pre-line" }} severity={notify.type}>
                    {notify.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Notify
