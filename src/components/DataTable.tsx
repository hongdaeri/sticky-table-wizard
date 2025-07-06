import { useState, useMemo, useEffect } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface Column<T> {
  key: keyof T;
  header: string;
  width?: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  stickyColumns?: (keyof T)[];  // 고정할 열들을 지정
  height?: string;
  className?: string;
  pageSize?: number;
  onRowClick?: (row: T) => void;
}

type SortConfig<T> = {
  key: keyof T;
  direction: 'asc' | 'desc';
} | null;

export function DataTable<T>({
  data,
  columns,
  stickyColumns = [],  // 기본값은 빈 배열
  height = "400px",
  className,
  pageSize: initialPageSize = 10,
  onRowClick
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [isLoading, setIsLoading] = useState(false);

  // 고정 열의 누적 너비 계산
  const getStickyLeft = (columnIndex: number) => {
    let leftOffset = 0;
    for (let i = 0; i < columnIndex; i++) {
      const column = columns[i];
      if (stickyColumns.includes(column.key)) {
        const width = column.width || '120px';
        leftOffset += parseInt(width) || 120;
      }
    }
    return leftOffset;
  };

  // 열이 고정되어 있는지 확인
  const isColumnSticky = (columnKey: keyof T) => {
    return stickyColumns.includes(columnKey);
  };

  // 정렬된 데이터
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // 페이지네이션된 데이터
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize]);

  // 총 페이지 수
  const totalPages = Math.ceil(data.length / pageSize);

  // 정렬 핸들러
  const handleSort = (key: keyof T) => {
    setSortConfig(current => {
      if (current?.key === key) {
        if (current.direction === 'asc') {
          return { key, direction: 'desc' };
        } else {
          return null; // 정렬 해제
        }
      }
      return { key, direction: 'asc' };
    });
    setCurrentPage(1); // 정렬 시 첫 페이지로 이동
  };

  // 로딩 상태 처리
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800); // 800ms 로딩 시뮬레이션
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
  };

  // 페이지 사이즈 변경
  const handlePageSizeChange = (newPageSize: string) => {
    setIsLoading(true);
    setPageSize(Number(newPageSize));
    setCurrentPage(1); // 페이지 사이즈 변경 시 첫 페이지로 이동
  };

  // 정렬 아이콘 렌더링
  const renderSortIcon = (key: keyof T) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === 'asc' 
        ? <ChevronUp className="w-4 h-4" />
        : <ChevronDown className="w-4 h-4" />;
    }
    return <ChevronsUpDown className="w-4 h-4 opacity-50" />;
  };

  return (
    <div className={cn("relative bg-card rounded-lg shadow-lg border border-table-border", className)}>

      {/* 테이블 */}
      <div 
        className="relative overflow-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-background"
        style={{ height }}
      >
        {/* 테이블 바디 로딩 오버레이 */}
        {isLoading && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">데이터를 불러오는 중...</p>
            </div>
          </div>
        )}

        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-20 bg-table-header border-b border-table-border">
            <tr>
              {columns.map((column, index) => {
                const isSticky = isColumnSticky(column.key);
                const leftOffset = isSticky ? getStickyLeft(index) : 0;
                
                return (
                  <th
                    key={String(column.key)}
                    className={cn(
                      "px-4 py-3 text-left text-sm font-semibold text-table-header-foreground border-r border-table-border last:border-r-0",
                      "transition-colors duration-200",
                      column.sortable && "cursor-pointer hover:bg-primary-light hover:text-primary",
                      isSticky && "sticky z-30 bg-table-header shadow-md"
                    )}
                    style={{ 
                      width: column.width,
                      minWidth: column.width || '120px',
                      left: isSticky ? `${leftOffset}px` : 'auto'
                    }}
                    onClick={column.sortable ? () => handleSort(column.key) : undefined}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate">{column.header}</span>
                      {column.sortable && renderSortIcon(column.key)}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={cn(isLoading && "opacity-30")}>
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  "border-b border-table-border transition-colors duration-150",
                  "hover:bg-table-row-hover cursor-pointer",
                  rowIndex % 2 === 0 ? "bg-card" : "bg-table-stripe"
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column, colIndex) => {
                  const isSticky = isColumnSticky(column.key);
                  const leftOffset = isSticky ? getStickyLeft(colIndex) : 0;
                  
                  return (
                    <td
                      key={String(column.key)}
                      className={cn(
                        "px-4 py-3 text-sm text-card-foreground border-r border-table-border last:border-r-0",
                        "whitespace-nowrap overflow-hidden text-ellipsis",
                        isSticky && "sticky z-10 shadow-md",
                        isSticky && rowIndex % 2 === 0 ? "bg-card" : "",
                        isSticky && rowIndex % 2 === 1 ? "bg-table-stripe" : ""
                      )}
                      style={{ 
                        width: column.width,
                        minWidth: column.width || '120px',
                        left: isSticky ? `${leftOffset}px` : 'auto'
                      }}
                    >
                      <div className="truncate" title={String(row[column.key])}>
                        {column.render ? column.render(row[column.key], row) : String(row[column.key])}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 푸터 - 페이지네이션 */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-table-border bg-card">
        <div className="text-sm text-muted-foreground">
          총 {data.length}개 중 {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, data.length)}개 표시
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
          >
            <ChevronLeft className="w-4 h-4" />
            이전
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="w-8 h-8 p-0"
                  disabled={isLoading}
                >
                  {page}
                </Button>
              );
            })}
            
            {totalPages > 5 && (
              <>
                <span className="text-muted-foreground">...</span>
                <Button
                  variant={currentPage === totalPages ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(totalPages)}
                  className="w-8 h-8 p-0"
                  disabled={isLoading}
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
          >
            다음
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            페이지 {currentPage} / {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">페이지당</span>
            <Select value={pageSize.toString()} onValueChange={handlePageSizeChange} disabled={isLoading}>
              <SelectTrigger className="w-20 h-8 bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border z-50">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">개씩</span>
          </div>
        </div>
      </div>
    </div>
  );
}