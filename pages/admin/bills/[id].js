import React from 'react'
import Head from 'next/head'
import AdToolBar from '../../../components/AdToolBar'
import BillDetailTable from '../../../components/BillDetailTable'
import BillDetail from '../../../components/BillDetail'
import Container from '@material-ui/core/Container'
import { getData } from '../../../lib/fetchData'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import RedeemIcon from '@material-ui/icons/Redeem'
import withSession from '../../../lib/session'

const useStyles = makeStyles((theme) => ({
    grid: {
        margin: theme.spacing(3,0),
    },
}));

export default function BillDetails({ bill }) {
    const classes = useStyles()

    return (
        <div>
            <Head>
                <title>Bill Details</title>
            </Head>
            <AdToolBar select="Quản lý đơn hàng" />
            <Container>
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

    const { id } = context.params
    const bill = await getData(`bills/${id}`)

    return { props: { bill: bill.data || null } }
})

