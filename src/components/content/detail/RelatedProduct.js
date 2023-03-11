import { Container, Grid, Link, Button } from "@mui/material";
import { useState, useEffect } from "react";

function RelatedProject() {

    const [relatedProject, setRelatedProject] = useState([]);

    const fetchAPI = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    useEffect(() => {
        fetchAPI("https://my-store-node-js.vercel.app/products/?limit=6&skip=7")
            .then((data) => {
                setRelatedProject(data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    return (
        <Container>
            <Grid container mt={5}>
                {
                    relatedProject.map((product, index) => {
                        return (
                            <Grid item xs={4} lg={2} md={2} sm={4} key={index} >
                                <Link href={product._id}>
                                    <Button>
                                        <img src={product.imageUrl} style={{ width: "80%", borderRadius: "10px" }} className="hover-related" />
                                    </Button>
                                </Link>
                            </Grid>
                        )
                    })
                }

            </Grid>
        </Container>
    )
}

export default RelatedProject;