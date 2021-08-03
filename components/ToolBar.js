import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { alpha, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import Container from '@material-ui/core/Container'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Image from 'next/image'
import AppBar from '@material-ui/core/AppBar'
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    margin: theme.spacing(0,1,0,1),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: { 
      width: '60ch',
      '&:focus': {
        width: '65ch',
      },
    },
  },
}));

export default function ToolBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static"> 
      <Container maxWidth="lg">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
          >
          <Link component="a" href="/" color="inherit" >
            <Image alt="logo" src="/favicon.ico" width={20} height={20} />
          </Link>
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
          <Link component="a" href="/" color="inherit" >
            Digital Store
            </Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <IconButton
            className={classes.menuButton}
            color="inherit"
          >
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>  
        </Container>
      </AppBar>
    </div>
  );
}
