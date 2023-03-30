import { useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import { Posts } from "../../Components"
import { getUserDetails, setAdmin } from "../../Config"

export default function Home () {

	const navigate = useNavigate();
const [user, setUser] = useState(null);

	useEffect (() =>{
		getUserDetails().then(({ data }) => {
			if (data.type === "admin") {
				setAdmin(true)
			}
        setUser(data);
          
            })
            .catch((e) => {
						//	navigate('/login')
                console.log(e)
            })
	}, [])
return (
	<>

		<Posts user={user}/>

	</>
)



	
}


