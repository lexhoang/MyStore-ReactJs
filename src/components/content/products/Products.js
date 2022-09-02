import { Container, Grid, Typography, Card, CardActionArea, CardMedia, CardContent, Pagination } from "@mui/material";
import { NavLink } from 'react-router-dom';


import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Products() {
  const dispatch = useDispatch();
  const { allProduct, nameProduct, minPrice, maxPrice, productTypes } =
    useSelector((reduxData) => reduxData.taskReducer);

  //Pagination
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [noPage, setNoPage] = useState(0);

  const changePageHandler = (event, value) => {
    setPage(value);
  };

  const fetchAPI = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  useEffect(
    (data) => {
      if (
        nameProduct === "" &&
        productTypes === "" &&
        minPrice === 0 &&
        maxPrice === 0
      ) {
        fetchAPI("https://my-store-nodejs-999.herokuapp.com/products")
          .then((data) => {
            setNoPage(Math.ceil(data.data.length / limit));
            dispatch({
              type: "ALL_PRODUCT",
              setProducts: data.data.slice((page - 1) * limit, page * limit),
            });
            console.log(data);
          })
          .catch((error) => {
            console.error(error.message);
          });
      } else {
        fetchAPI(
          `https://my-store-nodejs-999.herokuapp.com/products/?name=${nameProduct}&type=${productTypes}&minPromotionPrice=${minPrice}&maxPromotionPrice=${maxPrice}`
        )
          .then((data) => {
            setNoPage(Math.ceil(data.data.length / limit));
            dispatch({
              type: "ALL_PRODUCT",
              setProducts: data.data.slice((page - 1) * limit, page * limit),
            });
            console.log(data);
          })
          .catch((error) => {
            console.error(error.message);
          });
      }
    },
    [limit, page, nameProduct, productTypes, minPrice, maxPrice]
  );

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  return (
    <div>
      <Grid container>
        {allProduct.map((product, index) => {
          return (
            <Grid item xs={6} lg={2} md={3} sm={6} className="p-2 pb-5" key={index}>
              <NavLink to={product._id} style={{ textDecoration: "none" }}>
                <div className="product-card">
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        // height="140"
                        width="200"
                        image={product.imageUrl}
                        alt="green iguana"
                        className="img-card"
                      />
                      <CardContent>
                        <Typography
                          mt={2}
                          variant="h6"
                          style={{ fontSize: "16px", height: "50px", opacity: "0.8" }}
                          component="div"
                          className="name-product"
                          align="center"
                        >
                          <b>{product.name}</b>
                        </Typography>
                      </CardContent>

                      <Grid container sx={{ pt: 1, pb: 2 }}>
                        <Grid item xs={6} align="right">
                          <Typography variant="body1" sx={{ mr: 2, fontSize: "16px", opacity: "0.6" }}>
                            <strike><b>${numberWithCommas(product.buyPrice)}</b></strike>
                          </Typography>
                        </Grid>
                        <Grid item xs={6} >
                          <Typography variant="h5" sx={{ color: "red" }}>
                            <b>${numberWithCommas(product.promotionPrice)}</b>
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardActionArea>
                  </Card>
                </div>
              </NavLink>
            </Grid>
          );
        })}
      </Grid>

      <Grid container justifyContent="end" mt={4}>
        <Grid item>
          <Pagination
            color="secondary"
            count={noPage}
            defaultPage={page}
            onChange={changePageHandler}
          ></Pagination>
        </Grid>
      </Grid>
    </div>
  );
}

export default Products;
