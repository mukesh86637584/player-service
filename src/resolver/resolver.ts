import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const DATA_URL = process.env.DATA_URL || 'https://eurosportdigital.github.io/eurosport-node-developer-recruitment/headtohead.json';

// Fetch players data
async function fetchPlayers() {
  const response = await fetch(DATA_URL);
  const data = await response.json();
  return data.players.sort((a, b) => a.id - b.id);
}

// Resolvers
export const resolvers = {
  Query: {
    players: async () => await fetchPlayers(),
    player: async (_, { id }) => {
      const players = await fetchPlayers();
      return players.find(player => player.id == id) || null;
    },
  },
};