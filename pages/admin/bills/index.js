import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getData } from '../../../lib/fetchData'
import filterSearch from '../../../lib/filterSearch'
import BillTable from '../../../components/BillTable'
import AdToolBar from '../../../components/AdToolBar'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'
import withSession from '../../../lib/session'

const useStyles = makeStyles((theme) => ({
    grid: {
        margin: theme.spacing(3,0),
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
    const [bills, setBills] = useState(props.bills)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    useEffect(() => {
        setBills(props.bills)

        if (Object.keys(router.query).length === 0) setPage(1)

    }, [router.query, props.bills])

    useEffect(() => {
        filterSearch({ router, search: search ? search.toLowerCase() : 'all' })
    }, [search])

    const handleLoadmore = () => {
        setPage(page + 1)
        filterSearch({ router, page: page + 1 })
    }

    return (
        <div>
            <Head>
                <title>Bills Manager</title>
            </Head>
            <AdToolBar select="Quản lý hóa đơn" />
            <Container>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-end"
                    className={classes.grid}
                >
                    <Typography variant="h6">
                        Quản lý hóa đơn:
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
                <BillTable
                    bills={bills}
                    handleLoadmore={handleLoadmore}
                    page={page}
                    length={props.length} />
            </Container>
        </div>
    )
}

export const getServerSideProps = withSession(async (context) => {
    const user = context.req.session.get('user')

    if (!user) {
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false,
            },
        }
    }

    const query = context.query || {}

    const page = query.page || 1
    const search = query.search || 'all'

    const resultBill = await getData(
        `bills?limit=${page * 8}&name=${search}`
    )

    return {
        props: {
            bills: resultBill.bills,
            length: resultBill.length,
        }
    }
})

export default Index