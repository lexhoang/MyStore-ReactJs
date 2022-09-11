import Logo from "../../assets/images/logo.png"
import Logo1 from "../../assets/images/logo1.jpg"
import ModalLogIn from "../content/ModalLogIn";


import { AppBar, Box, Toolbar, IconButton, Menu, MenuItem, Avatar, Tooltip } from '@mui/material';
import { Container, Grid, Typography, Button } from "@mui/material";
import { NavLink } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';


import { useEffect, useState } from "react";

import { auth, googleProvider } from "../../firebase";

import { useDispatch, useSelector } from "react-redux"


function Header() {
  const { user, nameProduct } = useSelector((reduxData) => reduxData.taskReducer);

  const dispatch = useDispatch();

  const [itemList, setItemList] = useState(0);


  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  //MODAL LOGIN
  const [openModalLogIn, setOpenModalLogIn] = useState(false);

  // LOGIN GOOGLE
  // const [user, setUser] = useState(null);

  const loginGoogle = () => {
    auth.signInWithPopup(googleProvider)
      .then((result) => {
        console.log(result);
        dispatch({
          type: "USER",
          user: result.user
        })
        // setUser(result.user);
        setOpenModalLogIn(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const logoutGoogle = () => {
    auth.signOut()
      .then(() => {
        dispatch({
          type: "USER",
          user: null
        })
        // setUser(null);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    auth.onAuthStateChanged((result) => {
      console.log(result);
      dispatch({
        type: "USER",
        user: result
      })
      // setUser(result)
    });
  }, []);


  useEffect(() => {
    let orderList = JSON.parse(localStorage.getItem("orderList")) || [];
    setItemList(orderList.length)
  });


  //MODAL
  const logIn = () => {
    setOpenModalLogIn(true);
  }

  const handleCloseModal = () => {
    setOpenModalLogIn(false);
  }


  //NAVBAR
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Container>
      <AppBar position="fixed" style={{ backgroundColor: "#fff" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                ml: 10,
                display: { xs: 'none', md: 'flex' },
                textDecoration: 'none',
              }}
            >
              {/* <img src={Logo1} width="100" /> */}
              <img src={Logo} width="180" />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: "black" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem>
                  <NavLink to="/">
                    <Button>
                      <Tooltip title="Trang chủ">
                        <HomeIcon sx={{ fontSize: 30, color: "black" }} />
                      </Tooltip>
                    </Button>
                  </NavLink>

                  <NavLink to="/products">
                    <Button>
                      <Tooltip title="Trang sản phẩm">
                        <FormatListBulletedIcon sx={{ fontSize: 30, color: "black" }} />
                      </Tooltip>
                    </Button>
                  </NavLink>

                  <NavLink to="/cart" style={{ textDecoration: 'none' }}>
                    <Button>
                      <Tooltip title="Giỏ hàng">
                        <ShoppingCartIcon sx={{ fontSize: 30, color: "black" }} />
                      </Tooltip>
                      <div className="text-white d-flex align-items-center justify-content-center" style={{ backgroundColor: "red", marginTop: "-30px", width: "20px", height: "20px", borderRadius: "50%" }}>
                        <span style={{ fontSize: "16px" }}>
                          {itemList}
                        </span>
                      </div>
                    </Button>
                  </NavLink>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                // mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 5,
                textDecoration: 'none',
              }}
            >

              <img src={Logo} width="100" />
            </Typography>

            <Box sx={{ flexGrow: 1, ml: 17, display: { xs: "none", md: "flex" } }}>
              <NavLink to="/">
                {/* <img src={Logo} width="200" /> */}
                <img src={Logo1} width="120" />
              </NavLink>
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }} style={{ marginRight: "50px" }}>
              <Container
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <NavLink to="/">
                  <Button>
                    <Tooltip title="Trang chủ">
                      <HomeIcon sx={{ fontSize: 30, color: "black" }} />
                    </Tooltip>
                  </Button>
                </NavLink>

                <NavLink to="/products">
                  <Button>
                    <Tooltip title="Trang sản phẩm">
                      <FormatListBulletedIcon sx={{ fontSize: 30, color: "black" }} />
                    </Tooltip>
                  </Button>
                </NavLink>
              </Container>
            </Box>

            <Box>
              <Container
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <NavLink to="/cart" style={{ textDecoration: 'none' }}>
                  <Button>
                    <Tooltip title="Giỏ hàng">
                      <ShoppingCartIcon sx={{ fontSize: 30, color: "black" }} />
                    </Tooltip>
                    <div className="text-white d-flex align-items-center justify-content-center" style={{ backgroundColor: "red", marginTop: "-30px", width: "20px", height: "20px", borderRadius: "50%" }}>
                      <span style={{ fontSize: "16px" }}>
                        {itemList}
                      </span>
                    </div>
                  </Button>
                </NavLink>
              </Container>
            </Box>
            {
              user ?
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src={user.photoURL} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography variant="body1">{user.displayName}</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography variant="body1" onClick={logoutGoogle} color="primary"><b><LogoutIcon /> Logout</b></Typography>
                    </MenuItem>
                  </Menu>
                </Box>
                :
                <Box sx={{ flexGrow: 0 }}>
                  <Typography variant="body1" onClick={logIn} style={{ cursor: "pointer", color: "#43a047" }}>
                    <b className="text-login"><LoginIcon /> Login</b>
                  </Typography>

                  {/* <Link href="/login" style={{ cursor: "pointer", color: "black", textDecoration: "none" }}>
                    <b className="text-login"><LoginIcon /> Login</b>
                  </Link> */}
                </Box>
            }

          </Toolbar>
        </Container>
      </AppBar >


      {/* Modal LogIn */}
      < ModalLogIn openModalLogIn={openModalLogIn} handleCloseModal={handleCloseModal} loginGoogle={loginGoogle} />

    </Container >
  );
}

export default Header;