/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRequest = /* GraphQL */ `
  subscription OnCreateRequest($filter: ModelSubscriptionRequestFilterInput) {
    onCreateRequest(filter: $filter) {
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
export const onUpdateRequest = /* GraphQL */ `
  subscription OnUpdateRequest($filter: ModelSubscriptionRequestFilterInput) {
    onUpdateRequest(filter: $filter) {
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
export const onDeleteRequest = /* GraphQL */ `
  subscription OnDeleteRequest($filter: ModelSubscriptionRequestFilterInput) {
    onDeleteRequest(filter: $filter) {
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
export const onCreateResponse = /* GraphQL */ `
  subscription OnCreateResponse($filter: ModelSubscriptionResponseFilterInput) {
    onCreateResponse(filter: $filter) {
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
export const onUpdateResponse = /* GraphQL */ `
  subscription OnUpdateResponse($filter: ModelSubscriptionResponseFilterInput) {
    onUpdateResponse(filter: $filter) {
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
export const onDeleteResponse = /* GraphQL */ `
  subscription OnDeleteResponse($filter: ModelSubscriptionResponseFilterInput) {
    onDeleteResponse(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
    onCreateComment(filter: $filter) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
    onUpdateComment(filter: $filter) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
    onDeleteComment(filter: $filter) {
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
export const onCreateReply = /* GraphQL */ `
  subscription OnCreateReply($filter: ModelSubscriptionReplyFilterInput) {
    onCreateReply(filter: $filter) {
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
export const onUpdateReply = /* GraphQL */ `
  subscription OnUpdateReply($filter: ModelSubscriptionReplyFilterInput) {
    onUpdateReply(filter: $filter) {
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
export const onDeleteReply = /* GraphQL */ `
  subscription OnDeleteReply($filter: ModelSubscriptionReplyFilterInput) {
    onDeleteReply(filter: $filter) {
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
