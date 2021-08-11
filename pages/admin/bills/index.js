import Head from 'next/head'
import Bill from '../../../models/Bill'
import dbConnect from '../../../lib/dbConnect'
import BillTable from '../../../components/BillTable'
import { makeStyles } from '@material-ui/core/styles'
import AdToolBar from '../../../components/AdToolBar'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'

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

const Index = ({ bills }) => {
    const classes = useStyles();

    return (
        <div>
            <Head>
                <title>Bills Manager</title>
            </Head>
            <AdToolBar select="Quản lý hóa đơn" />
            <Container className={classes.root}>
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
                        />
                    </div>
                </Grid>
                <BillTable bills={bills} />
            </Container>
        </div>
    )
}

export async function getServerSideProps() {
    await dbConnect()

    const resultBill = await Bill.find({}).sort({ _id: -1 })
    const bills = resultBill.map((doc) => {
        const bill = doc.toObject()
        bill._id = bill._id.toString()
        bill.date = bill.date.toLocaleString()
        return bill
    })


    return { props: { bills: bills } }
}

export default Index