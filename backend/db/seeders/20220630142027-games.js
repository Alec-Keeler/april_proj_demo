'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Boardgames', [
      { name: 'Gloomhaven', maxPlayers: 4, category: 'Adventure', avgRating: 8.8 },
      { name: 'Pandemic Legacy: Season 1', maxPlayers: 4, category: 'Cooperative', avgRating: 8.62 },
      { name: 'Brass: Birmingham', maxPlayers: 4, category: 'Economic', avgRating: 8.66 },
      { name: 'Terraforming Mars', maxPlayers: 5, category: 'Economic', avgRating: 8.43 },
      { name: 'Twilight Imperium: Fourth Edition', maxPlayers: 6, category: 'Strategy', avgRating: 8.7 },
      { name: 'Spirit Island', maxPlayers: 4, category: 'Cooperative', avgRating: 8.34 },
      { name: 'Mage Knight', maxPlayers: 4, category: 'Adventure', avgRating: 8.1 },
      { name: 'Rising Sun', maxPlayers: 5, category: 'Strategy', avgRating: 7.88 }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Boardgames', null, {});
  }
};
