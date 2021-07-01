import json

import selenium
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
import time
from selenium.common.exceptions import ElementClickInterceptedException


"""
Not a Lambda function file. A one time python script to grab and parse data from the UBCO Course Union directory
"""

STUDENT_UNION_BASE_URL = "https://www.ubcsuo.ca"


def parse_club_html_nodes(club_html_nodes):
    clubs = []
    for node in club_html_nodes:
        club_item = {}
        club_item['title'] = node.find("h4").text

        image_link = node.find("img").attrs["src"]
        if image_link == "/sites/all/themes/ubcsuo/gfx/img_club.jpg":
            image_link = f"{STUDENT_UNION_BASE_URL}{image_link}"
        club_item["imageLink"] = image_link

        paragraphs = node.find_all("p")
        club_item["description"] = ""
        if len(paragraphs) == 0:
            club_item["description"] = "None"
        else:
            for index, paragraph in enumerate(paragraphs):
                club_item["description"] = club_item["description"] + paragraphs[index].text + "\n"

        links_node = node.find("ul", {"class": "clearfix"})
        link_list = links_node.find_all("li")
        for link in link_list:
            link_name = link["class"][0][3:]
            if link_name == "email":
                club_item["email"] = link.a.contents[1]
            elif link_name == "facebook":
                if "https://www.facebook.com/" in str(link.a.attrs["href"]):   # Check to ignore broken Facebook links
                    club_item["facebook"] = link.a.attrs["href"]
            else:
                club_item[f"{link_name}"] = link.a.attrs["href"]

        clubs.append(club_item)
    return clubs

def get_course_unions(url):
    letter_list = ["A", "B", "C", "E", "G", "H", "M", "N", "P", "Q", "S", "V"]
    club_jsons = []
    driver = webdriver.Chrome(ChromeDriverManager().install())
    driver.get(url)
    time.sleep(1)
    for index in range(2, 13):
        button = driver.find_element_by_link_text(f"{letter_list[index - 2]}")
        button.click()
        time.sleep(2)
        node = driver.find_element_by_xpath('//*[@id="block-views-club-directory-block-2"]/div/div')
        soup = BeautifulSoup(node.get_attribute('innerHTML'), "html.parser")
        clubs = soup.find_all("div", {"class": "club-item-content"})
        parsed_clubs = parse_club_html_nodes(clubs)
        club_jsons.extend(parsed_clubs)




