import React, { useEffect, useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import Slider from '../shadcn/Slider'

const showGenres = {
    Action: 28, Adventure: 12, Animation: 16, Comedy: 35, Crime: 80,
    Documentary: 99, Drama: 18, Family: 10751, Fantasy: 14, History: 36,
    Horror: 27, Music: 10402, Mystery: 9648, Romance: 10749, ScienceFiction: 878,
    TVMovie: 10770, Thriller: 53, War: 10752, Western: 37,
}


function getGenreNames(genreIds: string[]) {
    return genreIds.map(id => {
        return Object.entries(showGenres).find(([, genreId]) => genreId === Number(id))?.[0]
    }).filter(Boolean)
}

const GenreToggle = ({ mediaType }: { mediaType: 'movie' | 'tv' }) => {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [genreData, setGenreData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (selectedGenres.length === 0) {
            setGenreData([])
            return
        }
        setLoading(true)
        fetch(`/api/genre?type=${mediaType}&genre=${selectedGenres.join(',')}`)
            .then(res => res.json())
            .then(data => {
                setGenreData(data.genreData || [])
            })
            .finally(() => setLoading(false))
    }, [selectedGenres, mediaType])

    const maxSelection = 3
    const selectedNames = getGenreNames(selectedGenres)

    return (
        <div className="w-full p-4 rounded-lg">
            <div className="Category mb-4 fl text-2xl font-semibold text-white font-forum">
                Filter {mediaType === 'tv' ? 'Shows' : 'Movies'} by Genre  <span className='text-lg fl'>(Choose upto 3 Genres)</span>
            </div>
            <ToggleGroup
                type="multiple"
                size="lg"
                className="flex flex-wrap gap-2"
                value={selectedGenres}
                onValueChange={setSelectedGenres}
            >
                {Object.entries(showGenres).map(([genreName, genreId]) => {
                    const isSelected = selectedGenres.includes(genreId.toString())
                    const disabled = !isSelected && selectedGenres.length >= maxSelection
                    return (
                        <ToggleGroupItem
                            key={genreId}
                            value={genreId.toString()}
                            className="cp flex-1 min-w-[6rem] text-center rounded-md border bg-gradient-to-b from-purple-100/30 via-purple-200/30 to-purple-300/30 text-white hover:bg-purple-200 hover:text-black border-none"
                            disabled={disabled}
                            aria-disabled={disabled}
                        >
                            {genreName}
                        </ToggleGroupItem>
                    )
                })}
            </ToggleGroup>

            <section>
                <Slider
                    params={
                        selectedGenres.length > 0
                            ? `Top ${selectedNames.join(', ')} ${mediaType === "tv" ? "Shows" : "Movies"}`
                            : `Top ${mediaType === "tv" ? "Shows" : "Movies"}`
                    }
                    todayData={genreData}
                    mediaType={mediaType}
                />
                {loading && <div className="text-white mt-15 font-tenor fl">Loading recommendations...</div>}
            </section>
        </div>
    )
}

export default GenreToggle
