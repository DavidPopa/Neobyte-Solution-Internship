/* eslint-disable react/prop-types */
import clasess from "./Car.module.css";
import defaultImg from "../../../../be/uploads";

export default function Car({ allCars }) {
  console.log(allCars);
  return (
    <div className={clasess.container}>
      {allCars.map((car) => (
        <div key={car._id} className={clasess.car}>
          {console.log(car.image)}
          <img
            className={clasess.images}
            src={`../../../../be/uploads/${car.image}`}
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
            <button className={clasess.deleteButton}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
