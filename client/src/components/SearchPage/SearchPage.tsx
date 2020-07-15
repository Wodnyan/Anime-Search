import React, { useState } from "react";
import styled from "styled-components";
import Card from "../Card/Card";

const SearchForm = styled.form``;

const SearchPage: React.FC = () => {
    const [input, setInput] = useState<string>("");
    const [animeList, setAnimeList] = useState<object[] | []>([]);
    const JIKAN_API = ` https://api.jikan.moe/v3/search/anime?q=fsakjfklakjfklaf`;
    async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (input.length > 3) {
            const fetchData = await fetch(
                `https://api.jikan.moe/v3/search/anime?q=${input}&page=1`
            );
            const { results } = await fetchData.json();
            setInput("");
            setAnimeList(results);
            console.log(results);
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInput(event.target.value);
    }
    return (
        <>
            <SearchForm onSubmit={(e) => handleSearch(e)}>
                <input
                    type="text"
                    name="search"
                    value={input}
                    onChange={(e) => handleChange(e)}
                />
                <button type="submit">Go</button>
            </SearchForm>
            {(animeList as object[]).map((anime: any, i) => (
                <Card
                    key={i}
                    title={anime.title}
                    imageUrl={anime.image_url}
                    score={anime.score}
                />
            ))}
        </>
    );
};
export default SearchPage;
