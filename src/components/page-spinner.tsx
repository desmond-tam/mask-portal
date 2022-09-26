import { gateway } from "../services/gateway-service"

export const PageSpinner = () => {
    const { visible } = gateway.useSpinner();

    const ShowSpinner = () => {
        return (
            <div className="cover-spin">
                <span className="spinner"></span>
            </div>
        )
    }

    const HideSpinner = () => {
        return (<></>)
    }

    return (
        <>
            { visible ? <ShowSpinner /> : <HideSpinner /> }
        </>
    )
}

