import ModalOrder from "./ModalOrder";
import ModalLogIn from "../ModalLogIn"

import { Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import LoginIcon from '@mui/icons-material/Login';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { auth, googleProvider } from "../../../firebase";


function Cart() {
    const dispatch = useDispatch();

    const { user } = useSelector((reduxData) => reduxData.taskReducer);
    const [orderList, setOrderList] = useState([]);

    const [itemTotal, setItemTotal] = useState(0);

    const [selectItem, setSelectItem] = useState([])


    const onBtnMinusProductClick = (param) => {
        orderList.map((element, index) => {
            if (element.product == param.product) {
                element.quantity = param.quantity - 1;
                if (itemTotal > 0 && element.quantity >= 0 && Boolean(selectItem.find(item => item.product == element.product)) == true) {
                    let newTotal = itemTotal - param.info.promotionPrice;
                    setItemTotal(newTotal);
                }
                if (element.quantity <= 0) {
                    orderList.splice(index, 1);
                }
            }
        })
        localStorage.setItem("orderList", JSON.stringify(orderList));
    }

    const onBtnAddProductClick = (param) => {
        orderList.map((element, index) => {
            if (element.product == param.product) {
                if (itemTotal > 0 && element.quantity <= param.info.quantity && Boolean(selectItem.find(item => item.product == element.product)) == true) {
                    let newTotal = itemTotal + param.info.promotionPrice;
                    setItemTotal(newTotal);
                }
                if (element.quantity >= param.info.quantity) {
                    element.quantity = param.info.quantity
                }
                else {
                    element.quantity = param.quantity + 1;
                }
            }
        })
        localStorage.setItem("orderList", JSON.stringify(orderList));
    }

    const onDeleteItemClick = (param) => {
        orderList.map((element, index) => {
            if (element.product == param.product) {
                orderList.splice(index, 1);
            }
        })
        localStorage.setItem("orderList", JSON.stringify(orderList));
        window.location.reload()
    }

    const onSelectAllItem = (event) => {
        let total = 0;
        let arraySelectedItem = [];
        if (event.target.checked) {
            orderList.map((element, index) => {
                total += element.info.promotionPrice * element.quantity
                arraySelectedItem.push(element)
                document.getElementById(element.product).checked = true
            })
        }
        else {
            orderList.map((element, index) => {
                document.getElementById(element.product).checked = false
            })
            total = 0;
            arraySelectedItem = []
        }
        setItemTotal(total);
        setSelectItem(arraySelectedItem);
        // setListProduct(arraySelectedItem)
    }


    const onSelectItem = (event) => {
        let total = itemTotal;
        let arraySelectedItem = selectItem;
        orderList.map((element, index) => {
            if (element.product == event.target.value) {
                if (event.target.checked) {
                    total += element.info.promotionPrice * element.quantity
                    arraySelectedItem.push(element)
                }
                if (!event.target.checked) {
                    total -= element.info.promotionPrice * element.quantity;
                    arraySelectedItem.splice(index, 1);
                    document.getElementById("select-all-item").checked = false
                }
            }
        })
        setItemTotal(total);
        setSelectItem(arraySelectedItem);
        // setListProduct(arraySelectedItem)
    }


    useEffect(() => {
        setOrderList(JSON.parse(localStorage.getItem("orderList")) || [])
    })

    useEffect(() => {
        setItemTotal(0);
        setSelectItem([]);
    }, []);


    //MODAL LOGIN
    const [modalLogin, setModalLogin] = useState(false)
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
                setModalLogin(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleOpenModalLogin = () => setModalLogin(true)

    const handleCloseModalLogin = () => setModalLogin(false)

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

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    return (
        <Container style={{ marginTop: "80px", paddingBottom: "80px" }}>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650, fontSize: "2rem" }} size="small">
                            <TableHead style={{ backgroundColor: "#f8bbd0" }}>
                                <TableRow>
                                    <TableCell className="text-center" sx={{ width: "5%" }}>
                                        <input type="checkbox" onChange={onSelectAllItem} id="select-all-item" />
                                    </TableCell>
                                    <TableCell align="center" width={"13%"}></TableCell>
                                    <TableCell align="center" sx={{ fontSize: "16px" }} width="14%">Số Lượng</TableCell>
                                    <TableCell align="center" sx={{ fontSize: "16px" }}>Tên Sản Phẩm</TableCell>
                                    <TableCell align="center" sx={{ fontSize: "16px" }}>Giá bán</TableCell>
                                    <TableCell align="center" sx={{ fontSize: "16px" }} width="15%">Thành Tiền</TableCell>
                                    <TableCell align="center" sx={{ fontSize: "16px" }} width="20%"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderList.map((order, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell sx={{ width: "5%" }} className="text-center"><input type="checkbox" onChange={onSelectItem} value={order.product} id={order.product} /></TableCell>

                                        <TableCell align="center">
                                            <img style={{ width: "100%" }} src={order.info.imageUrl} />
                                        </TableCell>

                                        <TableCell align="center">
                                            <Grid container mt={1}>
                                                <Grid item xs={6} align="right" mt={2}>
                                                    <Typography variant="h6" key={index}>
                                                        {order.quantity}
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={6} align="left">
                                                    <Button style={{ fontWeight: "bold" }}>
                                                        <AddCircleIcon onClick={() => onBtnAddProductClick(order)} />
                                                    </Button>
                                                    <Button onClick={() => onBtnMinusProductClick(order)} style={{ fontWeight: "bold" }}>
                                                        <RemoveCircleIcon />
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </TableCell>

                                        <TableCell align="center" sx={{ color: "#26a69a" }}><b>{order.info.name}</b></TableCell>

                                        <TableCell align="center">{numberWithCommas(order.info.promotionPrice)} VNĐ</TableCell>


                                        <TableCell align="center" sx={{ color: "red" }}>
                                            <Typography variant="body1">
                                                <b>{numberWithCommas(order.quantity * order.info.promotionPrice)} VNĐ</b>
                                            </Typography>
                                        </TableCell>

                                        <TableCell sx={{ width: "10%" }} className="text-center">
                                            <Button variant="contained" size="small" color="success" onClick={() => onDeleteItemClick(order)} sx={{ backgroundColor: "red" }}>Xóa</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell className="text-center">
                                        <Typography variant="h6" sx={{ color: "red" }}><b>Thành tiền:</b></Typography>
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <Typography variant='body1' sx={{ color: "red" }}>
                                            <Typography variant='h6'>
                                                <b>{numberWithCommas(itemTotal)} VNĐ</b>
                                            </Typography>
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell className="text-center">
                                        {user ?
                                            <Button variant="contained" color="success" onClick={btnOpenOrder}>
                                                <MonetizationOnIcon /> <b>Thanh toán</b>
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

            <ModalOrder selectItem={selectItem} itemTotal={itemTotal} openModalOrder={modalOrder} closeModalOrder={handleCloseModalOrder} />
            <ModalLogIn openModalLogIn={modalLogin} handleCloseModal={handleCloseModalLogin} loginGoogle={loginGoogle} />
        </Container >
    );
}

export default Cart;