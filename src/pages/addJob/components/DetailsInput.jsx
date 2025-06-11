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

    return (
        <div className="details-form">
            <div className="address-logistics-container">
                <div className="address-inputs">
                    <Autocomplete className="address-row">
                        <>
                            <label>Start</label>
                            <input className="address-field" id="start-input" type="text" />
                        </>
                    </Autocomplete>
                    <Autocomplete className="address-row">
                        <>
                            <label>Pick-Up</label>
                            <input className="address-field" id='pick-up-input' type="text" />
                        </>
                    </Autocomplete >
                    <Autocomplete className="address-row">
                        <>
                            <label>Drop-Off</label>
                            <input className="address-field" id="drop-off-input" type="text" />
                        </>
                    </Autocomplete>
                </div>
                <div className="logistics-inputs">
                    <div className="logistics-row">
                        <label>
                            Client:
                        </label>
                        <input style={{ width: '6rem', height: '1.2rem' }} type='text' onChange={(e) => {
                            const newLogistics = logistics
                            newLogistics.client = e.target.value
                            setLogistics(newLogistics)
                        }}></input>
                    </div>
                    <div className="logistics-row">
                        <label>
                            Revenue: $
                        </label>
                        <input style={{ width: '6rem' }} type='number' onChange={(e) => {
                            const newLogistics = logistics
                            newLogistics.revenue = e.target.value
                            setLogistics(newLogistics)
                        }}></input>
                    </div>
                    <div className="logistics-row">
                        <label>
                            Date of Departure:
                        </label>
                        <input type="date" onChange={(e) => {
                            setLogistics({ ...logistics, startDate: e.target.value })
                        }}></input>
                    </div>
                    <div className="logistics-row">
                        <label>
                            Hazmat:
                        </label>
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
                            <option value='USHazmatClass7'>Radioactive</option>
                            <option value='USHazmatClass8'>Corrosives</option>
                            <option value='otherHazmatHarmfulToWater'>Harmful to Water</option>
                            <option value='USHazmatClass9'>Miscellaneous</option>
                        </select>
                    </div>
                    <div className="logistics-row">
                        <label>Driver:
                        </label>
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
                    <div className="logistics-row">
                        <label>Tractor:
                        </label>
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