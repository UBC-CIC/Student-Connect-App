/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserPreference = /* GraphQL */ `
  mutation CreateUserPreference(
    $input: CreateUserPreferenceInput!
    $condition: ModeluserPreferenceConditionInput
  ) {
    createUserPreference(input: $input, condition: $condition) {
      id
      newsBlogsClubsPreference {
        academics
        activism
        culture
        careerDevelopment
        gradSchool
        healthAndWellbeing
        research
        recreation
        religion
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
        business
        computerScience
        engineering
        biology
        chemistry
        physics
        psychology
        economics
        science
        statistics
        mathematics
        philosophy
        history
      }
      eventsPreference {
        subjectDepartments
        studentServices
        faculties
        universityServices
      }
      emailNotification
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateUserPreference = /* GraphQL */ `
  mutation UpdateUserPreference(
    $input: UpdateUserPreferenceInput!
    $condition: ModeluserPreferenceConditionInput
  ) {
    updateUserPreference(input: $input, condition: $condition) {
      id
      newsBlogsClubsPreference {
        academics
        activism
        culture
        careerDevelopment
        gradSchool
        healthAndWellbeing
        research
        recreation
        religion
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
        business
        computerScience
        engineering
        biology
        chemistry
        physics
        psychology
        economics
        science
        statistics
        mathematics
        philosophy
        history
      }
      eventsPreference {
        subjectDepartments
        studentServices
        faculties
        universityServices
      }
      emailNotification
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteUserPreference = /* GraphQL */ `
  mutation DeleteUserPreference(
    $input: DeleteUserPreferenceInput!
    $condition: ModeluserPreferenceConditionInput
  ) {
    deleteUserPreference(input: $input, condition: $condition) {
      id
      newsBlogsClubsPreference {
        academics
        activism
        culture
        careerDevelopment
        gradSchool
        healthAndWellbeing
        research
        recreation
        religion
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
        business
        computerScience
        engineering
        biology
        chemistry
        physics
        psychology
        economics
        science
        statistics
        mathematics
        philosophy
        history
      }
      eventsPreference {
        subjectDepartments
        studentServices
        faculties
        universityServices
      }
      emailNotification
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createUserData = /* GraphQL */ `
  mutation CreateUserData(
    $input: CreateUserDataInput!
    $condition: ModeluserDataConditionInput
  ) {
    createUserData(input: $input, condition: $condition) {
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
export const updateUserData = /* GraphQL */ `
  mutation UpdateUserData(
    $input: UpdateUserDataInput!
    $condition: ModeluserDataConditionInput
  ) {
    updateUserData(input: $input, condition: $condition) {
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
export const deleteUserData = /* GraphQL */ `
  mutation DeleteUserData(
    $input: DeleteUserDataInput!
    $condition: ModeluserDataConditionInput
  ) {
    deleteUserData(input: $input, condition: $condition) {
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
