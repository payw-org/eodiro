<template>
  <div id="clubs-list">
    <Grid>
      <ClubItem
        v-for="clubItem in clubsList"
        :key="clubItem.name"
        :club-data="clubItem"
      />
    </Grid>

    <transition name="test">
      <NuxtChild />
    </transition>
  </div>
</template>

<script>
import pageBase from '~/mixins/page-base'
import { Grid } from '~/components/ui'
import ClubItem from '~/components/clubs/ClubItem'

export default {
  name: 'clubs-topic',
  components: { Grid, ClubItem },
  mixins: [pageBase],
  data() {
    return {
      popParent: true,
      clubsList: [
        {
          id: Math.floor(Math.random() * 1000),
          name: '댄스포즈',
          explanation:
            '스트릿 댄스 동아리. 동아리방이 빨벽(206관) 지하에 있다. 동아리로 들어가는 입구가 마치 던전으로 들어가는 입구처럼 느껴져 대부분의 신입생들은 들어가기 무서워한다는 풍문.',
        },
        {
          id: Math.floor(Math.random() * 1000),
          name: '영죽무대',
          explanation:
            "연극 동아리. 영죽(孆竹)이란 단어 뜻은 '어린 대나무'이다. Young 竹이 아니다 1971년 세워진 유서깊은 동아리로써 2014년 기준 정기공연 85회, 워크샵 46회를 진행했다. 일반적으로 방학기간을 이용해 2달간 연습하고 학기초에 공연을 한다. 연습 시간은 각 공연마다 약간씩 다르지만, 정기공연을 앞두고 가장 빡셀 때는 오전 10시부터 저녁 10시는 기본이다. 이 탓인지는 몰라도 들리는 소문에 의하면 교내 다른 연극 동아리에서 신입생이 왔을때 연극을 제대로 하고 싶다면 영죽무대, 설렁설렁 하고 싶다면 자기 동아리를 선택하라는 소리가 있다.",
        },
        {
          id: Math.floor(Math.random() * 1000),
          name: '미생마',
          explanation:
            '바둑을 둘 줄 몰라도 관심만 있으면 언제든지 배울 수 있으니 누구나 환영. 바둑에 대한 큰 흥미가 없어도 친구따라서 부지런히 동아리 오다보면 자연스럽게 회원이 될 수 있다. 단 쾌적한 공간만을 위해 어쩌다 한번씩 오면 눈총받는다.',
        },
        {
          id: Math.floor(Math.random() * 1000),
          name: '만화두레',
          explanation:
            '중앙대학교 만화동아리이다. 매학기 일러스트 전시회를 진행하며, 매년 창작만화가 수록된 회지를 발간한다.',
        },
        {
          id: Math.floor(Math.random() * 1000),
          name: '중앙서예연구회',
          explanation:
            '서예동아리. 학생회관(205관) 3층 323호에 위치해있다. 2014년 현재 44년 전통을 가진 역사 깊은 동아리이다. 한자서예·한글서예·캘리그라피까지 폭넓은 수비범위를 자랑한다. 한자서예가 주력이고 한글과 캘리그라피를 사이드로 다루는 식이다.',
        },
        {
          id: Math.floor(Math.random() * 1000),
          name: '손짓사랑',
          explanation: '청각장애자 봉사 동아리. 화려한 수화공연으로 유명하다.',
        },
        {
          id: Math.floor(Math.random() * 1000),
          name: '비꼼',
          explanation:
            '최초 창립년은 1987년. 당시 재학 중이던 제주도 출신 선배들이 모여만든 4.3연구회가 전신이다. 이후 90년대들어 현대사연구회로 이름이 바뀌었다가 2000년대 초반에 본격 토론동아리로 탈바꿈 하는 한편 현재 이름인 비꼼(Be Commune.)으로 개명하였다. 현재는 자유토론을 표방하기에 주제를 가리지 않고 다양한 분야에 대해 이야기 나누고 있다. 2018년 동아리 회장이 극단주의 사절, 다양한 사람들의 자유로운 생각 공유라는 모토로 동아리를 이끌고 있기에 의견의 편향 없이 토론이 이루어지고 있다.',
        },
        {
          id: Math.floor(Math.random() * 1000),
          name: '네비게이토',
          explanation:
            '실생활 속에서 믿지 않는 자들과 함께 살며 그들 속에서 제자를 삼고, 영적 일꾼을 길러 그들을 통해 세계 각 곳의 여러 나라로 복음을 확장시키는 사람피곤하게하는 일에 힘쓰고 있다.',
        },
        {
          id: Math.floor(Math.random() * 1000),
          name: '라이너스',
          explanation:
            '30여년의 역사를 가진 동아리다. 창립 당시에는 싸이클부였으며 자전거 동아리였다. 2005~2006년 경에 라이너스로 이름을 바꾸고 자전거, 인라인 동아리로 바뀌었다. 오랫동안 지금은 철거된 구 학생회관 4층의 컨테이너 가건물에 있었다가 신 학생회관(이 건물은 10년 사이에 정경대-교양학관-학생회관으로 변했다.) 2층으로 이전하였다.',
        },
        {
          id: Math.floor(Math.random() * 1000),
          name: '코스모스',
          explanation:
            '천체 관측 동아리. 서라벌홀(203관 인문대) 건물 옥상에 동아리방이 있다. 주기적으로 관측회도 가고 동아리방에 망원경도 있어 저녁에 서라벌 옥상에서 별관측이 가능하다.',
        },
      ],
    }
  },
}
</script>
