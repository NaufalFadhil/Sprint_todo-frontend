import React from 'react'

export default function PriorityBadge({priority}) {
  const [priorityColor, setPriorityColor] = React.useState('')

  React.useEffect(() => {
    if (priority === 'P0') {
      setPriorityColor('danger')
    } else if (priority === 'P1' || priority === 'P2') {
      setPriorityColor('warning')
    } else {
      setPriorityColor('info')
    }
  }, [priority])
  return (
    <div className="avatar avatar-md">
        <div className={`avatar bg-${priorityColor} me-3`}>
            <span className="avatar-content">{priority}</span>
        </div>
    </div>
  )
}
