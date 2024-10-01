const Sequelize = require('sequelize');
const sequelize = new Sequelize('internship_DataBase', 'intern1', 'MyIntern1234', {
    host: 'your_mysql_host',
    dialect: 'mysql',
    port: 3306 // Adjust if necessary
});

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING, 

        unique: true 

    }
});

module.exports = {
    sequelize,
    User
};
// app.js (or your main Node.js file)

const { sequelize, User } = require('./model');
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synced successfully!');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });// Create a new user
    User.create({ name: 'John Doe', email: 'johndoe@example.com' })
        .then(user => {
            console.log('User created:', user.get({ plain: true }));
        })
        .catch(err => {
            console.error('Error creating user:', err);
        });
    
    // Find all users
    User.findAll()
        .then(users => {
            console.log('All users:', users);
        })
        .catch(err => {
            console.error('Error finding users:', err);
        });
        require('dotenv').config();
        const Product = sequelize.define('Product', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull:   
         false
            },
            description: {
                type: Sequelize.TEXT
            },
            price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false   
        
            },
            // Add other product attributes as needed
        });
        async function createProduct(productData) {
            const product = await Product.create(productData);
            return product;
        }
        async function getProducts(options = {}) {
            const { limit, offset, where, order } = options;
        
            const products = await Product.findAll({
                limit,
                offset,
                where,
                order
            });
        
            return products;
        }
        async function updateProduct(productId, productData) {
            const product = await Product.findByPk(productId);
        
            if (!product) {
                throw new Error('Product not found');
            }
        
            await product.update(productData);
            return product;
        }
        async function deleteProduct(productId) {
            const product = await Product.findByPk(productId);
        
            if (!product) {
                throw new Error('Product not found');
            }
        
            await product.destroy();   
        
        }
        // Create a product
const newProduct = await createProduct({
    name: 'Awesome Product',
    description: 'This is a great product.',
    price: 99.99
});

// Get all products with pagination, filtering, and sorting
const products = await getProducts({
    limit: 10,
    offset: 20,
    where: {
        price: { [Sequelize.Op.gt]: 50 }
    },
    order: [['name', 'DESC']]
});

// Update a product
const updatedProduct = await updateProduct(newProduct.id, {
    name: 'Updated Product'
});
const crypto = require('crypto');

// Generate a 32-byte random key
const secretKey = crypto.randomBytes(32).toString('base64url');

console.log(secretKey);
const secrettoken = process.env.JWT_SECRET;
function generateToken(user) {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };
    const options = { expiresIn: '1h' }; // Set expiration time
    const token = jwt.sign(payload, process.env.SECRET_KEY, options);
    return token;
  }
  const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];   

  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.SECRET_KEY,   
 (err, payload) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = payload;
    next();
  });
}
app.get('/protected-route', authenticateToken, (req, res) => {
    res.json({ message: 'You are authorized!' });
  });
  function authorize(requiredRoles) {
    return (req, res, next) => {
      const userRoles = req.user.roles;
  
      if (!userRoles.some(role => requiredRoles.includes(role))) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      next();
    };
  }
  
  // Example usage:
  app.get('/admin-only', authorize(['admin']), (req, res) => {
    // ...
  });
        