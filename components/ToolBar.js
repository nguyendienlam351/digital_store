import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import filterSearch from '../lib/filterSearch'
import { DataContext } from '../store/GlobalState'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { alpha, makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import InputAdornment from '@material-ui/core/InputAdornment'
import Badge from '@material-ui/core/Badge'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    margin: theme.spacing(0, 1),
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
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  icon: {
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
    [theme.breakpoints.up('md')]: {
      width: '60ch',
      '&:focus': {
        width: '65ch',
      },
    },
  },
}));

export default function ToolBar({ isAll, srch }) {
  const classes = useStyles()
  const router = useRouter()
  const { state, dispatch } = useContext(DataContext)
  const { cart } = state
  const [search, setSearch] = useState(srch == null || srch == 'all' ? '' : srch)

  useEffect(() => {
    if (search !== '' || isAll) {
      router.pathname = 'products/'
      filterSearch({ router, search: search ? search : 'all' })
    }
  }, [search])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit">
              <Link component="a" color="inherit" href="/">
                <Image alt="logo" src="/favicon.ico" width={20} height={20} />
              </Link>
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              <Link component="a" color="inherit" href="/">
                Digital Store
              </Link>
            </Typography>
            <div className={classes.search}>
              <div className={classes.icon}>
                <SearchIcon />
              </div>
              <InputBase
                fullWidth
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={search}
                onChange={e => {
                  setSearch(e.target.value)
                }}
                endAdornment={
                  !search ? null :
                    <InputAdornment position="end">
                      <IconButton
                        style={{ marginRight: "10px" }}
                        edge="end"
                        onClick={() => setSearch('')}
                        size="small"
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                }
              />
            </div>
            <IconButton
              className={classes.menuButton}
              color="inherit">
              <Link component="a" color="inherit" href="/cart">
                <Badge
                  badgeContent={cart.length !== 0 ? cart.length : null}
                  color="error"
                  overlap="circular">
                  <ShoppingCartIcon />
                </Badge>
              </Link>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
