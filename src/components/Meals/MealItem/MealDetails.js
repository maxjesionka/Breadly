import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import classes from "./MealDetails.module.css";

const MealDetails = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mealDetails, setMealDetails] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    short_description: "",
    description: "",
    stock: "",
    img: "",
    stars: ""
  });

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch meal details");
        }

        const data = await response.json();
        setMealDetails(data);
        setFormData({
          name: data.name,
          price: data.price,
          short_description: data.short_description,
          description: data.description,
          stock: data.stock,
          img: data.img,
          stars: data.stars
        });
       
    // window.location.reload();
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchMealDetails();
  }, [id]);

  useEffect(() => {
    const decodedToken = token ? jwtDecode(token) : null;
    const isAdminUser = (decodedToken && decodedToken.isAdmin) || (decodedToken && decodedToken.user_id === 3);
    setIsAdmin(isAdminUser);
  }, [token]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error("Failed to update meal details");
      }
      navigate(`/`);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={classes.mealWrap}>
      <div className={classes.meal}>
        <div className={classes.mealFlex}>
        {mealDetails && (
          <div>
            <h2>{mealDetails.name}</h2>
            {/* {isAdmin && <p>admin on duty</p>} */}
            <p>Cena: {mealDetails.price}</p>
            <p>Opis: {mealDetails.description ? mealDetails.description : mealDetails.short_description}</p>
          </div>
        )}
        <div className={classes.mealContainer}>
          {mealDetails && (
            <img
              className={classes.productImg}
              src={require(`../../../assets/${mealDetails.img}`)}
              alt="zdjęcie produktu"
              height={200}
              width={200}
            />
          )}
          <button className={classes.backBtn}>
            <Link to="/">Powrót</Link>
          </button>
          {isAdmin && !isEditing && (
            <button className={classes.buttonEdit} onClick={handleEditClick}>
              Edytuj
            </button>
          )}
          </div>
          
        </div>
        {isEditing && (
            <form className={classes.formEdit} onSubmit={handleFormSubmit}>
              <p>Nazwa</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
              <p>Cena</p>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleFormChange}
              />
              <p>Opis krótki</p>
              <textarea
                name="short_description"
                value={formData.short_description}
                onChange={handleFormChange}
              ></textarea>
              <p>Opis długi</p>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
              ></textarea>
              <button type="submit">Zapisz</button>
            </form>
          )}
      </div>
    </div>
  );
};

export default MealDetails;
