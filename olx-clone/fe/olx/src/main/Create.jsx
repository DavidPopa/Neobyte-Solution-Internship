import { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clasess from "./Create.module.css";
import axios from "axios";

export default function Create() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: id,
    model: "",
    year: "",
    km: "",
    price: "",
    image: null,
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      userId: id,
    }));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "year" || name === "km" || name === "price"
        ? parseInt(value, 10)
        : value;
    setFormData({ ...formData, [name]: newValue });

    if (name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    try {
      const formDataObject = new FormData();
      // formDataObject.append("imageFe", formData.image.name);
      formDataObject.append("image", formData.image); // Append the image file to the FormData
      formDataObject.append("model", formData.model);
      formDataObject.append("year", formData.year);
      formDataObject.append("km", formData.km);
      formDataObject.append("price", formData.price);
      formDataObject.append("userId", formData.userId); // Make sure to include the userId in the request
      console.log(formData.image.name);
      const response = await axios.post(
        "http://localhost:5000/api/addCar",
        formDataObject
      );
      console.log(response.data);
      navigate(`/main/${id}`);
    } catch (error) {
      console.error("Error adding car:", error);
    }
    setFormData({
      model: "",
      year: "",
      km: "",
      price: "",
      image: null,
    });
  };

  return (
    <Fragment>
      <div className={clasess.container}>
        <h2>Add a New Car</h2>
        <form className={clasess.form} onSubmit={handleSubmit}>
          <div className={clasess.formGroup}>
            <label htmlFor="image">Images</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
          <div className={clasess.formGroup}>
            <label htmlFor="model">Model:</label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
            />
          </div>
          <div className={clasess.formGroup}>
            <label htmlFor="year">Year:</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
            />
          </div>
          <div className={clasess.formGroup}>
            <label htmlFor="km">KM:</label>
            <input
              type="number"
              id="km"
              name="km"
              value={formData.km}
              onChange={handleInputChange}
            />
          </div>
          <div className={clasess.formGroup}>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className={clasess.submitButton}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
