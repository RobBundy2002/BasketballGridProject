import requests #if not working do pip install requests in terminal
import time
from bs4 import BeautifulSoup
import get_proxy
import json

password = "OXJesus4Me" #change to real proxy password b4 running

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
        response = requests.get(url) #requesting webpage
    except Exception as e:
        proxies = get_proxy.get_proxies(password)
        response = requests.get(url) #requesting webpage
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

    # Name
    name = soup.find('h1')
    if name:
        player['name'] = name.get_text().strip()
    else:
        print(time.ctime() + "; Couldn't find name")

    if "teams" not in player:
        player['teams'] = []

    if "conferences" not in player:
        player['conferences'] = []
    
    if "years-played" not in player:
        player['years-played'] = []
    
    if "jersey_numbers" not in player:
        player['jersey_numbers'] = []

    # Image
    top_area = soup.find('div', {'id': 'meta'})
    picture = top_area.find('img')
    if picture:
        link = picture.get('src')
        player['image'] = link
    else:
        player['image'] = 'none'


    # List of Jersey Numbers
    uniforms = soup.find('div', {'class': 'uni_holder'})
    numbers = uniforms.find_all('text')
    if numbers:
        for number in numbers:
            num = int(number.text)
            if num not in player["jersey_numbers"]:
                player["jersey_numbers"].append(num)


    # Career Totals 
    if "career_totals" not in player:
        player['career_totals'] = {} 
    total_stats_table = soup.find('table', {'id': "players_totals"})
    if total_stats_table:
        bottom_area = total_stats_table.find('tfoot')
        if bottom_area:
            rows = bottom_area.find_all('tr')
            career_stats = rows[0].find_all('td') 
            for stat in career_stats:

                # Games played
                if stat['data-stat'] == "games":
                    try:
                        player["career_totals"]["games_played"] = int(stat.text)
                    except Exception:
                        player["career_totals"]["games_played"] = 0

                # Games Started
                if stat['data-stat'] == "games_started":
                    try:
                        player["career_totals"]["games_started"] = int(stat.text)
                    except Exception:
                        player["career_totals"]["games_started"] = 0

                # Minutes Played
                if stat['data-stat'] == "mp":
                    try:
                        player["career_totals"]["minutes_played"] = int(stat.text)
                    except Exception:
                        player["career_totals"]["minutes_played"] = 0

                # Field Goals Made
                if stat['data-stat'] == "fg":
                    try:
                        player["career_totals"]["field_goals_made"] = int(stat.text)
                    except Exception:
                        player["career_totals"]["field_goals_made"] = 0
                
                # 3 Pointers Made
                if stat['data-stat'] == "fg3":
                    try:
                        player["career_totals"]["3_point_made"] = int(stat.text)
                    except Exception:
                        player["career_totals"]["3_point_made"] = 0

                # Free Throws Made
                if stat['data-stat'] == "ft":
                    try:
                        player["career_totals"]["free_throws_made"] = int(stat.text)
                    except Exception:
                        player["career_totals"]["free_throws_made"] = 0
                
                # Offensive Rebounds
                if stat['data-stat'] == "orb":
                    try:
                        player["career_totals"]["offensive_rebounds"] = int(stat.text)
                    except Exception:
                        player["career_totals"]["offensive_rebounds"] = 0
                
                # Defensive Rebounds
                if stat['data-stat'] == "drb":
                    try:
                        player["career_totals"]["defensive_rebounds"] = int(stat.text)
                    except Exception:
                        player["career_totals"]["defensive_rebounds"] = 0

                # Total Rebounds
                if stat['data-stat'] == "trb":
                    try:
                        player["career_totals"]["rebounds"] = int(stat.text)
                    except Exception:
                        player["career_totals"]["rebounds"] = 0
                
                # Assists
                if stat['data-stat'] == "ast":
                    try:
                        player["career_totals"]["assists"] = int(stat.text)
                    except Exception:
                        player["career_totals"]["assists"] = 0
                
                # Steals
                if stat['data-stat'] == "stl":
                    try:
                        player["career_totals"]["steals"] = int(stat.text)
                    except Exception:
                        player["career_totals"]["steals"] = 0
                
                # Blocks
                if stat['data-stat'] == "blk":
                    try:
                        player["career_totals"]["blocks"] = int(stat.text)
                    except Exception:
                        player["career_totals"]["blocks"] = 0
                
                # Turnovers
                if stat['data-stat'] == "tov":
                    try:
                        player["career_totals"]["turnovers"] = int(stat.text)
                    except Exception:
                        player["career_totals"]["turnovers"] = 0
                
                # Fouls
                if stat['data-stat'] == "pf":
                    try:
                        player["career_totals"]["fouls"] = int(stat.text)
                    except Exception:
                        player["career_totals"]["fouls"] = 0
                
                # Points
                if stat['data-stat'] == "pts":
                    try:
                        player["career_totals"]["points"] = int(stat.text)
                    except Exception:
                        player["career_totals"]["points"] = 0


    # Career Averages 
    if "career_averages" not in player:
        player['career_averages'] = {}
    per_game_stats_table = soup.find('table', {'id': "players_per_game"})
    if per_game_stats_table:
        bottom_area = per_game_stats_table.find('tfoot')
        if bottom_area:
            rows = bottom_area.find_all('tr')
            career_stats = rows[0].find_all('td') 
            for stat in career_stats:

                # Minutes per Game
                if stat['data-stat'] == "mp_per_g":
                    try:
                        player["career_averages"]["minutes_per_game"] = float(stat.text)
                    except Exception:
                        player["career_averages"]["minutes_per_game"] = 0

                # Points per Game
                if stat['data-stat'] == "pts_per_g":
                    try:
                        player["career_averages"]["points_per_game"] = float(stat.text)
                    except Exception:
                        player["career_averages"]["points_per_game"] = 0
                
                # FG per Game
                if stat['data-stat'] == "fg_per_g":
                    try:
                        player["career_averages"]["fg_per_game"] = float(stat.text)
                    except Exception:
                        player["career_averages"]["fg_per_game"] = 0
                
                # FG%
                if stat['data-stat'] == "fg_pct":
                    try:
                        player["career_averages"]["fg_percentage"] = float(stat.text)
                    except Exception:
                        player["career_averages"]["fg_percentage"] = 0
                
                # 3FG per Game
                if stat['data-stat'] == "fg3_per_g":
                    try:
                        player["career_averages"]["3_point_per_game"] = float(stat.text)
                    except Exception:
                        player["career_averages"]["3_point_per_game"] = 0
                
                # 3FG%
                if stat['data-stat'] == "fg3_pct":
                    try:
                        player["career_averages"]["3_point_percentage"] = float(stat.text)
                    except Exception:
                        player["career_averages"]["3_point_percentage"] = 0
                
                # FT per Game
                if stat['data-stat'] == "ft_per_g":
                    try:
                        player["career_averages"]["ft_per_game"] = float(stat.text)
                    except Exception:
                        player["career_averages"]["ft_per_game"] = 0
                
                # FT%
                if stat['data-stat'] == "ft_pct":
                    try:
                        player["career_averages"]["ft_percentage"] = float(stat.text)
                    except Exception:
                        player["career_averages"]["ft_percentage"] = 0

                # Offensive Rebounds per Game
                if stat['data-stat'] == "orb_per_g":
                    try:
                        player["career_averages"]["o_rebounds_per_game"] = float(stat.text)
                    except Exception:
                        player["career_averages"]["o_rebounds_per_game"] = 0
                
                # Defensive Rebounds per Game
                if stat['data-stat'] == "drb_per_g":
                    try:
                        player["career_averages"]["d_rebounds_per_game"] = float(stat.text)
                    except Exception:
                        player["career_averages"]["d_rebounds_per_game"] = 0

                # Total Rebounds per Game
                if stat['data-stat'] == "trb_per_g":
                    try:
                        player["career_averages"]["rebounds_per_game"] = float(stat.text)
                    except Exception:
                        player["career_averages"]["rebounds_per_game"] = 0
                
                # Assists per Game
                if stat['data-stat'] == "ast_per_g":
                    try:
                        player["career_averages"]["assists_per_game"] = float(stat.text)
                    except Exception:
                        player["career_averages"]["assists_per_game"] = 0

                # Blocks per Game
                if stat['data-stat'] == "blk_per_g":
                    try:
                        player["career_averages"]["blocks_per_game"] = float(stat.text)
                    except Exception:
                        player["career_averages"]["blocks_per_game"] = 0
                
                # Steals per Game
                if stat['data-stat'] == "stl_per_g":
                    try:
                        player["career_averages"]["steals_per_game"] = float(stat.text)
                    except Exception:
                        player["career_averages"]["steals_per_game"] = 0
                
                # Turnovers per Game
                if stat['data-stat'] == "tov_per_g":
                    try:
                        player["career_averages"]["turnovers_per_game"] = float(stat.text)
                    except Exception:
                        player["career_averages"]["turnovers_per_game"] = 0
                
                #Fouls per Game
                if stat['data-stat'] == "pf_per_g":
                    try:
                        player["career_averages"]["fouls_per_game"] = float(stat.text)
                    except Exception:
                        player["career_averages"]["fouls_per_game"] = 0


    # Season Totals
    if "season_totals" not in player:
        player['season_totals'] = {}
    games, games_started, minutes_played, field_goals_made, three_point_made, free_throws_made = 0, 0, 0, 0, 0, 0
    offensive_rebounds, defensive_rebounds, total_rebounds, assists, steals, blocks, turnovers, fouls, points = 0, 0, 0, 0, 0, 0, 0, 0, 0
    if total_stats_table:
        middle_area = total_stats_table.find('tbody')
        if middle_area:
            rows = middle_area.find_all('tr')
            for row in rows:
                columns = row.find_all('td')
                for column in columns:
                    
                    # List of Schools
                    if column['data-stat'] == "school_name":
                        if column.text not in player["teams"]:
                            player["teams"].append(column.text)

                    # Conferences
                    if column['data-stat'] == "conf_abbr":
                        if column.text not in player["conferences"]:
                            player["conferences"].append(column.text)

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
    if "season_averages" not in player:
        player['season_averages'] = {}
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


    # Years played (ex: "2019-20")
    if total_stats_table:
        middle_area = per_game_stats_table.find('tbody')
        if middle_area:
            rows = middle_area.find_all('tr')
            for row in rows:
                left_column = row.find('th')
                link = left_column.find('a')
                if link.text not in player["years-played"]:
                    player["years-played"].append(link.text)


    # Awards
    if "awards" not in player:
        player['awards'] = {}
    champion =  soup.find('li', {'class': "important special"})
    if champion:
        # National Champion
        player['awards']['national-champion'] = True
    else:
        player["awards"]['national-champion'] = False
    
    player["awards"]['ncaa-tournament-mop'] = False
    player["awards"]['ncaa-all-tournament'] = False
    player["awards"]['ncaa-all-region'] = False
    player["awards"]["ap-poy"] = False
    player["awards"]["consensus-all-america"] = False
    player["awards"]['wooden-award'] = False
    player["awards"]['naismith-award'] = False
    player["awards"]['conference-poy'] = False
    player["awards"]['all-conference-team'] = False
    player["awards"]['conference-dpoy'] = False
    player["awards"]['all-conference-defense'] = False
    player["awards"]['conference-roy'] = False
    player["awards"]['all-conference-tournament'] = False
    player["awards"]['conference-tournament-mvp'] = False
    awards = soup.find('ul', {'id': 'bling'})
    if awards:
        awards_list = awards.find_all('li')
        for award in awards_list:
            link = award.find('a')

            # NCAA Tournament Most Outstanding Player
            if "NCAA Tourney MOP" in link.text:
                player["awards"]['ncaa-tournament-mop'] = True

            # All NCAA Tournament
            if "NCAA All-Tourney" in link.text:
                player["awards"]['ncaa-all-tournament'] = True

            # All NCAA Tournament All-Region
            if "NCAA All-Region" in link.text:
                player["awards"]['ncaa-all-region'] = True

            # AP Player of the Year
            if "AP POY" in link.text:
                player["awards"]["ap-poy"] = True

            # Consensus All America
            if "Consensus AA" in link.text:
                player["awards"]["consensus-all-america"] = True
            
            # Wooden Award
            if "Wooden Award" in link.text:
                player["awards"]['wooden-award'] = True

            # Naismith Award
            if "Naismith Award" in link.text:
                player["awards"]['naismith-award'] = True

            # Conference POY
            if "ACC POY" in link.text:
                player["awards"]['conference-poy'] = True
            if "Big 12 POY" in link.text:
                player["awards"]['conference-poy'] = True
            if "Big Ten POY" in link.text:
                player["awards"]['conference-poy'] = True
            if "Pac-12 POY" in link.text:
                player["awards"]['conference-poy'] = True
            if "Pac-10 POY" in link.text:
                player["awards"]['conference-poy'] = True
            if "SEC POY" in link.text:
                player["awards"]['conference-poy'] = True
            
            # Conference All-Team
            if "All-ACC" in link.text and "Tourney" not in link.text:
                player["awards"]['all-conference-team'] = True
            if "All-Big 12" in link.text and "Tourney" not in link.text:
                player["awards"]['all-conference-team'] = True
            if "All-Big Ten" in link.text and "Tourney" not in link.text:
                player["awards"]['all-conference-team'] = True
            if "All-Pac-12" in link.text and "Tourney" not in link.text:
                player["awards"]['all-conference-team'] = True
            if "All-SEC" in link.text and "Tourney" not in link.text:
                player["awards"]['all-conference-team'] = True

            # Conference DPOY
            if "ACC DPOY" in link.text:
                player["awards"]['conference-dpoy'] = True
            if "Big 12 DPOY" in link.text:
                player["awards"]['conference-dpoy'] = True
            if "Big Ten DPOY" in link.text:
                player["awards"]['conference-dpoy'] = True
            if "Pac-12 DPOY" in link.text:
                player["awards"]['conference-dpoy'] = True
            if "SEC DPOY" in link.text:
                player["awards"]['conference-dpoy'] = True

            # Conference All-Defense
            if "ACC All-Defense" in link.text:
                player["awards"]['all-conference-defense'] = True
            if "Big 12 All-Defense" in link.text:
                player["awards"]['all-conference-defense'] = True
            if "Big Ten All-Defense" in link.text:
                player["awards"]['all-conference-defense'] = True
            if "Pac-12 All-Defense" in link.text:
                player["awards"]['all-conference-defense'] = True
            if "SEC All-Defense" in link.text:
                player["awards"]['all-conference-defense'] = True
            
            # Conference ROY
            if "ACC ROY" in link.text:
                player["awards"]['conference-roy'] = True
            if "Big 12 ROY" in link.text:
                player["awards"]['conference-roy'] = True
            if "Big Ten ROY" in link.text:
                player["awards"]['conference-roy'] = True
            if "Pac-12 ROY" in link.text:
                player["awards"]['conference-roy'] = True
            if "Pac-10 ROY" in link.text:
                player["awards"]['conference-roy'] = True
            if "SEC ROY" in link.text:
                player["awards"]['conference-roy'] = True
            
            # Conference All-Tourney
            if "All-ACC Tourney" in link.text:
                player["awards"]['all-conference-tournament'] = True
            if "All-Big 12 Tourney" in link.text:
                player["awards"]['all-conference-tournament'] = True
            if "All-Big Ten Tourney" in link.text:
                player["awards"]['all-conference-tournament'] = True
            if "All-Pac-12 Tourney" in link.text:
                player["awards"]['all-conference-tournament'] = True
            if "All-SEC Tourney" in link.text:
                player["awards"]['all-conference-tournament'] = True

            # Conference Tourney MVP
            if "ACC Tourney MVP" in link.text:
                player["awards"]['conference-tournament-mvp'] = True
            if "Big 12 Tourney MVP" in link.text:
                player["awards"]['conference-tournament-mvp'] = True
            if "Big Ten Tourney MVP" in link.text:
                player["awards"]['conference-tournament-mvp'] = True
            if "Pac-12 Tourney MVP" in link.text:
                player["awards"]['conference-tournament-mvp'] = True
            if "SEC Tourney MVP" in link.text:
                player["awards"]['conference-tournament-mvp'] = True


    # Drafted to NBA
    player["drafted"] = False
    strong_tags = top_area.find_all('strong')
    for tag in strong_tags:
        if "Draft" in tag.text:
            player["drafted"] = True

    with open("player_data.json", 'a') as json_file:
        json.dump(player, json_file, indent=2)
        json_file.write(',')

    response.close()


def get_all_player_urls():
    with open("players_urls.txt", 'w') as file:
        print("Clearing contents of players_urls")
    with open("teams_urls.txt", 'r') as file:
        for line in file:
            print(time.ctime() + "; Team: " + line.strip())
            get_players_for_team(line.strip())


def getting_all_player_data():
    with open("player_data.json", 'w') as json_file:
        json_file.truncate()
        print("Clearing contents of player_data")

    with open("player_data.json", 'a') as json_file:
        json_file.write('[\n')
    
    with open("players_urls_no_duplicates.txt", 'r') as file:
        i = 0
        for line in file:
            i += 1
            print(time.ctime() + "; Player " + str(i) + ": "  + line.strip())
            get_player_data(line.strip())

    with open("player_data.json", 'r+') as json_file:
            json_file.seek(0, 2)
            end_position = json_file.tell()
            json_file.seek(end_position - 1)
            json_file.truncate()

    with open("player_data.json", 'a') as json_file:
        json_file.write('\n]')


def main():
    getting_all_player_data()


if __name__ == "__main__":
    main()
