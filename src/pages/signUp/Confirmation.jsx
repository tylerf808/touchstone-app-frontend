import { useEffect } from "react";

export default function Confirmation()  {

    const confirmEmail = async (confirmationCode) => {
        const response = await fetch(`http://localhost:5000/api/confirm/${confirmationCode}`, { method: "GET" });
        const data = await response.json();
        alert(data.message);
      };
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
        confirmEmail(code)
    }, [])

    return (
        <div className="pageContainer">
            <h3>Email confirmed!</h3>
        </div>
    )
}