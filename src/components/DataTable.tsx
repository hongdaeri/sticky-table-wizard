import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

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
}

type SortConfig<T> = {
  key: keyof T;
  direction: 'asc' | 'desc';
} | null;

export function DataTable<T>({
  data,
  columns,
  stickyColumns = [],  // 기본값은 빈 배열
  height = "600px",
  className
}: DataTableProps<T>) {
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

  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(null);

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
    <div className={cn("relative overflow-hidden bg-card rounded-lg shadow-lg border border-table-border", className)}>
      <div 
        className="overflow-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-background"
        style={{ height }}
      >
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
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  "border-b border-table-border transition-colors duration-150",
                  "hover:bg-table-row-hover",
                  rowIndex % 2 === 0 ? "bg-card" : "bg-table-stripe"
                )}
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
    </div>
  );
}