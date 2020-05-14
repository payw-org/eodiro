import $ from './style.module.scss'
import { Lecture } from '@/api'

function formatTime(num: number): string {
  return ('0' + num).slice(-2)
}

function lectureKey(lecture: Lecture): string {
  return lecture.name + lecture.professor + lecture.start_h + lecture.start_m
}

export type TimetableProps = {
  info: {
    classroomNumber: string
    lectures: Lecture[]
  }
  close: () => void
}

const Timetable: React.FC<TimetableProps> = ({ info, close }) => {
  return (
    <div className={$['timetable']}>
      <div className={$['bg']} onClick={close} />
      <div className={$['panel']}>
        <h1 className={$['classroom-number']}>
          {info && info.classroomNumber}
          <span className={$['room']}>호</span>
        </h1>
        {info &&
          info.lectures &&
          info.lectures.map((lecture) => (
            <div className={$['lecture']} key={lectureKey(lecture)}>
              <div className={$['interval']}>
                <div>
                  {`${formatTime(lecture.start_h)}:${formatTime(
                    lecture.start_m
                  )}`}
                </div>
                <div className={$['vertical-dash']} />
                <div>
                  {`${formatTime(lecture.end_h)}:${formatTime(lecture.end_m)}`}
                </div>
              </div>
              <div className={$['lecture-info']}>
                <div className={$['name']}>{lecture.name}</div>
                <div className={$['professor']}>{lecture.professor}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Timetable
