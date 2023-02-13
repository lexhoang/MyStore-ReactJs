import { Container, Grid, Button, Typography, TextField } from '@mui/material';

import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function ProductFilter() {

    const dispatch = useDispatch();
    const { nameProduct, minPrice, maxPrice, productTypes, noPage } = useSelector((reduxData) => reduxData.taskReducer);

    const [types, setTypes] = useState([]);

    const onChangeName = (event) => {
        dispatch({
            type: "VALUE_NAME_PRODUCT",
            nameProduct: event.target.value
        })
    }

    const onChangeMinPrice = (event) => {
        dispatch({
            type: "VALUE_MIN_PRICE",
            minPrice: event.target.value
        })
    }

    const onChangeMaxPrice = (event) => {
        dispatch({
            type: "VALUE_MAX_PRICE",
            maxPrice: event.target.value
        })
    }

    const onChangeProductTypes = (event) => {
        dispatch({
            type: "VALUE_PRODUCT_TYPES",
            productTypes: event.target.value
        })
    }

    //CALL API
    const fetchAPI = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data
    }

    //Load Product Types
    useEffect(() => {
        fetchAPI("http://localhost:8000/producttypes")
            .then((data) => {
                setTypes(data.data)
                console.log(data);
            })
            .catch((error) => {
                console.error(error.message);
            })
    }, [])

    // //filter Product
    // const filterProduct = () => {
    //     //Show All
    //     if (nameProduct === "" && productTypes === "" && minPrice === 0 && maxPrice === 0) {
    //         fetchAPI(`http://localhost:8000/products`)
    //             .then((data) => {
    //                 dispatch({
    //                     type: "ALL_PRODUCT",
    //                     setProducts: data.data,
    //                     setNoPage: Math.ceil(data.data.length / 20)
    //                 })
    //                 console.log(data);
    //             })
    //             .catch((error) => {
    //                 console.error(error.message);
    //             })
    //     }
    //     //Tìm theo tên và loại và giá
    //    else{
    //         fetchAPI(`http://localhost:8000/products/?name=${nameProduct}&type=${productTypes}&minPromotionPrice=${minPrice}&maxPromotionPrice=${maxPrice}`)
    //             .then((data) => {
    //                 dispatch({
    //                     type: "ALL_PRODUCT",
    //                     setProducts: data.data,
    //                     setNoPage: Math.ceil(data.data.length / 20)
    //                 })
    //                 console.log(data);
    //             })
    //             .catch((error) => {
    //                 console.error(error.message);
    //             })
    //     }
    // }

    return (
        <Container className="bg-light" style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)" }}>
            <Grid container p={1} mt={1}>
                <Grid item xs={12} lg={2} md={2} sm={3}>
                    <Grid item xs={12}>
                        <Typography variant="body1"><b>Price</b></Typography>
                    </Grid>
                    <Grid container mt={1}>
                        <Grid item xs={5}>
                            <TextField size="small" value={minPrice} label="to" onChange={onChangeMinPrice}></TextField>
                        </Grid>

                        <Grid item xs={2}>
                            <Typography variant="h5" align="center">-</Typography>
                        </Grid>

                        <Grid item xs={5}>
                            <TextField size="small" value={maxPrice} label="from" onChange={onChangeMaxPrice}></TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={12} lg={6} md={6} sm={6}>
                    <Grid item xs={12}>
                        <Typography variant="body1"><b>Brand</b></Typography>
                    </Grid>

                    <Grid container mt={1} justifyContent="center">
                        <FormControl>
                            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                                <Grid container>
                                    <Grid item xs={6} lg={4} md={4} sm={4}>
                                        <FormControlLabel value="" control={<Radio onChange={onChangeProductTypes} />} label="ALL" />
                                    </Grid>
                                    {
                                        types.map((types, index) => {
                                            return (
                                                <Grid item xs={6} lg={4} md={4} sm={4}>
                                                    <FormControlLabel key={index} value={types._id} control={<Radio onChange={onChangeProductTypes} />} label={types.name} />
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid item xs={12} lg={2} md={2} sm={6}>
                    <Grid item xs={12}>
                        <Typography variant="body1"><b>Name</b></Typography>
                    </Grid>
                    <Grid item xs={12} mt={1}>
                        <TextField label="Product Name" value={nameProduct} size="small" onChange={onChangeName}></TextField>
                    </Grid>
                </Grid>
            </Grid>

            {/* <Grid item xs={12} mt={5} pb={5} align="center">
                <Button variant="contained" onClick={filterProduct}>Filter</Button>
            </Grid> */}
        </Container >
    )
}

export default ProductFilter;