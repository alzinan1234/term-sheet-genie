import SimulationComparison from '@/components/InvestorAdmin/Simulator/SimulationComparison/SimulationComparison'
import React from 'react'

const page = () => {
  return (
    <div>
         <SimulationComparison onBack={function (): void {
              throw new Error('Function not implemented.')
          } } />
    </div>
  )
}

export default page
