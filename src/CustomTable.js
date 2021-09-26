import {
  useMemo,
  useEffect,
  useState,
} from 'react'
import {
  useBlockLayout,
  usePagination,
  useResizeColumns,
  useSortBy,
  useTable,
} from 'react-table'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Styles } from "./styles.js"

const getStyles = (props, align = 'left') => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'flex-start',
      display: 'flex',
    },
  },
]

export default function CustomTable({ columns, data }) {
  const [clicked, setClicked] = useState("");
  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 800,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useBlockLayout,
    useResizeColumns,
    useSortBy,
    usePagination,
  )

  function handleClick(index) {
    if (index === clicked) {
      setClicked("")
    } else {
      setClicked(index)
    }
  }

  useEffect(() => {
    setPageSize(5)
  }, [])

  return (
    <>
      <div>
        <div
          {...getTableProps()}
          className="table"
        >
          <div>
            {headerGroups.map(headerGroup => (
              <div
                {...headerGroup.getHeaderGroupProps()}
                className="tr"
              >
                {headerGroup.headers.map(column => (
                  <div
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="th"
                  >
                    {column.render('Header')}
                    {/* Use column.getResizerProps to hook up the events correctly */}
                    <div
                      {...column.getResizerProps()}
                      className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
                    />
                    <span
                      style={{
                        marginLeft: "10px",
                        height: "18px",
                        width: "18px",
                        paddingBottom: "0px"
                      }} >
                      {column.isSorted
                        ? column.isSortedDesc
                          ? (<ArrowDownwardIcon style={{ height: "15px", width: "15px" }} />)
                          : (<ArrowUpwardIcon style={{ height: "15px", width: "15px" }} />)
                        : ''}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <>
                  <div
                    {...row.getRowProps()}
                    className="tr"
                    style={
                      i === clicked ? {
                        width: "100%",
                        backgroundColor: "#1E90FF",
                        color: "white",
                      } : {
                        width: "100%",
                      }}
                    onClick={() => { handleClick(i) }}>
                    {row.cells.map(cell => {
                      return (
                        <div {...cell.getCellProps()} className="td">
                          {cell.value}
                        </div>
                      )
                    })}
                  </div>
                  {i === clicked ? (
                    <div style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      position: "relative",
                      width: "100%",
                      height: "0px",
                      right: "0px",
                    }}
                    >
                      <IconButton className="btn" onClick={() => console.log("clicked")}>
                        <DeleteIcon style={i === clicked ? {
                          display: 'flex',
                          position: 'relative',
                          backgroundColor: "#1E90FF",
                          color: "white",
                        } : {
                          display: 'flex',
                          position: 'relative',
                          color: "white",
                        }}
                        />
                      </IconButton>
                      <IconButton className="btn" onClick={() => console.log("clicked")}>
                        <EditIcon style={i === clicked ? {
                          display: 'flex',
                          position: 'relative',
                          backgroundColor: "#1E90FF",
                          color: "white",
                        } : {
                          display: 'flex',
                          position: 'relative',
                          color: "white",
                        }}
                          onCLick={() => { console.log(clicked) }}
                        />
                      </IconButton>
                    </div>
                  ) : null}
                </>
              )
            })}
          </div>
        </div>
        <div className="pagination">
          <button className="ButtonPagination" onClick={() => previousPage()} disabled={!canPreviousPage}>
            <NavigateBeforeIcon style={{ height: '22px', width: '22px', }} />
          </button>{" "}
          <button className="ButtonPagination" onClick={() => nextPage()} disabled={!canNextPage}>
            <NavigateNextIcon style={{ height: '22px', width: '22px', }} />
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
        </div>

      </div>
    </>
  )
}
