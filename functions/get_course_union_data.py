import selenium
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import ElementClickInterceptedException


"""
Not a Lambda function file. A one time python script to grab and parse data from the UBCO Course Union directory,
but was not used ultimately
"""


driver = webdriver.Chrome(ChromeDriverManager().install())

course_union_url = "https://www.ubcsuo.ca/course-union-directory"

driver.get(course_union_url)
result = driver.find_element_by_xpath('/html/body/div/div[3]/div[5]/div/div[1]/div[2]/div/div/div/div[2]/div/div/div/div/div/div/div/div/div/div/div/div/div/div/div/div[2]/span[3]/a').click()
print(result)

