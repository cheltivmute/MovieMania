const sequelize = require('../db')
const {DataTypes} = require('sequelize')

// Модель таблицы Reviews
const Review = sequelize.define('Review', {
    Review_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    User_id: { type: DataTypes.BIGINT, allowNull: false },
    Movie_id: { type: DataTypes.BIGINT, allowNull: false },
    Content: { type: DataTypes.TEXT, allowNull: false },
  });
  
  // Модель таблицы Users
  const User = sequelize.define('User', {
    User_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    Username: { type: DataTypes.TEXT, allowNull: false },
    Email: { type: DataTypes.TEXT, allowNull: false, unique: true },
    Password: { type: DataTypes.TEXT, allowNull: false },
    Avatar: { type: DataTypes.STRING, defaultValue: "ae6129cb-7fd5-4925-a20d-41c4eb8e37f8.jpg" },
    Role: { type: DataTypes.TEXT, defaultValue: "USER"},
    Birthday_date: { type: DataTypes.DATE, allowNull: false },
    Is_blocked: { type: DataTypes.BOOLEAN, defaultValue: false },
  });
  
  // Модель таблицы Movies
  const Movie = sequelize.define('Movie', {
    Movie_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    Title: { type: DataTypes.TEXT, allowNull: false },
    Cover: { type: DataTypes.STRING, allowNull: false },
    Genre_id: { type: DataTypes.BIGINT, allowNull: false },
    Genre_second_id: { type: DataTypes.BIGINT, allowNull: false },
    Country_id: { type: DataTypes.BIGINT, allowNull: false },
    Duration: { type: DataTypes.BIGINT, allowNull: false },
    Budget: { type: DataTypes.BIGINT, allowNull: false },
    Description: { type: DataTypes.TEXT, allowNull: false },
    Release_date: { type: DataTypes.DATE, allowNull: false },
  });

  const Genres = sequelize.define('Genres', {
    Genre_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    Genre_name: { type: DataTypes.TEXT, allowNull: false },
  });

  const SecondGenres = sequelize.define('SecondGenres', {
    Genre_second_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    Genre_name: { type: DataTypes.TEXT, allowNull: false },
  });

  const Countries = sequelize.define('Countries', {
    Country_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    Country_name: { type: DataTypes.TEXT, allowNull: false },
  });
  
  // Модель таблицы Ratings
  const Rating = sequelize.define('Rating', {
    Rating_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true  },
    User_id: { type: DataTypes.BIGINT, allowNull: false },
    Movie_id: { type: DataTypes.BIGINT, allowNull: false },
    Rating_value: { type: DataTypes.BIGINT, defaultValue: 0, validate: {min: 0, max: 10,}, },
  });
  
  // Модель таблицы Folders
  const Folder = sequelize.define('Folder', {
    Folder_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    User_id: { type: DataTypes.BIGINT, allowNull: false },
    Folder_name: { type: DataTypes.TEXT, allowNull: false },
    Cover: { type: DataTypes.STRING, defaultValue: "ae6129cb-7fd5-4925-a20d-41c4eb8e37f8.jpg" },
    Description: { type: DataTypes.TEXT, allowNull: false },
  });
  
  // Модель таблицы Folder_movies
  const FolderMovie = sequelize.define('FolderMovie', {
    Folder_id: { type: DataTypes.BIGINT, primaryKey: true },
    Movie_id: { type: DataTypes.BIGINT, primaryKey: true },
  });
  
  // Определение связей между таблицами
  Review.belongsTo(User, { foreignKey: 'User_id' });
  Review.belongsTo(Movie, { foreignKey: 'Movie_id' });
  Rating.belongsTo(User, { foreignKey: 'User_id' });
  Rating.belongsTo(Movie, { foreignKey: 'Movie_id' });
  Movie.belongsTo(Genres, { foreignKey: 'Genre_id' });
  Movie.belongsTo(SecondGenres, { foreignKey: 'Genre_second_id' });
  Movie.belongsTo(Countries, { foreignKey: 'Country_id' });
  Folder.belongsTo(User, { foreignKey: 'User_id' });
  FolderMovie.belongsTo(Folder, { foreignKey: 'Folder_id' });
  FolderMovie.belongsTo(Movie, { foreignKey: 'Movie_id' });
  
  // Синхронизация моделей с базой данных
  sequelize.sync()
    .then(() => {
      console.log('Модели успешно синхронизированы с базой данных.');
    })
    .catch((error) => {
      console.error('Ошибка синхронизации моделей с базой данных:', error);
    });
  
  // Экспорт моделей
  module.exports = {
    Review,
    User,
    Movie,
    Genres,
    SecondGenres,
    Countries,
    Rating,
    Folder,
    FolderMovie,
  };