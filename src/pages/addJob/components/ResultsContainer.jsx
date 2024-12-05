import { useState } from "react"
import { CircularProgress } from "@mui/material"

export default function ResultsContainer({ job, loaded, setLoaded, setIsExpanded, isExpanded }) {

    return (
        <div className="results-container">
            {loaded ?
                <></>
                :
                <>
                    <CircularProgress style={{ color: 'orange' }} />
                    <button className="calc-route-button" onClick={(e) => {
                        e.preventDefault()
                        setIsExpanded(false)
                    }}>Cancel</button>
                </>
            }
        </div>
    )
}