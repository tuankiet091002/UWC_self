import React, { useEffect } from 'react'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import { Container } from '@mui/material';

import { useTaskContext } from '../hooks/Tasks/useTaskContext';
import { useGetTasks } from '../hooks/Tasks/useGetTasks';

const Calendar = () => {
    const { tasks } = useTaskContext();
    const { getTasks } = useGetTasks();

    useEffect(() => {
        getTasks();
    }, [])

    const taskCalendar = tasks.map(task => {
        return {
            title: `Task ${task._id}: ${task.state}`,
            start: (new Date(task.date).getTime() + 3600000 * (task.shift * 3 + 3)),
            end: (new Date(task.date).getTime() + 3600000 * (task.shift * 3 + 6)),
            url: '/task'
        }
    })

    return (<Container maxWidth={false} sx={{ mx: 0, height: '100%', width: '100%' }}>
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            height='100%'
            aspectRatio={1}
            events={taskCalendar}
            headerToolbar={{
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay' // user can switch between the two
            }}

        /></Container>
    )
}

export default Calendar