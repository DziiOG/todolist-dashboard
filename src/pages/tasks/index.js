import PropTypes from 'prop-types'
import {
  Box,
  Flex,
  Heading,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react'
import Button from 'components/Button'
import { columns } from 'components/DashBoard/TasksList'
import Spinner from 'components/FetchCard/Spinner'
import Table from 'components/Table'
import Layout from 'container/Layout'
import useApi from 'context/useApi'
import useAuth from 'context/useAuth'
import useComponent from 'context/useComponent'
import { rem } from 'helpers/misc'
import moment from 'moment'
import React from 'react'
import { BsPlus } from 'react-icons/bs'
import { useQuery } from 'react-query'
import { FormInput, FormSelect } from 'components/Form'
import { useFormik } from 'formik'
import { prs, statuses } from 'components/Modals/TaskModal'
import { BiSearch } from 'react-icons/bi'

const FilterSelectors = ({ formik }) => {
  const { values, setFieldTouched, setFieldValue, errors } = formik
  return (
    <Flex align='center'>
      <FormSelect
        options={[
          { name: 'Name', id: 4 },
          { name: 'Category', id: 1 },
          { name: 'Priority', id: 2 },
          { name: 'Status', id: 3 }
        ]}
        w={{ ...rem(142) }}
        h={{ ...rem(44) }}
        color='#29325A'
        fontFamily='Avenir'
        fontStyle='normal'
        fontWeight={900}
        placeholder='FIlter by'
        id='filterValue'
        name='filterValue'
        value={values?.filterValue}
        error={errors?.filterValue}
        setFieldValue={(id, e) => {
          setFieldValue(id, e)
        }}
        setFieldTouched={setFieldTouched}
        mr={{ md: 5 }}
      />

      <FormSelect
        options={[
          { name: 'First Added', id: 1 },
          { name: 'Last Added', id: 2 }
        ]}
        w={{ ...rem(142) }}
        h={{ ...rem(44) }}
        color='#29325A'
        fontFamily='Avenir'
        fontStyle='normal'
        fontWeight={900}
        placeholder='Sort by'
        id='sortValue'
        name='sortValue'
        value={values?.sortValue}
        error={errors?.sortValue}
        setFieldValue={(id, e) => {
          setFieldValue(id, e)
        }}
        setFieldTouched={setFieldTouched}
      />
    </Flex>
  )
}

FilterSelectors.propTypes = {
  formik: PropTypes.shape({
    errors: PropTypes.shape({
      filterValue: PropTypes.any,
      sortValue: PropTypes.any
    }),
    setFieldTouched: PropTypes.any,
    setFieldValue: PropTypes.func,
    values: PropTypes.shape({
      filterValue: PropTypes.any,
      sortValue: PropTypes.any
    })
  })
}

const TabTable = ({ defaultData, categories }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      priority: '',
      status: '',
      sortValue: '',
      filterValue: ''
    }
  })

  const { values } = formik

  return (
    <Box w='100%'>
      <TaskFilter
        {...{
          formik,
          categories
        }}
      />
      <Table
        columns={columns}
        data={defaultData
          ?.sort((a, b) => {
            const sortDecision = {
              'First Added': new Date(a?.createdAt) - new Date(b?.createdAt),
              'Last Added': new Date(b?.createdAt) - new Date(a?.createdAt)
            }
            return sortDecision[values.sortValue]
          })
          .filter(item => {
            const filterDecision = {
              Name: () => {
                if (values?.name?.length > 2) {
                  const columnData = values?.name
                    ?.replace(/[^A-Z0-9]/gi, '')
                    ?.toLowerCase()
                  return item?.name
                    ?.replace(/[^A-Z0-9]/gi, '')
                    .toLowerCase()
                    ?.includes(columnData)
                }
                return true
              },
              Priority: () => {
                if (values?.priority) {
                  return values.priority === item.priority
                }
                return true
              },
              Category: () => {
                if (values?.category) {
                  return values.category === item.category?._id
                }
                return true
              },
              Status: () => {
                if (values?.status) {
                  return values.status === item.status
                }
                return true
              }
            }
            const func = filterDecision[values?.filterValue]
            return func ? func() : true
          })}
      />
    </Box>
  )
}

TabTable.propTypes = {
  categories: PropTypes.any,
  columns: PropTypes.any,
  defaultData: PropTypes.shape({
    sort: PropTypes.func
  })
}

export const TaskFilter = ({ categories, formik }) => {
  const { values, errors, setFieldValue, setFieldTouched, handleChange } =
    formik
  const rendition = {
    Name: (
      <FormInput
        placeholder='Search'
        id='name'
        name='name'
        leftIcon={BiSearch}
        borderRadius={{ ...rem(10) }}
        bg='#F2F5FF 0% 0% no-repeat padding-box'
        value={values.name}
        error={errors.name}
        onChange={handleChange}
        setFieldTouched={setFieldTouched}
        w={{ ...rem(300) }}
        h={{ ...rem(44) }}
      />
    ),
    Category: (
      <FormSelect
        w={{ ...rem(300) }}
        placeholder='Select category'
        background='#F2F5FF 0% 0% no-repeat padding-box'
        id='category'
        name='category'
        options={categories?.map(item => ({
          name: item.name,
          id: item?._id
        }))}
        h={{ ...rem(44) }}
        value={values?.category}
        error={errors?.category}
        setFieldValue={(id, e) => {
          setFieldValue(id, e)
        }}
        setFieldTouched={setFieldTouched}
      />
    ),
    Priority: (
      <FormSelect
        w={{ ...rem(300) }}
        h={{ ...rem(44) }}
        placeholder='Select priority'
        background='#F2F5FF 0% 0% no-repeat padding-box'
        id='priority'
        name='priority'
        options={prs}
        value={values?.priority}
        error={errors?.priority}
        setFieldValue={(id, e) => {
          setFieldValue(id, e)
        }}
        setFieldTouched={setFieldTouched}
      />
    ),
    Status: (
      <FormSelect
        w={{ ...rem(300) }}
        h={{ ...rem(44) }}
        placeholder='Select status'
        background='#F2F5FF 0% 0% no-repeat padding-box'
        id='status'
        name='status'
        options={statuses}
        value={values?.status}
        error={errors?.status}
        setFieldValue={(id, e) => {
          setFieldValue(id, e)
        }}
        setFieldTouched={setFieldTouched}
      />
    )
  }

  return (
    <Flex mb={{ ...rem(30) }} w='100%' justify='space-between' align='center'>
      {rendition[values?.filterValue]}
      <FilterSelectors {...{ formik }} />
    </Flex>
  )
}

