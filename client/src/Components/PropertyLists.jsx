import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Pagination,
} from "react-bootstrap";

export default function PropertyList({ user }) {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    suburb: "",
    price_min: "",
    price_max: "",
    beds: "",
    baths: "",
    type: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  // Fetch properties with current filters and page
  const fetchProperties = async (page = 1, currentFilters = filters) => {
    try {
      const query = new URLSearchParams({
        ...currentFilters,
        page,
        limit: pagination.limit,
      }).toString();
      const res = await axios.get(
        `http://localhost:5001/api/listings?${query}`,
      );

      setProperties(res.data.properties || []);
      setPagination((prev) => ({
        ...prev,
        page: res.data.page || page,
        total: res.data.total || 0,
      }));
    } catch (err) {
      console.error("Failed to fetch properties:", err);
    }
  };

  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties(1, filters);
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Property Listings</h1>

      {/* Filters */}
      <Form className="mb-4" onSubmit={handleSearch}>
        <Row className="g-2">
          {["suburb", "price_min", "price_max", "beds", "baths", "type"].map(
            (f, i) => (
              <Col md key={i}>
                <Form.Control
                  placeholder={f.replace("_", " ").toUpperCase()}
                  name={f}
                  type={
                    f.includes("price") || f === "beds" || f === "baths"
                      ? "number"
                      : "text"
                  }
                  value={filters[f]}
                  onChange={handleFilterChange}
                />
              </Col>
            ),
          )}
          <Col md="auto">
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>

      {/* Property Cards */}
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
                  Price: Rs. {p.price}
                  <br />
                  Beds: {p.beds} | Baths: {p.baths}
                </Card.Text>
                <Link to={`/listings/${p.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-4">
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i}
              active={i + 1 === pagination.page}
              onClick={() => fetchProperties(i + 1, filters)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </Container>
  );
}
