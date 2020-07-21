import dotenv from "dotenv";
import passport from "passport";
import githubOAuth from "passport-github";
import { User } from "../db/db";

interface UserData {
    providerId: number;
    provider: string;
    username: string;
    profilePicture: string;
}

dotenv.config();

function passportSetup() {
    passport.serializeUser((user: UserData, done) => {
        const { providerId, provider } = user;
        return done(null, { providerId, provider });
    });

    passport.deserializeUser(async ({ providerId, provider }, done) => {
        const user = await User.findOne({
            providerId,
            provider,
        });
        return done(null, user);
    });

    const GithubStrategy = githubOAuth.Strategy;

    passport.use(
        new GithubStrategy(
            {
                clientID: process.env.GITHUB_APP_ID!,
                clientSecret: process.env.GITHUB_APP_SECRET!,
                callbackURL: "http://localhost:5050/auth/github/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                const alreadyPresent = await User.findOne({
                    providerId: profile.id,
                    provider: profile.provider,
                });
                if (alreadyPresent) {
                    return done(null, alreadyPresent);
                }
                //TODO: Profile picture is possibly undefined.
                const newUser = await User.create({
                    providerId: profile.id,
                    username: profile.username,
                    provider: profile.provider,
                    profilePicture: profile.photos[0].value,
                });
                return done(null, newUser);
            }
        )
    );
}

export default passportSetup;
