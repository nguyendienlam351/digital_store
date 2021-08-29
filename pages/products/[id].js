import React from 'react'
import Head from 'next/head'
import ToolBar from '../../components/ToolBar'
import DetailProduct from '../../components/DetailProduct'
import { getData } from '../../lib/fetchData'
import Grid from '@material-ui/core/Grid'
import RedeemIcon from '@material-ui/icons/Redeem'

export default function Detail_Product({ product }) {

    return (
        <div>
            <Head>
                <title>Detail Product</title>
            </Head>
            <ToolBar />
            {product == null ?
                <Grid
                    container
                    justifyContent="center"
                    direction="row"
                >
                    <RedeemIcon style={{ fontSize: 400 }} />
                </Grid>
                :
                <DetailProduct product={product} />
            }
        </div>
    )
}

export async function getServerSideProps({ params }) {
    const product = await getData(`products/${params.id}`)
    if (product.data) {
        const type = await getData(`types/${product.data.type}`)
        product.data.type = type.data || product.data.type
    }

    return { props: { product: product.data || null } }
}