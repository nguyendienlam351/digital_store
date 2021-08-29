const baseUrl = process.env.BASE_URL

export const getData = async (url) => {
    const res = await fetch(encodeURI(`${baseUrl}/api/${url}`), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })

    const data = await res.json()
    return data
}

export const postData = async (url, post) => {
    const res = await fetch(`${baseUrl}/api/${url}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}