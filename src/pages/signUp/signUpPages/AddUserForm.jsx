
export default function AddUserForm({ user, newUsers, setNewUsers, i }) {

    const removeItem = () => {
        const newArray = newUsers.filter((_, index) => index !== i);
        setNewUsers(newArray);
    };

    return (
        <form style={{ width: '100%', borderBottom: '.1rem solid #e0e0e0' }}>
            {i === 0 ? null : <i class="fa fa-trash-o" style={{ fontSize: '1.5rem', color: 'red', position: 'relative', left: '95%' }}
                onClick={removeItem}></i>}
            <div className="user-input-group">
                <label htmlFor="name" className="input-label">Name</label>
                <input style={{ width: '12rem' }} defaultValue={user.name} onChange={(e) => {
                    user.name = e.target.value
                }} className="user-input" type="text" name="name"></input>
            </div>
            <div className="user-input-group">
                <label className="input-label" htmlFor="email">Email</label>
                <input style={{ width: '12rem' }} defaultValue={user.email} onChange={(e) => {
                    user.email = e.target.value
                }} className="user-input" type="email" name="email"></input>
            </div>
            <div className="user-input-group">
                <label className="input-label" htmlFor="accountType">Account Type</label>
                <select name="accountType" defaultValue={user?.accountType} onChange={(e) => user.accountType = e.target.value} style={{ width: '6rem' }}>
                    <option value={'driver'}>Driver</option>
                    <option value={'dispatcher'}>Dispatcher</option>
                </select>
            </div>
        </form>
    )
}