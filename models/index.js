const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});
const validator = require('validator');

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    validator: {
      notNull: true
    }
  },
  urlTitle: {
    type: Sequelize.STRING,
    validator: {
      isURL: true,
      notNull: true
    },
    get route () {
      return '/wiki/' + this.urlTitle;
    }
  },
  content: {
    type: Sequelize.TEXT,
    validator: {
      notNull: true
    }
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    validator: {
      notNull: true
    }
  },
  email: {
    type: Sequelize.STRING,
    validator: {
      isEmail: true,
      notNull: true
    }
  }
});

module.exports = {
  Page: Page,
  User: User,
  db: db
};
