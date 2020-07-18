import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";

const SearchForm = styled.form`
    display: inline-flex;
    border: 2px solid #000;
    margin: 10px;
    .search__input {
        border: none;
        padding-left: 5px;
        font-size: 1.1rem;
    }
    .search__button {
        padding: 1em 1.2em;
        border: none;
        border-left: 2px solid #000;
        outline: none;
        cursor: pointer;
    }
`;
const Header = styled.header`
    display: flex;
    justify-content: end;
    .profile-picture {
        width: 50px;
        display: block;
    }
`;
const Grid = styled.section`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        > div {
            justify-self: center;
            align-self: center;
        }
    }
`;

const SearchPage: React.FC = () => {
    const [input, setInput] = useState<string>("");
    const [animeList, setAnimeList] = useState<object[] | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (input.length > 3) {
            setIsLoading(true);
            const fetchData = await fetch(
                `https://api.jikan.moe/v3/search/anime?q=${input}&page=1`
            );
            if (fetchData.status === 200) {
                const { results } = await fetchData.json();
                setInput("");
                setIsLoading(false);
                setAnimeList(results);
            }
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInput(event.target.value);
    }
    return (
        <>
            <Header>
                <Link to="/profile">
                    <img
                        src="https://avatars1.githubusercontent.com/u/52217740?s=460&u=ef08f5742fa07f01e340728cef3893126c857938&v=4"
                        alt="profile"
                        className="profile-picture"
                    />
                </Link>
            </Header>
            <SearchForm onSubmit={(e) => handleSearch(e)}>
                <input
                    type="text"
                    name="search"
                    className="search__input"
                    value={input}
                    onChange={(e) => handleChange(e)}
                />
                <button type="submit" className="search__button">
                    Go
                </button>
            </SearchForm>
            {isLoading && <Spinner />}
            <Grid>
                {(animeList as object[]).map((anime: any, i) => (
                    <Card
                        key={anime.mal_id}
                        id={anime.mal_id}
                        title={anime.title}
                        imageUrl={anime.image_url}
                        score={anime.score}
                    />
                ))}
            </Grid>
        </>
    );
};
export default SearchPage;
