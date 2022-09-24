import './ProDataTable.scss'
import { DataGrid } from "@mui/x-data-grid";
import { productRows } from "../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

const Datatable = () => {
  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {field: "name", headerName: "Product Name", width: 160},
 
    { field: "stock", headerName: "Stock", width: 100},
   
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "discount",
      headerName: "Discount",
      width: 90,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
            <div className="cellAction">
            
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Product
        <Link to="/dashboard/products/newpro" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;