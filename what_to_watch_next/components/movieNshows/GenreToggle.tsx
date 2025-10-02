import React, { useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import Slider from '../shadcn/Slider'

const GenreToggle = ({ genreData, mediaType }: any) => {
    const showGenres = {
        Action: 28, Adventure: 12, Animation: 16, Comedy: 35, Crime: 80,
        Documentary: 99, Drama: 18, Family: 10751, Fantasy: 14, History: 36,
        Horror: 27, Music: 10402, Mystery: 9648, Romance: 10749, ScienceFiction: 878,
        TVMovie: 10770, Thriller: 53, War: 10752, Western: 37,
    }

    const [selectedGenres, setSelectedGenres] = useState<string[]>([])


    return (
        <div className="w-full p-4 rounded-lg">
            <div className="Category mb-4 fl text-2xl font-semibold text-white font-forum">
                Filter Movies by Genre
            </div>
            <ToggleGroup
                type="multiple"
                size="lg"
                className="flex flex-wrap gap-2"
                value={selectedGenres}
                onValueChange={(values) => setSelectedGenres(values)}
            >
                {Object.entries(showGenres).map(([genreName, genreId]) => {
                    const isSelected = selectedGenres.includes(genreId.toString())

                    const disabled = !isSelected && selectedGenres.length >= 3

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
                    params={`Top ${selectedGenres.length > 0 ? selectedGenres.map(id => {
                        return Object.entries(showGenres).find(([name, genreId]) => genreId === Number(id))?.[0]
                    }).join(", ") : "Genres"} ${mediaType ==="tv"?"Shows":"Movies"}`}
                    todayData={[]}
                    mediaType={mediaType}
                />
            </section>

        </div>
    )
}

export default GenreToggle
