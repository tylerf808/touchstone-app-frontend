import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { CircularProgress } from "@mui/material";

export default function DetailsInput({ findRoute, drivers, logistics, setLogistics }) {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    })

    if (!isLoaded) {
        return (<CircularProgress />);
    }

    return (
        <div className="detailsInput">
            <div className="detailsBody">
                <div className="route-details">
                    <h3 className="font-bold">Route Details</h3>
                    <Autocomplete className="autocompleteWrapper">
                        <>
                            <p style={{ justifySelf: 'center', marginBottom: '.5rem' }}>Start</p>
                            <input className="addressInput" id="start-input" type="text" />
                        </>
                    </Autocomplete>
                    <Autocomplete className="autocompleteWrapper">
                        <>
                            <p style={{ justifySelf: 'center', marginBottom: '.5rem' }}>Pick-Up</p>
                            <input className="addressInput" id='pick-up-input' type="text" />
                        </>
                    </Autocomplete >
                    <Autocomplete className="autocompleteWrapper">
                        <>
                            <p style={{ justifySelf: 'center', marginBottom: '.5rem' }}>Drop-Off</p>
                            <input className="addressInput" id="drop-off-input" type="text" />
                        </>
                    </Autocomplete>
                    <div className="flex flex-row justify-between m-4 w-[18rem]" >
                        <p className="self-center justify-self-center">
                            Date of Departure
                        </p>
                        <input type="date" className="dateInput" onChange={(e) => {
                            setLogistics({ ...logistics, startDate: e.target.value })
                        }}></input>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-items-center justify-start max-sm:mt-4 w-full border-l border-l-gray-300">
                    <h3 className="font-bold justify-self-center self-center mb-8 max-sm:mb-2">Load Details</h3>
                    <div className="jobInputRow">
                        <p>
                            Client
                        </p>
                        <input className="p-2 border border-gray-500 rounded-md w-[12rem]" type='text' onChange={(e) => {
                            const newLogistics = logistics
                            newLogistics.client = e.target.value
                            setLogistics(newLogistics)
                        }}></input>
                    </div>
                    <div className="jobInputRow">
                        <p>
                            Revenue
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '.5rem' }}>
                            <p className="self-center">$</p>
                            <input className="p-2 border border-gray-500 rounded-md w-[10rem]" type='number' onChange={(e) => {
                                const newLogistics = logistics
                                newLogistics.revenue = e.target.value
                                setLogistics(newLogistics)
                            }}></input>
                        </div>

                    </div>

                    <div className="jobInputRow">
                        <p>Driver
                        </p>
                        <select className="p-2 border border-gray-500 rounded-md w-[10rem]" onChange={(e) => {
                            const newLogistics = logistics
                            newLogistics.driver = e.target.value
                            setLogistics(newLogistics)
                        }}>
                            {drivers?.map((driver, i) => {
                                return (
                                    <option key={i} value={driver.username}>{driver.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="jobInputRow">
                        <p>
                            Hazmat
                        </p>
                        <select className="p-2 border border-gray-500 rounded-md w-[12rem]" defaultValue='none' onChange={(e) => {
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
                className="justify-self-center self-center bg-orange-400 w-[12rem] p-2 text-white rounded-lg m-4 max-sm:mt-8"
                type="submit"
                onClick={(e) => findRoute(e)}>
                Calculate Route
            </button>
        </div>
    )
}