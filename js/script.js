const TEAMS_JSON_URL = 'https://erandiaraujo.github.io/teams-json/football-teams.json';

async function fetchAndDisplayTeams() {
    try {
        const response = await fetch(TEAMS_JSON_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP Error! status: ${response.status}`);
        }
        
        const footballTeams = await response.json();
        const teamDisplayContainer = document.getElementById('teamDisplay');
        teamDisplayContainer.innerHTML = '';
        
        footballTeams.forEach(team => {
            const teamCard = document.createElement('div');
            teamCard.classList.add('team-card');
            
            teamCard.innerHTML = `
                <img src="${team.imageUrl}" alt="${team.name} National Team" onerror="this.src='placeholder.jpg'">
                <h2>${team.name}</h2>
                <p><strong>Coach:</strong> ${team.coach}</p>
                <p><strong>Country:</strong> ${team.country}</p>
                <p><strong>World Cup Status:</strong> ${team.worldCupStatus}</p>
                <div class="key-players">
                    <strong>Key Players:</strong>
                    <ul>
                        ${team.keyPlayers.map(player => `<li>${player}</li>`).join('')}
                    </ul>
                </div>
            `;
            
            teamDisplayContainer.appendChild(teamCard);
        });
    } catch (error) {
        console.error('Error fetching teams:', error);
        
        const teamDisplayContainer = document.getElementById('teamDisplay');
        teamDisplayContainer.innerHTML = `
            <div class="error-message">
                <p>Unable to load teams. Please try again later.</p>
                <p>Error: ${error.message}</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayTeams);
