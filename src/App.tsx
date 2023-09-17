import {useState} from 'react'
import './App.css'
import Stack from '@mui/material/Stack';
import { HorizontalLine } from './components/HorisontalLine'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LeftAlignedTimeline } from './components/LeftAlignedTimeline';
import {v4} from 'uuid'

interface TaskItem {
  key: string
  duration: number
  task: string
  startTime?: string
}

function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [task, setTask] = useState('');
  const [duration, setDuration] = useState(0);
  const [deadline, setDeadline] = useState('12:00');

  const handleAddTask = () => {
    if (duration && task) {
      const newTask: TaskItem = {
        key: v4(),
        duration: duration,
        task: task
      };
      setTasks([...tasks, newTask]);
      setTask('');
      setDuration(0);
    }
  };

  return (
    <>
      <h1>理論値タイムスケジューラ</h1>

      <Stack direction="row" spacing={2} >
        <TextField id="deadline" label="deadline" type="time" value={deadline} onChange={(e) => setDeadline(e.target.value)}/>
        <TextField id="duration" label="duration(min)" type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))}/>
        <TextField id="task" label="task" value={task} onChange={(e) => setTask(e.target.value)} />
        <Button variant="contained" color="primary" onClick={handleAddTask}>add</Button>
      </Stack>
      
      <HorizontalLine />

      <LeftAlignedTimeline deadline={deadline} taskItems={tasks} />

      
    </>
  );
}

export default App
