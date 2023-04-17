import { useState } from "react";
import glitter_error from '../glitter_error.gif'

const JoinCommunityForm = (props) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    
    const joinGlitterForce = (event) => {
        event.preventDefault()

        fetch("http://localhost:9000/users/registerUser", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email })
        })
        .then(response => response.json())
        .then(glitterForceUserListe => {
            if(glitterForceUserListe.error) {
                setError(glitterForceUserListe.error)
                return
            }
            setEmail("")
            setName("")
            setError("")

            props.setGlitterUsers(glitterForceUserListe)
        })
    }

    return (
        <>
        <form>
            <label htmlFor="name">Name:</label><br/>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} /> <br/>
        
            <label htmlFor="name">Email:</label><br/>
            <input id="name" type="email" value={email} onChange={(e) => setEmail(e.target.value)}  /> <br/>

            <button onClick={joinGlitterForce}>Join Glitterforce 🎖️</button>
        </form>

        {error && <div className="error">
            <img src={glitter_error} alt="error gif" />
            <br/>
            {error}
        </div>}
        </>
    );
}
 
export default JoinCommunityForm;