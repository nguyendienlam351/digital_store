import React from 'react'
import Grid from '@material-ui/core/Grid'
import Product from './Product'
import Typography from '@material-ui/core/Typography'

export default function ProductList({ products }) {
    return (
        <Grid
            container
            spacing={2}
        >
            {products.length === 0 ?
                <Typography variant="h6">
                    Không có sản phẩm
                </Typography>
                :
                products.map((product) => (
                    <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))
            }
        </Grid>
    )
}
