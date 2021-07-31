import React from 'react'
import Grid from '@material-ui/core/Grid'
import Product from './Product'

export default function ProductList({ products }) {
    return (
        <Grid
            container
            spacing={1}
        >
            {
                products.map((product) => (
                    <Grid key={product._id} item xs={3}>
                        <Product product={product} />
                    </Grid>
                ))}
        </Grid>
    )
}
