import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { DataContext } from '../store/GlobalState'
import { mutate } from 'swr'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
    grid: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        margin: theme.spacing(3,0),
    },
    textField: {
        margin: theme.spacing(1,0),
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
    },
    div: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));


export default function ProductForm({ types, product, isNew }) {
    const router = useRouter()
    const { dispatch } = useContext(DataContext)
    const contentType = 'application/json'
    const classes = useStyles();
    const [form, setForm] = useState({
        name: product.name,
        image: product.image,
        quantity: product.quantity,
        type: product.type,
        description: product.description,
        price: product.price,
    })

    const formValidate = () => {
        let err = ""
        if (!(form.name.trim())) err = 'Name is required'
        if (!form.image) err = 'Image is required'
        if (!form.price) err = 'Price is required'
        if (parseInt(form.price) < 1) err = 'Price must be greater than 0'
        if (!form.quantity) err = 'Quantity is required'
        if (parseInt(form.quantity) < 1) err = 'Quantity must be greater than 0'
        if (!form.type) err = 'Type is required'
        if (!(form.description.trim())) err = 'Description is required'
        return err
    }

    const putData = async () => {
        const { id } = router.query

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(form),
            })

            if (!res.ok) {
                throw new Error(res.status)
            }

            const { data } = await res.json()

            mutate(`/api/products/${id}`, data, false)

            router.push('/admin/products')
        } catch (error) {
            dispatch({ type: 'NOTIFY', payload: { type: "error", message: 'Failed to update product' } })
        }
    }

    const postData = async () => {
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(form),
            })

            if (!res.ok) {
                throw new Error(res.status)
            }

            router.push('/admin/products')
        } catch (error) {
            dispatch({ type: 'NOTIFY', payload: { type: "error", message: 'Failed to add product' } })
        }
    }

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setForm({
                    ...form,
                    image: reader.result,
                })
            }
        }
        reader.readAsDataURL(e.target.files[0])
    };

    const handleChange = (e) => {
        const target = e.target
        const value = target.value
        const name = target.name

        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleSubmit = () => {
        const errs = formValidate()
        if (Object.keys(errs).length === 0) {
            isNew ? postData() : putData()
        } else {
            dispatch({ type: 'NOTIFY', payload: { type: "error", message: errs } })
        }
    };

    return (
        <Container>
            <Grid
                className={classes.grid}
                container
                direction="row"
            >
                <Grid
                    item xs={12} md={5}
                    container
                    direction="column"
                    alignItems="center" >
                    <Image alt="product image" src={form.image == '' ? "/image.png" : form.image} width={300} height={300} />
                    <div className={classes.div}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={imageHandler}
                        />
                        <label htmlFor="contained-button-file" >
                            <Button className={classes.button} variant="contained" color="primary" component="span">
                                Ch???n ???nh
                            </Button>
                        </label>
                    </div>
                </Grid>
                <Grid item xs={12} md={7} >
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        label="T??n s???n ph???m"
                        placeholder="Nh???p t??n s???n ph???m"
                        value={form.name}
                        name="name"
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        label="Gi?? s???n ph???m"
                        placeholder="Nh???p gi?? s???n ph???m"
                        type="number"
                        value={form.price}
                        name="price"
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        label="S??? l?????ng s???n ph???m"
                        placeholder="Nh???p s??? l?????ng"
                        type="number"
                        value={form.quantity}
                        name="quantity"
                        onChange={handleChange}
                    />
                    <FormControl variant="outlined" className={classes.textField}>
                        <InputLabel>Lo???i s???n ph???m</InputLabel>
                        <Select
                            value={form.type}
                            name="type"
                            onChange={handleChange}
                            labelWidth={110}
                        >
                            {types.map((type) => (
                                <MenuItem key={type._id} value={type._id}>
                                    {type.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <TextField
                className={classes.textField}
                label="Chi ti???t s???n ph???m"
                variant="outlined"
                placeholder="Nh???p chi ti???t s???n ph???m"
                multiline
                rows={5}
                value={form.description}
                name="description"
                onChange={handleChange}
            />
            <div className={classes.grid}>
                <Link component="a" color="inherit" href="/admin/products">
                    <Button variant="contained" style={{ backgroundColor: "#dc004e", color: '#ffffff' }}>
                        H???y
                    </Button>
                </Link>
                <Button onClick={() => { handleSubmit() }}
                    variant="contained" color="primary">
                    {isNew ? "Th??m m???i" : "Thay ?????i"}
                </Button>
            </div>
        </Container>
    )
}
