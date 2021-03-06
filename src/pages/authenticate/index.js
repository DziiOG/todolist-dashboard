import {
  Box,
  Checkbox,
  Flex,
  Icon,
  Image,
  Text,
  useToast
} from '@chakra-ui/react'
import Button from 'components/Button'
import FormCard from 'components/Cards/Form'
import { rem } from 'helpers/misc'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import SignLine from 'assets/images/line.png'
import { FormInput, FormPassword } from 'components/Form'
import { useFormik } from 'formik'
import useAuth from 'context/useAuth'
import { useNavigate } from 'react-router-dom'
import useApi from 'context/useApi'
import { isEmpty } from 'lodash'
import { SignInSchema } from 'helpers/validation'

const Authenticate = () => {
  const { isAuthenticated, storeInLocal, store } = useAuth()
  const navigate = useNavigate()
  const { user } = isAuthenticated()
  const toast = useToast()
  const { login } = useApi()
  const [rememberMe, setRememberMe] = React.useState(false)

  React.useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [navigate, user])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    enableReinitialize: true,
    validationSchema: SignInSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true)
        const response = await login(values)
        rememberMe &&
          storeInLocal({
            user: response.data.user,
            token: response.data.authToken
          })
        store({
          user: response.data.user,
          token: response.data.authToken
        })
        return navigate(`/auth/${response.data.authToken}`)
      } catch (error) {
        if (error) {
          if (error.status === 400) {
            toast({
              title: 'Error Occurred',
              description: error.data.message,
              status: 'error',
              position: 'top-right',
              duration: 5000
            })
          } else {
            toast({
              title: 'Error Occurred',
              description: error.message,
              status: 'error',
              position: 'top-right',
              duration: 5000
            })
          }
        } else {
          toast({
            title: 'Error Occurred',
            description: 'Unexpected network error.',
            status: 'error',
            position: 'top-right',
            duration: 5000
          })
        }
      } finally {
        setSubmitting(false)
      }
    }
  })

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldTouched,
    isSubmitting,
    dirty,
    handleSubmit
  } = formik

  return (
    <Flex
      as='main'
      h='100vh'
      overflow='scroll'
      bg='gray.100'
      align='center'
      direction='column'
    >
      <form onSubmit={handleSubmit}>
        <Flex
          h={20}
          py={5}
          w='full'
          zIndex={10}
          align='center'
          px={{ base: 4, md: 20 }}
        />
        <Flex
          bg='gray.100'
          py={{ base: 4, lg: 10 }}
          w='full'
          align='center'
          justify='center'
        >
          <FormCard
            mt={12}
            textAlign='center'
            title='Todolist'
            w={{ base: '90%', lg: 110 }}
          >
            <Button
              mt={{ ...rem(56) }}
              _hover={{ bg: 'white' }}
              bg='#FFFFFF 0% 0% no-repeat padding-box'
              fontSize='md'
              fontFamily='Avenir'
              fontStyle='normal'
              h={{ ...rem(48) }}
              color='#29325A'
              w={'100%'}
              border='2px solid #677ACB'
              title='Continue with google'
              leftIcon={<Icon as={FcGoogle} boxSize={6} />}
            />
            <Image alt='sign in with us' w='100%' mt={8} src={SignLine} />

            <Box w='100%' mt={10}>
              <FormInput
                label='Email'
                required
                placeholder='mary@example.com'
                id='email'
                name='email'
                h={{ ...rem(45) }}
                value={values.email}
                error={errors.email}
                touched={touched.email}
                onBlur={handleBlur}
                onChange={handleChange}
                setFieldTouched={setFieldTouched}
              />
              <Box w='100%' mt={4}>
                <FormPassword
                  {...{
                    setFieldTouched,
                    isRequired: true,
                    name: 'password',
                    label: 'Password',
                    onBlur: handleBlur,
                    value: values.password,
                    error: errors.password,
                    onChange: handleChange,
                    placeholder: '********',
                    touched: touched.password
                  }}
                />
              </Box>
            </Box>
            <Flex my={5} align='center' justify='space-between'>
              <Checkbox
                fontSize={{ base: 'xs', md: 'sm' }}
                size='sm'
                colorScheme='cfButton'
                onChange={e => setRememberMe(e.target.checked)}
                borderColor='cfButton.500'
              >
                <Text
                  as='span'
                  fontFamily='Avenir'
                  fontStyle='normal'
                  color='#29325a'
                  fontSize={{ base: 'xs', md: 'sm' }}
                >
                  Remember me
                </Text>
              </Checkbox>

              <Box cursor='pointer' _focus={{ textDecor: 'none' }}>
                <Text color='#677acb'>Forgot password ?</Text>
              </Box>
            </Flex>

            <Button
              type='submit'
              title='Login'
              borderRadius={{ ...rem(10) }}
              w='100%'
              mt={8}
              fontSize='xl'
              h={{ ...rem(50) }}
              isLoading={isSubmitting}
              isDisabled={isSubmitting || !isEmpty(errors) || !dirty}
            />
            <Flex w='100%' mt={3} align='center' justify='center'>
              <Text color='#29325A' fontSize={{ base: 'xs', md: 'md' }} mr={4}>
                Not registered yet?
              </Text>
              <Box cursor='pointer' _focus={{ textDecor: 'none' }}>
                <Text color='#677acb'>Create an Account</Text>
              </Box>
            </Flex>
          </FormCard>
        </Flex>
      </form>
    </Flex>
  )
}
Authenticate.propTypes = {}

export default Authenticate
