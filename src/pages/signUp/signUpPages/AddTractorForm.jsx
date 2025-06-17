
export default function AddTractorForm({ tractor, i, newTractors, setNewTractors }) {

    const removeItem = () => {
        const newArray = newTractors.filter((_, index) => index !== i);
        setNewTractors(newArray);
    };

    return (
        <form style={{ width: '100%', borderBottom: '.1rem solid #e0e0e0' }}>
            {i === 0 ? null : <i class="fa fa-trash-o" style={{ fontSize: '1.5rem', color: 'red', position: 'relative', left: '95%' }}
                onClick={removeItem}></i>}
            <div className="tractor-input-group">
                <label htmlFor="internalNum" className="input-label">Internal Number</label>
                <input name="internalNum" defaultValue={tractor.internalNum} onChange={(e) => {
                    tractor.internalNum = e.target.value
                }} className="tractor-input" type="number"></input>
            </div>
            <div className="tractor-input-group">
                <label htmlFor="vin" className="input-label">VIN</label>
                <input name="vin" defaultValue={tractor.vin} onChange={(e) => {
                    tractor.vin = e.target.value
                }} className="tractor-input" type="text"></input>
            </div>
            <div className="tractor-input-group">
                <label htmlFor="insurance" className="input-label">Monthly insurance payment</label>
                <input name="insurance" defaultValue={tractor.insurance} onChange={(e) => {
                    tractor.insurance = e.target.value
                }} className="tractor-input" type="number"></input>
            </div>
            <div className="tractor-input-group">
                <label htmlFor="mpg" className="input-label">MPG</label>
                <input name="mpg" style={{ width: '3rem' }} defaultValue={tractor.mpg} onChange={(e) => {
                    tractor.mpg = e.target.value
                }} className="tractor-input" type="number"></input>
            </div>
            <div className="tractor-input-group">
                <label htmlFor="mpg" className="input-label">Tractor Lease</label>
                <input name="mpg" style={{ width: '3rem' }} defaultValue={tractor.tractorLease} onChange={(e) => {
                    tractor.tractorLease = e.target.value
                }} className="tractor-input" type="number"></input>
            </div>
            <div className="tractor-input-group">
                <label htmlFor="mpg" className="input-label">Trailer Lease</label>
                <input name="mpg" style={{ width: '3rem' }} defaultValue={tractor.trailerLease} onChange={(e) => {
                    tractor.trailerLease = e.target.value
                }} className="tractor-input" type="number"></input>
            </div>
            <div className="tractor-input-group">
                <p className="input-label">Height (ft' in")</p>
                <div style={{ justifySelf: 'flex-end' }}>
                    <label htmlFor="ftHeight" className="input-label">Ft</label>
                    <input name="ftHeight" style={{ width: '2.5rem', marginRight: '.5rem', marginLeft: '.25rem' }} defaultValue={tractor.height.ft} onChange={(e) => {
                        tractor.height.ft = e.target.value
                    }} className="tractor-input" type="text"></input>
                    <label htmlFor="inHeight" className="input-label">In</label>
                    <input name="inHeight" style={{ width: '2.5rem', marginLeft: '.25rem' }} defaultValue={tractor.height.in} onChange={(e) => {
                        tractor.height.in = e.target.value
                    }} className="tractor-input" type="text"></input>
                </div>
            </div>
            <div className="tractor-input-group">
                <p className="input-label">Width (ft' in")</p>
                <div style={{ justifySelf: 'flex-end' }}>
                    <label htmlFor="ftWidth" className="input-label">Ft</label>
                    <input name="ftWidth" style={{ width: '2.5rem', marginRight: '.5rem', marginLeft: '.25rem' }} defaultValue={tractor.height.ft} onChange={(e) => {
                        tractor.width.ft = e.target.value
                    }} className="tractor-input" type="text"></input>
                    <label htmlFor="inWidth" className="input-label">In</label>
                    <input name="inWidth" style={{ width: '2.5rem', marginLeft: '.25rem' }} defaultValue={tractor.height.in} onChange={(e) => {
                        tractor.width.in = e.target.value
                    }} className="tractor-input" type="text"></input>
                </div>
            </div>
            <div className="tractor-input-group">
                <label htmlFor="weight" className="input-label">Weight (lbs.)</label>
                <input name="weight" defaultValue={tractor.weight} onChange={(e) => {
                    tractor.weight = e.target.value
                }} className="tractor-input" type="text"></input>
            </div>
        </form>
    )
}