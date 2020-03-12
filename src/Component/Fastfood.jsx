import React, { Component } from './node_modules/react';
import Axios from './node_modules/axios';

const makeQuery = (slug) => `
query MyQuery {
  fastfood(filter: {slug: {eq: "${slug}"}}) {
    createdAt
    id
    title
    content
    slug
  }
}`;

export default class Fastfood extends Component {
  state = {
    data: null,
  }

  componentDidMount = () => {
    const slug = this.props.match.params.slug;
    const query = makeQuery(slug);

    Axios.post(
      // GraphQL endpoint
      'https://graphql.datocms.com/',
      // Requête GraphQL
      { query },
      // Options pour authentifier notre requête
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_DATOCMS_API_KEY}`,
        } 
      },
    )
    .then(response => {
      if (response.data.hasOwnProperty('errors')) {
        for (let error of response.data.errors) {
          console.error('Error while querying GraphQL API:', error.message);
        }
      } else {
        const { data } = response.data;
        this.setState({ data });
      }
    })
    .catch(error => console.error(error));
  }

  render = () => {
    const { data } = this.state;

    if (data === null) {
      return <div>Loading...</div>;
    }

    const { fastfood } = data;

    return (
      <fastfood>
        <h1>{fastfood.title}</h1>
        <p>{fastfood.content}</p>
      </fastfood>
    );
  }
}