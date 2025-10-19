export default function AgeFilter({ageRange, setAgeRange, ageRangeOptions}) {
    return (
        <div className="filter-row">
            <select
                className="form-select select-dropdown"
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
            >
                <option value="">All Ages</option>
                {ageRangeOptions.map((option, idx) => {
                    return (
                        <option value={option} key={idx}>{option}</option>
                    )
                })}
            </select>
        </div>
    )
}