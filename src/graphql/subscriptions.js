/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserData = /* GraphQL */ `
  subscription OnCreateUserData {
    onCreateUserData {
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
export const onCreateUserPreference = /* GraphQL */ `
  subscription OnCreateUserPreference {
    onCreateUserPreference {
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
        activism
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
export const onDeleteUserData = /* GraphQL */ `
  subscription OnDeleteUserData {
    onDeleteUserData {
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
export const onDeleteUserPreference = /* GraphQL */ `
  subscription OnDeleteUserPreference {
    onDeleteUserPreference {
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
        activism
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
export const onUpdateUserData = /* GraphQL */ `
  subscription OnUpdateUserData {
    onUpdateUserData {
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
export const onUpdateUserPreference = /* GraphQL */ `
  subscription OnUpdateUserPreference {
    onUpdateUserPreference {
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
        activism
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
export const onCreateBlogsTable = /* GraphQL */ `
  subscription OnCreateBlogsTable($blogId: String) {
    onCreateBlogsTable(blogId: $blogId) {
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
export const onUpdateBlogsTable = /* GraphQL */ `
  subscription OnUpdateBlogsTable($blogId: String) {
    onUpdateBlogsTable(blogId: $blogId) {
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
export const onDeleteBlogsTable = /* GraphQL */ `
  subscription OnDeleteBlogsTable($blogId: String) {
    onDeleteBlogsTable(blogId: $blogId) {
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
export const onCreateNewsTable = /* GraphQL */ `
  subscription OnCreateNewsTable($newsId: String) {
    onCreateNewsTable(newsId: $newsId) {
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
export const onUpdateNewsTable = /* GraphQL */ `
  subscription OnUpdateNewsTable($newsId: String) {
    onUpdateNewsTable(newsId: $newsId) {
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
export const onDeleteNewsTable = /* GraphQL */ `
  subscription OnDeleteNewsTable($newsId: String) {
    onDeleteNewsTable(newsId: $newsId) {
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
export const onCreateClubsTable = /* GraphQL */ `
  subscription OnCreateClubsTable($clubId: String) {
    onCreateClubsTable(clubId: $clubId) {
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
export const onUpdateClubsTable = /* GraphQL */ `
  subscription OnUpdateClubsTable($clubId: String) {
    onUpdateClubsTable(clubId: $clubId) {
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
export const onDeleteClubsTable = /* GraphQL */ `
  subscription OnDeleteClubsTable($clubId: String) {
    onDeleteClubsTable(clubId: $clubId) {
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
export const onCreateEventsTable = /* GraphQL */ `
  subscription OnCreateEventsTable($eventId: String) {
    onCreateEventsTable(eventId: $eventId) {
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
export const onUpdateEventsTable = /* GraphQL */ `
  subscription OnUpdateEventsTable($eventId: String) {
    onUpdateEventsTable(eventId: $eventId) {
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
export const onDeleteEventsTable = /* GraphQL */ `
  subscription OnDeleteEventsTable($eventId: String) {
    onDeleteEventsTable(eventId: $eventId) {
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
export const onCreateAthleticsNewsTable = /* GraphQL */ `
  subscription OnCreateAthleticsNewsTable($newsId: String) {
    onCreateAthleticsNewsTable(newsId: $newsId) {
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
export const onUpdateAthleticsNewsTable = /* GraphQL */ `
  subscription OnUpdateAthleticsNewsTable($newsId: String) {
    onUpdateAthleticsNewsTable(newsId: $newsId) {
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
export const onDeleteAthleticsNewsTable = /* GraphQL */ `
  subscription OnDeleteAthleticsNewsTable($newsId: String) {
    onDeleteAthleticsNewsTable(newsId: $newsId) {
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
