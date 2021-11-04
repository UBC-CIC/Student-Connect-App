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
        baseball
        basketball
        crew
        crossCountry
        fieldHockey
        football
        golf
        iceHockey
        lacrosse
        skiing
        soccer
        softball
        squash
        swimming
        tennis
        trackAndField
        volleyball
        wrestling
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
        baseball
        basketball
        crew
        crossCountry
        fieldHockey
        football
        golf
        iceHockey
        lacrosse
        skiing
        soccer
        softball
        squash
        swimming
        tennis
        trackAndField
        volleyball
        wrestling
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
        baseball
        basketball
        crew
        crossCountry
        fieldHockey
        football
        golf
        iceHockey
        lacrosse
        skiing
        soccer
        softball
        squash
        swimming
        tennis
        trackAndField
        volleyball
        wrestling
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
      gender
      cisOrTrans
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
      gender
      cisOrTrans
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
      gender
      cisOrTrans
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createSavedItemsTable = /* GraphQL */ `
  mutation CreateSavedItemsTable(
    $input: CreateSavedItemsTableInput!
    $condition: ModelsavedItemsTableConditionInput
  ) {
    createSavedItemsTable(input: $input, condition: $condition) {
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
export const updateSavedItemsTable = /* GraphQL */ `
  mutation UpdateSavedItemsTable(
    $input: UpdateSavedItemsTableInput!
    $condition: ModelsavedItemsTableConditionInput
  ) {
    updateSavedItemsTable(input: $input, condition: $condition) {
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
export const deleteSavedItemsTable = /* GraphQL */ `
  mutation DeleteSavedItemsTable(
    $input: DeleteSavedItemsTableInput!
    $condition: ModelsavedItemsTableConditionInput
  ) {
    deleteSavedItemsTable(input: $input, condition: $condition) {
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
