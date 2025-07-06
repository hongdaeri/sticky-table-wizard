import { Employee } from '@/data/sampleData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface EmployeeDetailModalProps {
  employee: Employee | null;
  open: boolean;
  onClose: () => void;
}

export function EmployeeDetailModal({ employee, open, onClose }: EmployeeDetailModalProps) {
  if (!employee) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">직원 상세 정보</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* 기본 정보 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">이름</label>
              <p className="text-lg font-semibold text-foreground">{employee.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">ID</label>
              <p className="text-lg font-semibold text-foreground">{employee.id}</p>
            </div>
          </div>

          <Separator />

          {/* 연락처 정보 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">연락처 정보</h3>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">이메일</label>
                <p className="text-foreground">{employee.email}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* 직무 정보 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">직무 정보</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">부서</label>
                <p className="text-foreground">{employee.department}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">직책</label>
                <p className="text-foreground">{employee.position}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">근무지</label>
                <p className="text-foreground">{employee.location}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">상급자</label>
                <p className="text-foreground">{employee.manager}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* 급여 및 성과 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">급여 및 성과</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">연봉</label>
                <p className="text-lg font-semibold text-primary">
                  ₩{employee.salary.toLocaleString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">평가점수</label>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">{employee.performance}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(employee.performance) ? 'text-yellow-400' : 'text-muted-foreground'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">담당 프로젝트</label>
                <Badge variant="secondary" className="mt-1">
                  {employee.projects}개
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">상태</label>
                <div className="mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                    {employee.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* 기타 정보 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">기타 정보</h3>
            <div>
              <label className="text-sm font-medium text-muted-foreground">입사일</label>
              <p className="text-foreground">{employee.joinDate}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}