TaskFilter.propTypes = {
  categories: PropTypes.shape({
    map: PropTypes.func
  }),
  filterValue: PropTypes.any,
  formik: PropTypes.shape({
    errors: PropTypes.shape({
      category: PropTypes.any,
      name: PropTypes.any,
      priority: PropTypes.any,
      status: PropTypes.any
    }),
    handleChange: PropTypes.any,
    setFieldTouched: PropTypes.any,
    setFieldValue: PropTypes.func,
    values: PropTypes.shape({
      category: PropTypes.any,
      filterValue: PropTypes.any,
      name: PropTypes.any,
      priority: PropTypes.any,
      status: PropTypes.any
    })
  }),
  setFilterValue: PropTypes.any,
  setSortValue: PropTypes.any,
  sortValue: PropTypes.any
}

const Tasks = () => {
  const { handleModalClick } = useComponent()

  const { getTasks, getCategories } = useApi()
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const { data, isLoading, error, refetch } = useQuery(
    [`tasks_user${user?._id}`],
    async () => {
      if (user?._id) {
        return await getTasks({ user: user?._id })
      }
    },
    {
      staleTime: 90000
    }
  )

  const {
    data: categories,
    isLoading: categoriesIsLoading,
    error: categoriesHasError,
    refetch: categoriesRefetch
  } = useQuery(
    [`categories_user${user?._id}`],
    async () => {
      if (user?._id) {
        return await getCategories({ user: user?._id })
      }
    },
    {
      staleTime: 90000
    }
  )

  const selectedCssTab = {
    fontSize: 'xl',
    outline: 'none',
    fontFamily: 'Avenir',
    color: '#677acb',
    fontWeight: 900,
    borderBottomWidth: rem(5),
    borderBottomColor: '#677acb'
  }

  const mainTabCss = {
    _focus: { outline: 'none' },
    _selected: selectedCssTab,
    fontSize: { md: 'xl' },
    fontWeight: 500,
    fontFamily: 'Avenir',
    color: '#29325A',
    px: { md: 10 }
  }

  return (
    <Layout disableSearch page={2}>
      <Spinner
        w='100%'
        h='100vh'
        hook={{
          loading: isLoading || categoriesIsLoading,
          error: error || categoriesHasError,
          triggerReload: () => {
            error && refetch()
            categoriesHasError && categoriesRefetch()
          }
        }}
      >
        <Box w='100%'>
          <Heading fontFamily='Avenir' fontWeight={900} fontSize='2xl'>
            Tasks
          </Heading>
        </Box>
        <Box w='100%' mt={{ ...rem(49) }}>
          <Tabs>
            <TabList fontWeight={700} fontSize='lg' color='#6E7575'>
              <Tab {...mainTabCss}>All</Tab>
              <Tab {...mainTabCss}>Today</Tab>
              <Tab {...mainTabCss}>Upcoming</Tab>
              <Tab {...mainTabCss}>Past tasks</Tab>
              <Flex align='center' justify='right' w='59.5%'>
                <Button
                  onClick={() => {
                    handleModalClick('taskModal')
                  }}
                  mb={{ md: 3 }}
                  h={{ ...rem(44) }}
                  w={{ ...rem(153) }}
                  borderRadius={{ ...rem(10) }}
                  leftIcon={<Icon boxSize={6} color='white' as={BsPlus} />}
                  title='Add task'
                />
              </Flex>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box w='100%' h='100%' overflowY='scroll' position='relative'>
                  <TabTable
                    categories={categories?.data || []}
                    defaultData={data?.data}
                  />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box w='100%' h='100%' overflowY='scroll' position='relative'>
                  <TabTable
                    categories={categories?.data || []}
                    defaultData={data?.data?.filter(item => {
                      const today = moment().format('MM/DD/YYYY')
                      const date = moment(item?.dueDate).format('MM/DD/YYYY')
                      return date === today
                    })}
                  />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box w='100%' h='100%' overflowY='scroll' position='relative'>
                  <TabTable
                    categories={categories?.data || []}
                    defaultData={data?.data?.filter(item =>
                      moment(item.dueDate).isAfter()
                    )}
                  />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box w='100%' h='100%' overflowY='scroll' position='relative'>
                  <TabTable
                    categories={categories?.data || []}
                    defaultData={data?.data?.filter(item =>
                      moment(item.dueDate).isBefore()
                    )}
                  />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Spinner>
    </Layout>
  )
}

Tasks.propTypes = {}

export default Tasks
