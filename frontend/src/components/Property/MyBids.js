import PropertListItem from "./PropertyListItem";
import "./PropertyList.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import { useContext } from "react";
import { propertyContext } from "../../providers/PropertyProvider";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MyBids() {
  const [bids, setBids] = useState([]);

  const { state: contextState } = useContext(propertyContext);

  const user = contextState.loggedUser;

  useEffect(() => {
    axios
      .get("/api/properties/properties/myBids")
      .then((response) => {
        setBids([...response.data]);
      })
      .catch((error) => console.log(error));
  }, []);

  const bidList = bids.map((item, index) => (
    <PropertListItem key={index} properties={item} user={user} />
  ));

  return (
    <>
      <Container>
        <h2>My bids list </h2>
        <h2>
          <hr />
        </h2>
        <div className="property-list">
          <Row>
            {bidList.length === 0 && <div>nothing to show</div>}
            {bidList}
          </Row>
        </div>
      </Container>
    </>
  );
}
