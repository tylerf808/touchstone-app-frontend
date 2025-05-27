import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { CircularProgress } from "@mui/material";
import ResultsContainer from "./ResultsContainer";

export default function DetailsInput({ addJob, localMap, loaded, job, findRoute, setSelectedTractor, setIsExpanded, isExpanded, tractors, drivers, logistics, setLogistics }) {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    })

    if (!isLoaded) {
        return (<CircularProgress />);
    }

    const addressInputStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }

    return (
        <form className="details-form">
            {isExpanded ?
                <ResultsContainer addJob={addJob} localMap={localMap} job={job} loaded={loaded} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                :
                <>
                    <div className="address-inputs">
                        <Autocomplete>
                            <label style={addressInputStyle}>Start<input className="address-field" id="start-input" type="text" /> </label>
                        </Autocomplete>
                        <Autocomplete>
                            <label style={addressInputStyle}>Pick-Up<input className="address-field" id='pick-up-input' type="text" /></label>
                        </Autocomplete>
                        <Autocomplete>
                            <label style={addressInputStyle}>Drop-Off<input className="address-field" id="drop-off-input" type="text" /></label>
                        </Autocomplete>
                    </div>
                    <div className="logistics-inputs">
                        <label className="logistics-field" style={{ marginTop: '1rem' }}>
                            Client: <input style={{ width: '6rem' }} type='text' onChange={(e) => {
                                const newLogistics = logistics
                                newLogistics.client = e.target.value
                                setLogistics(newLogistics)
                            }}></input>
                        </label>
                        <label className="logistics-field">
                            Revenue: $<input style={{ width: '6rem' }} type='number' onChange={(e) => {
                                const newLogistics = logistics
                                newLogistics.revenue = e.target.value
                                setLogistics(newLogistics)
                            }}></input>
                        </label>
                        <label className="logistics-field">
                            Date of Departure: <input type="date" onChange={(e) => {
                                setLogistics({...logistics, startDate: e.target.value})
                            }}></input>
                        </label>
                        <label className="logistics-field">
                            Hazmat:
                            <select defaultValue='none' onChange={(e) => {
                                setLogistics({ ...logistics, hazmat: e.target.value })
                            }}>
                                <option value='none'>None</option>
                                <option value='USHazmatClass1'>Explosives</option>
                                <option value='USHazmatClass2'>Compressed Gas</option>
                                <option value='USHazmatClass3'>Flammable Liquids</option>
                                <option value='USHazmatClass4'>Flammable Solids</option>
                                <option value='USHazmatClass5'>Oxidizers</option>
                                <option value='USHazmatClass6'>Poisons</option>
                                <option value='USHazmatClass7'>Radioctive</option>
                                <option value='USHazmatClass8'>Corrosives</option>
                                <option value='otherHazmatHarmfulToWater'>Harmful to Water</option>
                                <option value='USHazmatClass9'>Miscellaneous</option>
                            </select>
                        </label>
                        <label className="logistics-field">Driver:
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
                        </label>
                        <label style={{ marginBottom: '1rem' }} className="logistics-field">Tractor:
                            <select className="tractor-select" onChange={(e) => {
                                setSelectedTractor(e.target.value)
                            }}>
                                {tractors?.map((tractor, i) => {
                                    return (
                                        <option value={tractor} key={i}>{tractor.internalNum}</option>
                                    )
                                })}
                            </select>
                        </label>
                    </div>
                    <button
                        className="calc-route-button"
                        type="submit"
                        onClick={(e) => findRoute(e)}>
                        Calculate Route
                    </button>
                </>
            }
        </form>
    )
}