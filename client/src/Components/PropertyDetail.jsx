import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Spinner } from "react-bootstrap";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:5001/api/listings/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setProperty(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) return <Spinner />;

  return (
    <Card className="m-4 p-4">
      <h2>{property.title}</h2>
      <p>{property.description}</p>

      <hr />

      <p>
        <strong>Price:</strong> Rs. {property.price}
      </p>
      <p>
        <strong>Beds:</strong> {property.beds}
      </p>
      <p>
        <strong>Baths:</strong> {property.baths}
      </p>
      <p>
        <strong>Suburb:</strong> {property.suburb}
      </p>
      <p>
        <strong>Type:</strong> {property.type}
      </p>

      <hr />

      <h5>Agent Info</h5>
      <p>
        <strong>Name:</strong> {property.Agent?.name}
      </p>
      <p>
        <strong>Email:</strong> {property.Agent?.email}
      </p>

      {/* 🔥 Only shows if admin */}
      {property.internalNotes && (
        <>
          <hr />
          <h5>Internal Notes</h5>
          <p>{property.internalNotes}</p>
        </>
      )}
    </Card>
  );
};

export default PropertyDetail;
