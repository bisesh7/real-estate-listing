import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    suburb: "",
    price_min: "",
    price_max: "",
    beds: "",
    baths: "",
    type: "",
  });

  const fetchProperties = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await axios.get(
        `http://localhost:5001/api/listings?${query}`,
      );
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Property Listings</h1>

      <Form className="mb-4" onSubmit={handleSearch}>
        <Row className="g-2">
          <Col md>
            <Form.Control
              placeholder="Suburb"
              name="suburb"
              value={filters.suburb}
              onChange={handleFilterChange}
            />
          </Col>
          <Col md>
            <Form.Control
              type="number"
              placeholder="Min Price"
              name="price_min"
              value={filters.price_min}
              onChange={handleFilterChange}
            />
          </Col>
          <Col md>
            <Form.Control
              type="number"
              placeholder="Max Price"
              name="price_max"
              value={filters.price_max}
              onChange={handleFilterChange}
            />
          </Col>
          <Col md>
            <Form.Control
              type="number"
              placeholder="Beds"
              name="beds"
              value={filters.beds}
              onChange={handleFilterChange}
            />
          </Col>
          <Col md>
            <Form.Control
              type="number"
              placeholder="Baths"
              name="baths"
              value={filters.baths}
              onChange={handleFilterChange}
            />
          </Col>
          <Col md>
            <Form.Control
              placeholder="Type"
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
            />
          </Col>
          <Col md="auto">
            <Button type="submit" variant="primary">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      <Row xs={1} md={2} lg={3} className="g-4">
        {properties.length === 0 && <p>No properties found</p>}
        {properties.map((p) => (
          <Col key={p.id}>
            <Card>
              <Card.Body>
                <Card.Title>{p.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {p.suburb} | {p.type}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Price:</strong> Rs. {p.price}
                  <br />
                  <strong>Beds:</strong> {p.beds} | <strong>Baths:</strong>{" "}
                  {p.baths}
                </Card.Text>
                <Link to={`/listings/${p.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
