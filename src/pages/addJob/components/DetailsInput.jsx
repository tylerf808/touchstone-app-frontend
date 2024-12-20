import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { CircularProgress } from "@mui/material";
import ResultsContainer from "./ResultsContainer";
import zIndex from "@mui/material/styles/zIndex";

export default function DetailsInput({ handleSubmit, setIsExpanded, isExpanded, tractors, drivers, logistics, setLogistics }) {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });

    if (!isLoaded) {
        return (<CircularProgress />);
    }

    const containerStyle = {
        height: isExpanded ? '50rem' : '22rem',
        transition: 'height 0.3s ease-in-out',
        backgroundColor: "rgba(240, 240, 240)",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1rem',
        marginLeft: '1rem',
        borderRadius: '.5rem',
        width: '20rem',
        position: 'absolute',
        zIndex: '100',
        boxShadow: '1px 2px 5px 0px rgba(0,0,0,0.75)'
    };

    const addressInputStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }

    return (
        <form style={containerStyle}>
            {isExpanded ?
                <ResultsContainer isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
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
                            <select onChange={(e) => {
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