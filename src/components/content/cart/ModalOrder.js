import { Container, Grid, Box, Button, Input, MenuItem, Modal, Select, Typography, FormControl, InputLabel, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import swal from 'sweetalert';

//Style
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 24,
    fontWeight: "bold",

};


function ModalOrder({ openModalOrderProp, closeModalOrderProp, totalProp, listOrderProp, nameProps, emailProps }) {

    const { user } = useSelector((reduxData) => reduxData.taskReducer);
    const [customerName, setCutomerName] = useState(nameProps ?? "");
    const [customerEmail, setCutomerEmail] = useState(emailProps ?? "");
    const [customerPhone, setCutomerPhone] = useState("");
    const [customerAddress, setCutomerAddress] = useState("");
    const [customerCity, setCutomerCity] = useState("");
    const [customerCountry, setCutomerCountry] = useState("");
    const [shippedDate, setShippedDate] = useState(new Date().toISOString().split('T')[0])
    const [note, setNote] = useState('');

    const btnCancleClick = () => {
        closeModalOrderProp()
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
                    orderDetail: listOrderProp,
                    cost: totalProp,
                    note: note,
                    shippedDate: new Date(shippedDate).toISOString()
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            };
            fetchAPI("https://my-store-node-js.vercel.app/customers/phone/", body)
                .then((data) => {
                    // console.log(data);
                    closeModalOrderProp();
                    localStorage.clear();
                    swal("Đặt hàng thành công!", "You clicked the button!", "success")
                        .then((result) => {
                            // window.location.reload()
                        })
                })
                .catch((error) => {
                    swal("Đặt hàng không thành công!", "You clicked the button!", "error");
                    console.log(error.message);
                });
        }
    }

    const valiDate = () => {
        if (customerName === "") {
            swal("Chưa nhập họ và tên!", "You clicked the button!", "error");
            return false
        }
        if (customerPhone === "") {
            swal("Số điện thoại không hợp lệ!", "You clicked the button!", "error");
            return false
        }
        //Check Email
        const vREG = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!vREG.test(String(customerEmail))) {
            swal("Email không hợp lệ!", "You clicked the button!", "error");
            return false
        }
        if (customerAddress === "") {
            swal("Chưa nhập địa chỉ!", "You clicked the button!", "error");
            return false
        }
        if (customerCity === "") {
            swal("Chưa nhập thành phố!", "You clicked the button!", "error");
            return false
        }
        if (customerCountry === "") {
            swal("Chưa chọn quốc gia!", "You clicked the button!", "error");
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

    return (
        <Container>
            <Modal open={openModalOrderProp} onClose={btnCancleClick} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style} className="modalorder">
                    <Grid item xs={12} align="center" p={1}>
                        <Typography variant="h5" gutterBottom sx={{ color: "#000" }}>
                            <b>Xác Nhận Đơn Hàng</b>
                        </Typography>
                    </Grid>

                    <Grid container mt={2} sx={{ pr: 4, pl: 4 }}>
                        <Grid item xs={12}>
                            <Grid container>
                                {/* Full name   */}
                                <Grid item xs={12} mt={2}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Full name:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField label="Full name" size="small" fullWidth value={customerName} onChange={(event) => { setCutomerName(event.target.value) }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* Phone */}
                                <Grid item xs={12} mt={2}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Phone:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField type="number" label="Phone" size="small" fullWidth value={customerPhone} onChange={(event) => { setCutomerPhone(event.target.value) }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* Email */}
                                <Grid item xs={12} mt={2}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Email:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField label="Email" size="small" fullWidth value={customerEmail} onChange={(event) => { setCutomerEmail(event.target.value) }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* Address */}
                                <Grid item xs={12} mt={2}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Address:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField label="Address" size="small" fullWidth value={customerAddress} onChange={(event) => { setCutomerAddress(event.target.value) }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* City */}
                                <Grid item xs={12} mt={2}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>City:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField label="City" size="small" fullWidth value={customerCity} onChange={(event) => { setCutomerCity(event.target.value) }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* Country */}
                                <Grid item xs={12} mt={2}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Country:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <FormControl sx={{ width: "200px" }} size="small" fullWidth>
                                                <InputLabel id="demo-simple-select-helper-label">Quốc gia</InputLabel>
                                                <Select
                                                    id="registerstatus-select"
                                                    value={customerCountry}
                                                    fullWidth
                                                    label="Quốc gia"
                                                    onChange={(event) => { setCutomerCountry(event.target.value) }}
                                                >
                                                    <MenuItem value="VN">Việt Nam</MenuItem>
                                                    <MenuItem value="USA">USA</MenuItem>
                                                    <MenuItem value="JAPAN">Japanese</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* Shipped date  */}
                                <Grid item xs={12} mt={2}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Shipped date:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField label="Shipped date" size="small" fullWidth value={shippedDate} onChange={(event) => { setShippedDate(event.target.value) }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* Note  */}
                                <Grid item xs={12} mt={2}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Note:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField label="Note" size="small" fullWidth value={note} onChange={(event) => { setNote(event.target.value) }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* Total  */}
                                <Grid item xs={12} mt={2}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Giá:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant="h6" sx={{ color: "red" }}>
                                                <b> $ {totalProp.toLocaleString()} </b>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid container sx={{ pb: 5 }}>
                        <Grid item xs={12} mt={2}>
                            <Grid container mt={4}>
                                <Grid item xs={8} align="center">
                                    <Button onClick={onBtnOrderClick} className="bg-success w-75 text-white">Tạo đơn hàng</Button>
                                </Grid>
                                <Grid item xs={4} align="center">
                                    <Button onClick={btnCancleClick} className="bg-secondary w-75 text-white">Hủy Bỏ</Button>
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