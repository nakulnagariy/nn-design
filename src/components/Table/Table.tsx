import type { ReactNode, TableHTMLAttributes } from 'react'
import { cx } from '../../utils/cx'

export type TableAlign = 'start' | 'center' | 'end'
export type TableDensity = 'compact' | 'comfortable'

export interface TableColumn<T> {
  /** Stable identifier for the column. Also used as the React key. */
  key: string
  /** Header cell content. */
  header: ReactNode
  /**
   * Renders the body cell for a row. When omitted, the value at `row[key]` is
   * rendered directly — which only works if that value is a valid ReactNode.
   */
  cell?: (row: T, rowIndex: number) => ReactNode
  /** Cell alignment. Defaults to `start`. Use `end` for numeric columns. */
  align?: TableAlign
  /** Fixed column width, e.g. `"8rem"` or `"20%"`. */
  width?: string
}

export interface TableProps<T> extends Omit<TableHTMLAttributes<HTMLTableElement>, 'children'> {
  /** Column definitions, in display order. */
  columns: TableColumn<T>[]
  /** Row data. */
  data: T[]
  /** Per-row React key. Defaults to the row's index. */
  rowKey?: (row: T, rowIndex: number) => string | number
  /** Row height. Defaults to `comfortable`. */
  density?: TableDensity
  /** Tints alternating rows. */
  striped?: boolean
  /** Highlights the row under the cursor. */
  hoverable?: boolean
  /** Pins the header while the container scrolls. */
  stickyHeader?: boolean
  /** Shown in place of the body when `data` is empty. */
  emptyState?: ReactNode
  /** Caption describing the table. Visually hidden but announced. */
  caption?: ReactNode
  /** Class applied to the scrolling wrapper rather than the `table`. */
  wrapperClassName?: string
}

/**
 * A data table driven by column definitions.
 *
 * Define the shape once in `columns` and pass rows to `data` — the component
 * handles the markup, alignment and empty state. It renders a plain semantic
 * `<table>`, so it does not sort, paginate or virtualise; do that to `data`
 * before it gets here.
 *
 * @example
 * <Table
 *   columns={[
 *     { key: 'name', header: 'Name' },
 *     { key: 'status', header: 'Status', cell: (r) => <Badge tone="success">{r.status}</Badge> },
 *     { key: 'spend', header: 'Spend', align: 'end', cell: (r) => `$${r.spend}` },
 *   ]}
 *   data={rows}
 *   rowKey={(r) => r.id}
 *   hoverable
 * />
 */
export function Table<T>({
  columns,
  data,
  rowKey,
  density = 'comfortable',
  striped = false,
  hoverable = false,
  stickyHeader = false,
  emptyState,
  caption,
  className,
  wrapperClassName,
  ...rest
}: TableProps<T>) {
  return (
    <div className={cx('nn-table-wrap', wrapperClassName)}>
      <table
        className={cx(
          'nn-table',
          `nn-table--${density}`,
          striped && 'nn-table--striped',
          hoverable && 'nn-table--hoverable',
          stickyHeader && 'nn-table--sticky',
          className,
        )}
        {...rest}
      >
        {caption ? <caption className="nn-sr-only">{caption}</caption> : null}
        <thead className="nn-table__head">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cx('nn-table__th', `nn-table__cell--${column.align ?? 'start'}`)}
                style={column.width ? { width: column.width } : undefined}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="nn-table__body">
          {data.length === 0 ? (
            <tr>
              <td className="nn-table__empty" colSpan={columns.length}>
                {emptyState ?? 'No data'}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowKey ? rowKey(row, rowIndex) : rowIndex} className="nn-table__row">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cx('nn-table__td', `nn-table__cell--${column.align ?? 'start'}`)}
                  >
                    {column.cell
                      ? column.cell(row, rowIndex)
                      : ((row as Record<string, unknown>)[column.key] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
