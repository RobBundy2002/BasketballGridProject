import requests #if not working do pip install requests in terminal
import time
from bs4 import BeautifulSoup
import get_proxy

password = "PaSsWoRd_GoEs_HeRe" #change to real proxy password b4 running

def get_power_5_teams(starting_year):
    proxies = get_proxy.get_proxies(password)
    conferences = ['acc', 'sec', 'big-ten', 'big-12', 'pac-12'] #conferences we want to get players from
    for conference in conferences:
        actual_start_year = starting_year
        if (conference == 'big-12') and (starting_year < 1997):
            actual_start_year = 1997
        for year in range(actual_start_year, 2024):
            if conference == 'pac-12' or conference == 'pac-10' or conference == 'pac-8':
                if year < 1979:
                    conference = 'pac-8'
                elif year < 2012:
                    conference = 'pac-10'
                else:
                    conference = 'pac-12'
            print(str(year) + ": " + conference) 
            url = f'https://www.sports-reference.com/cbb/conferences/{conference}/men/{year}.html' #basic conference url per year
            response = requests.get(url, proxies=proxies) #requesting webpage
            while response.status_code != 200: #keep retrying until we get a 200 status
                if response.status_code == 404:
                    print(time.ctime() + "; Status Code: 404; Webpage doesn't exist") 
                    continue #if webpage doesn't exist (404) skip it
                response = requests.get(url, proxies=proxies) 
            soup = BeautifulSoup(response.text, 'html.parser') #get html code as "soup"
            table_id = "standings"
            table = soup.find('table', {'id':table_id}) #find table with id of "standings"
            if table:
                rows = table.find_all('tr') #find all rows in table
                for row in rows[2:]:  #skip the first 2 rows
                    if row:
                        column = row.find('td', {'data-stat': 'school_name'}) #find column with school names
                        if column:
                            link = column.find('a') #find link to school
                            if link:
                                href = link.get('href') #get link to school
                                temp = "https://www.sports-reference.com" + href + '\n'
                                with open('players_urls', 'a') as file:
                                    file.write(temp)
                                print(time.ctime() + "; Added: " + temp)                            
                            else:
                                print(time.ctime() + "; Link aquiring failed")
                        else:
                            print(time.ctime() + "; Couldn't find column")
                    else:
                        print(time.ctime() + "; Couldn't find row")
            else:
                print(time.ctime() + "; Couldn't find table")   
            response.close() #close response         

        
def get_players_for_team(url):
    proxies = get_proxy.get_proxies(password)
    try:
        response = requests.get(url, proxies=proxies) #requesting webpage
    except Exception as e:
        proxies = get_proxy.get_proxies(password)
        response = requests.get(url, proxies=proxies) #requesting webpage
    while response.status_code != 200: #keep retrying until we get a 200 status
        if response.status_code == 404:
            print(time.ctime() + "; Status Code: 404; Webpage doesn't exist")
            continue #if webpage doesn't exist (404) skip it
        try:
            response = requests.get(url, proxies=proxies)
        except Exception as e:
            proxies = get_proxy.get_proxies(password)
            response = requests.get(url, proxies=proxies) #requesting webpage
    soup = BeautifulSoup(response.text, 'html.parser') #get html code as "soup"
    table_id = "roster"
    table = soup.find('table', {'id':table_id}) #find table with id of "roster"
    if table:
        rows = table.find_all('tr') #find all rows in table
        for row in rows[1:]: #skip first row
            if row:
                column = row.find('th', {'data-stat': 'player'}) #find column with player
                if column:
                    link = column.find('a') #find link to player
                    if link:
                        href = link.get('href') #get link to player
                        temp = "https://www.sports-reference.com" + href + '\n'
                        with open('players_urls.txt', 'a') as file:
                            file.write(temp)
                        print(time.ctime() + "; Added: " + temp)
                    else:
                        print(time.ctime() + "; Link aquiring failed")
                else:
                    print(time.ctime() + "; Couldn't find column")
            else:
                print(time.ctime() + "; Couldn't find row")
    else:
        print(time.ctime() + "; Couldn't find table")
    response.close() #close response


