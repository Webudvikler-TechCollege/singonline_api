import Song from './songModel.js';
import Artist from './artistModel.js';
import User from './userModel.js';

Song.belongsTo(Artist, { foreignKey: 'artist_id', as: 'artist' });
Artist.hasMany(Song, { foreignKey: 'artist_id' });

export {
    Song,
    Artist,
    User
}