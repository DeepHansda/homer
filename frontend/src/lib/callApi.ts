export const callApi = async (path: string, fetchOpt: {}) => {
    const apiURL = "https://leading-manually-cowbird.ngrok-free.app"
    try {
        const response = await fetch(`${apiURL}/${path}`, fetchOpt).then(res => res.json())
        return response
    } catch (error) {
        console.log(error)
        return error
    }

}