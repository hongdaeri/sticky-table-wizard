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

// 1000개의 샘플 데이터 생성 함수
const generateSampleEmployees = (): Employee[] => {
  const names = [
    "김민수", "박지영", "이준호", "최서연", "정태민", "한예림", "윤상혁", "송미라", "조현우", "강은지",
    "임동혁", "배수진", "홍성민", "오하늘", "신우철", "이수빈", "장혜진", "김태현", "박소영", "최동욱",
    "정미경", "한지민", "윤재웅", "송하늘", "조은비", "강태준", "임예슬", "배현수", "홍지우", "오민석",
    "신예리", "이현우", "장미래", "김도윤", "박준서", "최하린", "정서준", "한지호", "윤서현", "송지안",
    "조민준", "강서연", "임하준", "배지윤", "홍서진", "오지환", "신도현", "이서윤", "장준영", "김하은"
  ];
  
  const departments = ["개발팀", "마케팅팀", "인사팀", "영업팀", "디자인팀", "재무팀", "기획팀", "운영팀"];
  const positions = [
    "시니어 개발자", "주니어 개발자", "프론트엔드 개발자", "백엔드 개발자", "풀스택 개발자", "데이터 엔지니어",
    "마케팅 매니저", "콘텐츠 기획자", "브랜드 매니저", "디지털 마케터",
    "인사 담당자", "채용 담당자", "교육 담당자", "노무 담당자",
    "영업 대표", "영업 팀장", "영업 사원", "고객 관리자",
    "UX/UI 디자이너", "그래픽 디자이너", "제품 디자이너", "브랜드 디자이너",
    "재무 분석가", "회계 담당자", "예산 관리자", "투자 분석가",
    "프로젝트 매니저", "기획자", "전략 기획자", "사업 기획자",
    "운영 관리자", "품질 관리자", "시설 관리자", "IT 지원"
  ];
  const locations = ["서울 본사", "부산 지사", "대구 지사", "광주 지사", "대전 지사", "인천 지사"];
  const managers = ["이영희", "최원석", "김민수", "정혜진", "홍길동", "김예나", "김재호", "박상현", "이미영", "최지훈"];
  const statuses: ('Active' | 'Inactive' | 'On Leave')[] = ["Active", "Active", "Active", "Active", "Inactive", "On Leave"];

  const employees: Employee[] = [];

  for (let i = 1; i <= 1000; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const department = departments[Math.floor(Math.random() * departments.length)];
    const position = positions[Math.floor(Math.random() * positions.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const manager = managers[Math.floor(Math.random() * managers.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    // 연봉 범위: 40,000,000 ~ 120,000,000
    const salary = Math.floor(Math.random() * 80000000) + 40000000;
    
    // 입사일: 2015년부터 2023년까지
    const startYear = 2015;
    const endYear = 2023;
    const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    const joinDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    // 성과 점수: 3.0 ~ 5.0
    const performance = Math.round((Math.random() * 2 + 3) * 10) / 10;
    
    // 프로젝트 수: 1 ~ 30
    const projects = Math.floor(Math.random() * 30) + 1;

    employees.push({
      id: i,
      name: `${name}${i > names.length ? i : ''}`,
      email: `user${i}@company.com`,
      department,
      position,
      salary,
      joinDate,
      location,
      manager,
      performance,
      projects,
      status
    });
  }

  return employees;
};

export const sampleEmployees: Employee[] = generateSampleEmployees();