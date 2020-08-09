import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { UserContext } from "../../context/UserContext";
import { Anime } from "../../interfaces";

interface Props {
    data: Anime;
}

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    padding: 1rem;
    width: 100%;
    height: 100%;
    background: black;
    color: white;
    overflow-y: auto;

    .close-overlay-button {
        float: right;
        border: none;
        background: none;
        cursor: pointer;
    }

    &.fade-enter {
        transform: scale(0);
    }
    &.fade-enter-active {
        transform: scale(1);
        transition: transform 0.2s ease;
    }
    &.fade-exit {
        transform: scale(1);
    }
    &.fade-exit-active {
        transform: scale(0);
        transition: transform 0.2s ease;
    }
`;

const StyledCard = styled.div`
    position: relative;
    padding: 1rem;
    width: 350px;
    border-radius: 1rem;
    background: red;
    .top-info {
        text-align: center;
        h1 {
            font-size: 1rem;
        }
    }
    .main-info {
        .main-info__anime-cover {
            height: 350px;
            width: 300px;
            margin: 0 auto;
            border-radius: 5px;
            overflow: hidden;
            img {
                display: block;
                height: 100%;
                width: 100%;
            }
        }
        button {
            display: block;
            margin: 1rem auto;
            padding: 0.5rem 1rem;
            background: none;
            border: 1px solid #000;
            border-radius: 1rem;
            cursor: pointer;
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

const AnimeOverlay: React.FC<{
    synopsis: string;
    onClick: () => void;
}> = ({ onClick, synopsis }) => {
    return (
        <Overlay>
            <button onClick={onClick} className="close-overlay-button">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-x"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div className="foo">{synopsis}</div>
        </Overlay>
    );
};

const TopInfo: React.FC<{ title: string; episodes: number; type: string }> = ({
    title,
    episodes,
    type,
}) => {
    return (
        <div className="top-info">
            <h1 className="title">{title}</h1>
            <span className="top-info__episodes">
                {episodes === 1 ? `${episodes} ep` : `${episodes} eps`}
            </span>
            &nbsp;|&nbsp;<span className="top-info__type">{type}</span>
        </div>
    );
};

const MainInfo: React.FC<{ image_url: string; onClick: () => void }> = ({
    image_url,
    onClick,
}) => {
    return (
        <div className="main-info">
            <div className="main-info__anime-cover">
                <img src={image_url} alt="anime cover" />
            </div>
            <button onClick={onClick}>Read Synopsis</button>
        </div>
    );
};

const BottomInfo: React.FC<{
    score: number;
    members: number;
    like: boolean;
    onClick: () => void;
    user: null | object;
}> = ({ score, members, user, like, onClick }) => {
    return (
        <div className="bottom-info">
            <div className="bottom-info__score">
                <span>Score:</span>
                {score}
            </div>
            {user && (
                <div className="bottom-info__liked" onClick={onClick}>
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
            )}
            <div className="bottom-info__members">{members}</div>
        </div>
    );
};

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

    const [like, setLike] = useState(false);
    const [showSynopsis, setShowSynopsis] = useState(false);
    const user = useContext(UserContext);

    async function handleLike() {
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
                "http://localhost:5050/favorite/",
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
            const addToLiked = await fetch("http://localhost:5050/favorite/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(anime),
            });
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
            <CSSTransition
                in={showSynopsis}
                timeout={200}
                classNames={"fade"}
                unmountOnExit
            >
                <AnimeOverlay
                    synopsis={synopsis}
                    onClick={() => setShowSynopsis(false)}
                />
            </CSSTransition>
            <TopInfo episodes={episodes} title={title} type={type} />
            <MainInfo
                image_url={image_url}
                onClick={() => setShowSynopsis(true)}
            />
            <BottomInfo
                like={like}
                user={user}
                onClick={handleLike}
                members={members}
                score={score}
            />
        </StyledCard>
    );
};
export default Card;
