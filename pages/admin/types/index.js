import Head from 'next/head'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Type from '../../../models/Type'
import dbConnect from '../../../lib/dbConnect'
import TypeTable from '../../../components/TypeTable'
import TypeForm from '../../../components/TypeForm'
import { makeStyles } from '@material-ui/core/styles'
import AdToolBar from '../../../components/AdToolBar'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    grid: {
        marginBottom: theme.spacing(3),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#ffffff',
        border: "1px solid #3f51b5",
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '60ch',
        },
    },
}));

const Index = ({ types }) => {
    const router = useRouter()
    const classes = useStyles();
    const [errors, setErrors] = useState('')
    const [id, setId] = useState('')
    const [form, setForm] = useState({
        name: '',
        image: ''
    })

    const handleSelect = (type) => {
        setId(type._id)
        setForm({
            name: type.name,
            image: type.image
        })
    }

    const handleClear = () => {
        setId('')
        setForm({
            name: '',
            image: ''
        })
    }

    const handleClose = () => {
        setErrors('')
    };

    return (
        <div>
            <Head>
                <title>Type Manager</title>
            </Head>
            <AdToolBar select="Quản lý loại sản phẩm" />
            <Container className={classes.root}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-end"
                    className={classes.grid}
                >
                    <Typography variant="h6">
                        Quản lý sản phẩm:
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </Grid>
                <Grid
                    className={classes.grid}
                    container
                    direction="row"
                >
                    <Grid item xs={7}>
                        <TypeTable
                            types={types}
                            handleSelect={handleSelect}
                            setErrors={setErrors} />
                    </Grid>
                    <Grid item xs={5}>
                        <TypeForm
                            id={id}
                            form={form}
                            setForm={setForm}
                            handleClear={handleClear}
                            setErrors={setErrors} />
                    </Grid>
                </Grid>
            </Container>

            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center', }} open={errors} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="error">
                    {errors}
                </Alert>
            </Snackbar>
        </div>
    )
}

export async function getServerSideProps() {
    await dbConnect()

    /* find all the data in our database */
    const resultType = await Type.find({}).sort({ _id: -1 })
    const types = resultType.map((doc) => {
        const type = doc.toObject()
        type._id = type._id.toString()
        return type
    })

    return { props: { types: types } }
}

export default Index