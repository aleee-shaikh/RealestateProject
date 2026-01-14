import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // make sure Bootstrap is installed

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;

        axios
            .get("https://localhost:60872/api/favorites", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setFavorites(res.data))
            .catch((err) => console.error(err));
    }, [token]);

    if (!token)
        return (
            <div className="container mt-5">
                <p className="alert alert-warning">Please login to view your favorites.</p>
            </div>
        );

    return (
        <div className="container mt-5">
            <h2 className="mb-4">My Favorites</h2>
            {favorites.length === 0 ? (
                <p className="text-muted">No favorites yet.</p>
            ) : (
                <div className="row">
                    {favorites.map((property) => (
                        <div key={property.id} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                {/* Placeholder image */}
                                <img
                                    src={property.image || "https://via.placeholder.com/300x200"}
                                    className="card-img-top"
                                    alt={property.title}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{property.title}</h5>
                                    <p className="card-text text-muted">{property.location}</p>
                                    <p className="card-text fw-bold">Price: ${property.price}</p>
                                    <button
                                        className="btn btn-danger mt-auto"
                                        onClick={() => {
                                            axios
                                                .delete(`https://localhost:60872/api/favorites/${property.id}`, {
                                                    headers: { Authorization: `Bearer ${token}` },
                                                })
                                                .then(() =>
                                                    setFavorites(favorites.filter((f) => f.id !== property.id))
                                                )
                                                .catch((err) => console.error(err));
                                        }}
                                    >
                                        Remove from Favorites
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
