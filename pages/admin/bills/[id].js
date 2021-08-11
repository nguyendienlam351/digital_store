import React from 'react'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import AdToolBar from '../../../components/AdToolBar'
import BillDetailTable from '../../../components/BillDetailTable'
import BillDetail from '../../../components/BillDetail'
import Bill from '../../../models/Bill'
import dbConnect from '../../../lib/dbConnect'
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    grid: {
        marginBottom: theme.spacing(3),
    },
}));

export default function BillDetails({ bill }) {
    const classes = useStyles();

    return (
        <div>
            <Head>
                <title>Bill Details</title>
            </Head>
            <AdToolBar select="Quản lý đơn hàng" />
            <Container className={classes.root}>
                <div className={classes.grid}>
                <BillDetail bill={bill} />
                </div>
                <BillDetailTable product={bill.product} />
            </Container>
        </div>
    )
}

export async function getServerSideProps({ params }) {
    await dbConnect()

    const bill = await Bill.findById(params.id).lean()
    bill._id = bill._id.toString()
    bill.date = bill.date.toLocaleString()

    return { props: { bill: bill } }
}

