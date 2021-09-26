import styled from "styled-components"

export const Styles = styled.div`
  padding: 1rem;
  display: block;
  overflow: auto;
  .table {
    border-spacing: 0;
    .btn{
      display: flex;
      position: relative;
      bottom: 33px;
      margin-right: 5px;
      height: 30px;
      width: 30px;
    }
    .thead {
      ${'' /* These styles are required for a scrollable body to align with the header properly */}
      overflow-y: auto;
      overflow-x: hidden;
    }

    .tbody {
      overflow-y: scroll;
      overflow-x: hidden;
      height: 250px;
    }

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;

      ${'' /* In this example we use an absolutely position resizer,
       so this is required. */}
      position: relative;

      :last-child {
        border-right: 0;
      }
      .resizer {
        display: inline-block;
        background: #cdcdcd;
        width: 1.5px;
        height: 60%;
        position: absolute;
        right: 0;
        top: 20%;
        transform: translateX(50%);
        z-index: 1;
        touch-action:none;
        &.isResizing {
          background: #000000;
        }
      }
    }
  }
  .pagination {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0.5rem;
    .ButtonPagination {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 20px;
      width: 20px;
      margin-right: 5px;
      border-radius: 50%;
      border: none;
      background-color: #d3d3d3;
    }
  }
`