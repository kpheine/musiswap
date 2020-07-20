# Musiswap User Guide

[Access the latest version here!](https://accuvit.github.io/musiswap/)

Musiswap is a tool for converting a Spotify playlist into a YouTube playlist.

## How to use

1. Login to both Spotify and YouTube
2. Load your Spotify playlist (it only loads your "My likes" playlist, new features coming soon!)
3. Start the automatic conversion to YouTube playlists
4. It's done! It will be automatically on your "Musiswap" playlist on Youtube

## FAQs

> **Why does it  take so much time to convert?**

We use Youtube's Data API to send your tracks to a playlist, unfortunately we need to send one track at a time. Sending a batch of tracks at once generates inconsistencies to the final playlist, converting only about 60% of tracks.

___

> **I keep getting errors! Why is that?**

Google has set a quota limit to sending requests of adding videos to a playlist. If you have a lot of tracks for converting it may exceed that quota.
**We are submiting a request asking for YouTube to increase our quota limit, but Google already said it will "Take a lot of time"**

___

> **I says "App unverified" on login, are you sure it's safe?

Google has **A LOT** of bureaucracy, and verifying this app is out key next step into increasing quota and reducing errors.

___

> **I want (INSERT FEATURE HERE)**

New features will be developed in the future, such as

- [ ] Converting other Spotify playlists
- [ ] Converting **from** other platforms and **to** other platforms
- [ ] Making YouTube playlists public by default

## Contact me!

You can send me a message at laccuvit@gmail.com
