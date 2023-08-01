import { Fragment, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clasess from "./Main.module.css";
import Car from "./Car";
import axios from "axios";

export default function Main() {
  const { id } = useParams();
  const [filters, setFilters] = useState({
    id: id,
    marca: "",
    year: "",
    rulaj: "",
    pret: "",
  });
  const [allCars, setAllCars] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleGetCars = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/api/getCars", {
        params: filters,
      });
      setAllCars(response.data.cars);
    } catch (error) {
      console.error("Error get cars:", error);
    }
  };

  console.log(allCars);
  return (
    <Fragment>
      <div className={clasess.container}>
        <div className={clasess.nav}>
          <form className={clasess.form}>
            <div className={clasess.model}>
              <label className={clasess.label}>Marca</label>
              <select
                id="cars"
                name="marca"
                value={filters.marca}
                onChange={handleInputChange}
              >
                <option value="">Select Marca</option>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
                <option value="bmw">BMW</option>
              </select>
            </div>
            <div className={clasess.an}>
              <div className={clasess.from}>
                <label className={clasess.label}>An</label>
                <input
                  type="number"
                  name="year"
                  value={filters.year}
                  onChange={handleInputChange}
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 4))}
                />
              </div>
            </div>
            <div className={clasess.km}>
              <label className={clasess.label}>Rulaj km</label>
              <div className={clasess.from}>
                <input
                  type="number"
                  name="rulaj"
                  value={filters.rulaj}
                  onChange={handleInputChange}
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 9))}
                />
              </div>
            </div>
            <div className={clasess.pret}>
              <label className={clasess.label}>Pret</label>
              <div className={clasess.from}>
                <input
                  type="number"
                  name="pret"
                  value={filters.pret}
                  onChange={handleInputChange}
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 9))}
                />
              </div>
            </div>
            <div className={clasess.submitButton}>
              <button onClick={handleGetCars} type="submit">
                Submit
              </button>
              <p>
                Post your car <Link to={"/create/" + id}>Create</Link>
              </p>
            </div>
          </form>
        </div>
        <div className={clasess.cars}>
          <Car allCars={allCars} id={id} />
        </div>
      </div>
    </Fragment>
  );
}
