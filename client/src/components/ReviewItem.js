import React, { useContext, useState } from "react";
import { Image, Button, Form } from "react-bootstrap";
import './css/ReviewItem.css'
import { Context } from "..";
import AcceptModal from "./modals/AcceptModal";

const ReviewItem = ({ movie, openChangeReviewModal, setReviewText, setReviewId, deleteThisReview }) => {
  const { user } = useContext(Context);
  const [showAcceptModal, setAcceptShowModal] = useState(false);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleString('en-US', options);
  }

  return (
    <>
      {movie && (
        <div className="div-main-review">
          <div className="div-image-review">
            <Image width={150} height={150} style={{objectFit: 'cover'}} src={"http://klyuchna9:5000/"+ movie.User.Avatar} />
            <div className="div-title-review">{movie.User.Username}</div>
          </div>
          <div className="div-info-review">
            <div className="div-description-review">
              <span className="div-undertitle-review">{formatDate(movie.createdAt)}</span>
              <br />
              <Form>
                <Form.Control
                        style={{ width: '100%', height: '150px', border: 'none', fontSize: '18px', padding: '0px' }}
                        value={movie.Content}
                        as="textarea"
                        readOnly
                />
              </Form>             
            </div>
            <div className="div-buttons-review">
              {(movie.User.User_id === user.userID || user.isAdmin) && (
                <>
                  <Button className="div-button1-review" variant="outline-dark" onClick={() => { openChangeReviewModal(); setReviewText(movie.Content); setReviewId(movie.Review_id) }}>Изменить</Button>
                  <Button className="div-button2-review" variant="outline-dark" onClick={() => { setAcceptShowModal(true) }}>Удалить</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
        <AcceptModal
          let message={'Вы уверены, что хотите удалить этот обзор?'}
          show={showAcceptModal} 
          onHide={(answer) => {
          if(answer) {
            deleteThisReview(movie.Review_id)
          } else {              
            alert('Вы отказались от удаления обзора!')
          }                    
          setAcceptShowModal(false);                      
          }}
        />
    </>
  );
};

export default ReviewItem;