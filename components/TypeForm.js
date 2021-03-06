import React, { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import { mutate } from 'swr'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    item: {
        marginBottom: theme.spacing(2),
    },
    div: {
        paddingTop: theme.spacing(2),
    },
    input: {
        display: 'none',
    },
    grid: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
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
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className={classes.root}
        >
            <TextField
                className={classes.item}
                fullWidth
                variant="outlined"
                label="T??n lo???i s???n ph???m"
                placeholder="Nh???p t??n lo???i s???n ph???m"
                name="name"
                value={form.name}
                onChange={handleChange}
            />
            <Image
                className={classes.item}
                alt="type image"
                src={form.image == '' ? "/image.png" : form.image}
                width={300}
                height={300} />
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
                    <Button
                        className={classes.item}
                        variant="contained"
                        color="primary"
                        component="span"
                    >
                        Ch???n ???nh
                    </Button>
                </label>
            </div>
            <div className={classes.grid}>
                <Button
                    onClick={() => { handleClear() }}
                    variant="contained"
                    style={{ backgroundColor: "#dc004e", color: '#ffffff' }}>
                    H???y
                </Button>
                <Button onClick={() => { handleSubmit() }}
                    variant="contained" color="primary">
                    {!id ? "Th??m m???i" : "Thay ?????i"}
                </Button>
            </div>
        </Grid>
    )
}
