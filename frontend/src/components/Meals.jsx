import React from 'react'
import { useEffect, useState } from 'react'
import { ModelContext } from '../contexts/modalContext';
import { useContext } from 'react';

export default function Meals() {
    const { handleOpen } = useContext(ModelContext);

    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredMeals, setFilteredMeals] = useState([]);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3000/meals');

                if (!response.ok) {
                    throw new Error("Failed To fetch Meals")
                }
                const data = await response.json();
                setMeals(data);
                setFilteredMeals(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMeals();
    }, [])

    useEffect(()=>{
        const result = meals.filter((item) => 
            item.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredMeals(result)
    },[search, meals])

    if (loading) return <p>Loading Meals....</p>;
    if (error) return <p>Error : {error}</p>;
    return (
        <>
            <div className='search'>
                <input type='text' placeholder='search your best meal' onChange={(e) => setSearch(e.target.value)}></input>
            </div>
            <ul id='meals'>
                {filteredMeals.length > 0 ? (
                    filteredMeals.map((meal) => (
                        <li key={meal.id} className='meal-item'>
                            <article>
                                <img src={`http://localhost:3000/${meal.image}`} alt='meals image'></img>
                                <div>
                                    <h3>{meal.name}</h3>
                                    <p className='meal-item-price'>{meal.price}</p>
                                    <p className='meal-item-description'>{meal.description}</p>
                                </div>
                                <p className='meal-item-actions'>
                                    <button onClick={() => handleOpen(meal)} className='hd-btn'>Add To Cart</button>
                                </p>
                            </article>
                        </li>
                    ))
                ) : (
                    <p>No Meal found</p>
                )}
            </ul>
        </>
    )
}
