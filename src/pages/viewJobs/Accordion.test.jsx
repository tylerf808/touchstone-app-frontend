import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Accordion from './Accordion'
import JobsTable from './JobsTable'

const sampleJob = {
  date: '2025-12-01',
  client: 'ACME Logistics',
  driver: 'Joe Driver',
  start: 'Origin',
  end: 'Destination',
  revenue: 1000,
  totalCost: 800,
  netProfit: 200,
  labor: 100,
  dispatch: 20,
  factor: 10,
  fuel: 200,
  tolls: 30,
  odc: 5,
  trailerLease: 50,
  tractorLease: 75,
  insurance: 60,
  overhead: 40,
  depreciation: 25,
  parking: 10,
  repairs: 15,
  distance: 120,
  driveTime: '2:30',
  mileageRate: 1.5
}

describe('Accordion component', () => {
  test('renders header values and formatted amounts', () => {
    render(<Accordion job={sampleJob} />)

    expect(screen.getByText(sampleJob.date)).toBeInTheDocument()
    expect(screen.getByText(sampleJob.client)).toBeInTheDocument()
    expect(screen.getByText(/\$1,000\.00/)).toBeInTheDocument()
  })

  test('has same width/grid layout as JobsTable header', () => {
    // render JobsTable so Accordion is nested inside
    const { container } = render(<JobsTable jobs={[sampleJob]} selectedJobs={[]} setSelectedJobs={() => {}} />)

    const jobsHeader = container.querySelector('#jobs-table-header')
    const accordionHeader = container.querySelector('#accordion-header')

    expect(jobsHeader).toBeInTheDocument()
    expect(accordionHeader).toBeInTheDocument()

    // both should include full-width class
    expect(jobsHeader.className).toMatch(/w-full/)
    expect(accordionHeader.className).toMatch(/w-full/)

    // both should use the same grid template for columns
    expect(jobsHeader.className).toMatch(/grid-cols-\[2%,9%,9%,10%,20%,20%,30%\]/)
    expect(accordionHeader.className).toMatch(/grid-cols-\[2%,9%,9%,10%,20%,20%,30%\]/)
  })

  test('toggles body when header is clicked but not when checkbox is clicked', () => {
    const { container } = render(<Accordion job={sampleJob} />)

    const body = container.querySelector('#accordion-body')
    const header = container.querySelector('#accordion-header')
    const checkbox = container.querySelector('#accordion-checkbox')

    // initially closed
    expect(body.className).toMatch(/h-0/)

    // clicking header toggles open
    fireEvent.click(header)
    expect(body.className).toMatch(/h-\[12rem\]/)

    // clicking checkbox should not toggle
    fireEvent.click(checkbox)
    // still open
    expect(body.className).toMatch(/h-\[12rem\]/)

    // clicking header again closes
    fireEvent.click(header)
    expect(body.className).toMatch(/h-0/)
  })
})
