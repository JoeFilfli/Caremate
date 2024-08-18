/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRequest = /* GraphQL */ `
  query GetRequest($id: ID!) {
    getRequest(id: $id) {
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
export const listRequests = /* GraphQL */ `
  query ListRequests(
    $filter: ModelRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getResponse = /* GraphQL */ `
  query GetResponse($id: ID!) {
    getResponse(id: $id) {
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
export const listResponses = /* GraphQL */ `
  query ListResponses(
    $filter: ModelResponseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResponses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        postID
        authorID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getReply = /* GraphQL */ `
  query GetReply($id: ID!) {
    getReply(id: $id) {
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
export const listReplies = /* GraphQL */ `
  query ListReplies(
    $filter: ModelReplyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReplies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        commentID
        authorID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const requestsBySeniorIDAndId = /* GraphQL */ `
  query RequestsBySeniorIDAndId(
    $seniorID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    requestsBySeniorIDAndId(
      seniorID: $seniorID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const requestsByVolunteerIDAndId = /* GraphQL */ `
  query RequestsByVolunteerIDAndId(
    $volunteerID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    requestsByVolunteerIDAndId(
      volunteerID: $volunteerID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const responsesByRequestIDAndId = /* GraphQL */ `
  query ResponsesByRequestIDAndId(
    $requestID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelResponseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    responsesByRequestIDAndId(
      requestID: $requestID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const responsesByVolunteerIDAndId = /* GraphQL */ `
  query ResponsesByVolunteerIDAndId(
    $volunteerID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelResponseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    responsesByVolunteerIDAndId(
      volunteerID: $volunteerID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const postsByAuthorIDAndId = /* GraphQL */ `
  query PostsByAuthorIDAndId(
    $authorID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByAuthorIDAndId(
      authorID: $authorID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const commentsByPostIDAndId = /* GraphQL */ `
  query CommentsByPostIDAndId(
    $postID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByPostIDAndId(
      postID: $postID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        postID
        authorID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const commentsByAuthorIDAndId = /* GraphQL */ `
  query CommentsByAuthorIDAndId(
    $authorID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByAuthorIDAndId(
      authorID: $authorID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        postID
        authorID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const repliesByCommentIDAndId = /* GraphQL */ `
  query RepliesByCommentIDAndId(
    $commentID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReplyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    repliesByCommentIDAndId(
      commentID: $commentID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        commentID
        authorID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const repliesByAuthorIDAndId = /* GraphQL */ `
  query RepliesByAuthorIDAndId(
    $authorID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReplyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    repliesByAuthorIDAndId(
      authorID: $authorID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        commentID
        authorID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
