export const callApi = async (path: string, fetchOpt: {}) => {
    const apiURL = "https://ideally-popular-dove.ngrok-free.app/proxy/8000"
    try {
        const response = await fetch(`${apiURL}/${path}`, fetchOpt).then(res => res.json())
        return response
    } catch (error) {
        console.log(error)
        return error
    }

}