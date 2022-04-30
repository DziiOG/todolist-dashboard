/* eslint-disable no-unused-vars */
import React from 'react'
import { Box, Grid, GridItem, HStack, Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import useApi from 'context/useApi'
import Spinner from 'components/FetchCard/Spinner'
import { FormInput, FormSelect } from './index'
import Editor from './Editor'
import ReactSelect from './ReactSelect'

export const options = {
  type: ['OTHERS', 'ELEMENT', 'COMPOSITION'],
  others: [
    { id: 'STONES', value: 'Stones' },
    { id: 'SLOPE', value: 'Slope' },
    { id: 'TOPOGRAPHY', value: 'Topography' },
    { id: 'SOILDEPTH', value: 'Soil Depth' },
    { id: 'CLODSIZE', value: 'Clod size' },
    { id: 'RIDGEDISTANCE', value: 'Ridge distance' },
    { id: 'SOILORGANICCONTENT', value: 'Soil Organic Content' },
    { id: 'CROPPINGHISTORY', value: 'Cropping History' },
    { id: 'WEEDS', value: 'Weeds' },
    { id: 'VEGETATION', value: 'Vegetation' },
    { id: 'PH', value: 'pH' },
    { id: 'SOILMOISTURE', value: 'Soil moisture' },
    { id: 'CLAYCONTENT', value: 'Clay content' },
    { id: 'LOAMCONTENT', value: 'Loam content' },
    { id: 'WATERSOURCE', value: 'Water Source' },
    { id: 'FARMEREXPERIENCE', value: 'Farmer Experience' }
  ]
}

const constants = [
  'STONES',
  'SLOPE',
  'TOPOGRAPHY',
  'CLODSIZE',
  'RIDGEDISTANCE',
  'SOILDEPTH',
  'SOILORGANICCONTENT',
  'PH',
  'CLAYCONTENT',
  'LOAMCONTENT'
]

const CreationForm = ({
  name,
  handleBlur,
  handleChange,
  errors,
  touched,
  setFieldTouched,
  setFieldValue,
  reference
}) => (
  <HStack>
    <Grid templateColumns='repeat(2, 1fr)' mt={6} gap={10}>
      <GridItem>
        <FormInput
          label='Ecological Zone'
          id={`${name}value`}
          name={`${name}value`}
          onBlur={handleBlur}
          onChange={handleChange}
          setFieldTouched={setFieldTouched}
          error={errors && errors.value}
          touched={touched && touched.value}
          value={reference.value}
          readOnly
          required
        />
      </GridItem>
      <GridItem>
        <ReactSelect
          id={`${name}score`}
          name={`${name}score`}
          label='Assign a score'
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          value={reference.score}
          data={[1, 2, 3]}
          placeholder='Select a Score'
          error={errors && errors.score}
          touched={touched && touched.score}
          onChange={handleChange}
          required
        />
      </GridItem>
    </Grid>
  </HStack>
)

CreationForm.propTypes = {
  errors: PropTypes.shape({
    score: PropTypes.any,
    value: PropTypes.any
  }),
  handleBlur: PropTypes.any,
  handleChange: PropTypes.func,
  name: PropTypes.any,
  reference: PropTypes.shape({
    score: PropTypes.any,
    value: PropTypes.any
  }),
  scoreData: PropTypes.shape({
    filter: PropTypes.func,
    scores: PropTypes.any,
    setScores: PropTypes.func
  }),
  setFieldTouched: PropTypes.any,
  setFieldValue: PropTypes.any,
  touched: PropTypes.shape({
    score: PropTypes.any,
    value: PropTypes.any
  })
}

const NonEcologicalCriteriaForm = ({
  name,
  // handleBlur,
  handleChange,
  errors,
  touched,
  setFieldTouched,
  setFieldValue,
  reference
}) => (
  <HStack>
    <Grid templateColumns='repeat(2, 1fr)' mt={6} gap={10} w='70%'>
      <GridItem>
        <FormInput
          label='Response'
          id={`${name}value`}
          name={`${name}value`}
          // onBlur={handleBlur}
          onChange={handleChange}
          setFieldTouched={setFieldTouched}
          error={errors && errors.value}
          touched={touched && touched.value}
          value={reference.value}
          readOnly
          required
        />
      </GridItem>
      <GridItem>
        <ReactSelect
          id={`${name}score`}
          name={`${name}score`}
          label='Assign a score'
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          value={reference.score}
          data={[1, 2]}
          placeholder='Select a Score'
          error={errors && errors.score}
          touched={touched && touched.score}
          onChange={handleChange}
          required
        />
      </GridItem>
    </Grid>
  </HStack>
)

NonEcologicalCriteriaForm.propTypes = {
  errors: PropTypes.shape({
    score: PropTypes.any,
    value: PropTypes.any
  }),
  // handleBlur: PropTypes.any,
  handleChange: PropTypes.func,
  name: PropTypes.any,
  reference: PropTypes.shape({
    score: PropTypes.any,
    value: PropTypes.any
  }),
  scoreData: PropTypes.shape({
    filter: PropTypes.func,
    scores: PropTypes.any,
    setScores: PropTypes.func
  }),
  setFieldTouched: PropTypes.any,
  setFieldValue: PropTypes.any,
  touched: PropTypes.shape({
    score: PropTypes.any,
    value: PropTypes.any
  })
}

const SoilTestsFormComponent = ({
  name,
  setFieldValue,
  reference,
  touched,
  errors,
  setFieldTouched,
  handleChange,
  handleBlur
}) => {
  const { getMetrics } = useApi()
  const {
    data: soilMetrics,
    isLoading: soilMetricsIsLoading,
    error: soilMetricsHasError,
    refetch: soilMetricsRefetch
  } = useQuery(
    [`soil_land_soilMetrics_from_space`],
    async () => await getMetrics()
  )
  return (
    <Spinner
      w='100%'
      h='100%'
      hook={{
        loading: soilMetricsIsLoading,
        error: soilMetricsHasError,
        refetch: soilMetricsRefetch
      }}
    >
      <HStack spacing='1rem'>
        <FormSelect
          id={`${name}metric`}
          label='Metric'
          placeholder='Select metric'
          options={(soilMetrics?.data || [])?.map(item =>
            !['ELEMENT', 'COMPOSITION'].includes(item?.type)
              ? options.others.find(obj => obj.id === item?.metricName)?.value
              : item.metricName
          )}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
          value={reference?.metric}
          error={errors && errors.metric}
          touched={touched && touched.metric}
        />
        {['vegetation', 'farmer experience', 'water source'].includes(
          reference?.metric?.toLowerCase()
        ) ? (
          <FormSelect
            id={`${name}value`}
            label='Metric value'
            placeholder='Enter metric value'
            options={
              {
                vegetation: ['BARE', 'GRASS', 'TREES'],
                'farmer experience': ['YES', 'NO'],
                'water source': ['YES', 'NO']
              }[reference?.metric?.toLowerCase()]
            }
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            value={reference?.value}
            error={errors && errors.value}
            touched={touched && touched.value}
          />
        ) : (
          <FormInput
            type='number'
            id={`${name}value`}
            name={`${name}value`}
            placeholder='Enter soil metric'
            label={'Metric value'}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors && errors.value}
            touched={touched && touched.value}
            value={reference.value}
          />
        )}
      </HStack>
    </Spinner>
  )
}

