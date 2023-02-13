import { Container, Row, Col, Carousel, CarouselIndicators, CarouselItem, CarouselControl, } from "reactstrap";
import { Link } from "react-router-dom";

import slide1 from "../../assets/images/1.jpeg";
import slide2 from "../../assets/images/2.jpeg";
import slide3 from "../../assets/images/3.jpeg";
import slide4 from "../../assets/images/4.jpeg";

import { useState } from "react";

function Slider() {
    /////////////      SLIDE         ///////////
    // State for Active index
    const [activeIndex, setActiveIndex] = useState(0);

    // State for Animation
    const [animating, setAnimating] = useState(false);

    const items = [
        {
            caption: "Sample Caption One",
            src: slide1,
            altText: "Slide One",
        },
        {
            caption: "Sample Caption Two",
            src: slide2,
            altText: "Slide Two",
        },
        {
            caption: "Sample Caption Two",
            src: slide3,
            altText: "Slide Three",
        },
        {
            caption: "Sample Caption Two",
            src: slide4,
            altText: "Slide Four",
        },
    ];

    // Items array length
    const itemLength = items.length - 1;

    // Previous button for Carousel
    const previousButton = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? itemLength : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    // Next button for Carousel
    const nextButton = () => {
        if (animating) return;
        const nextIndex = activeIndex === itemLength ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    // Carousel Item Data
    const carouselItemData = items.map((item, index) => {
        return (
            <CarouselItem
                key={index}
                onExited={() => setAnimating(false)}
                onExiting={() => setAnimating(true)}
                className="img-slide"
            >
                <img src={item.src} alt={item.altText} />
            </CarouselItem>
        );
    });

    return (
        // <Container className="mx-auto">
        // <Row>
        <Col xs={12} lg={12} md={12} sm={12}>
            <Carousel
                previous={previousButton}
                next={nextButton}
                activeIndex={activeIndex}
            >
                <CarouselIndicators
                    items={items}
                    activeIndex={activeIndex}
                    onClickHandler={(newIndex) => {
                        if (animating) return;
                        setActiveIndex(newIndex);
                    }}
                />
                {carouselItemData}
                <CarouselControl
                    directionText="Prev"
                    direction="prev"
                    onClickHandler={previousButton}
                />
                <CarouselControl
                    directionText="Next"
                    direction="next"
                    onClickHandler={nextButton}
                />
            </Carousel>
        </Col>
        // </Row>
        // </Container>
    )
}
export default Slider;