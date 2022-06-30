'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Reviews', [
      { content: 'There is nothing I love more than escaping one pandemic for another, 10/10', gameId: 2, userId: 1 },
      { content: 'This game is far too long!', gameId: 5, userId: 1 },
      { content: 'My friends and I really like this game, lots of replayability', gameId: 6, userId: 2 },
      { content: '10/10, I can be a space pirate, favorite game hands down.', gameId: 5, userId: 2 },
      { content: 'Not as cool as Gloomhaven, but still pretty dope', gameId: 7, userId: 3 },
      { content: 'N/A', gameId: 1, userId: 3 }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
