export default function FilteredUsers({ user }) {
    let profileName = user.name.split(" ");
    let firstLetter = profileName[0][0];
    let secondLetter = profileName[1][0];

    return (
        <div className="user-card" >
            <div className="user-avatar">{firstLetter}{secondLetter}</div>
            <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
                <span className="user-role">{user.contactNo}</span>
                <div className="user-stats">
                    <div className="stat">
                        <div className="stat-value">{user.country}</div>
                        <div className="stat-label">Country</div>
                    </div>
                    <div className="stat">
                        <div className="stat-value">{user.age}</div>
                        <div className="stat-label">age</div>
                    </div>
                </div>
                <div className="user-stats">
                    <div className="stat">
                        <div className="stat-value">{user.state}</div>
                        <div className="stat-label">State</div>
                    </div>
                    <div className="stat">
                        <div className="stat-value">{user.city}</div>
                        <div className="stat-label">City</div>
                    </div>
                </div>
            </div>
        </div>
    )
}