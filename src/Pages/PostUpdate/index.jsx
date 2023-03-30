import { useLocation } from "react-router-dom"
import { PostUpdate as Edit } from "../../Components"




export default function PostUpdate() {
const location = useLocation();
const post = location.state;
return (
	<>
	<Edit post={post} />
	</>
)

}