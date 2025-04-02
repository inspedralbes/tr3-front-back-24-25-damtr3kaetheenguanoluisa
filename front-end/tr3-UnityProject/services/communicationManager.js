const URL = 'http://localhost:3020';
const URL_STATS = 'http://localhost:3021';


export async function registerUser(username, email, password) {
  try {
    const response = await fetch(`${URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: username,
        email,
        password,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    return data;
  } catch (error) {
    throw new Error(error.message || 'Error during registration');
  }
}
export async function loginUser(email, password) {
  try {
    console.log("Intentando login con:", email);
    const response = await fetch(`${URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), 
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token); 
      return data;
    } else {
      throw new Error(data.message || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function getStats() {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found. Please log in.');
  }

  try {
    const response = await fetch(`${URL_STATS}/stats`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
}

export async function getPlayers() {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found. Please log in.');
  }
  try{
    const response = await fetch (`${URL}/players/`, {
      headers:{
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    });
    if(!response.ok){
      throw new Error('Failed to fetch all players');
    }
    return await response.json();
  }catch(error){
    console.error("Error fetching all players",error);
    throw error;
  }
}
export async function deletePlayer(id) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found. Please log in.');

  try {
    const response = await fetch(`${URL}/players/${id}`, { 
      method: "DELETE", 
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete player');
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting player", error);
    throw error;
  }
}
export async function updatePlayer(id, updatedPlayerData) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found. Please log in.');

  try {
    const response = await fetch(`${URL}/players/${id}`, { 
      method: "PUT", 
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPlayerData)
    });

    if (!response.ok) {
      throw new Error('Failed to update player');
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating player", error);
    throw error;
  }
}
