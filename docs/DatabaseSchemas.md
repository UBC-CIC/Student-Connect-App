## Database Schemas
<hr>

Here are the schema outlines for the different DynamoDB Tables.
They are not final yet and can be modified as needed to simplify keys or remove information that is not necessary.
All attribute names are in camelCase standard.

### Events Schema
<hr>

```
{
  "eventId": The unique ID for the event,
  "status": All events have "publish" as status so probably whether published or not,
  "dateModified": Last modification date,
  "link": Link to the page on events.ok.ubc.ca,
  "title": Event Title, may include unicode characters in "\uXXXX" format where XXXX is a 4 digit hex code,
  "description": The entire event description, includes HTML Tags,
  "excerpt": Shorter form of the description with HTML Tags,
  "fullImage": Link to event image in full resolution in string format, False if no image included 
  "thumbnailImage": Link to event image in thumbnail resolution in string format, False if no image included 
  "allDay": Boolean representing whether the event is all day or not,
  "startDate": Event start time in "YYYY-MM-DD HH:MM:SS",
  "endDate": Event end time in "YYYY-MM-DD HH:MM:SS",
  "cost": Cost for event in Canadian dollars,
  "categories": [
    List of strings that describe the categories the event falls under
  ],
  "eventLocation": {         // Location for the event. If the event is online, venue key will be "online" and no other keys present
    "venue": Name of building/Location for venue,
    "address": Street Address,
    "city": Name of city,
    "country": Name of country,
    "province": Name of province,
    "zip": Postal Code
  }
}
```

For Example,

```json
{
  "eventId": 11276,
  "status": "publish",
  "dateModified": "2021-04-13 10:02:13",
  "link": "https://events.ok.ubc.ca/event/stand-up-paddle-boarding-lessons/2021-05-23/",
  "title": "Stand-up Paddle Boarding Lessons",
  "description": "<p>Paddle boarding lessons at Kelowna Paddle Centre available from May &#8211; September!</p>\n<p>Learn a new summer activity, or improve your paddle boarding skills so you can be more comfortable on the water this year!</p>\n<p>Each session will consist of 3 lessons that occur each Sunday from 1 &#8211; 2:30 pm. Cost is $45.00 for students and $65.00 for staff.</p>\n<p>Participants are responsible for their transportation to and from Kelowna Paddle Centre on Abbott Street.</p>\n<p><a class=\"btn ok-btn-primary\" href=\"https://ca.apm.activecommunities.com/ubcokanagan/Activity_Search/25772\" target=\"_blank\" rel=\"noopener\">REGISTER NOW</a></p>\n<p>Session 1: May 9, 16, and 23</p>\n<p>Session 2: June 6, 13, and 20</p>\n<p>Session 3: July 11, 18, and 25</p>\n<p>Session 4: August 8, 15, and 22</p>\n<p>Session 5: September 12, 19, and 26</p>\n<p>&nbsp;</p>",
  "excerpt": "<p>Paddle boarding lessons at Kelowna Paddle Centre available from May &#8211; September!</p>",
  "fullImage": "https://events.cms.ok.ubc.ca/wp-content/uploads/sites/121/2021/04/matt-zhou-22qZVcUgD_U-unsplash-1-1-scaled.jpg",
  "thumbnailImage": "https://events.cms.ok.ubc.ca/wp-content/uploads/sites/121/2021/04/matt-zhou-22qZVcUgD_U-unsplash-1-1-300x200.jpg",
  "all_day": false,
  "start_date": "2021-05-23 13:00:00",
  "end_date": "2021-05-23 14:30:00",
  "cost": "$45.00",
  "categories": [
    "Recreation"
  ],
  "event_location": {
    "venue": "Kelowna Paddle Centre",
    "address": "3020 Abbott Street",
    "city": "Kelowna",
    "country": "Canada",
    "province": "BC",
    "zip": "V1Y 1G9"
  }
}
```

### Blog Posts Schema
<hr>

```
{
  "blogId": Unique ID for the Blog,
  "title": Blog Title,
  "date": Blog publish date in format "YYYY-MM-DD HH:MM:SS",
  "link": Link to the blog post on students.ok.ubc.ca,
  "categories": [
    List of strings representing the categories the blog falls under
  ],
  "excerpt": Small description about the blog post, includes HTML Tags,
  "mediaImages": {    // Contains thumnbail images if the blog post has a cover image attached
    "fullImage": Link to full-sized image,
    "mediumImage": Link the medium size crop of the cover image, medium as defined by Wordpress
  }
}
```

