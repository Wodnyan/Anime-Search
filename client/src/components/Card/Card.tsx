import React, { useState } from "react";
import styled from "styled-components";
import { Anime } from "../../interfaces";

interface Props {
    data: Anime;
}

const StyledCard = styled.div`
    height: 450px;
    .top-info {
        text-align: center;
    }
    .main-info {
        .main-info__anime-cover {
        }
        .main-info__synopsis {
        }
    }
    .bottom-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .bottom-info__liked {
            cursor: pointer;
        }
    }
`;
//px

const Card: React.FC<Props> = ({ data }) => {
    const {
        mal_id,
        image_url,
        synopsis,
        title,
        score,
        episodes,
        members,
        type,
    } = data;

    const [like, setLike] = useState<boolean>(false);
    async function handleLike() {
        // const ENDPOINT = like
        //     ? "http://localhost:5050/favorite/delete"
        //     : "http://localhost:5050/favorite/add";
        const anime = {
            mal_id,
            image_url,
            synopsis,
            title,
            score,
            episodes,
            members,
            type,
        };
        if (like) {
            const removeFromLiked = await fetch(
                "http://localhost:5050/favorite/delete",
                {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(anime),
                }
            );
            if (removeFromLiked.status === 200) {
                setLike(false);
            } else {
                //Send a message
            }
            console.log("disliked");
            setLike(false);
        } else {
            const addToLiked = await fetch(
                "http://localhost:5050/favorite/add",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(anime),
                }
            );
            if (addToLiked.status === 200) {
                console.log(await addToLiked.json());
                setLike(true);
            } else {
                console.error(await addToLiked.json());
                //Send a message
            }
        }
    }
    return (
        <StyledCard data-id={mal_id}>
            <div className="top-info">
                <h1 className="title">{title}</h1>
                <span className="top-info__episodes">
                    {episodes === 1 ? `${episodes} ep` : `${episodes} eps`}
                </span>
                &nbsp;|&nbsp;<span className="top-info__type">{type}</span>
            </div>
            <div className="main-info">
                <div className="main-info__anime-cover">
                    <img src={image_url} alt="anime cover" />
                </div>
                <div className="main-info__synopsis">
                    <p>{synopsis}</p>
                </div>
            </div>
            <div className="bottom-info">
                <div className="bottom-info__score">
                    <span>Score:</span>
                    {score}
                </div>
                <div className="bottom-info__liked" onClick={handleLike}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill={like ? "black" : "transparent"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-heart"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </div>
                <div className="bottom-info__members">{members}</div>
            </div>
        </StyledCard>
    );
};
export default Card;
