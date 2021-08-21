import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { DataContext } from '../store/GlobalState'
import clsx from 'clsx'
import Cookie from 'js-cookie'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import { alpha, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    margin: theme.spacing(0, 1, 0, 1),
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
  button: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 1),
    color: "#3f51b5",
    '&:hover': {
      color: alpha(theme.palette.common.white, 1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    width: '40ch',
    [theme.breakpoints.down('ms')]: {
      width: '30ch',
    },
  },
}));

export default function AdToolBar({ select }) {
  const router = useRouter()
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const { state, dispatch } = useContext(DataContext)
  const { auth } = state

  const handleLogout = () => {
    Cookie.remove('refreshtoken', {path: '/'})
    localStorage.removeItem('firstLogin')
    dispatch({ type: 'AUTH', payload: {} })
}

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value) => {
    switch (value) {
      case 1:
        router.push('/admin/products')
        break;
      case 2:
        router.push('/admin/types')
        break;
      case 3:
        router.push('/admin/bills')
        break;
    }
  };


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
          <IconButton
              className={classes.menuButton}
              color="inherit"
              onClick={()=>router.push('/admin/products')}
            >
                <Image alt="logo" src="/favicon.ico" width={20} height={20} />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap  onClick={()=>router.push('/admin/products')}>
                Digital Store
            </Typography>
            {Object.keys(auth).length == 0 ?
              <Button 
              className={clsx(classes.button, classes.menuButton)}
              onClick={()=>router.push('/admin/login')}>
                Đăng nhập
              </Button>
              :
              <div>
                <Button className={clsx(classes.button, classes.menuButton)} onClick={handleClick}>
                  {select}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleSelect(1)}>Quản lý sản phẩm</MenuItem>
                  <MenuItem onClick={() => handleSelect(2)}>Quản lý loại sản phẩm</MenuItem>
                  <MenuItem onClick={() => handleSelect(3)}>Quản lý đơn hàng</MenuItem>
                </Menu>
                <Button 
                className={clsx(classes.button, classes.menuButton)}
                onClick={()=>handleLogout()}>
                  Đăng xuất
                </Button>
              </div>
            }
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
