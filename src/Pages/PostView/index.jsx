import { useLocation } from 'react-router-dom';

import {PostScreen} from "@/Components"



export default function PostView() {
	const location = useLocation();
const post = location.state;
	return (
		<>
<PostScreen post={post} />
		</>
	)
}