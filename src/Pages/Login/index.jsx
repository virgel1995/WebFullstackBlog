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
  Box,
  Text,
  InputRightElement,
  InputGroup
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom"
import { LoginUser } from "@/Store/slice/auth";
import { useDispatch, useSelector } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from "@/Assets/img/developer.gif"
export default function Login(props) {
  const navigate = useNavigate()
  const toast = useToast();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false)

  let code = useSelector(state => state.auth.code);
  const auth = useSelector(state=> state.auth)

  const handleClick = () => setShow(!show)
  const submitHandler = async () => {
    try {
     const login = dispatch(LoginUser({
       name: name,
       password: password
     }))
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
              {(() => {
                if (code !== null) {
                  return (
                    <p >Your Access Code : {code.yourAccessCode} </p>
                  )
                }
              })()}
            </Heading>
            <FormControl id="name" isRequired>
              <FormLabel>
                User Name
              </FormLabel>
              <Input type="text" onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>
                Password
              </FormLabel>
              <InputGroup size='md'>
                <Input type={show ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} />
                <InputRightElement width='4.5rem' >
                  <Button rounded='full' p={'1'} h='1.75rem' size='sm'
                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                    _hover={{
                      bgGradient: 'linear(to-r, red.500, yellow.500)',
                    }} onClick={handleClick}>
                    {show ? <FiEye /> : <FiEyeOff />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.500'}>Forgot password?</Link>
              </Stack>
              <Stack >
                <Text align={'center'}>
                  Not Have Account? <Link onClick={() => navigate('/rigster')} color={'blue.400'}>Rigster</Link> New Account
                </Text>
              </Stack>
              <Button type="submit" loadingText="Submitting"
                borderRadius='md'
                bgGradient='linear(to-l, #7928CA, #FF0080)'
                _hover={{
                  bgGradient: 'linear(to-r, red.500, yellow.500)',
                }}>
                Sign in
              </Button>
            </Stack>

          </Stack>
        </Box>
      </Flex>
      <Flex alignItems={'center'} justifyContent={'center'} flex={1}>
        <Image
          alt={'Virus24'}
          objectFit={'cover'}
          rounded={'lg'}
          h={'75vh'}
          src={
            logo
          }
        />
      </Flex>
    </Stack>
  );
}