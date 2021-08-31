import React from 'react'
import Head from 'next/head'
import AdToolBar from '../../../components/AdToolBar'
import BillDetailTable from '../../../components/BillDetailTable'
import BillDetail from '../../../components/BillDetail'
import Layout from '../../../components/Layout'
import { getData } from '../../../lib/fetchData'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import RedeemIcon from '@material-ui/icons/Redeem'

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
                {bill == null ?
                    <Grid
                        container
                        justifyContent="center"
                        direction="row"
                    >
                        <RedeemIcon style={{ fontSize: 400 }} />
                    </Grid>
                    :
                    <>
                        <div className={classes.grid}>
                            <BillDetail bill={bill} />
                        </div>
                        <BillDetailTable product={bill.product} />
                    </>
                }
            </Layout>
        </div>
    )
}

export async function getServerSideProps({ params }) {
    const bill = await getData(`bills/${params.id}`)

    return { props: { bill: bill.data || null } }
}

