/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRequest = /* GraphQL */ `
  mutation CreateRequest(
    $input: CreateRequestInput!
    $condition: ModelRequestConditionInput
  ) {
    createRequest(input: $input, condition: $condition) {
      id
      name
      title
      description
      date
      location
      seniorID
      volunteerID
      status
      country
      locale
      seniorFeedback
      volunteerFeedback
      responses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      picture
      pictures
      rate
      volunteerName
      urgent
      tags
      compensations
      __typename
    }
  }
`;
export const updateRequest = /* GraphQL */ `
  mutation UpdateRequest(
    $input: UpdateRequestInput!
    $condition: ModelRequestConditionInput
  ) {
    updateRequest(input: $input, condition: $condition) {
      id
      name
      title
      description
      date
      location
      seniorID
      volunteerID
      status
      country
      locale
      seniorFeedback
      volunteerFeedback
      responses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      picture
      pictures
      rate
      volunteerName
      urgent
      tags
      compensations
      __typename
    }
  }
`;
export const deleteRequest = /* GraphQL */ `
  mutation DeleteRequest(
    $input: DeleteRequestInput!
    $condition: ModelRequestConditionInput
  ) {
    deleteRequest(input: $input, condition: $condition) {
      id
      name
      title
      description
      date
      location
      seniorID
      volunteerID
      status
      country
      locale
      seniorFeedback
      volunteerFeedback
      responses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      picture
      pictures
      rate
      volunteerName
      urgent
      tags
      compensations
      __typename
    }
  }
`;
export const createResponse = /* GraphQL */ `
  mutation CreateResponse(
    $input: CreateResponseInput!
    $condition: ModelResponseConditionInput
  ) {
    createResponse(input: $input, condition: $condition) {
      id
      requestID
      volunteerID
      message
      createdAt
      email
      name
      x1
      updatedAt
      __typename
    }
  }
`;
export const updateResponse = /* GraphQL */ `
  mutation UpdateResponse(
    $input: UpdateResponseInput!
    $condition: ModelResponseConditionInput
  ) {
    updateResponse(input: $input, condition: $condition) {
      id
      requestID
      volunteerID
      message
      createdAt
      email
      name
      x1
      updatedAt
      __typename
    }
  }
`;
export const deleteResponse = /* GraphQL */ `
  mutation DeleteResponse(
    $input: DeleteResponseInput!
    $condition: ModelResponseConditionInput
  ) {
    deleteResponse(input: $input, condition: $condition) {
      id
      requestID
      volunteerID
      message
      createdAt
      email
      name
      x1
      updatedAt
      __typename
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      birthdate
      phone_number
      locale
      email
      name
      country
      picture
      role
      description
      rating
      counter
      posts {
        nextToken
        __typename
      }
      comments {
        nextToken
        __typename
      }
      replies {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      birthdate
      phone_number
      locale
      email
      name
      country
      picture
      role
      description
      rating
      counter
      posts {
        nextToken
        __typename
      }
      comments {
        nextToken
        __typename
      }
      replies {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      birthdate
      phone_number
      locale
      email
      name
      country
      picture
      role
      description
      rating
      counter
      posts {
        nextToken
        __typename
      }
      comments {
        nextToken
        __typename
      }
      replies {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      title
      content
      authorID
      author {
        id
        username
        birthdate
        phone_number
        locale
        email
        name
        country
        picture
        role
        description
        rating
        counter
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      comments {
        nextToken
        __typename
      }
      pictures
      likes
      tags
      likedBy
      __typename
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      title
      content
      authorID
      author {
        id
        username
        birthdate
        phone_number
        locale
        email
        name
        country
        picture
        role
        description
        rating
        counter
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      comments {
        nextToken
        __typename
      }
      pictures
      likes
      tags
      likedBy
      __typename
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      title
      content
      authorID
      author {
        id
        username
        birthdate
        phone_number
        locale
        email
        name
        country
        picture
        role
        description
        rating
        counter
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      comments {
        nextToken
        __typename
      }
      pictures
      likes
      tags
      likedBy
      __typename
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      content
      postID
      post {
        id
        title
        content
        authorID
        createdAt
        updatedAt
        pictures
        likes
        tags
        likedBy
        __typename
      }
      authorID
      author {
        id
        username
        birthdate
        phone_number
        locale
        email
        name
        country
        picture
        role
        description
        rating
        counter
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      replies {
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      content
      postID
      post {
        id
        title
        content
        authorID
        createdAt
        updatedAt
        pictures
        likes
        tags
        likedBy
        __typename
      }
      authorID
      author {
        id
        username
        birthdate
        phone_number
        locale
        email
        name
        country
        picture
        role
        description
        rating
        counter
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      replies {
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      content
      postID
      post {
        id
        title
        content
        authorID
        createdAt
        updatedAt
        pictures
        likes
        tags
        likedBy
        __typename
      }
      authorID
      author {
        id
        username
        birthdate
        phone_number
        locale
        email
        name
        country
        picture
        role
        description
        rating
        counter
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      replies {
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const createReply = /* GraphQL */ `
  mutation CreateReply(
    $input: CreateReplyInput!
    $condition: ModelReplyConditionInput
  ) {
    createReply(input: $input, condition: $condition) {
      id
      content
      commentID
      comment {
        id
        content
        postID
        authorID
        createdAt
        updatedAt
        __typename
      }
      authorID
      author {
        id
        username
        birthdate
        phone_number
        locale
        email
        name
        country
        picture
        role
        description
        rating
        counter
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateReply = /* GraphQL */ `
  mutation UpdateReply(
    $input: UpdateReplyInput!
    $condition: ModelReplyConditionInput
  ) {
    updateReply(input: $input, condition: $condition) {
      id
      content
      commentID
      comment {
        id
        content
        postID
        authorID
        createdAt
        updatedAt
        __typename
      }
      authorID
      author {
        id
        username
        birthdate
        phone_number
        locale
        email
        name
        country
        picture
        role
        description
        rating
        counter
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteReply = /* GraphQL */ `
  mutation DeleteReply(
    $input: DeleteReplyInput!
    $condition: ModelReplyConditionInput
  ) {
    deleteReply(input: $input, condition: $condition) {
      id
      content
      commentID
      comment {
        id
        content
        postID
        authorID
        createdAt
        updatedAt
        __typename
      }
      authorID
      author {
        id
        username
        birthdate
        phone_number
        locale
        email
        name
        country
        picture
        role
        description
        rating
        counter
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
