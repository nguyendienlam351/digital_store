/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Image from 'next/image'; 

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(1, 0, 1, 0),
    },
    item: {
        margin: theme.spacing(1),
    },
    div: {
        backgroundColor: "#f0f0f0",
    },
    media: {
        height: 20,
        width: 20,
    }
}));

export default function TypeList() {
    const classes = useStyles();

    return (
        <div className={classes.div}>
            <Container maxWidth="lg">
                <Grid container className={classes.root} justifyContent="space-evenly" spacing={2}>
                    {[0, 1, 2, 3, 4].map((value) => (
                        <Card key={value} href="youtube.com" className={classes.item}>
                            <CardActionArea>
                            <Image src="/phone.png" width={30} height={30} />
                                <CardContent>
                                    Loại sản phẩm {value}
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}