SoilTestsFormComponent.propTypes = {
  errors: PropTypes.shape({
    metric: PropTypes.any,
    value: PropTypes.any
  }),
  handleBlur: PropTypes.any,
  handleChange: PropTypes.any,
  name: PropTypes.any,
  reference: PropTypes.shape({
    metric: PropTypes.shape({
      toLowerCase: PropTypes.func
    }),
    value: PropTypes.any
  }),
  setFieldTouched: PropTypes.any,
  setFieldValue: PropTypes.any,
  touched: PropTypes.shape({
    metric: PropTypes.any,
    value: PropTypes.any
  })
}

const FormFieldElement = ({
  name,
  reference,
  handleChange,
  handleBlur,
  errors,
  touched,
  setFieldTouched,
  setFieldValue,
  label,
  scoreData,
  title
}) => {
  const getForm = _title => {
    switch (_title) {
      case 'soilMetric':
        return (
          <HStack spacing='1rem'>
            <FormSelect
              id={`${name}type`}
              label='Metric Type'
              placeholder='Select metric type'
              options={options.type}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              value={reference.type}
              error={errors && errors.type}
              touched={touched && touched.type}
            />
            {reference?.type === 'OTHERS' ? (
              <FormSelect
                id={`${name}metricName`}
                label='Metric name'
                placeholder='Select metric name'
                options={options.others?.map(item => item?.value)}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                value={reference.metricName}
                error={errors && errors.metricName}
                touched={touched && touched.metricName}
              />
            ) : (
              <FormInput
                id={`${name}metricName`}
                name={`${name}metricName`}
                placeholder='Enter soil metric'
                label={'Metric name'}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors && errors.metricName}
                touched={touched && touched.metricName}
                value={reference.metricName}
              />
            )}
            {reference.type === 'OTHERS' ? (
              constants.includes(
                options.others.find(item => reference.metricName === item.value)
                  ?.id
              ) ? (
                <FormInput
                  type='number'
                  id={`${name}OptValue`}
                  name={`${name}OptValue`}
                  placeholder='Enter value'
                  label={'Optimum Value'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors && errors.OptValue}
                  touched={touched && touched.OptValue}
                  value={reference.OptValue}
                />
              ) : null
            ) : (
              <FormInput
                type='number'
                id={`${name}OptValue`}
                name={`${name}OptValue`}
                placeholder='Enter value'
                label={'Optimum value Value'}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors && errors.OptValue}
                touched={touched && touched.OptValue}
                value={reference.OptValue}
              />
            )}
            {reference.type === 'OTHERS' ? (
              constants.includes(
                options.others.find(item => reference.metricName === item.value)
                  ?.id
              ) ? (
                <FormInput
                  type='number'
                  id={`${name}minValue`}
                  name={`${name}minValue`}
                  placeholder='Enter value'
                  label={'Minimum Value'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors && errors.minValue}
                  touched={touched && touched.minValue}
                  value={reference.minValue}
                />
              ) : null
            ) : (
              <FormInput
                type='number'
                id={`${name}minValue`}
                name={`${name}minValue`}
                placeholder='Enter value'
                label={'Minimum Value'}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors && errors.minValue}
                touched={touched && touched.minValue}
                value={reference.minValue}
              />
            )}
            {reference?.type === 'OTHERS' ? (
              constants.includes(
                options.others.find(item => reference.metricName === item.value)
                  ?.id
              ) ? (
                <FormInput
                  type='number'
                  id={`${name}maxValue`}
                  name={`${name}maxValue`}
                  placeholder='Enter value'
                  label={'Maximum Value'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors && errors.maxValue}
                  touched={touched && touched.maxValue}
                  value={reference.maxValue}
                />
              ) : null
            ) : (
              <FormInput
                type='number'
                id={`${name}maxValue`}
                name={`${name}maxValue`}
                placeholder='Enter value'
                label={'Maximum Value'}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors && errors.maxValue}
                touched={touched && touched.maxValue}
                value={reference.maxValue}
              />
            )}
          </HStack>
        )
      case 'recommendations':
        return (
          <Stack spacing='1.2rem'>
            <FormInput
              label='Title'
              id={`${name}title`}
              name={`${name}title`}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors && errors.title}
              touched={touched && touched.title}
              value={reference.title}
            />
            <Editor
              label='Description'
              error={errors && errors.description}
              data={reference.description}
              handleData={e =>
                handleChange({
                  target: { name: 'description', value: e }
                })
              }
            />
          </Stack>
        )
      case 'soilTests':
        return (
          <SoilTestsFormComponent
            {...{
              name,
              setFieldValue,
              reference,
              touched,
              errors,
              setFieldTouched,
              handleChange,
              handleBlur
            }}
          />
        )

      case 'cropCreation':
        return (
          <CreationForm
            {...{
              name,
              reference,
              handleChange,
              handleBlur,
              errors,
              touched,
              setFieldTouched,
              setFieldValue,
              label,
              scoreData,
              title
            }}
          />
        )

      case 'nonEcological':
        return (
          <NonEcologicalCriteriaForm
            {...{
              name,
              reference,
              handleChange,
              handleBlur,
              errors,
              touched,
              setFieldTouched,
              setFieldValue,
              label,
              scoreData,
              title
            }}
          />
        )
      default:
        return null
    }
  }

  return <Box>{getForm(title)}</Box>
}

