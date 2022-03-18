/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getESDocuments = /* GraphQL */ `
  query GetESDocuments($index: String!, $categories: String!) {
    getESDocuments(index: $index, categories: $categories)
  }
`;
export const fetchAllDocuments = /* GraphQL */ `
  query FetchAllDocuments($docType: String!) {
    fetchAllDocuments(docType: $docType)
  }
`;
export const getDocuments = /* GraphQL */ `
  query GetDocuments($documentType: String!, $documentId: String!) {
    getDocuments(documentType: $documentType, documentId: $documentId) {
      documentType
      documentId
      content
      allDay
      categories
      cost
      dateModified
      startDate
      link
      description
      excerpt
      thumbnailImage
      title
      createdAt
      updatedAt
    }
  }
`;
export const listDocumentss = /* GraphQL */ `
  query ListDocumentss(
    $documentType: String
    $documentId: ModelStringKeyConditionInput
    $filter: ModeldocumentsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDocumentss(
      documentType: $documentType
      documentId: $documentId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        documentType
        documentId
        content
        allDay
        categories
        cost
        dateModified
        startDate
        link
        description
        excerpt
        thumbnailImage
        title
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserPreference = /* GraphQL */ `
  query GetUserPreference($id: ID!) {
    getUserPreference(id: $id) {
      id
      newsBlogsClubsPreference {
        academics
        activism
        careers
        culture
        gradSchool
        healthAndWellbeing
        recreation
        religion
        research
        sports
      }
      sportsPreference {
        varsitySportsList {
          basketball
          crossCountry
          golf
          soccer
          trackAndField
          volleyball
        }
        competitiveSportsList {
          rugby
          softball
          ultimate
        }
      }
      academicPreference {
        arts
        biology
        business
        chemistry
        computerScience
        economics
        engineering
        history
        mathematics
        philosophy
        physics
        psychology
        science
        statistics
      }
      eventsPreference {
        faculties
        studentServices
        subjectDepartments
        universityServices
      }
      culturePreference {
        northAmerican
        southAmerican
        european
        african
        australian
        asian
      }
      emailNotification
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUserPreferences = /* GraphQL */ `
  query ListUserPreferences(
    $filter: ModeluserPreferenceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserPreferences(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        newsBlogsClubsPreference {
          academics
          activism
          careers
          culture
          gradSchool
          healthAndWellbeing
          recreation
          religion
          research
          sports
        }
        academicPreference {
          arts
          biology
          business
          chemistry
          computerScience
          economics
          engineering
          history
          mathematics
          philosophy
          physics
          psychology
          science
          statistics
        }
        eventsPreference {
          faculties
          studentServices
          subjectDepartments
          universityServices
        }
        culturePreference {
          northAmerican
          southAmerican
          european
          african
          australian
          asian
        }
        emailNotification
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getUserData = /* GraphQL */ `
  query GetUserData($id: ID!) {
    getUserData(id: $id) {
      id
      SPUID
      displayName
      yearLevel
      email
      primarySpecialization
      campus
      faculty
      gender
      cisOrTrans
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUserDatas = /* GraphQL */ `
  query ListUserDatas(
    $filter: ModeluserDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserDatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        SPUID
        displayName
        yearLevel
        email
        primarySpecialization
        campus
        faculty
        gender
        cisOrTrans
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getSavedItemsTable = /* GraphQL */ `
  query GetSavedItemsTable($id: ID!) {
    getSavedItemsTable(id: $id) {
      id
      savedItems {
        title
        image
        link
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listSavedItemsTables = /* GraphQL */ `
  query ListSavedItemsTables(
    $filter: ModelsavedItemsTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSavedItemsTables(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        savedItems {
          title
          image
          link
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
