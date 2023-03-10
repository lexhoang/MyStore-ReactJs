import ModalOrder from "./ModalOrder";
import ModalLogIn from "../home/ModalLogIn"

import { Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import LoginIcon from '@mui/icons-material/Login';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { auth, googleProvider } from "../../../firebase";


function Cart() {
    const dispatch = useDispatch();

    const { user } = useSelector((reduxData) => reduxData.taskReducer);
    const { cart, id } = useSelector((reduxData) => reduxData.cartReducer);

    const [total, setTotal] = useState(0)
    const [productCart, setProductCart] = useState([]);
    const [listOrder, setListOrder] = useState([])


    function bill(arr) {
        return arr.reduce(function (a, b) {
            a[b] = a[b] + 1 || 1
            return a;
        }, {});
    }

    const onBtnMinusProductClick = (paramId) => {
        let getCount = parseInt(localStorage.getItem(paramId))
        let updateCount = getCount - 1
        if (getCount > 0 && cart > 0) {
            const index = id.indexOf(paramId);
            if (index > -1) {
                id.splice(index, 1);
            }
            dispatch({
                type: "REMOVE",
                cart: cart - 1,
                id: id
            })
            localStorage.setItem("cart", cart - 1)
            localStorage.setItem(paramId, updateCount)
        }
        else {
            let newList = id.filter(ids => ids !== paramId)
            dispatch({
                type: "REMOVE_ITEM",
                id: newList,
            })
            localStorage.removeItem(paramId);
        }
    }

    const onBtnDelete = (paramId, quantity) => {
        let newList = id.filter(ids => ids !== paramId)
        dispatch({
            type: "REMOVE_ITEM",
            id: newList,
        })
        localStorage.removeItem(paramId);
        localStorage.setItem("cart", cart - quantity)
        window.location.reload()
    }

    const onBtnAddProductClick = (id) => {
        let getCount = parseInt(localStorage.getItem(id))
        let updateCount = getCount + 1
        dispatch({
            type: "ADD",
            cart: cart + 1,
            id: id
        })
        localStorage.setItem("cart", cart + 1)
        localStorage.setItem(id, updateCount)
    }

    const fetchAPI = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

    useEffect(() => {
        fetchAPI("http://localhost:8000/products")
            .then((data) => {
                setProductCart(data.data.filter(product => id.includes(product._id)))
                let arr = []
                for (var property in bill(id)) {
                    let total = bill(id)[property] * (data.data.filter(product => id.includes(product._id))).find(({ _id }) => _id === property).promotionPrice
                    let obj = {
                        id: property,
                        count: bill(id)[property],
                        price: total
                    }
                    arr.push(obj)
                }
                for (let i = 0; i > arr.length; i++) {
                    setTotal(total + arr[i].count * arr[i].price)
                }
                const sumall = arr.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
                setListOrder(arr)
                setTotal(sumall)
            })
            .catch((error) => {
                console.error(error.message)
            })
    }, [id, cart, total])



    //MODAL LOGIN
    const [modalLogin, setModalLogin] = useState(false)
    // LOGIN GOOGLE
    // const [user, setUser] = useState(null);
    const handleOpenModalLogin = () => setModalLogin(true)

    const handleCloseModalLogin = () => setModalLogin(false)

    const loginGoogle = () => {
        auth.signInWithPopup(googleProvider)
            .then((result) => {
                console.log(result);
                dispatch({
                    type: "USER",
                    user: result.user
                })
                // setUser(result.user);
                setModalLogin(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //MODAL ORDER
    const [modalOrder, setModalOrder] = useState(false)



    const btnOpenOrder = (list) => {
        if (user) {
            setModalOrder(true);
        } else {
            handleOpenModalLogin()
        }
    }

    const handleCloseModalOrder = () => setModalOrder(false)


    return (
        <Container style={{ marginTop: "80px", paddingBottom: "80px" }}>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead style={{ backgroundColor: "#283593" }}>
                                <TableRow>
                                    <TableCell align="center" width={"12%"}></TableCell>
                                    <TableCell align="center" sx={{ fontSize: "18px", color: "#fff" }} width={"28%"}>Tên Sản Phẩm</TableCell>
                                    <TableCell align="center" sx={{ fontSize: "18px", color: "#fff" }} >Giá bán</TableCell>
                                    <TableCell align="center" sx={{ fontSize: "18px", color: "#fff" }} width={"10%"}>Số Lượng</TableCell>
                                    <TableCell align="center" sx={{ fontSize: "18px", color: "#fff" }}>Thành Tiền</TableCell>
                                    <TableCell align="center" sx={{ fontSize: "18px", color: "#fff" }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productCart.map((order, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell align="center">
                                                <img style={{ width: "100%" }} src={order.imageUrl} />
                                            </TableCell>

                                            <TableCell align="center" sx={{ color: "#26a69a", fontSize: "16px" }}>
                                                <b>{order.name}</b>
                                            </TableCell>

                                            <TableCell align="center">${order.promotionPrice}</TableCell>

                                            <TableCell align="center">
                                                <Grid container mt={1}>
                                                    <Grid item xs={6} align="right" mt={3}>
                                                        <Typography variant="body1" key={index}>
                                                            {localStorage.getItem(order._id)}
                                                        </Typography>
                                                    </Grid>

                                                    <Grid item xs={6} align="left">
                                                        <Button style={{ fontWeight: "bold" }}>
                                                            <AddCircleIcon onClick={() => onBtnAddProductClick(order._id)} />
                                                        </Button>
                                                        <Button onClick={() => onBtnMinusProductClick(order._id)} style={{ fontWeight: "bold" }}>
                                                            <RemoveCircleIcon />
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>

                                            <TableCell align="center" sx={{ color: "red", fontSize: "16px" }}>
                                                <b>${parseInt(localStorage.getItem(order._id) * order.promotionPrice).toLocaleString()}</b>
                                            </TableCell>

                                            <TableCell sx={{ width: "10%" }} className="text-center">
                                                <Button variant="contained" onClick={() => onBtnDelete(order._id, localStorage.getItem(order._id))}>xóa</Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell className="text-center">
                                        <Typography variant="body1" sx={{ color: "red" }}><b>Thành tiền</b></Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell className="text-center">
                                        <Typography variant='body1' sx={{ color: "red" }}>
                                            <b>${total.toLocaleString()}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {user ?
                                            <Button variant="contained" color="info" onClick={btnOpenOrder}>
                                                <b>Thanh toán</b>
                                            </Button>
                                            :
                                            <Button variant="contained" color="warning" onClick={btnOpenOrder}>
                                                <LoginIcon /> &ensp; <b>LogIn</b>
                                            </Button>
                                        }
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <ModalOrder listOrderProp={listOrder} totalProp={total} openModalOrderProp={modalOrder} closeModalOrderProp={handleCloseModalOrder} />
            <ModalLogIn openModalLogIn={modalLogin} handleCloseModal={handleCloseModalLogin} loginGoogle={loginGoogle} />

        </Container >
    );
}

export default Cart;