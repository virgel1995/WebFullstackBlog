import { Avatar } from '@chakra-ui/react';
import logo from "@/Assets/img/developer.gif"
export default function Logo(params) {
	const size = "40px"
	return (
		<>
<Avatar w={size} h={size} mx="1" name='Kola Tioluwani' src={logo} />
		</>
	)
}