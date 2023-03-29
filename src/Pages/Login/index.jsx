import { useState } from "react"
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
	Heading,
  Input,
  Link,
  Stack,
  Image,
useToast,
Box
} from '@chakra-ui/react';
import { SignIn,setToken, getCode, removeCode, setLoged } from "@/Config";
import { useNavigate } from "react-router-dom"
export default function Login(props) {
	const navigate = useNavigate()
			const toast = useToast();
 
const [name, setName] = useState('');
  const [password, setPassword] = useState('');

   let code = getCode();
        
const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await SignIn(
        name,
        password,
      );
//console.log(data)
if (password === code) {
removeCode()
}

setToken(data.data.token);
setLoged(true)
	toast({
  title: "Successfully Loged in ",
  description: "Welcome Back Mate 🎉🎉",
  status: "success",
  duration: 3000,
  isClosable: true,
                  })
      navigate('/home');
    } catch (err) {
			console.log(err)
	toast({
  title: "Sorry But You Faild",
  description: "Please check your Data You Inter And Retry Again",
  status: "error",
  duration: 3000,
  isClosable: true,
                  })
    }
  };
  return (

    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
				
				<Box as="form" onSubmit={submitHandler}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
					
          <Heading fontSize={'2xl'}>Sign in to your account
						<hr />
						{(()=>{
					if(code){
						return (
		<p >Your Access Code : {code} </p>
)
					}
						})()}
					</Heading>
		
    <FormControl id="name">
   <FormLabel>
		 User Name
	 </FormLabel>
			
   <Input type="text" onChange={(e) => setName(e.target.value)}/>
          </FormControl>
					
          <FormControl id="password">
            <FormLabel>
							Password
						</FormLabel>
  <Input type="password" onChange={(e) => setPassword(e.target.value)}/>
          </FormControl>
					
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Link color={'blue.500'}>Forgot password?</Link>
            </Stack>
            <Button type= "submit" colorScheme={'blue'} variant={'solid'} 
                loadingText="Submitting">
              Sign in
            </Button>
						
          </Stack>
					
        </Stack>
				</Box>
      </Flex>
			
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://i.pravatar.cc/300'
          }
        />
      </Flex>
    </Stack>
  );
}