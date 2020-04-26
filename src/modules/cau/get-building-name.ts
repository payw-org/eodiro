export default function getBuildingName(buildingNumber: number): string {
  const buildingInfo = {
    102: '약학대학 및 R&D센터',
    103: '파이퍼홀',
    104: '수림과학관',
    105: '제1의학관',
    106: '제2의학관',
    202: '전산정보관',
    203: '서라벌홀',
    207: '봅스트홀',
    208: '제2공학관',
    209: '창업보육관',
    301: '중앙문화예술관',
    302: '대학원',
    303: '법학관',
    304: '미디어공연영상관',
    305: '교수연구동 및 체육관',
    309: '블루미르홀',
    310: '100주년기념관',
  }

  return buildingInfo[buildingNumber] || ''
}
