import './style.scss'
export type NoticeProps = {}

const Notice: React.FC<NoticeProps> = () => {
  return (
    <div className="notice" data-component="">
      <h3 className="headline">
        ✅ 2020년 5월 6일 21시 40분 데이터 복구를 완료했습니다.
      </h3>
      <ul>
        <li>
          2020년 3월 17일 - 5월 1일 사이의 가입자 정보가 유실되었습니다. 만약 이
          시기에 가입을 했다면 재가입이 필요합니다.
        </li>
      </ul>
    </div>
  )
}

export default Notice
