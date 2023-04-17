import { useEffect } from "react";

const CommunityList = (props) => {

    useEffect(() => {
        fetch("http://localhost:9000/users")
        .then(response => response.json())
        .then(glitterForceUserListe => props.setGlitterUsers(glitterForceUserListe))
    
    }, [])

    return (
        <div className="userList">
            <h2>{props.title}</h2>

            {props.glitterUsers.map((glitterUser) => 
                <h3 key={glitterUser.id}>
                    {glitterUser.name} – {glitterUser.email}
                </h3>
            )}
        </div>
    );
}
 
export default CommunityList;