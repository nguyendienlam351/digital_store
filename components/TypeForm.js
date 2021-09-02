import React, { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import { mutate } from 'swr'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    grid: {
        padding: theme.spacing(3, 0, 3, 0),
    },
    textField: {
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


export default function TypeForm({ id, form, setForm, handleClear }) {
    const router = useRouter()
    const { dispatch } = useContext(DataContext)
    const contentType = 'application/json'
    const classes = useStyles();

    const formValidate = () => {
        let err = ""
        if (!(form.name.trim())) err = 'Name is required'
        if (!form.image) err = 'Image is required'
        return err
    }

    const putData = async () => {
        try {
            const res = await fetch(`/api/types/${id}`, {
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
            handleClear()
            router.push('/admin/types')
        } catch (error) {
            dispatch({ type: 'NOTIFY', payload: { type: "error", message: 'Failed to update type' } })
        }
    }

    const postData = async () => {
        try {
            const res = await fetch('/api/types', {
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
            handleClear()
            router.push('/admin/types')
        } catch (error) {
            dispatch({ type: 'NOTIFY', payload: { type: "error", message: 'Failed to add type' } })
        }
    }

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
            !id ? postData() : putData()
        } else {
            dispatch({ type: 'NOTIFY', payload: { type: "error", message: errs } })
        }
    };

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


    return (
        <Container maxWidth="md" className={classes.root} >
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center">
                <TextField
                    className={classes.textField}
                    variant="outlined"
                    label="Tên loại sản phảm"
                    placeholder="Nhập tên loại sản phẩm"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
                <Image alt="type image" src={form.image == '' ? "/image.png" : form.image} width={300} height={300} />
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
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-end"
                    className={classes.grid}
                >
                    <Button
                        onClick={() => { handleClear() }}
                        variant="contained"
                        style={{ backgroundColor: "#dc004e", color: '#ffffff' }}>
                        Hủy
                    </Button>
                    <Button onClick={() => { handleSubmit() }}
                        variant="contained" color="primary">
                        {!id ? "Thêm mới" : "Thay đổi"}
                    </Button>
                </Grid>
            </Grid>
        </Container >
    )
}
