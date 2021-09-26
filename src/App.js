import {
  useMemo,
  useEffect,
  useState,
  useCallback
} from 'react'
import axios from 'axios'
import { Styles } from "./styles.js"
import CustomTable from "./CustomTable.js"

function App() {
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        width: 150,
      },
      {
        Header: 'Plan',
        accessor: 'plan',
        width: 150,
      },
      {
        Header: 'Stations',
        id: "stations",
        accessor: data => {
          let output = [];
          data.stations.map(item => {
            return output.push(item.name);
          });
          return output.join(", ");
        },
        width: 200,
      },
    ],
    []
  )
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    await axios
      .get("http://localhost:5000/data")
      .then((response) => {
        setData(response.data);
      });
  }, [])

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    < Styles >
      <CustomTable columns={columns} data={data} />
    </Styles >
  )
}

export default App
