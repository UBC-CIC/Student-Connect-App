/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserPreference = /* GraphQL */ `
  query GetUserPreference($id: ID!) {
    getUserPreference(id: $id) {
      id
      newsBlogsClubsPreference {
        academics
        activism
        careerDevelopment
        culture
        gradSchool
        healthAndWellbeing
        recreation
        religion
        research
        sports
      }
      sportsPreference {
        mensSportsList {
          baseball
          basketball
          crew
          crossCountry
          football
          golf
          iceHockey
          lacrosse
          skiing
          soccer
          squash
          swimmingAndDriving
          tennis
          trackAndField
          wrestling
        }
        womensSportsList {
          basketball
          crew
          crossCountry
          fieldHockey
          golf
          iceHockey
          lacrosse
          skiing
          soccer
          softball
          squash
          swimmingAndDriving
          tennis
          trackAndField
          volleyball
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
          careerDevelopment
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
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getSavedItems = /* GraphQL */ `
  query GetSavedItems($id: ID!) {
    getSavedItems(id: $id) {
      id
      title
      image
      link
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listSavedItemss = /* GraphQL */ `
  query ListSavedItemss(
    $filter: ModelsavedItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSavedItemss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        image
        link
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
