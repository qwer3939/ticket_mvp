import prisma from "../src/lib/prisma";

const categories = ["Concert", "Camping", "Fansign", "Restaurant", "Hotel"];
const ticketTypes = ["sell", "buy"];
const sellTicketSuffix = ["판매합니다.", "판매해요", "양도합니다.", "양도해요", "팔아요", "판매"];
const buyTicketSuffix = ["구매합니다.", "구매해요", "구해요", "사요", "구매"];
const artists = [
  "아이유",
  "BTS",
  "블랙핑크",
  "트와이스",
  "아이즈원",
  "에이핑크",
  "오마이걸",
  "마마무",
  "레드벨벳",
  "에이핑크",
  "모모랜드",
  "우주소녀",
  "세븐틴",
  "엑소",
  "빅뱅",
  "샤이니",
  "갓세븐",
  "뉴이스트",
  "워너원",
  "엔시티",
  "트와이스",
  "아이즈원",
  "에이핑크",
  "오마이걸",
  "마마무",
  "레드벨벳",
  "에이핑크",
  "모모랜드",
  "우주소녀",
  "세븐틴",
  "엑소",
  "빅뱅",
  "샤이니",
  "갓세븐",
  "뉴이스트",
  "워너원",
  "엔시티",
  "트와이스",
  "아이즈원",
  "에이핑크",
  "오마이걸",
  "마마무",
  "레드벨벳",
  "에이핑크",
  "모모랜드",
  "우주소녀",
  "세븐틴",
  "엑소",
  "빅뱅",
  "샤이니",
  "갓세븐",
  "뉴이스트",
  "워너원",
  "엔시티",
  "트와이스",
  "아이즈원",
  "에이핑크",
  "오마이걸",
  "마마무",
  "레드벨벳",
  "에이핑크",
  "모모랜드",
  "우주소녀",
  "세븐틴",
  "엑소",
  "빅뱅",
  "샤이니",
  "갓세븐",
  "뉴이스트",
  "워너원",
];
const locations = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
];
const status = ["Available", "Sold", "Canceled", "Expired"];
const campingType = ["텐트", "카라반", "오토캠핑", "글램핑"];
const restaurants = [
  "VIPS",
  "아웃백",
  "놀부부대찌개",
  "봉구비어",
  "포장마차",
  "피자헛",
  "도미노피자",
  "피자스쿨",
  "피자마루",
  "피자에땅",
  "피자빙고",
  "피자헤븐",
];
const restaurantCoupons = ["3만원", "5만원", "10만원", "20만원", "30만원"];
const hotels = [
  "롯데호텔",
  "신라호텔",
  "그랜드하얏트",
  "파크하얏트",
  "콘래드",
  "힐튼",
  "웨스틴",
  "메리어트",
  "쉐라톤",
  "인터컨티넨탈",
  "프레지던트",
  "라마다",
  "코트야드",
  "프라하",
];
const hotelsPeriods = ["1박2일", "2박3일", "3박4일", "4박5일", "5박6일", "6박7일"];

async function main() {
  for (let i = 1; i <= 100; i++) {
    const email = `test${i}@test.com`;
    const ticketCount = Math.floor(Math.random() * 5) + 1; // 각 사용자당 1~5개의 티켓을 생성
    for (let j = 0; j < ticketCount; j++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      let title = "";
      const ticketType = ticketTypes[Math.floor(Math.random() * ticketTypes.length)];
      if (category === "Concert") {
        title = `${artists[Math.floor(Math.random() * artists.length)]} ${
          locations[Math.floor(Math.random() * locations.length)]
        }콘서트 티켓`;
      } else if (category === "Camping") {
        title = `${locations[Math.floor(Math.random() * locations.length)]} ${
          campingType[Math.floor(Math.random() * campingType.length)]
        }`;
      } else if (category === "Fansign") {
        title = `${artists[Math.floor(Math.random() * artists.length)]} ${
          locations[Math.floor(Math.random() * locations.length)]
        }팬싸인회`;
      } else if (category === "Restaurant") {
        title = `${restaurants[Math.floor(Math.random() * restaurants.length)]} ${
          locations[Math.floor(Math.random() * locations.length)]
        } ${restaurantCoupons[Math.floor(Math.random() * restaurantCoupons.length)]} 상품권`;
      } else if (category === "Hotel") {
        title = `${hotels[Math.floor(Math.random() * hotels.length)]} ${
          locations[Math.floor(Math.random() * locations.length)]
        } ${hotelsPeriods[Math.floor(Math.random() * hotelsPeriods.length)]}숙박권`;
      }

      if (ticketType === "sell") {
        title += ` ${sellTicketSuffix[Math.floor(Math.random() * sellTicketSuffix.length)]}`;
      } else {
        title += ` ${buyTicketSuffix[Math.floor(Math.random() * buyTicketSuffix.length)]}`;
      }

      await prisma.ticket.create({
        data: {
          user_id: `test${i}@test.com`,
          ticket_type: ticketType,
          category,
          title,
          description: `${title} ${title} ${title}`,
          status: status[Math.floor(Math.random() * status.length)],
        },
      });
    }
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
