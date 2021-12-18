import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const initialState = { data: [], timestamp: "" }
  const [passwords, setPasswords] = useState(initialState);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:5000/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      let newpasswords = await res.json() || passwords;
      newpasswords.data.sort((a, b) => a.id - b.id);
      newpasswords.data.forEach(element => {
        console.log(element.id, element.name);
      });
      setPasswords({ data: newpasswords.data, timestamp: newpasswords.timestamp })
    }
    fetchData();
  }, []);
  return (
    <div className="App">
      <div className="navbar">
        <h3>Password Generator</h3>
        <div className="nav-timestanm">
          <strong>Timestamp:</strong> {passwords.timestamp}
        </div>
      </div>
      <div className="main">
        <div className="box">
          <div className='header'><div className='element'>
            <div className="id">S. No.</div>
            <div className="password">Password</div>
          </div></div>
          {passwords.data.map((e, key) =>
            <div key={key} className='element'>
              <div className="id">{e.id}</div>
              <div className="password">{e.name}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
