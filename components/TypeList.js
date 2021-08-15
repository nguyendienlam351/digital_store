import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography'
import Image from 'next/image'
import filterSearch from '../lib/filterSearch'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(0.5, 0, 0.5, 0),
    },
    item: {
        margin: theme.spacing(1),
    },
    div: {
        backgroundColor: "#f0f0f0",
    },
}));

export default function TypeList({ types, isAll }) {
    const classes = useStyles();
    const router = useRouter()

    const handleType = (id) => {
        router.pathname = 'products/'
        filterSearch({ router, type: id })
    }

    return (
        <div className={classes.div}>
            <Container maxWidth="md">
                <Grid xs={12} container className={classes.root} justifyContent="center" item>
                    {!isAll ? null :
                        <Card className={classes.item} key={'all'} >
                            <CardActionArea onClick={() => handleType('all')}>
                                <CardActions>
                                    <Typography variant="body1" component="p">
                                        Tất cả sản phẩm
                                    </Typography>
                                </CardActions>
                            </CardActionArea>
                        </Card>
                    }
                    {types.map((type) => (
                        <Card className={classes.item} key={type._id} >
                            <CardActionArea onClick={() => handleType(type._id)}>
                                <CardActions>
                                    <Image alt="Picture of the tpye" src={type.image} width={20} height={20} />
                                    <Typography variant="body1" component="p">
                                        {type.name}
                                    </Typography>
                                </CardActions>
                            </CardActionArea>
                        </Card>
                    ))}
                </Grid>
            </Container>
        </div >
    );
}
