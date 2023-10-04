from bs4 import BeautifulSoup
import requests
import sys
import json
from time import sleep
import get_proxy
'''
This program gets a all teams from a conference and saves them into a json file year by year.
Ask me for the password
'''
# writes to a file named "confrence_year.txt"
n = len(sys.argv)
if n == 1:
    print("<confrence abbr>" "proxy password")

    sys.exit()
confrence = sys.argv[1].lower()
confrence = confrence[:-5]
global password
password = sys.argv[2]
if ".txt" in password:
    with open(f"{password}","r") as file:
        password = file.readline().strip()

print()

def teams_getter(url,year,data):
    proxies = get_proxy.get_proxies(password)
    response=requests.get(url,proxies=proxies)
    if response.status_code == 200:
        html = response.text
    else:
        print(response.status_code,"why?")
        return data
    data[year] = []
    soup = BeautifulSoup(html,'html.parser')
    table_id = "standings"
    table = soup.find('table',{'id':table_id})
    for row in table.find_all('tr'):
        for cell in row.find_all('td',{'data-stat':'school_name'}):
            data[year].append(cell.text)
    year -= 1
    print(f"Currently on year {year}")
    return teams_getter(f"https://www.sports-reference.com/cbb/conferences/{confrence}/men/{year}.html",year,data)

year = 2023
url = f"https://www.sports-reference.com/cbb/conferences/{confrence}/men/{year}.html"
data = {}
print(url)
teams_getter(url,year,data)
with open(f"{confrence}.json","w") as json_file:
    json.dump(data,json_file)
