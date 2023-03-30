
import { Posts } from "../../Components";


import { getToken } from "../../Config";


import { useNavigate } from "react-router-dom";

 function Landing () {
const navigate = useNavigate()
if (getToken()) {
	navigate("/home")
}
return (
	<>
		<Posts  />
	</>
)



	
}


export default Landing;