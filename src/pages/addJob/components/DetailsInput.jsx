import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { CircularProgress } from "@mui/material";

export default function DetailsInput({ findRoute, setSelectedTractor, tractors, drivers, logistics, setLogistics }) {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    })

    if (!isLoaded) {
        return (<CircularProgress />);
    }

    return (
        <div className="details-form">
            <div className="address-logistics-container">
                <div className="route-details">
                    <h3 style={{ marginBottom: '1rem' }}>Route Details</h3>
                    <Autocomplete className="route-details-row">
                        <>
                            <p style={{ justifySelf: 'center' }}>Start</p>
                            <input className="address-field" id="start-input" type="text" />
                        </>
                    </Autocomplete>
                    <Autocomplete className="route-details-row">
                        <>
                            <p style={{ justifySelf: 'center' }}>Pick-Up</p>
                            <input className="address-field" id='pick-up-input' type="text" />
                        </>
                    </Autocomplete >
                    <Autocomplete className="route-details-row">
                        <>
                            <p style={{ justifySelf: 'center' }}>Drop-Off</p>
                            <input className="address-field" id="drop-off-input" type="text" />
                        </>
                    </Autocomplete>
                    <div className="route-details-row" style={{ flexDirection: 'row', gap: '.75rem' }}>
                        <p>
                            Date of Departure:
                        </p>
                        <input type="date" onChange={(e) => {
                            setLogistics({ ...logistics, startDate: e.target.value })
                        }}></input>
                    </div>

                </div>
                <div className="load-details">
                    <h3 style={{ marginBottom: '1rem' }}>Load Details</h3>
                    <div className="load-details-row">
                        <p>
                            Client:
                        </p>
                        <input style={{ width: '8rem' }} type='text' onChange={(e) => {
                            const newLogistics = logistics
                            newLogistics.client = e.target.value
                            setLogistics(newLogistics)
                        }}></input>
                    </div>
                    <div className="load-details-row">
                        <p>
                            Revenue:
                        </p>
                        <div style={{display: 'flex', flexDirection: 'row', gap: '.5rem'}}>
                            <p>$</p>
                            <input style={{ width: '7rem' }} type='number' onChange={(e) => {
                                const newLogistics = logistics
                                newLogistics.revenue = e.target.value
                                setLogistics(newLogistics)
                            }}></input>
                        </div>

                    </div>

                    <div className="load-details-row">
                        <p>Driver:
                        </p>
                        <select onChange={(e) => {
                            const newLogistics = logistics
                            newLogistics.driver = e.target.value
                            setLogistics(newLogistics)
                        }}>
                            {drivers?.map((driver, i) => {
                                return (
                                    <option key={i}>{driver.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="load-details-row">
                        <p>Tractor:
                        </p>
                        <select className="tractor-select" onChange={(e) => {
                            setSelectedTractor(e.target.value)
                        }}>
                            {tractors?.map((tractor, i) => {
                                return (
                                    <option value={tractor} key={i}>{tractor.internalNum}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="load-details-row">
                        <p>
                            Hazmat:
                        </p>
                        <select defaultValue='none' onChange={(e) => {
                            setLogistics({ ...logistics, hazmat: e.target.value })
                        }}>
                            <option value={null}>None</option>
                            <option value='Class1'>Explosives</option>
                            <option value='Class2'>Compressed Gas</option>
                            <option value='Class3'>Flammable Liquids</option>
                            <option value='Class4'>Flammable Solids</option>
                            <option value='Class5'>Oxidizers</option>
                            <option value='Class6'>Poisons</option>
                            <option value='Class7'>Radioactive</option>
                            <option value='Class8'>Corrosives</option>
                            <option value='Class9'>Miscellaneous</option>
                        </select>
                    </div>
                </div>
            </div>
            <button
                className="calc-route-button"
                type="submit"
                onClick={(e) => findRoute(e)}>
                Calculate Route
            </button>
        </div>
    )
}