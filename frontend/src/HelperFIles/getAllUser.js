import axios from "axios";

let getAllUsers = async (setAllUsers, setLoading) => {
    try {
        setLoading(true);
        let res = await axios.get("http://localhost:8080/users");
        setAllUsers(res.data);
        setLoading(false);
    } catch (err) {
        console.log(err);
        setLoading(false);
    }
};

export default getAllUsers;