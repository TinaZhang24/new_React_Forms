import { useState } from "react";
import SignUpForm from "./SignUpForm";

const API_URL = "https://fsa-jwt-practice.herokuapp.com/authenticate";

/**
 * @component
 * When the user successfully signs up, a token will be received from API
 * and stored in state. The presence of a token will then cause the
 * "Authenticate" button to appear. When that button is clicked, the token
 * will be sent to /authenticate, and the resulting status will be displayed.
 */
export default function App() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("Please sign up for an account.");

  async function authenticate() {
    try {
      const response = await fetch(API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setStatus(result.message);
    } catch (e) {
      setStatus(e.message);
    }
  }

  return (
    <>
      <SignUpForm setToken={setToken} setStatus={setStatus} />
      <hr />
      <p>{status}</p>
      {token && <button onClick={authenticate}>Authenticate</button>}
    </>
  );
}