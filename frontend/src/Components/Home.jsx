import { useEffect, useState } from "react";
import axios from 'axios';
import '../CSS/Home.css';
import getAllUsers from "../HelperFIles/getAllUser";
import Loader from "./Loader";
import FilteredUsers from "./FilteredUser";
import { getCountries, getStatesOfCountry, getCitiesOfState } from '@countrystatecity/countries';
import SelectInputField from "../HelperComponents/SelectInputFIeld";
import LocationSelector from "./LocationSelector";

export default function Home() {
    let [filteredUser, setFilteredUser] = useState([]);
    let [allUsers, setAllUsers] = useState();
    let [searchQuery, setSearchQuery] = useState({ field: "name", query: "" });
    let [loading, setLoading] = useState(false);
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    useEffect(() => {
        getAllUsers(setAllUsers, setLoading);
    }, []);

    useEffect(() => {
        if (allUsers) {
            // Filtered Users based on query
            const filteredUsers = allUsers.filter(user => {
                if (searchQuery.field == "age") {
                    return user[searchQuery.field] == searchQuery.query;
                } else {
                    return user[searchQuery.field].toLowerCase().includes(searchQuery.query.toLowerCase())
                }
            });
            setFilteredUser(filteredUsers);
            if (!searchQuery.query) {
                setFilteredUser(allUsers);
            }
        };
    }, [searchQuery.query, allUsers]);


    let handleChanges = (e) => {
        let fieldName = e.target.name;
        let fieldValue = e.target.value;
        setSearchQuery((prevValue) => {
            return { ...prevValue, [fieldName]: fieldValue };
        });
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await axios.get(`http://localhost:8080/search/?`, {
                params: {
                    filter: searchQuery.field,
                    query: searchQuery.query,
                    city: city,
                    country: country,
                    state: state
                }
            });
            console.log(res);
            setAllUsers(res.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <header>
                <h1>User Directory</h1>
                <p>Find and connect with team members</p>
            </header>
            <LocationSelector country={country} setCountry={setCountry} state={state} setState={setState} city={city} setCity={setCity}/>
            <div className="search-section">
                <form className="d-flex search-form" onSubmit={handleSubmit} role="search">
                    <select className="form-select select-dropdown" name="field" onChange={handleChanges} value={searchQuery.field} aria-label="Default select example">
                        <option value="name">Name</option>
                        <option value="email">Email</option>
                        <option value="contactNo">Contact No</option>
                        <option value="age">Age</option>
                        <option value="gender">Gender</option>
                        <option value="occupation">Occupation</option>
                        <option value="status">Status</option>
                    </select>
                    <input id="search-inp" className="form-control me-2 search-inp" name="query" type="search" placeholder="Search" onChange={handleChanges} value={searchQuery.query} required />
                    <button className="btn search-btn" type="submit"><i className="fa-solid fa-magnifying-glass"></i><span className="btn-text">Search</span></button>
                </form>
            </div>

            <div className="users-grid py-3" id="usersGrid">
                {/* -- Sample User Cards -- */}
                {allUsers != undefined && allUsers.map((user, idx) => {
                    return (
                        <FilteredUsers user={user} key={idx} />
                    )
                })}
                {allUsers && allUsers.length ==0 && <div style={{color: "red"}}>No Record Found</div>}
            </div>
            {loading && <Loader />}
        </div>
    )
}