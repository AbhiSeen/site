import Sidebar from "../sidebar/Sidebar"
import Navbar from "../navbar/Navbar"
import ProDataTable from "../proDatatable/ProDataTable"
import "./ProductList.scss"

function ProductList() {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <ProDataTable/>
      </div>
    </div>
  )
}

export default ProductList