FormFieldElement.propTypes = {
  errors: PropTypes.shape({
    OptValue: PropTypes.any,
    description: PropTypes.any,
    maxValue: PropTypes.any,
    metric: PropTypes.any,
    metricName: PropTypes.any,
    minValue: PropTypes.any,
    title: PropTypes.any,
    type: PropTypes.any,
    value: PropTypes.any
  }),
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.any,
  name: PropTypes.string.isRequired,
  reference: PropTypes.shape({
    OptValue: PropTypes.any,
    description: PropTypes.any,
    maxValue: PropTypes.any,
    metric: PropTypes.shape({
      toLowerCase: PropTypes.func
    }),
    metricName: PropTypes.any,
    minValue: PropTypes.any,
    title: PropTypes.any,
    type: PropTypes.string,
    value: PropTypes.any
  }),
  scoreData: PropTypes.any,
  setFieldTouched: PropTypes.func,
  setFieldValue: PropTypes.func,
  title: PropTypes.any,
  touched: PropTypes.shape({
    OptValue: PropTypes.any,
    maxValue: PropTypes.any,
    metric: PropTypes.any,
    metricName: PropTypes.any,
    minValue: PropTypes.any,
    title: PropTypes.any,
    type: PropTypes.any,
    value: PropTypes.any
  })
}

export default FormFieldElement
