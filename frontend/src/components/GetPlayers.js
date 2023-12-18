import jsonData from "../data/player_data.json";

export const get_player = (name) => {
    for ( const player of jsonData){
      if(player["name"] === name)
        return player;
    }
}

export const generateSearchTerms = (limit) => {
    const searchTermsSet = new Set();
    const searchTerms = [];
  
    for (const player of jsonData) {
      if (searchTermsSet.size < limit) {
        const playerName = player.name;
        if (!searchTermsSet.has(playerName)) {
          searchTermsSet.add(playerName);
          searchTerms.push(playerName);
        }
      } 
      else {
        break;
      }
    }
  
    return searchTerms;
  };