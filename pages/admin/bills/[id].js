import React from 'react'
import Head from 'next/head'
import AdToolBar from '../../../components/AdToolBar'
import BillDetailTable from '../../../components/BillDetailTable'
import BillDetail from '../../../components/BillDetail'
import Layout from '../../../components/Layout'
import Bill from '../../../models/Bill'
import dbConnect from '../../../lib/dbConnect'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
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
            <Layout>
                <div className={classes.grid}>
                    <BillDetail bill={bill} />
                </div>
                <BillDetailTable product={bill.product} />
            </Layout>
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

