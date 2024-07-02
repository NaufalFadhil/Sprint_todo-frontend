import React from 'react'

export default function StatusBadge({status}) {
  const [statusColor, setstatusColor] = React.useState('')

  React.useEffect(() => {
    if (status === 'todo') {
      setstatusColor('secondary')
    } else if (status === 'ongoing') {
      setstatusColor('warning')
    } else if (status === 'completed') {
      setstatusColor('success')
    } else if (status === 'canceled') {
      setstatusColor('danger')
    } else {
      setstatusColor('info')
    }
  }, [status]);

  return (
    <div>
        <span class={`badge rounded-pill bg-${statusColor}`}>{status}</span>
    </div>
  )
}
