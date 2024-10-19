// List of players you want to track (add NHL player IDs here)
const players = [
  { id: 8477934, name: "Connor McDavid" },
  { id: 8478402, name: "Auston Matthews" }
];

// Function to fetch player data from NHL API
async function fetchPlayerStats(player) {
  const response = await fetch(`https://statsapi.web.nhl.com/api/v1/people/${player.id}/stats?stats=statsSingleSeason&season=20232024`);
  const data = await response.json();
  const stats = data.stats[0].splits[0].stat;
  return { ...player, points: stats.goals + stats.assists };
}

// Function to update the UI with player stats and total points
async function updatePlayerList() {
  let totalPoints = 0;
  const playerList = document.getElementById("player-list");
  playerList.innerHTML = "";

  for (const player of players) {
    const playerStats = await fetchPlayerStats(player);
    totalPoints += playerStats.points;

    const playerDiv = document.createElement("div");
    playerDiv.classList.add("player");
    playerDiv.innerHTML = `${playerStats.name}: ${playerStats.points} points`;
    playerList.appendChild(playerDiv);
  }

  document.getElementById("points").textContent = totalPoints;
}

// Update every 60 seconds
setInterval(updatePlayerList, 60000);

// Initial load
updatePlayerList();
