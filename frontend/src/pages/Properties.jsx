import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [search, setSearch] = useState("");
    const [bedroomsFilter, setBedroomsFilter] = useState("");
    const [priceFilter, setPriceFilter] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        // Fetch all properties
        axios
            .get("https://localhost:60872/api/properties")
            .then((res) => {
                setProperties(res.data);
                setFilteredProperties(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    // Apply filters whenever search/filters change
    useEffect(() => {
        let filtered = properties;

        if (search) {
            filtered = filtered.filter((p) =>
                (p.title?.toLowerCase() || "").includes(search.toLowerCase()) ||
                (p.location?.toLowerCase() || "").includes(search.toLowerCase())
            );
        }

        if (bedroomsFilter) {
            filtered = filtered.filter(
                (p) => p.bedrooms === parseInt(bedroomsFilter)
            );
        }

        if (priceFilter) {
            const maxPrice = parseInt(priceFilter);
            filtered = filtered.filter((p) => p.price <= maxPrice);
        }

        setFilteredProperties(filtered);
    }, [search, bedroomsFilter, priceFilter, properties]);


    const addToFavorites = (id) => {
        if (!token) {
            alert("Please login to add favorites.");
            return;
        }

        axios
            .post(
                `https://localhost:60872/api/favorites`,
                { propertyId: id },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(() => alert("Added to favorites"))
            .catch((err) => console.error(err));
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Properties</h2>

            {/* Search and Filters */}
            <div className="row mb-4 g-2">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title or location"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="col-md-3">
                    <select
                        className="form-select"
                        value={bedroomsFilter}
                        onChange={(e) => setBedroomsFilter(e.target.value)}
                    >
                        <option value="">All Bedrooms</option>
                        <option value="1">1 Bedroom</option>
                        <option value="2">2 Bedrooms</option>
                        <option value="3">3 Bedrooms</option>
                        <option value="4">4+ Bedrooms</option>
                    </select>
                </div>

                <div className="col-md-3">
                    <select
                        className="form-select"
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value)}
                    >
                        <option value="">Any Price</option>
                        <option value="500000">Up to $500,000</option>
                        <option value="1000000">Up to $1,000,000</option>
                        <option value="2000000">Up to $2,000,000</option>
                    </select>
                </div>
            </div>

            {/* Properties Cards */}
            {filteredProperties.length === 0 ? (
                <p className="text-muted">No properties found.</p>
            ) : (
                <div className="row">
                    {filteredProperties.map((property) => (
                        <div key={property.id} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={property.image || "https://via.placeholder.com/300x200"}
                                    className="card-img-top"
                                    alt={property.title}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{property.title}</h5>
                                    <p className="card-text text-muted">{property.location}</p>
                                    <p className="card-text">Bedrooms: {property.bedrooms}</p>
                                    <p className="card-text fw-bold">Price: ${property.price}</p>
                                    <button
                                        className="btn btn-primary mt-auto"
                                        onClick={() => addToFavorites(property.id)}
                                    >
                                        Add to Favorites
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
