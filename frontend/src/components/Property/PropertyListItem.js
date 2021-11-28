import { Link } from "react-router-dom";
import "./PropertyListItem.css";
import "font-awesome/css/font-awesome.min.css";
import { Carousel, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PropertListItem(props) {
  const { properties, fav, addToFav, removeFav, user } = props;
 
  const imgUrl =
    properties.thumbnail &&
    properties.thumbnail.map((item, index) => {
      return (
      <Carousel.Item key={index}>
        <img
          className="d-block w-100"
          src={item.image_url}
          alt={item.image_url}
        />
      </Carousel.Item>
      )
    });
  const formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const save = () => {
    addToFav(user.id, properties.id)
      .then(toast.success("Property added to Fav"))
      .catch((error) => console.log(error));
  };

  const remove = () => {
    removeFav(user.id, properties.id)
      .then(toast.success("Property Removed From Fav"))
      .catch((error) => console.log(error));
  };

  return (
    <Col sm>
      <div className="box">
        <div className="top">
          <Carousel interval={null}>
            {imgUrl}
            
          </Carousel>
          {user.id &&
            (fav && fav.includes(properties.id) ? (
              <div className="fav" onClick={remove}>
                <i className="fa fa-star" style={{ color: "red" }}></i>
              </div>
            ) : (
              <div className="fav" onClick={save}>
                <i className="fa fa-star" style={{ color: "white" }}></i>
              </div>
            ))}
        </div>
        <Link
          className="link_to_details"
          to={{
            pathname: `/listing/${properties.id}`,
            key: properties.id,
          }}
        >
          <div className="bottom">
            <h3>{properties.street}</h3>
            <p>
              Enchanting {properties.number_of_bedrooms} bedrooms,{" "}
              {properties.number_of_bathrooms} bath home
            </p>
            <div className="advants">
              <div>
                <span>Bedrooms</span>
                <div>
                  <i className="fa fa-th-large"></i>
                  <span>{properties.number_of_bedrooms}</span>
                </div>
              </div>
              <div>
                <span>Bathrooms</span>
                <div>
                  <i className="fa fa-shower"></i>
                  <span>{properties.number_of_bathrooms}</span>
                </div>
              </div>
              <div>
                <span>Area</span>
                <div>
                  <i className="fa fa-square"></i>
                  <span>
                    {properties.square_footage}
                    <span>Sq Ft</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="price">
              <span>For Sale</span>
              <span>
                {formatter.format(properties.base_price_in_cents / 100)}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </Col>
  );
}
