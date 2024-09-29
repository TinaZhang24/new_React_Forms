import { useState } from "react";

const API_URL = "https://fsa-jwt-practice.herokuapp.com/signup";

/**
 * @component
 * Allows user to sign up with username and password.
 * If successful, stores token and updates status message.
 */
export default function SignUpForm({ setToken, setStatus }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // POST credentials to /users
  async function register(event) {
    event.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      setToken(result.token);
      setStatus(result.message);
    } catch (e) {
      setStatus(e.message);
    }
  }

  return (
    <>
      <form onSubmit={register}>
        <h2>Sign Up</h2>
        <label>
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button>Sign Up</button>
      </form>
    </>
  );
}