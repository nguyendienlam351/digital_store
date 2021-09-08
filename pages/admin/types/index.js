import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getData } from '../../../lib/fetchData'
import filterSearch from '../../../lib/filterSearch'
import TypeTable from '../../../components/TypeTable'
import TypeForm from '../../../components/TypeForm'
import AdToolBar from '../../../components/AdToolBar'
import Layout from '../../../components/Layout'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
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

const Index = (props) => {
    const router = useRouter()
    const classes = useStyles();
    const [types, setTypes] = useState(props.types)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [id, setId] = useState('')
    const [form, setForm] = useState({
        name: '',
        image: ''
    })

    useEffect(() => {
        setTypes(props.types)

        if (Object.keys(router.query).length === 0) setPage(1)

    }, [router.query, props.types])

    useEffect(() => {
        filterSearch({ router, search: search ? search.toLowerCase() : 'all' })
    }, [search])

    const handleLoadmore = () => {
        setPage(page + 1)
        filterSearch({ router, page: page + 1 })
    }

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

    return (
        <div>
            <Head>
                <title>Type Manager</title>
            </Head>
            <AdToolBar select="Quản lý loại sản phẩm" />
            <Layout>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-end"
                    className={classes.grid}
                >
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6">
                            Quản lý loại sản phẩm:
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
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
                                value={search.toLowerCase()}
                                onChange={e => setSearch(e.target.value)}
                                endAdornment={
                                    !search ? null :
                                        <InputAdornment position="end">
                                            <IconButton
                                                className={classes.menuButton}
                                                edge="end"
                                                onClick={() => setSearch('')}
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        </InputAdornment>
                                }
                            />
                        </div>
                    </Grid>
                </Grid>
                <Grid
                    className={classes.grid}
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Grid item xs={12} md={7}>
                        <TypeTable
                            types={types}
                            handleSelect={handleSelect}
                            handleLoadmore={handleLoadmore}
                            page={page}
                            length={props.length} />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <TypeForm 
                            id={id}
                            form={form}
                            setForm={setForm}
                            handleClear={handleClear} />
                    </Grid>
                </Grid>
            </Layout>
        </div>
    )
}

export async function getServerSideProps({ query }) {
    const page = query.page || 1
    const search = query.search || 'all'

    const resultType = await getData(
        `types?limit=${page * 8}&name=${search}`
    )

    return {
        props: {
            types: resultType.types,
            length: resultType.length,
        }
    }
}

export default Index