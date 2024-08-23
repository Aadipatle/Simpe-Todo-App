import { FaPlus, FaTimes } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import '../src/index.css';
import { useState } from 'react';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Content from './Component/Content';

const orderLists = [
  {
    id: uuidv4(),
    title: "git",
    checked: true,
  },
  {
    id: uuidv4(),
    title: "html",
    checked: false,
  },

];
function App() {

  const year = new Date().getFullYear();
  const [orders, setOrders] = useState(orderLists);
  const [newTech, setNewTech] = useState("");
  const [search, setSearch] = useState("");

  const HandleChange = (event) => {
    const id = event.target.id;
    const updateOrderlist = orders.map((i) => {
      if (i.id === id) {
        return {
          ...i,
          checked: !i.checked,
        };
      }
      return i;
    });
    setOrders(updateOrderlist);
  };
  const handleDelete = (id) => {
    const filterOrderList = orders.filter((i) => i.id !== id);
    setOrders(filterOrderList);
  };


  return (
    <div className="app">
      <Header title="Techshops" />

      <form className="addForm"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(newTech);
          const temp = {
            id: uuidv4(),
            title: newTech,
            checked: false,
          };

          setOrders((order) => [...order, temp]);

        }}
      >
        <input type="text"
          placeholder="Enter Orders"
          value={newTech}
          onChange={(e) => {
            setNewTech(e.target.value);
          }}
        />
        <button>
          <FaPlus />
        </button>
      </form>

      <form className="searchForm">
        <input type="text"
          placeholder="Search Tech"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}

        />
      </form>

      <Content
        orders={orders
          .filter(Boolean)
          .filter((i) => i.title.toLowerCase().includes(search.toLowerCase()))}
        handleChange={HandleChange}
        handleDelete={handleDelete}
      />
      <button><FaTimes /></button>

      <Footer year={year} />
    </div>
  );
}

export default App;
