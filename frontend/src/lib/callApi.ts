export const callApi = async (path: string, fetchOpt: {}) :Promise<Response>=> {
    const apiURL = "https://leading-manually-cowbird.ngrok-free.app"
    try {
        const response = await fetch(`${apiURL}/${path}`, fetchOpt)
        return response
    } catch (error) {
        console.log(error)
        return error
    }

}