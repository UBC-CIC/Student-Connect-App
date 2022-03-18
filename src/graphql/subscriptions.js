/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDocuments = /* GraphQL */ `
  subscription OnCreateDocuments {
    onCreateDocuments {
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
export const onUpdateDocuments = /* GraphQL */ `
  subscription OnUpdateDocuments {
    onUpdateDocuments {
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
export const onDeleteDocuments = /* GraphQL */ `
  subscription OnDeleteDocuments {
    onDeleteDocuments {
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
export const onCreateUserPreference = /* GraphQL */ `
  subscription OnCreateUserPreference {
    onCreateUserPreference {
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
export const onUpdateUserPreference = /* GraphQL */ `
  subscription OnUpdateUserPreference {
    onUpdateUserPreference {
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
export const onDeleteUserPreference = /* GraphQL */ `
  subscription OnDeleteUserPreference {
    onDeleteUserPreference {
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
export const onCreateUserData = /* GraphQL */ `
  subscription OnCreateUserData {
    onCreateUserData {
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
export const onUpdateUserData = /* GraphQL */ `
  subscription OnUpdateUserData {
    onUpdateUserData {
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
export const onDeleteUserData = /* GraphQL */ `
  subscription OnDeleteUserData {
    onDeleteUserData {
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
export const onCreateSavedItemsTable = /* GraphQL */ `
  subscription OnCreateSavedItemsTable {
    onCreateSavedItemsTable {
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
export const onUpdateSavedItemsTable = /* GraphQL */ `
  subscription OnUpdateSavedItemsTable {
    onUpdateSavedItemsTable {
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
export const onDeleteSavedItemsTable = /* GraphQL */ `
  subscription OnDeleteSavedItemsTable {
    onDeleteSavedItemsTable {
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
