import React from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FastfoodPreview = ({ name, postaladress, emailadress,phone,createdAt,cover, slug }) =>
  <Card>
    <Card.Header as="h3">
      {name}
    </Card.Header>
    <Card.Body>
      <Image src={cover.url} fluid />
      {postaleadress}
      {emailadress}
      {phone}
      <div>
        <Link to={`/fastfood/${slug}`}>
          <Button variant="primary">Read more...</Button>
        </Link>
      </div>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">
        Published on {new Date(createdAt).toLocaleString('en-EN')}
      </small>
    </Card.Footer>
  </Card>
;

export default FastfoodPreview;