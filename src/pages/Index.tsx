import { DataTable, Column } from '@/components/DataTable';
import { Employee, sampleEmployees } from '@/data/sampleData';
import { EmployeeDetailModal } from '@/components/EmployeeDetailModal';
import { useState } from 'react';

const Index = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  // 테이블 컬럼 정의
  const columns: Column<Employee>[] = [
    {
      key: 'id',
      header: 'ID',
      width: '80px',
      sortable: true,
    },
    {
      key: 'name',
      header: '이름',
      width: '120px',
      sortable: true,
    },
    {
      key: 'email',
      header: '이메일',
      width: '220px',
      sortable: true,
    },
    {
      key: 'department',
      header: '부서',
      width: '120px',
      sortable: true,
    },
    {
      key: 'position',
      header: '직책',
      width: '180px',
      sortable: true,
    },
    {
      key: 'salary',
      header: '연봉',
      width: '120px',
      sortable: true,
      render: (value: number) => (
        <span className="font-medium text-primary">
          ₩{value.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'joinDate',
      header: '입사일',
      width: '120px',
      sortable: true,
    },
    {
      key: 'location',
      header: '근무지',
      width: '120px',
      sortable: true,
    },
    {
      key: 'manager',
      header: '상급자',
      width: '120px',
      sortable: true,
    },
    {
      key: 'performance',
      header: '평가점수',
      width: '100px',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <span className="font-medium">{value}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-xs ${
                  i < Math.floor(value) ? 'text-yellow-400' : 'text-muted-foreground'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: 'projects',
      header: '프로젝트 수',
      width: '100px',
      sortable: true,
      render: (value: number) => (
        <span className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
          {value}개
        </span>
      ),
    },
    {
      key: 'status',
      header: '상태',
      width: '100px',
      sortable: true,
      render: (value: string) => {
        const statusColors = {
          'Active': 'bg-green-100 text-green-800',
          'Inactive': 'bg-red-100 text-red-800',
          'On Leave': 'bg-yellow-100 text-yellow-800',
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[value as keyof typeof statusColors]}`}>
            {value}
          </span>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            직원 관리 시스템
          </h1>
          <p className="text-muted-foreground">
            수평/수직 스크롤, 정렬, 고정 헤더/첫 번째 열 기능이 있는 고급 데이터 테이블
          </p>
        </div>

        {/* 테이블 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card p-4 rounded-lg shadow-sm border border-table-border">
            <div className="text-sm text-muted-foreground">총 직원 수</div>
            <div className="text-2xl font-bold text-primary">{sampleEmployees.length}명</div>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-sm border border-table-border">
            <div className="text-sm text-muted-foreground">활성 직원</div>
            <div className="text-2xl font-bold text-green-600">
              {sampleEmployees.filter(emp => emp.status === 'Active').length}명
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-sm border border-table-border">
            <div className="text-sm text-muted-foreground">평균 평가점수</div>
            <div className="text-2xl font-bold text-yellow-600">
              {(sampleEmployees.reduce((sum, emp) => sum + emp.performance, 0) / sampleEmployees.length).toFixed(1)}
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-sm border border-table-border">
            <div className="text-sm text-muted-foreground">총 프로젝트</div>
            <div className="text-2xl font-bold text-accent-foreground">
              {sampleEmployees.reduce((sum, emp) => sum + emp.projects, 0)}개
            </div>
          </div>
        </div>

        {/* 데이터 테이블 */}
        <DataTable
          data={sampleEmployees}
          columns={columns}
          stickyColumns={['id', 'name']}  // ID와 이름 열을 고정
          height="400px"
          pageSize={10}
          className="mb-6"
          onRowClick={handleRowClick}
        />

        {/* 직원 상세 모달 */}
        <EmployeeDetailModal
          employee={selectedEmployee}
          open={isModalOpen}
          onClose={handleCloseModal}
        />

        {/* 사용법 안내 */}
        <div className="bg-primary-light p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-primary mb-3">테이블 사용법</h3>
          <ul className="space-y-2 text-sm text-card-foreground">
            <li>• <strong>정렬:</strong> 헤더를 클릭하여 오름차순/내림차순/정렬해제 가능</li>
            <li>• <strong>스크롤:</strong> 테이블 내에서 수평/수직 스크롤 지원</li>
            <li>• <strong>고정 헤더:</strong> 세로 스크롤 시 헤더가 상단에 고정됨</li>
            <li>• <strong>고정 열:</strong> 가로 스크롤 시 ID와 이름 열이 왼쪽에 고정됨 (원하는 열 지정 가능)</li>
            <li>• <strong>호버 효과:</strong> 행에 마우스를 올리면 하이라이트됨</li>
            <li>• <strong>행 클릭:</strong> 직원 행을 클릭하면 상세 정보 모달이 열림</li>
            <li>• <strong>페이지네이션:</strong> 테이블 하단에서 페이지 이동 및 정보 확인 가능</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;