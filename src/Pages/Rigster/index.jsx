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
  useToast,
  Select
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiEyeOff, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom"
import { registerUser } from '@/Store/slice/auth';
import { useDispatch } from 'react-redux';

export default function Rigster() {
  const navigate = useNavigate()
  const toast = useToast();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const isError = name === ''
  // const isError = password === ''
  const handleClick = () => setShowPassword(!showPassword)

  const submitHandler = async () => {
    try {
      dispatch(registerUser({
        name,
        password,
        gender,
        age
      }))
      toast({
        title: "Account Created Successfully ",
        description: "Please Use Your Code below To Login First Time To Accept Your Account",
        status: "success",
        duration: 3000,
        isClosable: true,
      })

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

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Box as="form" onSubmit={submitHandler}>
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
                    <Input type="text"  onChange={(e) => setName(e.target.value)} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel> Age </FormLabel>
                    <Input type="number"  onChange={(e) => setAge(e.target.value)} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl isRequired>
                <FormLabel>Gender</FormLabel>
                <Select placeholder='Select option'  onChange={(e) => setGender(e.target.value)}>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </Select>
              </FormControl>
              <FormControl id="password" isRequired>
              <FormLabel>
                Password
              </FormLabel>
              <InputGroup size='md'>
                <Input type={showPassword ? 'text' : 'password'}  onChange={(e) => setPassword(e.target.value)} />
                <InputRightElement width='4.5rem'>
                  <Button rounded='full' p={'1'} h='1.75rem' size='sm'
                bgGradient='linear(to-l, #7928CA, #FF0080)'
                _hover={{
                  bgGradient: 'linear(to-r, red.500, yellow.500)',
                }} onClick={handleClick}>
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
              <Stack spacing={10} pt={2}>
                <Stack >
                  <Text align={'center'}>
                    Already a user? <Link onClick={() => navigate('/login')} color={'blue.400'}>Login</Link>
                  </Text>
                </Stack>
                <Button
                  type="submit" loadingText="Submitting"
                  borderRadius='md'
                  bgGradient='linear(to-l, #7928CA, #FF0080)'
                  _hover={{
                    bgGradient: 'linear(to-r, red.500, yellow.500)',
                  }}>
                  Sign up
                </Button>

            </Stack>
        </Stack>
      </Box>
    </Stack>
      </Box >
    </Flex >
  );
}