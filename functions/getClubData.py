import json

import requests
from bs4 import BeautifulSoup

"""
Not a Lambda function file. A one time python script to grab and parse data from the UBCO Club directory
"""

student_union_base_url = "https://www.ubcsuo.ca"
student_union_clubs_url = "https://www.ubcsuo.ca/club-directory"
student_union_clubs_directory = "https://www.ubcsuo.ca/club-directory-listing"

club_listing = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
                "l", "m", "n", "p", "r", "s", "t", "u", "v", "w", "y"]


def parse_club_html_nodes(club_html_nodes):
    clubs = []
    for node in club_html_nodes:
        club_item = {}
        club_item['title'] = node.find("h4").text
        image_link = node.find("img").attrs['src']
        if image_link == "/sites/all/themes/ubcsuo/gfx/img_club.jpg":
            image_link = f"{student_union_base_url}{image_link}"
        club_item['image_link'] = image_link
        paragraphs = node.find_all("p")
        if len(paragraphs) == 0:
            club_item['description'] = "None"
        else:
            club_item['description'] = paragraphs[0].text
        # club_item['description'] = node.find_all("p")[0].text
        links_node = node.find("ul", {"class": "clearfix"})
        link_list = links_node.find_all("li")
        for link in link_list:
            link_name = link['class'][0][3:]
            if link_name == 'email':
                club_item["email"] = link.a.contents[1]
            elif link_name == 'facebook':
                if "https://www.facebook.com/" in str(link.a.attrs["href"]):
                    club_item["facebook"] = link.a.attrs["href"]
            else:
                club_item[f"{link_name}"] = link.a.attrs["href"]

        clubs.append(club_item)
    return clubs


def get_club_data(url):
    club_result = []
    club_html_nodes = []
    for letter in club_listing:
        directory_url = f"{url}/{letter}"
        html_result = requests.get(directory_url).text
        html_soup = BeautifulSoup(html_result, "html.parser")
        links_block = html_soup.find("div", {"class": "view-content"})
        club_links = links_block.find_all("a")
        for club_link in club_links:
            club_page_url = f"{student_union_base_url}{club_link.attrs['href']}"
            club_html = requests.get(club_page_url).text
            club_soup = BeautifulSoup(club_html, "html.parser")
            club_html_nodes.append(club_soup.find("div", {"class": "club-item-content"}))

        club_result.extend(parse_club_html_nodes(club_html_nodes))
    return club_result


# clubs = get_club_data(student_union_clubs_directory)
# with open("../parsed_data/newResult.json", "w") as file:
#     file.write(json.dumps(clubs, indent=3))
