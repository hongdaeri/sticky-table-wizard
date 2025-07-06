export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  joinDate: string;
  location: string;
  manager: string;
  performance: number;
  projects: number;
  status: 'Active' | 'Inactive' | 'On Leave';
}

export const sampleEmployees: Employee[] = [
  {
    id: 1,
    name: "김민수",
    email: "minsu.kim@company.com",
    department: "개발팀",
    position: "시니어 개발자",
    salary: 75000000,
    joinDate: "2020-03-15",
    location: "서울 본사",
    manager: "이영희",
    performance: 4.8,
    projects: 12,
    status: "Active"
  },
  {
    id: 2,
    name: "박지영",
    email: "jiyoung.park@company.com",
    department: "마케팅팀",
    position: "마케팅 매니저",
    salary: 65000000,
    joinDate: "2019-08-22",
    location: "서울 본사",
    manager: "최원석",
    performance: 4.6,
    projects: 8,
    status: "Active"
  },
  {
    id: 3,
    name: "이준호",
    email: "junho.lee@company.com",
    department: "개발팀",
    position: "프론트엔드 개발자",
    salary: 60000000,
    joinDate: "2021-01-10",
    location: "부산 지사",
    manager: "김민수",
    performance: 4.4,
    projects: 15,
    status: "Active"
  },
  {
    id: 4,
    name: "최서연",
    email: "seoyeon.choi@company.com",
    department: "인사팀",
    position: "인사 담당자",
    salary: 50000000,
    joinDate: "2018-11-05",
    location: "서울 본사",
    manager: "정혜진",
    performance: 4.7,
    projects: 6,
    status: "On Leave"
  },
  {
    id: 5,
    name: "정태민",
    email: "taemin.jung@company.com",
    department: "영업팀",
    position: "영업 대표",
    salary: 70000000,
    joinDate: "2017-06-18",
    location: "대구 지사",
    manager: "홍길동",
    performance: 4.9,
    projects: 20,
    status: "Active"
  },
  {
    id: 6,
    name: "한예림",
    email: "yerim.han@company.com",
    department: "디자인팀",
    position: "UX/UI 디자이너",
    salary: 58000000,
    joinDate: "2020-09-12",
    location: "서울 본사",
    manager: "김예나",
    performance: 4.5,
    projects: 18,
    status: "Active"
  },
  {
    id: 7,
    name: "윤상혁",
    email: "sanghyuk.yoon@company.com",
    department: "개발팀",
    position: "백엔드 개발자",
    salary: 68000000,
    joinDate: "2019-04-03",
    location: "서울 본사",
    manager: "이영희",
    performance: 4.6,
    projects: 14,
    status: "Active"
  },
  {
    id: 8,
    name: "송미라",
    email: "mira.song@company.com",
    department: "재무팀",
    position: "재무 분석가",
    salary: 62000000,
    joinDate: "2021-07-20",
    location: "서울 본사",
    manager: "김재호",
    performance: 4.3,
    projects: 9,
    status: "Active"
  },
  {
    id: 9,
    name: "조현우",
    email: "hyunwoo.jo@company.com",
    department: "영업팀",
    position: "영업 사원",
    salary: 45000000,
    joinDate: "2022-02-14",
    location: "광주 지사",
    manager: "정태민",
    performance: 4.1,
    projects: 7,
    status: "Inactive"
  },
  {
    id: 10,
    name: "강은지",
    email: "eunji.kang@company.com",
    department: "마케팅팀",
    position: "콘텐츠 기획자",
    salary: 52000000,
    joinDate: "2020-12-01",
    location: "서울 본사",
    manager: "박지영",
    performance: 4.7,
    projects: 11,
    status: "Active"
  },
  {
    id: 11,
    name: "임동혁",
    email: "donghyuk.im@company.com",
    department: "개발팀",
    position: "데이터 엔지니어",
    salary: 72000000,
    joinDate: "2018-05-30",
    location: "서울 본사",
    manager: "이영희",
    performance: 4.8,
    projects: 16,
    status: "Active"
  },
  {
    id: 12,
    name: "배수진",
    email: "sujin.bae@company.com",
    department: "인사팀",
    position: "채용 담당자",
    salary: 48000000,
    joinDate: "2021-10-15",
    location: "서울 본사",
    manager: "정혜진",
    performance: 4.2,
    projects: 5,
    status: "Active"
  },
  {
    id: 13,
    name: "홍성민",
    email: "seongmin.hong@company.com",
    department: "영업팀",
    position: "영업 팀장",
    salary: 85000000,
    joinDate: "2016-08-08",
    location: "부산 지사",
    manager: "홍길동",
    performance: 4.9,
    projects: 25,
    status: "Active"
  },
  {
    id: 14,
    name: "오하늘",
    email: "haneul.oh@company.com",
    department: "디자인팀",
    position: "그래픽 디자이너",
    salary: 54000000,
    joinDate: "2019-12-20",
    location: "서울 본사",
    manager: "김예나",
    performance: 4.4,
    projects: 13,
    status: "On Leave"
  },
  {
    id: 15,
    name: "신우철",
    email: "woocheol.shin@company.com",
    department: "개발팀",
    position: "풀스택 개발자",
    salary: 69000000,
    joinDate: "2020-06-25",
    location: "대전 지사",
    manager: "김민수",
    performance: 4.5,
    projects: 17,
    status: "Active"
  }
];