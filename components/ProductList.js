import React from 'react'
import Grid from '@material-ui/core/Grid'
import Product from './Product'
import Typography from '@material-ui/core/Typography'

export default function ProductList({ products }) {
    return (
        <Grid
            container
            spacing={1}
            justifyContent='center'
        >
            {products.length === 0 ?
                <Typography variant="h6">
                    Không có sản phẩm
                </Typography>
                :
                products.map((product) => (
                    <Grid key={product._id} item xs={3}>
                        <Product product={product} />
                    </Grid>
                ))
            }
        </Grid>
    )
}
