import dotenv from "dotenv";
import passport from "passport";
import githubOAuth from "passport-github";
import facebookOAuth from "passport-facebook";
import twitterOAuth from "passport-twitter";
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
    const FacebookStrategy = facebookOAuth.Strategy;
    const TwitterStrategy = twitterOAuth.Strategy;

    passport.use(
        new TwitterStrategy(
            {
                consumerKey: process.env.TWITTER_APP_ID!,
                consumerSecret: process.env.TWITTER_APP_SECRET!,
                callbackURL: "/auth/twitter/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                const alreadyPresent = await User.findOne({
                    providerId: profile.id,
                    provider: profile.provider,
                });
                if (alreadyPresent) {
                    return done(null, alreadyPresent);
                }
                const newUser = await User.create({
                    providerId: profile.id,
                    username: profile.displayName,
                    profilePicture: profile._json.profile_image_url,
                    provider: profile.provider,
                });
                return done(null, newUser);
            }
        )
    );

    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FACEBOOK_APP_ID!,
                clientSecret: process.env.FACEBOOK_APP_SECRET!,
                callbackURL: "/auth/facebook/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                const alreadyPresent = await User.findOne({
                    providerId: profile.id,
                    provider: profile.provider,
                });
                if (alreadyPresent) {
                    return done(null, alreadyPresent);
                }
                const newUser = await User.create({
                    providerId: profile.id,
                    username: profile.displayName,
                    provider: profile.provider,
                    profilePicture: `https://graph.facebook.com/${profile.id}/picture`,
                });
                return done(null, newUser);
            }
        )
    );

    passport.use(
        new GithubStrategy(
            {
                clientID: process.env.GITHUB_APP_ID!,
                clientSecret: process.env.GITHUB_APP_SECRET!,
                callbackURL: "/auth/github/callback",
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
                    // profilePicture: profile.photos[0].value,
                    profilePicture: profile._json.avatar_url,
                });
                return done(null, newUser);
            }
        )
    );
}

export default passportSetup;
