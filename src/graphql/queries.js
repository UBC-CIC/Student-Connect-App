/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listEventsTables = /* GraphQL */ `
  query ListEventsTables(
    $filter: TableEventsTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEventsTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        eventId
        status
        dateModified
        link
        title
        description
        excerpt
        fullImage
        thumbnailImage
        allDay
        startDate
        endDate
        cost
        categories
        eventLocation {
          venue
          address
          city
          country
          province
          zip
        }
      }
      nextToken
    }
  }
`;
export const listNewsTables = /* GraphQL */ `
  query ListNewsTables(
    $filter: TableNewsTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNewsTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        newsId
        title
        link
        categories
        summary
        dateModified
        mediaThumbnail {
          url
          width
          height
        }
      }
      nextToken
    }
  }
`;
export const listBlogsTables = /* GraphQL */ `
  query ListBlogsTables(
    $filter: TableBlogsTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogsTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        blogId
        title
        date
        link
        categories
        excerpt
        mediaImages {
          fullImage
          mediumImage
        }
      }
      nextToken
    }
  }
`;
export const listClubsTables = /* GraphQL */ `
  query ListClubsTables(
    $filter: TableClubsTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClubsTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        clubId
        title
        imageLink
        description
        email
        facebook
        twitter
        website
        categories
      }
      nextToken
    }
  }
`;
