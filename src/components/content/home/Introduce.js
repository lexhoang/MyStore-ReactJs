import { Container, Grid, Button, Typography } from '@mui/material';
import introduce from "../../../assets/images/introduce.jpg";

function Introduce() {

    return (
        <Container>
            <Grid container mt={24} className="mx-auto">
                <Grid item lg={6} md={6} sm={12} xs={12} mb={3} className="d-flex justify-content-center align-items-center">
                    <Typography variant="h3"><b>OUR WATCHES ARE CRAFTED WITH SCRUPULOUS ATTENTION TO DETAIL.</b>
                        <br />
                        <br />
                        <Typography variant="body1">Explore the collection of prestigious, high-precision timepieces. We offers a wide assortment of watches to suit any wrist. Discover the broad selection of watches to find a perfect combination of style and functionality.</Typography>
                    </Typography>
                </Grid>

                <Grid item lg={1} md={1} sm={12} xs={12} className="text-center"> </Grid>

                <Grid item lg={5} md={5} sm={12} xs={12} className="text-center">
                    <img src={introduce} width="90%" />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Introduce;