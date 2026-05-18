

export default function MiniHeatMap({color}) {
    const items =  Array.from({length: 7})
    return(
        <div style={{display: "flex", gap: "3px", marginLeft: "16px"}}>
            {
                items.map((item,index) => (
                    Math.random()>0.3 ? <div key={index} style={{width: "10px", height:"10px", borderRadius: "3px",
                        backgroundColor: color
                    }}></div> : <div key={index} style={{backgroundColor: "black", height: "10px",
                        width: "10px", borderRadius: "3px"
                    }}></div> 

                ))
            }

        </div>
    )



}