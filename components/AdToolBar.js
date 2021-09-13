import { useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import { alpha, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Link from '@material-ui/core/Link'
import useUser from '../lib/useUser'
import Router from 'next/router'
import fetchJson from '../lib/fetchJson'

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
  button: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 1),
    color: "#3f51b5",
    '&:hover': {
      color: alpha(theme.palette.common.white, 1),
    },
  },
}));

export default function AdToolBar({ select }) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const { user, mutateUser } = useUser()

  const handleLogout = async () => {
    mutateUser(
      await fetchJson('/api/auth/logout', { method: 'POST' }),
      false
    )
    Router.push('/admin/login')
  }
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit">
              <Link component="a" color="inherit" href="/admin/products">
                <Image alt="logo" src="/favicon.ico" width={20} height={20} />
              </Link>
            </IconButton>
            <Link className={classes.title} component="a" color="inherit" href="/admin/products">
              <Typography variant="h6" noWrap>
                Digital Store
              </Typography>
            </Link>
            <div className={classes.root} />
            <Button className={clsx(classes.button, classes.menuButton)} onClick={handleClick}>
              <Typography variant="button" noWrap>
                {select}
              </Typography>
            </Button>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>
                <Link component="a" color="inherit" href="/admin/products" noWrap>
                  Quản lý sản phẩm
                </Link>
              </MenuItem>
              <MenuItem>
                <Link component="a" color="inherit" href="/admin/types" noWrap>
                  Quản lý loại sản phẩm
                </Link>
              </MenuItem>
              <MenuItem>
                <Link component="a" color="inherit" href="/admin/bills" noWrap>
                  Quản lý đơn hàng
                </Link>
              </MenuItem>
            </Menu>
            <Button
              className={clsx(classes.button, classes.menuButton)}
              onClick={() => handleLogout()}>
              <Typography variant="button" noWrap>
                Đăng xuất
              </Typography>
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div >
  );
}
