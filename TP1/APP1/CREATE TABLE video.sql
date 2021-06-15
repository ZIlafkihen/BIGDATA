CREATE TABLE video
(
    videoId varchar(50) primary key not null,
    publishedAt varchar(30),
    channelId varchar(30),
    title varchar(1000),
    description varchar(10000),
    channelTitle varchar(60)
);
-- "id": {
--         "videoId": "4EC7P5WdUko"
--       },
-- "snippet": {
--         "publishedAt": "2013-03-25T07:02:54Z",
--         "channelId": "UCkR0GY0ue02aMyM-oxwgg9g",
--         "title": "World War Z TRAILER 2 (2013) - Brad Pitt Movie HD",
--         "description": "A U.N. employee is racing against time and fate, as he travels the world trying to stop the outbreak of a deadly Zombie pandemic. Cast: Brad Pitt: ...",
--         "channelTitle": "Movieclips Coming Soon",
--       }