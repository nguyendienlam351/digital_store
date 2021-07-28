import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding:theme.spacing(0.5,0,0.5,0),
    },
    item: {
        margin: theme.spacing(1),
    },
    div: {
        backgroundColor: "#f0f0f0",
    },
}));

export default function TypeList({ types }) {
    const classes = useStyles();

    return (
        <div className={classes.div}>
            <Container maxWidth="lg">
                <Grid container className={classes.root} justifyContent="center">
                    {types.map((type) => (
                        <a key={type.id} href="https://youtube.com">
                        <Card  className={classes.item}>
                            <CardActions>
                                <Image src={'data:image/png;base64,'+type.image} width={20} height={20} />
                                <Typography variant="body1" component="p">
                                {type.name}
                                    </Typography> 
                            </CardActions>
                        </Card>
                        </a>
                    ))}
                </Grid>
            </Container>
        </div >
    );
}