For Example,

```json
  {
    "blogId": 23830,
    "title": "Supporting your mental health during COVID-19",
    "date": "2020-03-20 11:42:30",
    "link": "https://students.ok.ubc.ca/?p=23830",
    "categories": [
      "UBCO Life"
    ],
    "excerpt": "<p>Get familiar with some of the online resources available to help you stay mentally and physically healthy.</p>\n",
    "mediaImages": {
      "fullImage": "https://students.cms.ok.ubc.ca/wp-content/uploads/sites/90/2020/03/IMGP3690.jpg",
      "mediumImage": "https://students.cms.ok.ubc.ca/wp-content/uploads/sites/90/2020/03/IMGP3690-300x199.jpg"
    }
  }
```

### News Schema
<hr>

```
{
  "newsId": Unique ID for the News post,
  "title": News title, may contain unicode characters in "\uXXXX" format where XXXX is a 4 digit hex code,
  "link": Link to the news article on news.ok.ubc.ca,
  "categories": [
    String list of categories the news article falls under
  ],
  "summary": Short description of the article, may also contain unicode characters in "\uXXXX" format,
  "dateModified": Date of publishing in the sample format, "YYYY-MM-DD HH:MM:SS",
  "mediaThumbnail": [              // Will only contain one image
    {
      "url": Link to a medium sized cover image for the article,
      "width": Image width in pixels,
      "height": Image height in pixels
    }
  ]
}
```

For Example,

```json
  {
    "newsId": "19171",
    "title": "UBCO researcher uses geology to help astronomers find habitable planets",
    "link": "https://news.ok.ubc.ca/?p=19171",
    "categories": [
      "Media Releases",
      "Spotlight",
      "Geology",
      "Irving K. Barber Faculty of Science",
      "Research"
    ],
    "summary": "Astronomers have identified more than 4,000, and counting, confirmed exoplanets \u2014 planets orbiting stars other than the sun \u2014 but only a fraction have the potential to sustain life.",
    "dateModified": "2021-05-04 14:00:22",
    "mediaThumbnail": [
      {
        "url": "https://news.ok.ubc.ca/wp-content/uploads/2021/04/earth-1200-225x225.jpg",
        "width": "225",
        "height": "225"
      }
    ]
  }
```

### Clubs and Course Union Schema
<hr>

```
{
  "title": Title for the club,
  "image_link": Link to the club cover image on ubcsuo.ca,
  "description": Description for the club. May contain additional links to their portals such as Instagram, Youtube or LinkedIn,
  "email": Email address for the club. This key is always present,
  "facebook": Facebook link to the club's portal. This key is optional,
  "twitter": Twitter link for the club. This key is optional,
  "website": Website the for the club. This key is optional
}
```

For Example,

```json
  {
    "title": "Enactus UBCO",
    "image_link": "https://www.ubcsuo.ca/sites/default/files/styles/club_image/public/clubs/enactus-logo-clipart-2_1.png?itok=qDOLxGOz",
    "description": "Enactus is a combination of 3 words that help tell the story of the organization. 'En' stands for 'entrepreneurial' because we use the entrepreneurial spirit to see opportunity in problems and create\nsolutions. 'Act' stands for 'action.' This is because Enactus students don't just talk about what they\nwish we could do; we take action to improve the world around us. The end of the word, 'us' represents\nthe organization as a group of students, educators business leaders who all work together to change the\nworld. Enactus has an important focus on the development of its student members. As members we are\nable to network with business leaders and learn up-to-date business and leadership skills at training\nconferences that are held throughout the year by the Enactus organization. Our projects allow us to step\noutside the comfort of the classroom to apply our knowledge to real solutions that affect real people.\nThis hands-on learning approach is key as we seek opportunities, brainstorm solutions and carry them\nout. When you join Enactus, you are not just in another student organization. You are applying the skills\nyou have learned in class to positively impact the world. In organizing and carrying out projects, we\nbrainstorm ideas, work as a team and can develop leadership skills. At competitions, we get practice in\npublic speaking and networking.",
    "facebook": "https://www.facebook.com/enactusubco/",
    "email": "enactus.ubcok@gmail.com",
    "website": "http://www.enactusubco.ca/"
  }
```