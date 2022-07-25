import React from 'react';
import {Text, Card, Button, Icon} from '@rneui/themed';

export default class UserPostList extends React.Component {
  state = {
    posts: [],
  };

  render() {
    return this.props.posts.map(post => (
      <Card key={post.id}>
        <Card.Title>{post.title}</Card.Title>
        <Card.Divider />
        <Text>{post.body}</Text>
      </Card>
    ));
  }
}
