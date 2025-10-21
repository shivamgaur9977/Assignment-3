import React, { useState } from "react";
import '../CSS/Location.css';
import axios from "axios";

const LocationSelector = ({ country, setCountry, state, setState, city, setCity, age, setAge, ageRangeOptions, distanceRange, setDistanceRange }) => {
    const data = {
        India: {
            Maharashtra: ["Mumbai", "Pune", "Nagpur"],
            Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
            Karnataka: ["Bengaluru", "Mysuru"],
        },
        USA: {
            California: ["Los Angeles", "San Francisco", "San Diego"],
            Texas: ["Houston", "Dallas", "Austin"],
            Florida: ["Miami", "Orlando"],
        },
        Canada: {
            Ontario: ["Toronto", "Ottawa"],
            Quebec: ["Montreal", "Quebec City"],
        },
    };

    const countries = Object.keys(data);
    const states = country ? Object.keys(data[country]) : [];
    const cities = country && state ? data[country][state] : [];

    let handleSelectorChanges = async (e) => {
        setCountry(e.target.value);
        setState("");
        setCity("");
    }

    return (
        <div className="container-selector mt-3 mb-3">
            <div className="card shadow-lg">
                <h3 className="card-title py-3 text-center text-primary">
                    🌍 Search By Location
                </h3>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="country" className="form-label fw-semibold">
                            Country
                        </label>
                        <select
                            id="country"
                            className="form-select"
                            value={country}
                            onChange={handleSelectorChanges}
                        >
                            <option value="">-- Select Country --</option>
                            {countries.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="state" className="form-label fw-semibold">
                            State
                        </label>
                        <select
                            id="state"
                            className="form-select"
                            value={state}
                            onChange={(e) => {
                                setState(e.target.value);
                                setCity("");
                            }}
                            disabled={!country}
                        >
                            <option value="">-- Select State --</option>
                            {states.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="city" className="form-label fw-semibold">
                            City
                        </label>
                        <select
                            id="city"
                            className="form-select"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            disabled={!state}
                        >
                            <option value="">-- Select City --</option>
                            {cities.map((ct) => (
                                <option key={ct} value={ct}>
                                    {ct}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-row mt-3">
                        <label htmlFor="age" className="form-label fw-semibold d-block">
                            Age: <strong>{age}</strong>
                        </label>

                        <input
                            type="range"
                            id="age"
                            name="age"
                            min="18"
                            max="80"
                            step="1"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="form-range age-slider"
                        />
                    </div>
                    <div className="form-label fw-semibold">
                        <label htmlFor="distance" className="form-label fw-semibold">
                            Distance
                        </label>
                        <select
                            id="distance"
                            className="form-select select-dropdown"
                            value={distanceRange}
                            onChange={(e) => setDistanceRange(e.target.value)}
                        >
                            <option value="">Any Distance</option>
                            <option value="0-10">0–10 km</option>
                            <option value="10-25">10–25 km</option>
                            <option value="25-50">25–50 km</option>
                            <option value="50-100">50–100 km</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationSelector;
