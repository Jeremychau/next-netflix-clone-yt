import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

const updateFavorite = () => {
    const { data, error, isLoading } = useSWR('/api/favorite', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    // if (isFavorite) {
    //     response = await axios.delete('/api/favorite', { data: { movieId } })
    // } else {
    //     response = await axios.post('/api/favorite', { movieId })
    // }

    return { data, error, isLoading }
}

export default updateFavorite;