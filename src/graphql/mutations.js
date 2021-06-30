/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserData = /* GraphQL */ `
  mutation CreateUserData(
    $condition: ModeluserDataConditionInput
    $input: CreateUserDataInput!
  ) {
    createUserData(condition: $condition, input: $input) {
      SPUID
      campus
      createdAt
      displayName
      email
      id
      owner
      primarySpecialization
      updatedAt
      yearLevel
    }
  }
`;
export const createUserPreference = /* GraphQL */ `
  mutation CreateUserPreference(
    $condition: ModeluserPreferenceConditionInput
    $input: CreateUserPreferenceInput!
  ) {
    createUserPreference(condition: $condition, input: $input) {
      SPUID
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
      createdAt
      emailNotification
      eventsPreference {
        faculties
        studentServices
        subjectDepartments
        universityServices
      }
      sportsPreference {
        mensSportsInterest
        womensSportsInterest
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
      id
      newsBlogsClubsPreference {
        academics
        actvism
        careerDevelopment
        culture
        gradSchool
        healthAndWellbeing
        recreation
        religion
        research
      }
      owner
      updatedAt
    }
  }
`;
export const deleteUserData = /* GraphQL */ `
  mutation DeleteUserData(
    $condition: ModeluserDataConditionInput
    $input: DeleteUserDataInput!
  ) {
    deleteUserData(condition: $condition, input: $input) {
      SPUID
      campus
      createdAt
      displayName
      email
      id
      owner
      primarySpecialization
      updatedAt
      yearLevel
    }
  }
`;
export const deleteUserPreference = /* GraphQL */ `
  mutation DeleteUserPreference(
    $condition: ModeluserPreferenceConditionInput
    $input: DeleteUserPreferenceInput!
  ) {
    deleteUserPreference(condition: $condition, input: $input) {
      SPUID
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
      createdAt
      emailNotification
      eventsPreference {
        faculties
        studentServices
        subjectDepartments
        universityServices
      }
      sportsPreference {
        mensSportsInterest
        womensSportsInterest
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
      id
      newsBlogsClubsPreference {
        academics
        actvism
        careerDevelopment
        culture
        gradSchool
        healthAndWellbeing
        recreation
        religion
        research
      }
      owner
      updatedAt
    }
  }
`;
export const updateUserData = /* GraphQL */ `
  mutation UpdateUserData(
    $condition: ModeluserDataConditionInput
    $input: UpdateUserDataInput!
  ) {
    updateUserData(condition: $condition, input: $input) {
      SPUID
      campus
      createdAt
      displayName
      email
      id
      owner
      primarySpecialization
      updatedAt
      yearLevel
    }
  }
`;
export const updateUserPreference = /* GraphQL */ `
  mutation UpdateUserPreference(
    $condition: ModeluserPreferenceConditionInput
    $input: UpdateUserPreferenceInput!
  ) {
    updateUserPreference(condition: $condition, input: $input) {
      SPUID
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
      createdAt
      emailNotification
      eventsPreference {
        faculties
        studentServices
        subjectDepartments
        universityServices
      }
      sportsPreference {
        mensSportsInterest
        womensSportsInterest
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
      id
      newsBlogsClubsPreference {
        academics
        actvism
        careerDevelopment
        culture
        gradSchool
        healthAndWellbeing
        recreation
        religion
        research
      }
      owner
      updatedAt
    }
  }
`;
export const createBlogsTable = /* GraphQL */ `
  mutation CreateBlogsTable($input: CreateBlogsTableInput!) {
    createBlogsTable(input: $input) {
      blogId
      categories
      date
      excerpt
      link
      mediaImages {
        fullImage
        mediumImage
      }
      title
    }
  }
`;
export const updateBlogsTable = /* GraphQL */ `
  mutation UpdateBlogsTable($input: UpdateBlogsTableInput!) {
    updateBlogsTable(input: $input) {
      blogId
      categories
      date
      excerpt
      link
      mediaImages {
        fullImage
        mediumImage
      }
      title
    }
  }
`;
export const deleteBlogsTable = /* GraphQL */ `
  mutation DeleteBlogsTable($input: DeleteBlogsTableInput!) {
    deleteBlogsTable(input: $input) {
      blogId
      categories
      date
      excerpt
      link
      mediaImages {
        fullImage
        mediumImage
      }
      title
    }
  }
`;
export const createNewsTable = /* GraphQL */ `
  mutation CreateNewsTable($input: CreateNewsTableInput!) {
    createNewsTable(input: $input) {
      categories
      dateModified
      link
      mediaThumbnail {
        height
        url
        width
      }
      newsId
      summary
      title
    }
  }
`;
export const updateNewsTable = /* GraphQL */ `
  mutation UpdateNewsTable($input: UpdateNewsTableInput!) {
    updateNewsTable(input: $input) {
      categories
      dateModified
      link
      mediaThumbnail {
        height
        url
        width
      }
      newsId
      summary
      title
    }
  }
`;
export const deleteNewsTable = /* GraphQL */ `
  mutation DeleteNewsTable($input: DeleteNewsTableInput!) {
    deleteNewsTable(input: $input) {
      categories
      dateModified
      link
      mediaThumbnail {
        height
        url
        width
      }
      newsId
      summary
      title
    }
  }
`;
export const createClubsTable = /* GraphQL */ `
  mutation CreateClubsTable($input: CreateClubsTableInput!) {
    createClubsTable(input: $input) {
      categories
      clubId
      description
      email
      facebook
      imageLink
      title
      twitter
      website
    }
  }
`;
export const updateClubsTable = /* GraphQL */ `
  mutation UpdateClubsTable($input: UpdateClubsTableInput!) {
    updateClubsTable(input: $input) {
      categories
      clubId
      description
      email
      facebook
      imageLink
      title
      twitter
      website
    }
  }
`;
export const deleteClubsTable = /* GraphQL */ `
  mutation DeleteClubsTable($input: DeleteClubsTableInput!) {
    deleteClubsTable(input: $input) {
      categories
      clubId
      description
      email
      facebook
      imageLink
      title
      twitter
      website
    }
  }
`;
export const createEventsTable = /* GraphQL */ `
  mutation CreateEventsTable($input: CreateEventsTableInput!) {
    createEventsTable(input: $input) {
      allDay
      categories
      cost
      dateModified
      description
      endDate
      eventId
      eventLocation {
        address
        city
        country
        province
        venue
        zip
      }
      excerpt
      fullImage
      link
      startDate
      status
      thumbnailImage
      title
    }
  }
`;
export const updateEventsTable = /* GraphQL */ `
  mutation UpdateEventsTable($input: UpdateEventsTableInput!) {
    updateEventsTable(input: $input) {
      allDay
      categories
      cost
      dateModified
      description
      endDate
      eventId
      eventLocation {
        address
        city
        country
        province
        venue
        zip
      }
      excerpt
      fullImage
      link
      startDate
      status
      thumbnailImage
      title
    }
  }
`;
export const deleteEventsTable = /* GraphQL */ `
  mutation DeleteEventsTable($input: DeleteEventsTableInput!) {
    deleteEventsTable(input: $input) {
      allDay
      categories
      cost
      dateModified
      description
      endDate
      eventId
      eventLocation {
        address
        city
        country
        province
        venue
        zip
      }
      excerpt
      fullImage
      link
      startDate
      status
      thumbnailImage
      title
    }
  }
`;
export const createAthleticsNewsTable = /* GraphQL */ `
  mutation CreateAthleticsNewsTable($input: CreateAthleticsNewsTableInput!) {
    createAthleticsNewsTable(input: $input) {
      newsId
      title
      link
      summary
      mediaThumbnail
      categories
      dateModified
    }
  }
`;
export const updateAthleticsNewsTable = /* GraphQL */ `
  mutation UpdateAthleticsNewsTable($input: UpdateAthleticsNewsTableInput!) {
    updateAthleticsNewsTable(input: $input) {
      newsId
      title
      link
      summary
      mediaThumbnail
      categories
      dateModified
    }
  }
`;
export const deleteAthleticsNewsTable = /* GraphQL */ `
  mutation DeleteAthleticsNewsTable($input: DeleteAthleticsNewsTableInput!) {
    deleteAthleticsNewsTable(input: $input) {
      newsId
      title
      link
      summary
      mediaThumbnail
      categories
      dateModified
    }
  }
`;
