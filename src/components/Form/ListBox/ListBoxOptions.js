import React from 'react'
import { UnorderedList } from '@chakra-ui/react'
import { Listbox } from '@headlessui/react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import ListBoxOption from './ListBoxOption'

const MotionList = motion(UnorderedList)
const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }

const ListBoxOptions = ({ options }) => (
  <Listbox.Options
    as={MotionList}
    listStyleType='none'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { ...transition } }}
    exit={{ opacity: 0, transition: { ...transition } }}
    ml={0}
    pos='absolute'
    w='full'
    py={1}
    mt={1}
    overflow='auto'
    fontSize='md'
    bg='white'
    rounded='md'
    shadow='lg'
    maxH={64}
    borderWidth={1}
    zIndex={2}
  >
    {options?.map((item, index) => (
      <ListBoxOption key={(i => i)(index)} item={item} />
    ))}
  </Listbox.Options>
)

ListBoxOptions.propTypes = {
  options: PropTypes.array
}

export default ListBoxOptions
