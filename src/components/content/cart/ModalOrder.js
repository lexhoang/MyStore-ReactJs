import { Container, Grid, Alert, Box, Button, Input, MenuItem, Modal, Select, Snackbar, Typography, FormControl, InputLabel, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';


function ModalOrder({ openModalOrder, closeModalOrder, selectItem, itemTotal }) {
    const navigate = useNavigate();

    const { user } = useSelector((reduxData) => reduxData.taskReducer);
    const [customerName, setCutomerName] = useState("");
    const [customerEmail, setCutomerEmail] = useState("");
    const [customerPhone, setCutomerPhone] = useState("");
    const [customerAddress, setCutomerAddress] = useState("");
    const [customerCity, setCutomerCity] = useState("");
    const [customerCountry, setCutomerCountry] = useState("");
    const [shippedDate, setShippedDate] = useState(new Date().toISOString().split('T')[0])
    const [note, setNote] = useState("");

    const btnCancleClick = () => {
        closeModalOrder()
    }


    //Call API
    const fetchAPI = async (paramUrl, paramBody = {}) => {
        const response = await fetch(paramUrl, paramBody);
        const responseData = await response.json();
        return responseData;
    }

    const onBtnOrderClick = () => {
        if (valiDate()) {
            const body = {
                method: "POST",
                body: JSON.stringify({
                    fullName: customerName,
                    phone: customerPhone,
                    email: customerEmail,
                    address: customerAddress,
                    city: customerCity,
                    country: customerCountry,
                    orderDetail: selectItem,
                    cost: itemTotal,
                    note: note,
                    shippedDate: shippedDate
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            };
            fetchAPI("https://my-store-nodejs-999.herokuapp.com/customers/phone/", body)
                .then((data) => {
                    console.log(data);
                    swal("?????t h??ng th??nh c??ng!", "You clicked the button!", "success", {
                        button: "Go home"
                    })
                        .then((result) => {
                            navigate("/")
                        });
                    closeModalOrder();
                    localStorage.clear();
                })
                .catch((error) => {
                    swal("?????t h??ng kh??ng th??nh c??ng!", "You clicked the button!", "error");
                    console.log(error.message);
                })
        }
    }

    const valiDate = () => {
        if (customerName === "") {
            swal("Ch??a nh????p ho?? va?? t??n!", "You clicked the button!", "error");
            return false
        }
        if (customerPhone === "") {
            swal("S???? ??i????n thoa??i kh??ng h????p l????!", "You clicked the button!", "error");
            return false
        }
        //Check Email
        const vREG = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!vREG.test(String(customerEmail))) {
            swal("Email kh??ng h????p l????!", "You clicked the button!", "error");
            return false
        }
        if (customerAddress === "") {
            swal("Ch??a nh????p ?????a ch???!", "You clicked the button!", "error");
            return false
        }
        if (customerCity === "") {
            swal("Ch??a nh????p th??nh ph???!", "You clicked the button!", "error");
            return false
        }
        if (customerCountry === "") {
            swal("Ch??a ch???n qu???c gia!", "You clicked the button!", "error");
            return false
        }
        if (itemTotal === 0) {
            swal("Ch??a ch???n s???n ph???m!", "You clicked the button!", "error");
            return false
        }

        return true
    }

    useEffect(() => {
        if (user) {
            setCutomerName(user.displayName);
            setCutomerEmail(user.email)
        }
    }, [user])

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    return (
        <Container>
            <Modal open={openModalOrder} onClose={btnCancleClick} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box className="modal-style">
                    <Grid item xs={12} align="center" p={1} style={{ backgroundColor: "#37474f" }}>
                        <Typography variant="h5" gutterBottom sx={{ color: "#ff5722" }}>
                            <b>X??c nh???n ????n h??ng</b>
                        </Typography>
                    </Grid>

                    <Grid container mt={5}>
                        <Grid item xs={12} sx={{ pr: 5, pl: 3 }}>
                            <Grid container>
                                {/* Full name   */}
                                <Grid item xs={12} sm={12} mt={2}>
                                    <Grid container>
                                        <Grid item xs={12} sm={4}>
                                            <label>Full name:</label>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <TextField label="Full name" size="small" fullWidth value={customerName} onChange={(event) => { setCutomerName(event.target.value) }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* Phone */}
                                <Grid item xs={12} sm={12} mt={2}>
                                    <Grid container>
                                        <Grid item xs={12} sm={4}>
                                            <label>Phone:</label>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <TextField label="Phone" size="small" fullWidth value={customerPhone} onChange={(event) => { setCutomerPhone(event.target.value) }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* Email */}
                                <Grid item xs={12} sm={12} mt={2}>
                                    <Grid container>
                                        <Grid item xs={12} sm={4}>
                                            <label>Email:</label>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <TextField label="Email" size="small" fullWidth value={customerEmail} onChange={(event) => { setCutomerEmail(event.target.value) }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* Address */}
                                <Grid item xs={12} sm={12} mt={2}>
                                    <Grid container>
                                        <Grid item xs={12} sm={4}>
                                            <label>Address:</label>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <TextField label="Address" size="small" fullWidth value={customerAddress} onChange={(event) => { setCutomerAddress(event.target.value) }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* City */}
                                <Grid item xs={12} sm={12} mt={2}>
                                    <Grid container>
                                        <Grid item xs={12} sm={4}>
                                            <label>City:</label>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <TextField label="City" size="small" fullWidth value={customerCity} onChange={(event) => { setCutomerCity(event.target.value) }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* Country */}
                                <Grid item xs={12} sm={12} mt={2}>
                                    <Grid container>
                                        <Grid item xs={12} sm={4}>
                                            <label>Country:</label>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-helper-label">Qu???c gia</InputLabel>
                                                <Select
                                                    id="registerstatus-select"
                                                    value={customerCountry}
                                                    fullWidth
                                                    label="Qu???c gia"
                                                    onChange={(event) => { setCutomerCountry(event.target.value) }}
                                                    size="small"
                                                >
                                                    <MenuItem value="VN">Vi???t Nam</MenuItem>
                                                    <MenuItem value="USA">USA</MenuItem>
                                                    <MenuItem value="CHINA">Trung Qu???c</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* Shipped date  */}
                                <Grid item xs={12} sm={12} mt={2}>
                                    <Grid container>
                                        <Grid item xs={12} sm={4}>
                                            <label>Shipped date:</label>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <TextField label="Shipped date" size="small" fullWidth value={shippedDate} onChange={(event) => { setShippedDate(event.target.value) }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* Note  */}
                                <Grid item xs={12} sm={12} mt={2}>
                                    <Grid container>
                                        <Grid item xs={12} sm={4}>
                                            <label>Note:</label>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <TextField label="Note" size="small" fullWidth value={note} onChange={(event) => { setNote(event.target.value) }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* Total  */}
                                <Grid item xs={12} mt={2}>
                                    <Grid container>
                                        <Grid item xs={6} sm={4} md={4}>
                                            <label>Th??nh ti???n:</label>
                                        </Grid>
                                        <Grid item xs={6} sm={8} md={8}>
                                            <Typography variant="h6" sx={{ color: "red" }}>
                                                <b>${numberWithCommas(itemTotal)}</b>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid container>
                        <Grid item xs={12} sm={12} mt={3}>
                            <Grid container mt={4}>
                                <Grid item xs={12} sm={8} align="center">
                                    <Button onClick={onBtnOrderClick} className="bg-success w-75 text-white">T???o ????n h??ng</Button>
                                </Grid>
                                <Grid item xs={12} sm={4} align="center">
                                    <Button onClick={btnCancleClick} className="bg-secondary w-75 text-white">H???y B???</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Container >
    )
}
export default ModalOrder;