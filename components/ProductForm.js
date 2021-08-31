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

const useStyles = makeStyles((theme) => ({
    grid: {
        padding: theme.spacing(3, 0, 3, 0),
    },
    textField: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
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
        <div>
            <Grid
                className={classes.grid}
                container
                direction="row"
            >
                <Grid item xs={5}
                    direction="column"
                    alignItems="center"
                    container
                    justifyContent="center" >
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
                                Chọn ảnh
                            </Button>
                        </label>
                    </div>
                </Grid>
                <Grid item xs={7} >
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        label="Tên sản phẩm"
                        placeholder="Nhập tên sản phẩm"
                        value={form.name}
                        name="name"
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        label="Giá sản phẩm"
                        placeholder="Nhập giá sản phẩm"
                        type="number"
                        value={form.price}
                        name="price"
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        label="Số lượng sản phẩm"
                        placeholder="Nhập số lượng"
                        type="number"
                        value={form.quantity}
                        name="quantity"
                        onChange={handleChange}
                    />
                    <FormControl variant="outlined" className={classes.textField}>
                        <InputLabel>Loại sản phẩm</InputLabel>
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
                label="Chi tiết sản phẩm"
                variant="outlined"
                placeholder="Nhập chi tiết sản phẩm"
                multiline
                rows={5}
                value={form.description}
                name="description"
                onChange={handleChange}
            />
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="flex-end"
                className={classes.grid}
            >
                <Button onClick={() => { router.push('/admin/products') }} variant="contained" color="secondary">
                    Hủy
                </Button>
                <Button onClick={() => { handleSubmit() }}
                    variant="contained" color="primary">
                    {isNew ? "Thêm mới" : "Thay đổi"}
                </Button>
            </Grid>
        </div>
    )
}
