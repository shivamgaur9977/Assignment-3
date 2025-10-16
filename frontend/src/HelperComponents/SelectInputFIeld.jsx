export default function SelectInputField({options, name, hanldeFieldChanges, value}) {
    
    return (
        <select className="form-select" name={name} aria-label="Default select example" onChange={hanldeFieldChanges} value={value}>
            <option >Select {name}</option>
            {options.map((value, idx) => {
                return <option value={value} key={idx}>{value}</option>
            })}
        </select>
    )
}