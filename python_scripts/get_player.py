from bs4 import BeautifulSoup

import os
import json

'''
given a directory of players and their text files saves player data to a single data.json file
'''


player_names = os.listdir('players/')
def get_player(name):
    player = name.strip().replace(" ","-")
    with open(f'players/{name}', 'r') as file:
        # Read the entire contents of the file into a string
        html = file.read()

    # idea is to get the players awards, get the player's stats total and highest stats 
   
   
    
    player = {"teams":[],"awards":[],"career_stats":{},"high_stats":{},"game_high_stats":{},"jersey":""}
   
    
    soup = BeautifulSoup(html,'html.parser')
    
    p_tags = soup.find_all('p')
  
    p_tags_with_text = soup.find_all('p', text=lambda text: text and "School:" in text)


    for p in p_tags_with_text:
        
        a_tags = p.find_all('a')
        for a in a_tags:
            print(a.text)
            #player["teams"].append(a.text[:-6])
            

    table = soup.find('table',{'id':"players_per_game"})
    if table != None:
        tfoot = table.find('tfoot')
        if tfoot != None:
            rows = tfoot.find_all('tr')
    

        # getting carrear stats
            stats = rows[0].find_all('td')
            for stat in stats:
                if stat.text != '':
                    if stat['data-stat'] == "games":
                        player["career_stats"]["gp"] = int(stat.text)
                    if stat['data-stat'] == "games_started":
                        player["career_stats"]["gs"] = int(stat.text)
                    if stat['data-stat'] == "mp_per_g":
                        player["career_stats"]["mpg"] = float(stat.text)
                    if stat['data-stat'] == "pts_per_g":
                        player["career_stats"]["ppg"] = float(stat.text)
                    if stat['data-stat'] == "fg_pct":
                        player["career_stats"]["fgp"] = float(stat.text)
                    if stat['data-stat'] == "fg3_pct":
                        player["career_stats"]["3fgp"] = float(stat.text)
                    if stat['data-stat'] == "ft_pct":
                        player["career_stats"]["ftp"] = float(stat.text)
                    if stat['data-stat'] == "blk_per_g":
                        player["career_stats"]["bpg"] = float(stat.text)
                    if stat['data-stat'] == "stl_per_g":
                        player["career_stats"]["spg"] = float(stat.text)

    bling = soup.find('ul',id='bling')
    if bling:
        awards = bling.find_all('li')
        for award in awards:
            player["awards"].append(award.text)

    jerseys = soup.find_all(class_="jersey")

    for j in jerseys:
     
        player["jersey"] = int(j.text.strip())
    
    print(player)
    return player

data = []
for name in player_names:
    data.append({"name":name[:-4].replace("-"," "),"data":get_player(name)})

with open('data.json',"w") as file:
    json.dump(data,file)


