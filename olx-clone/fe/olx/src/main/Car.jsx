/* eslint-disable react/prop-types */
import clasess from "./Car.module.css";
import defaultImg from "./download.jpg";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export default function Car({ allCars, id }) {
  const handleDelete = async (carId) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteCar`, {
        data: {
          userId: id,
          carId: carId,
        },
      });
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className={clasess.container}>
      {allCars.map((car) => (
        <div key={car._id} className={clasess.car}>
          <img
            className={clasess.images}
            src={defaultImg}
            alt="masina"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImg;
            }}
          />
          <div className={clasess.dates}>
            <div className={clasess.left}>
              <p className={clasess.model}>{car.model}</p>
              <p className={clasess.an}>Year {car.year}</p>
              <p className={clasess.km}>{car.km} km</p>
            </div>
            <div className={clasess.right}>
              <p className={clasess.price}>{car.price}€</p>
            </div>
          </div>
          <div className={clasess.actions}>
            <button className={clasess.editButton}>Edit</button>
            <button
              className={clasess.deleteButton}
              onClick={() => handleDelete(car._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
