# get the player page given some file options

from bs4 import BeautifulSoup
import requests
import sys
import json
import get_proxy
import re

n = len(sys.argv)
if n == 1:
    print("<confrense.json>" "proxy password")
    sys.exit()
file = sys.argv[1].lower()
with open(sys.argv[1].lower(),"r") as json_file:
    file = json.load(json_file)
global password
password = sys.argv[2]
def get_rosters(data):
    
   
    for year in data.keys():
        for team in data[year]:

            if team == "Miami (FL)":
                team = "miami-fl"

            elif team == "NC State":
                team = "north-carolina-state"
         
            team = team.lower().replace(" ","-")
            print(team)
            url = f"https://www.sports-reference.com/cbb/schools/{team}/men/{year}.html"

            proxies = get_proxy.get_proxies(password)
            response=requests.get(url,proxies=proxies)
           
            if response.status_code == 200:
                html = response.text
                soup = BeautifulSoup(html,'html.parser')

                table_id = "roster"
                table = soup.find('table',{'id':table_id})
                tbody = table.find('tbody')

                names = tbody.find_all(attrs={"data-stat":"player"})
                for name in names:
                    name = name.text.strip().replace(" ","-")
                    player = get_player(name)
                    if player != 0:
                        print(f"adding {name}")
                
                        with open(f'players/{name}.txt','w') as file:
                            file.write(player)

                
               
            else:
                print("status code",response.status_code)
       

def same_player(name,text):

    try:

        with open(f'players/{name}.txt', 'r') as file:
            text = file.read()

    except FileNotFoundError:
        return 0
    return f"n:</strong>" in text           
   
def get_player(name):
    # idea is to get the players awards, get the player's stats total and highest stats 
    proxies = get_proxy.get_proxies(password)
    player = name.strip().lower().replace(" ","-")
    url = f"https://www.sports-reference.com/cbb/players/{player}-1.html"


   
    response=requests.get(url,proxies=proxies)
    if response.status_code == 200:
        text = response.text 
    #same_player(name,text)
        return response.text
    
    else:
        if response.status_code == 404:
            print("404 trying again")
            player.split("-")
            name = f"{player[1]}-{player[0]}"
            
            if get_player(name) != 404:
                get_player(name)
        else:
            print(response.status_code)
            return 0


get_rosters(file)

   