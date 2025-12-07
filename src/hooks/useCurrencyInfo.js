import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    // runs every time the base currency changes
    useEffect(() => {
        // fetching data from the open api standard version
        fetch(`https://open.er-api.com/v6/latest/${currency}`)
            .then((res) => res.json())
            .then((res) => setData(res.rates))
            .catch((err) => console.error("api fetch failed", err));
    }, [currency]);

    return data;
}

export default useCurrencyInfo;
