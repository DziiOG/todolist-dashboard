import PropTypes from 'prop-types'
import React from 'react'
import { PieChart, Pie, Cell } from 'recharts'

const DoughnutChart = ({ data }) => (
  <PieChart width={230} height={230}>
    <Pie
      data={data || []}
      nameKey='name'
      cx='50%'
      cy='50%'
      innerRadius={80}
      fill='#82ca9d'
    >
      {(data || []).map(entry => (
        <Cell key={entry.id} cursor='pointer' fill={entry.color} />
      ))}
    </Pie>
  </PieChart>
)
DoughnutChart.propTypes = {
  data: PropTypes.array
}

export default DoughnutChart
