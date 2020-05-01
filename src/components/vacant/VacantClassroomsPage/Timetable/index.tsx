import { Lecture } from '@/api'

export type TimetableProps = {
  classroomNumber: string
  lectures: Lecture[]
}

const Timetable: React.FC<TimetableProps> = ({ classroomNumber, lectures }) => {
  return (
    <div className="timetable" data-component="">
      <h1 className="classroom-number">{classroomNumber}</h1>
      {lectures.map((lecture) => (
        <div className="lecture" key={lecture.name + lecture.professor}>
          <span>{lecture.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Timetable
