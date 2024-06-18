import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { Row } from "react-bootstrap"
import ReviewItem from "./ReviewItem";

const ReviewList = observer(({ openChangeReviewModal,  setReviewText, setReviewId, deleteThisReview }) => {
    const {movie} = useContext(Context);

    const reviewsToRender = Array.isArray(movie.reviews) ? movie.reviews : [];

    return (
        <Row className="d-flex">
            {reviewsToRender.map(review =>
                <ReviewItem
                    openChangeReviewModal={openChangeReviewModal}
                    setReviewText={setReviewText}
                    setReviewId={setReviewId}
                    deleteThisReview={deleteThisReview}
                    key={review.Review_id}
                    movie={review}
                />
            )}
        </Row>
    )
});

export default ReviewList;