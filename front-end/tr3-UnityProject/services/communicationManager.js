const URL ='http://localhost:3020';

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
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    throw new Error('No user found');
  }

  const response = await fetch(`${URL}/stats/${user.id}`);
  return response.json();
}
