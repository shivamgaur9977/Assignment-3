export default function searchUsers(allUsers, fieldName, fieldValue) {
    if (!allUsers || !fieldName || !fieldValue) return [];

    return allUsers.filter(user => {
        const value = user[fieldName];
        if (!value) return false;
        return value.toString().toLowerCase().includes(fieldValue.toLowerCase());
    });
}
