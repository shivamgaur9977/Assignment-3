import axios from "axios";

let getAllUsers = async (setAllUsers, setLoading) => {
    try {
        setLoading(true);
        let res = await axios.get("https://assignment-3-rqol.onrender.com/users");
        setAllUsers(res.data);
        setLoading(false);
    } catch (err) {
        console.log(err);
        setLoading(false);
    }
};

export default getAllUsers;