const sqlite3 = require("sqlite3");

const dumpDataToDb = (db) => {
    // Dumping Data
    db.serialize(() => {
        // Dumping data for table `categories`
        db.run(` 
          INSERT INTO Categories VALUES 
            (1,'Electronics', 'Dive into the world of innovation and technology with our Electronics category. From state-of-the-art gadgets to smart devices, this category is a haven for tech enthusiasts.', '/img/categories/eletronics.jpg'), 
            (2,'Clothing', 'Explore the latest fashion trends and express your style with our Clothing category. From casual wear to elegant outfits, find the perfect ensemble for any occasion.', '/img/categories/fashion.jpeg'),
            (3,'Home Decor', 'Infuse personality into your living spaces with our Home Decor category. Discover a curated collection of stylish and unique items that add flair and charm to your home.', '/img/categories/forniture.jpeg'),
            (4,'Appliances', 'Simplify your daily routines with our Appliances category. Explore a range of modern and efficient appliances designed to make your life easier and more convenient.', '/img/categories/eletronics2.jpeg'),
            (5,'Books', 'Embark on literary journeys and explore diverse worlds with our Books category. From bestsellers to hidden gems, find captivating stories that ignite your imagination.', '/img/categories/books.webp'),
            (6,'Sports', 'Fuel your passion for fitness and adventure with our Sports category. Discover high-quality sports gear and equipment to elevate your active lifestyle and pursuits.', '/img/categories/sport.jpeg'),
            (7,'Musical Instruments', 'Unleash your musical passion with our Musical Instruments category. From guitars to keyboards, discover the perfect instrument to create beautiful melodies and express your artistic side.', '/img/categories/music.jpg')
          `);

        // Insert data into the products table
        db.run(`
          INSERT INTO Products VALUES 
            (1,'Smartphone', 'Experience the latest in mobile technology with our Smartphone Model X. Packed with advanced features, it is the perfect companion for your digital lifestyle.', '/img/products/smartphone.webp', 499.99, 1),
            (2,'Laptop', 'Boost your productivity with the powerful Laptop Model Y. Whether you are working or gaming, this laptop delivers exceptional performance and sleek design.', '/img/products/laptop.jpeg', 999.99, 1),
            (3,'T-Shirt', 'Stay stylish and comfortable with our Casual T-Shirt. Perfect for everyday wear, it adds a touch of fashion to your wardrobe.', '/img/products/tshert.jpeg', 19.99, 2),
            (4,'Jeans', 'Discover the perfect fit and style with our Blue Jeans. Designed for both comfort and fashion, these jeans elevate your casual look.', '/img/products/jeans.jpeg', 39.99, 2),
            (5,'Table Lamp', 'Illuminate your space with the Modern Table Lamp. Its contemporary design and soft glow create a welcoming ambiance in any room.', '/img/products/table-lamp.jpeg', 29.99, 3),
            (6,'Cushion', 'Add a touch of luxury to your living space with the Decorative Cushion. This cushion combines style and comfort for a cozy home.', '/img/products/cuchion.jpeg', 14.99, 3),  
            (7,'Refrigerator', 'Upgrade your kitchen with the Smart Refrigerator. With advanced features and ample storage, it is the heart of a modern home.', '/img/products/refrigerator.jpeg', 899.99, 4),
            (8,'Microwave Oven', 'Simplify your cooking experience with the Advanced Microwave Oven. Its intuitive features make meal preparation quick and easy.', '/img/products/microwave.jpg', 149.99, 4),
            (9,'Novel', 'Escape into the world of literature with the Bestseller Novel. This captivating read is perfect for book enthusiasts and avid readers.', 'novel.jpg', 9.99, 5),
            (10,'Fitness Tracker', 'Achieve your fitness goals with the Fitness Tracker Watch. Monitor your activity, track progress, and stay motivated on your health journey.', '/img/products/fitness-tracker.webp', 49.99, 6),
            (11,'Soccer Ball', 'Enhance your soccer skills with the Professional Soccer Ball. Its durable design ensures optimal performance on the field.', '/img/products/football.jpeg', 19.99, 7),
            (12,'Running Shoes', 'Experience comfort and style during your runs with the Comfortable Running Shoes. Designed for active lifestyles, they provide support and performance.', '/img/products/running-shoes.jpg', 59.99, 7),
            (13,'Smart Refrigerator with AI', 'Elevate your kitchen with the Smart Refrigerator. Featuring AI technology, it adapts to your preferences and enhances your culinary experience.', '/img/products/smartrefrigerator.jpeg', 1200, 1),
            (14,'Programming Book Bundle', 'Expand your coding skills with the Programming Book Bundle. This collection of programming books covers a range of topics for aspiring developers.', '/img/products/programming-books-bundle.webp', 50, 5),
            (15,'Football Kit', 'Gear up for the game with the Football Kit. This kit includes everything you need for a thrilling match on the field.', '/img/products/football-kit.webp', 80, 6),
            (16,'Digital Camera', 'Capture moments in stunning detail with the Digital Camera. Whether you are a photography enthusiast or a casual shooter, it delivers exceptional quality.', '/img/products/digital-camera.jpeg', 500, 1),
            (17,'Gaming Laptop', 'Immerse yourself in gaming with the Gaming Laptop. Designed for high-performance gaming, it delivers a seamless and thrilling gaming experience.', '/img/products/gaming-laptop.webp', 1500, 1),
            (18,'Fitness Tracker', 'Track your fitness journey with the Fitness Tracker. Its features include heart rate monitoring, activity tracking, and more to support your well-being.', '/img/products/fitness-tracker2.jpg', 90, 6),
            (19,'Coffee Maker', 'Indulge in the perfect cup of coffee with the Coffee Maker. Its sleek design and advanced brewing technology ensure a delightful coffee experience.', '/img/products/coffe-maker.jpeg', 60, 1),
            (20,'Wireless Earbuds', 'Experience wireless freedom with the Wireless Earbuds. Enjoy clear audio and convenience whether you are commuting, working out, or relaxing.', '/img/products/wireless-earbunds.webp', 40, 1),
            (21,'Guitar', 'Unleash your musical talent with the Acoustic Guitar. Whether you are a beginner or a seasoned player, this guitar delivers rich and resonant tones.', '/img/products/gitar.png', 200, 7),
            (22,'Office Chair', 'Upgrade your workspace with the Ergonomic Office Chair. Designed for comfort and support, it enhances your productivity during long work hours.', '/img/products/office-chair.jpg', 120, 1);
        `);

        // Insert data into the tokens table
        db.run(`
          INSERT INTO Tokens VALUES (1,'0a686925-7735-4d5e-930a-285e23d8aed1','2020-12-22 13:19:11',1),
            (2,'73110419-d579-4fd9-ad98-dd9402226adb','2020-12-22 13:22:02',2),
            (3,'9816248d-4623-474f-a985-d11b094325f9','2020-12-22 13:22:14',3),
            (4,'120038ca-5a15-49fa-a50f-6580345ad35e','2020-12-27 06:24:23',4),
            (5,'ea8303ca-29c7-4892-961a-5829814d02d3','2020-12-27 06:25:06',5),
            (6,'59f35dc9-9dc4-4bcc-ab28-f4ea6f81722d','2020-12-27 06:25:16',6),
            (7,'cba245a4-d4eb-41a2-9789-e3dc9b46855a','2020-12-27 07:48:16',7),
            (8,'3ea96f41-708c-4ad6-adf8-b862fc7ee125','2020-12-27 07:50:11',8),
            (9,'fb32b650-fd27-4dc3-b8e2-9bee7f5a66f3','2020-12-27 08:23:40',9),
            (10,'f54d51b9-01e3-4a1c-9ab7-b072801305dd','2020-12-27 08:41:01',10),
            (11,'1b7e5c1a-0161-453f-950e-367397190065','2020-12-27 15:39:16',11),
            (12,'4fee3514-cc3d-46c8-a0eb-0cc04a0fda59','2020-12-28 09:55:06',12),
            (13,'a3699f8e-56c6-4d00-8849-68833c37b571','2020-12-28 10:03:34',13),
            (14,'4a0d58f1-1171-4721-b617-ad2604bc12c2','2020-12-28 10:04:09',14),
            (15,'3d0bd78a-b4a1-4a91-bc9c-a9960c83a6e2','2020-12-28 11:30:29',15),
            (16,'f0425c15-7a5e-4735-993d-cb3577143c16','2020-12-28 12:41:57',16),
            (17,'495d3ac3-fb1a-4373-9997-42329a10e31c','2020-12-29 14:07:45',17),
            (18,'8d32ef2a-9494-4d0f-912e-684940cd03ff','2020-12-29 14:10:29',18),
            (19,'73a0a7e4-eaf4-4f7c-a1a1-3f29b19d9d1a','2020-12-29 16:23:12',19),
            (20,'b368062c-6074-4ef3-8311-b6b37581d202','2020-12-30 21:32:04',20),
            (21,'2e8418cb-af90-47f1-a94a-bec5bf7f4b1b','2021-01-01 09:04:52',21),
            (22,'6415441f-c621-435e-8535-7170a5f8c50f','2021-01-01 09:40:21',22),
            (23,'f4c3c2e9-f82a-4137-a174-de197428cd8b','2021-01-01 10:05:17',23)
        `);

        // Insert data into the users table
        db.run(`
          INSERT INTO Users VALUES (1, 'user1@example.com', 'John', 'Doe', 'E358EFA489F58062F10DD7316B65649E', '6 Noster Grove'),
            (2, 'user2@example.com', 'Jane', 'Smith', 'B45CFFE084DD3D20D928BEE85E7B0F21', '11 Prime Rose'),
            (3, 'user3@example.com', 'Alice', 'Johnson', 'ACCC9105DF5383111407FD5B41255E23', '455 York Roud')
        `);

        // Insert data into the wishlist table
        db.run(`
          INSERT INTO Wishlist VALUES (1, 1, '2021-01-12 21:06:39', 1),
            (2, 1, '2021-01-12 21:11:54', 6),
            (3, 2, '2021-01-12 21:12:34', 3),
            (5, 9, '2021-01-13 02:48:42', 3),
            (6, 11, '2021-01-13 02:51:01', 1)
        `);
    });
};

module.exports = { dumpDataToDb };
