import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { CircularProgress } from "@mui/material";
import ResultsContainer from "./ResultsContainer";
import zIndex from "@mui/material/styles/zIndex";

export default function DetailsInput({ addJob, localMap, loaded, job, handleSubmit, setIsExpanded, isExpanded, tractors, drivers, logistics, setLogistics }) {

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
                                const newLogistics = logistics
                                newLogistics.startDate = e.target.value
                                setLogistics(newLogistics)
                                console.log(logistics)
                            }}></input>
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
                                const newLogistics = logistics
                                newLogistics.tractor = e.target.value
                                setLogistics(newLogistics)
                            }}>
                                {tractors?.map((tractor, i) => {
                                    return (
                                        <option key={i}>{tractor.internalNum}</option>
                                    )
                                })}
                            </select>
                        </label>
                    </div>
                    <button
                        className="calc-route-button"
                        type="submit"
                        onClick={handleSubmit}>
                        Calculate Route
                    </button>
                </>
            }
        </form>
    )
}