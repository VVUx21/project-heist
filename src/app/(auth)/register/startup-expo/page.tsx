import React from 'react'
import dynamic from 'next/dynamic'

const RegistrationForm = dynamic(() => import('@/components/registorform'), {
  ssr: false
})

export default function page() {
  return (
    <div>
        <RegistrationForm eventName="Startup Expo" />
    </div>
  )
}
