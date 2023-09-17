import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
  } from '@mui/lab/TimelineOppositeContent';
import { TimelineConnector } from '@mui/lab';
// import { TimelineItemsComp } from './TimelineItems';
import { format, parse } from 'date-fns' 

interface TaskItem {
  key: string
  duration: number
  task: string
}

interface Props {
  deadline: string
  taskItems: TaskItem[]
}

export const LeftAlignedTimeline = (props: Props) => {



  return (
    <Timeline sx = {{[`& .${timelineOppositeContentClasses.root}`]: {flex: 0.2,},}}>
      
      {props.taskItems.map((item, index) =>{
        const startTime = getStartTime(index, props)

        return (
          <TimelineItem key={item.key}>
          <TimelineOppositeContent color="textSecondary">
            {startTime}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            {item.duration + '分 '+ item.task}
          </TimelineContent>
        </TimelineItem>
        )
      })}
      

      <TimelineItem key="deadline">
        <TimelineOppositeContent color="textSecondary">
          {props.deadline}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>終了！</TimelineContent>
      </TimelineItem>

    </Timeline>
  );
}

function getStartTime(index:number, props:Props){
    const deadline = props.deadline
    const taskItems = props.taskItems
    
    let totalDuration:number = 0
    
    for(let i= 0; i < taskItems.length; i++){
      if(i >= index){
        totalDuration += taskItems[i].duration
      }
    }
    
    const dt:Date = parse(deadline, 'HH:mm', new Date)
    dt.setMinutes(dt.getMinutes() - totalDuration)
    
    const startTime = format(dt,'HH:mm')

  
  
  return startTime
}