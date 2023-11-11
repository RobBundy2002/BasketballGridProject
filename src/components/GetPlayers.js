import jsonData from "../data/player_data.json";

export const get_player = (name) => {
    for ( const player of jsonData){
      if(player["name"] === name)
        return player;
    }
}

export const generateSearchTerms = (limit) => {
    const searchTerms = [];
    for (const player of jsonData) {
        if (searchTerms.length < limit) {
            searchTerms.push(player.name);
        } else {
            break;
        }
    }
    return searchTerms;
};