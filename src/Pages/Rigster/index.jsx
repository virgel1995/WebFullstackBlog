import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
	useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Axios from 'axios';
import { Form, Formik } from 'formik';
import { API, setCode} from "@/Config";
import { useNavigate } from "react-router-dom"

export default function Rigster() {

	const navigate = useNavigate()
		const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
const [name, setName] = useState('');
  const [password, setPassword] = useState('');
	 const [age, setAge] = useState('');
	 const [gender, setGender] = useState('');

const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post(API+'/updateOrCreate', {
        name,
        password,
				gender,
				age
      });
console.log(data)

	toast({
  title: "Account Created Successfully ",
  description: "Please Use Your Code below To Login First Time To Accept Your Account",
  status: "success",
  duration: 3000,
  isClosable: true,
                  })
//set to local storage
setCode( data.yourAccessCode);
      navigate("/login");
			
	
    } catch (err) {
			console.log(err)
	toast({
  title: "Account UnDone ",
  description: " some Errors Please Make Sure You Fill Correct Data",
  status: "error",
  duration: 3000,
  isClosable: true,
                  })
    }
  };
	/*const copyCode = async () => {
    await navigator.clipboard.writeText(token);
    alert('Text copied');
				}*/
  return (
		<Formik>
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
			<Form onSubmit={submitHandler}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
								
                <FormControl id="firstName" isRequired>
                  <FormLabel>
									 Name
									</FormLabel>
    <Input type="text" onChange={(e) => setName(e.target.value)}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel> Age </FormLabel>
                  <Input type="text" onChange={(e) => setAge(e.target.value)}/>
                </FormControl>
              </Box>
            </HStack>
            <FormControl isRequired>
              <FormLabel>Gender</FormLabel>
              <Input type="text" onChange={(e) => setGender(e.target.value)}/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                type= "submit" loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
						
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
		</Form>
    </Flex>
		</Formik>
  );
						}