def get_player_data(url):
    proxies = get_proxy.get_proxies(password)
    try:
        response = requests.get(url, proxies=proxies) #requesting webpage
    except Exception as e:
        proxies = get_proxy.get_proxies(password)
        response = requests.get(url, proxies=proxies) #requesting webpage
    while response.status_code != 200: #keep retrying until we get a 200 status
        if response.status_code == 404:
            print(time.ctime() + "; Status Code: 404; Webpage doesn't exist")
            continue #if webpage doesn't exist (404) skip it
        try:
            response = requests.get(url, proxies=proxies)
        except Exception as e:
            proxies = get_proxy.get_proxies(password)
            response = requests.get(url, proxies=proxies) #requesting webpage
    soup = BeautifulSoup(response.text, 'html.parser') #get html code as "soup"
    
    player = {}

    if "career_totals" not in player:
        player['career_totals'] = {}

    if "career_averages" not in player:
        player['career_averages'] = {}

    if "season_totals" not in player:
        player['season_totals'] = {}

    if "season_averages" not in player:
        player['season_averages'] = {}

    if "teams" not in player:
        player['teams'] = []

    if "jersey_numbers" not in player:
        player['jersey_numbers'] = []

    # Name
    name = soup.find('h1')
    if name:
        player['name'] = name.get_text().strip()
    else:
        print(time.ctime() + "; Couldn't find name")

    # Height and weight

    # Image?
    top_area = soup.find('div', {'id': 'meta'})
    picture = top_area.find('img')
    if picture:
        link = picture.get('src')
        player['image'] = link

    # List of Teams
    schools = top_area.find_all('a')
    if schools:
        for link in schools:
            team = link.text.replace(' (Men)', '') if ' (Men)' in link.text else link.text
            player['teams'].append(team)

    # Years played (ex: "2019-20")

    # List of Jersey Numbers
    uniforms = soup.find('div', {'class': 'uni_holder'})
    numbers = uniforms.find_all('text')
    if numbers:
        for number in numbers:
            num = int(number.text)
            if num not in player["jersey_numbers"]:
                player["jersey_numbers"].append(num)

    # Career Totals  
    total_stats_table = soup.find('table', {'id': "players_totals"})
    if total_stats_table:
        bottom_area = total_stats_table.find('tfoot')
        if bottom_area:
            rows = bottom_area.find_all('tr')
            career_stats = rows[0].find_all('td') 
            for stat in career_stats:

                # Games played
                if stat['data-stat'] == "games":
                    player["career_totals"]["games_played"] = int(stat.text)

                # Games Started
                if stat['data-stat'] == "games_started":
                    player["career_totals"]["games_started"] = int(stat.text)

                # Minutes Played
                if stat['data-stat'] == "mp":
                    player["career_totals"]["minutes_played"] = int(stat.text)

                # Field Goals Made
                if stat['data-stat'] == "fg":
                    player["career_totals"]["field_goals_made"] = int(stat.text)
                
                # 3 Pointers Made
                if stat['data-stat'] == "fg3":
                    player["career_totals"]["3_point_made"] = int(stat.text)

                # Free Throws Made
                if stat['data-stat'] == "ft":
                    player["career_totals"]["free_throws_made"] = int(stat.text)
                
                # Offensive Rebounds
                if stat['data-stat'] == "orb":
                    player["career_totals"]["offensive_rebounds"] = int(stat.text)
                
                # Defensive Rebounds
                if stat['data-stat'] == "drb":
                    player["career_totals"]["defensive_rebounds"] = int(stat.text)

                # Total Rebounds
                if stat['data-stat'] == "trb":
                    player["career_totals"]["rebounds"] = int(stat.text)
                
                # Assists
                if stat['data-stat'] == "ast":
                    player["career_totals"]["assists"] = int(stat.text)
                
                # Steals
                if stat['data-stat'] == "stl":
                    player["career_totals"]["steals"] = int(stat.text)
                
                # Blocks
                if stat['data-stat'] == "blk":
                    player["career_totals"]["blocks"] = int(stat.text)
                
                # Turnovers
                if stat['data-stat'] == "tov":
                    player["career_totals"]["turnovers"] = int(stat.text)
                
                # Fouls
                if stat['data-stat'] == "pf":
                    player["career_totals"]["fouls"] = int(stat.text)
                
                # Points
                if stat['data-stat'] == "pts":
                    player["career_totals"]["points"] = int(stat.text)
                    
    # Career Averages 
    per_game_stats_table = soup.find('table', {'id': "players_per_game"})
    if per_game_stats_table:
        bottom_area = per_game_stats_table.find('tfoot')
        if bottom_area:
            rows = bottom_area.find_all('tr')
            career_stats = rows[0].find_all('td') 
            for stat in career_stats:

                # Minutes per Game
                if stat['data-stat'] == "mp_per_g":
                    player["career_averages"]["minutes_per_game"] = float(stat.text)

                # Points per Game
                if stat['data-stat'] == "pts_per_g":
                    player["career_averages"]["points_per_game"] = float(stat.text)
                
                # FG per Game
                if stat['data-stat'] == "fg_per_g":
                    player["career_averages"]["fg_per_game"] = float(stat.text)
                
                # FG%
                if stat['data-stat'] == "fg_pct":
                    player["career_averages"]["fg_percentage"] = float(stat.text)
                
                # 3FG per Game
                if stat['data-stat'] == "fg3_per_g":
                    player["career_averages"]["3_point_per_game"] = float(stat.text)
                
                # 3FG%
                if stat['data-stat'] == "fg3_pct":
                    player["career_averages"]["3_point_percentage"] = float(stat.text)
                
                # FT per Game
                if stat['data-stat'] == "ft_per_g":
                    player["career_averages"]["ft_per_game"] = float(stat.text)
                
                # FT%
                if stat['data-stat'] == "ft_pct":
                    player["career_averages"]["ft_percentage"] = float(stat.text)

                # Offensive Rebounds per Game
                if stat['data-stat'] == "orb_per_g":
                    player["career_averages"]["o_rebounds_per_game"] = float(stat.text)
                
                # Defensive Rebounds per Game
                if stat['data-stat'] == "drb_per_g":
                    player["career_averages"]["d_rebounds_per_game"] = float(stat.text)

                # Total Rebounds per Game
                if stat['data-stat'] == "trb_per_g":
                    player["career_averages"]["rebounds_per_game"] = float(stat.text)
                
                # Assists per Game
                if stat['data-stat'] == "ast_per_g":
                    player["career_averages"]["assists_per_game"] = float(stat.text)

                # Blocks per Game
                if stat['data-stat'] == "blk_per_g":
                    player["career_averages"]["blocks_per_game"] = float(stat.text)
                
                # Steals per Game
                if stat['data-stat'] == "stl_per_g":
                    player["career_averages"]["steals_per_game"] = float(stat.text)
                
                # Turnovers per Game
                if stat['data-stat'] == "tov_per_g":
                    player["career_averages"]["turnovers_per_game"] = float(stat.text)
                
                #Fouls per Game
                if stat['data-stat'] == "pf_per_g":
                    player["career_averages"]["fouls_per_game"] = float(stat.text) 

    # Season Totals
    games, games_started, minutes_played, field_goals_made, three_point_made, free_throws_made = 0, 0, 0, 0, 0, 0
    offensive_rebounds, defensive_rebounds, total_rebounds, assists, steals, blocks, turnovers, fouls, points = 0, 0, 0, 0, 0, 0, 0, 0, 0
    if total_stats_table:
        middle_area = total_stats_table.find('tbody')
        if middle_area:
            rows = middle_area.find_all('tr')
            for row in rows:
                columns = row.find_all('td')
                for column in columns:
                    try:
                        stat = int(column.text)
                        
                        # Games Played
                        if column["data-stat"] == "games":
                            if stat > games:
                                games = stat

                        # Games Started
                        if column["data-stat"] == "games_started":
                            if stat > games_started:
                                games_started = stat

                        # Minutes Played
                        if column["data-stat"] == "mp":
                            if stat > minutes_played:
                                minutes_played = stat
                        
                        # Field Goals Made
                        if column["data-stat"] == "fg":
                            if stat > field_goals_made:
                                field_goals_made = stat

                        # 3 Pointers Made
                        if column["data-stat"] == "fg3":
                            if stat > three_point_made:
                                three_point_made = stat
                        
                        # 3 Pointers Made
                        if column["data-stat"] == "ft":
                            if stat > free_throws_made:
                                free_throws_made = stat

                        # Offensive Rebounds
                        if column["data-stat"] == "orb":
                            if stat > offensive_rebounds:
                                offensive_rebounds = stat

                        # Defensive Rebounds
                        if column["data-stat"] == "drb":
                            if stat > defensive_rebounds:
                                defensive_rebounds = stat

                        # Total Rebounds
                        if column["data-stat"] == "trb":
                            if stat > total_rebounds:
                                total_rebounds = stat

                        # Assists
                        if column["data-stat"] == "ast":
                            if stat > assists:
                                assists = stat

                        # Steals
                        if column["data-stat"] == "stl":
                            if stat > steals:
                                steals = stat
                        
                        # Blocks
                        if column["data-stat"] == "blk":
                            if stat > blocks:
                                blocks = stat

                        # Turnovers
                        if column["data-stat"] == "tov":
                            if stat > turnovers:
                                turnovers = stat
                        
                        # Fouls
                        if column["data-stat"] == "pf":
                            if stat > fouls:
                                fouls = stat
                        
                        # Points
                        if column["data-stat"] == "pts":
                            if stat > points:
                                points = stat

                    except Exception:
                        pass
            
            player["season_totals"]["games_played"] = games
            player["season_totals"]["games_started"] = games_started
            player["season_totals"]["minutes_played"] = minutes_played
            player["season_totals"]["field_goals_made"] = field_goals_made
            player["season_totals"]["3_point_made"] = three_point_made
            player["season_totals"]["free_throws_made"] = free_throws_made
            player["season_totals"]["offensive_rebounds"] = offensive_rebounds
            player["season_totals"]["defensive_rebounds"] = defensive_rebounds
            player["season_totals"]["rebounds"] = total_rebounds
            player["season_totals"]["assists"] = assists
            player["season_totals"]["steals"] = steals
            player["season_totals"]["blocks"] = blocks
            player["season_totals"]["turnovers"] = turnovers
            player["season_totals"]["fouls"] = fouls
            player["season_totals"]["points"] = points


    # Season Averages
    mpg, ppg, fg, fgp, tfg, tfgp, ft, ftp, orb, drb, trb, ast, blk, stl, tov, pf = 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    if per_game_stats_table:
        middle_area = per_game_stats_table.find('tbody')
        if middle_area:
            rows = middle_area.find_all('tr')
            for row in rows:
                columns = row.find_all('td')
                for column in columns:
                    try:
                        stat = float(column.text)

                        # Minutes per Game
                        if column["data-stat"] == "mp_per_g":
                            if stat > mpg:
                                mpg = stat

                        # Points per Game
                        if column["data-stat"] == "pts_per_g":
                            if stat > ppg:
                                ppg = stat

                        # FG per Game
                        if column["data-stat"] == "fg_per_g":
                            if stat > fg:
                                fg = stat

                        # FG%
                        if column["data-stat"] == "fg_pct":
                            if stat > fgp:
                                fgp = stat

                        # 3FG per Game
                        if column["data-stat"] == "fg3_per_g":
                            if stat > tfg:
                                tfg = stat

                        # 3FG%
                        if column["data-stat"] == "fg3_pct":
                            if stat > tfgp:
                                tfgp = stat

                        # FT per Game
                        if column["data-stat"] == "ft_per_g":
                            if stat > ft:
                                ft = stat

                        # FT%
                        if column["data-stat"] == "ft_pct":
                            if stat > ftp:
                                ftp = stat

                        # Offensive Rebounds per Game
                        if column["data-stat"] == "orb_per_g":
                            if stat > orb:
                                orb = stat

                        # Defensive Rebounds per Game
                        if column["data-stat"] == "drb_per_g":
                            if stat > drb:
                                drb = stat

                        # Total Rebounds per Game
                        if column["data-stat"] == "trb_per_g":
                            if stat > trb:
                                trb = stat

                        # Assists per Game
                        if column["data-stat"] == "ast_per_g":
                            if stat > ast:
                                ast = stat

                        # Blocks per Game
                        if column["data-stat"] == "blk_per_g":
                            if stat > blk:
                                blk = stat

                        # Steals per Game
                        if column["data-stat"] == "stl_per_g":
                            if stat > stl:
                                stl = stat

                        # Turnovers per Game
                        if column["data-stat"] == "tov_per_g":
                            if stat > tov:
                                tov = stat

                        # Fouls per Game
                        if column["data-stat"] == "pf_per_g":
                            if stat > pf:
                                pf = stat
 
                    except Exception:
                        pass

            player['season_averages']['minutes_per_game'] = mpg
            player['season_averages']['points_per_game'] = ppg
            player["season_averages"]['fg_per_game'] = fg
            player["season_averages"]['fg_percentage'] = fgp
            player["season_averages"]['3_point_per_game'] = tfg
            player["season_averages"]['3_point_percentage'] = tfgp
            player["season_averages"]['ft_per_game'] = ft
            player["season_averages"]['ft_percentage'] = ftp
            player["season_averages"]['o_rebounds_per_game'] = orb
            player["season_averages"]['d_rebounds_per_game'] = drb
            player["season_averages"]['rebounds_per_game'] = trb
            player["season_averages"]['assists_per_game'] = ast
            player["season_averages"]['blocks_per_game'] = blk
            player["season_averages"]['steals_per_game'] = stl
            player["season_averages"]['turnovers_per_game'] = tov
            player["season_averages"]['fouls_per_game'] = pf

    # Game Highs
    #   Might not be possible with the current database

    # Awards


    print(player)
    response.close()


def main():
    # with open("players_urls.txt", 'w') as file:
    #     print("Clearing contents of players_urls") #clearing current file contents
    # with open("teams_urls.txt", 'r') as file:
    #     for line in file:
    #         print(time.ctime() + "; Team: " + line.strip())
    #         get_players_for_team(line.strip())

    get_player_data("https://www.sports-reference.com/cbb/players/armaan-franklin-1.html")

if __name__ == "__main__":
    main()
