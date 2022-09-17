import { Container, Grid, Breadcrumbs } from "@mui/material";
import { NavLink } from 'react-router-dom';



function BreadCrumb({ breadCrumbs }) {
    return (
        <div style={{ backgroundColor: "#cfd8dc" }}>
            <Container>
                <Grid container mt={1}>
                    <Breadcrumbs separator="›" aria-label="breadcrumb" color="black">
                        {
                            breadCrumbs.map((page, index) => {
                                return (
                                    <NavLink to={page.route} underline="hover" color="inherit" key={index}
                                        style={{ textDecoration: "none", color: "black" }}>
                                        <div className="BreadCrumb">{page.name} </div>
                                    </NavLink>
                                )
                            })
                        }
                    </Breadcrumbs>

                </Grid>
            </Container>
        </div>
    )
}

export default BreadCrumb;