-- BookMyShoot Sample Data

USE bookmyshoot;

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Photography', 'Professional photography services'),
('Videography', 'Video recording and production services'),
('Drone Services', 'Aerial photography and videography'),
('Editing', 'Photo and video editing services'),
('Event Coverage', 'Comprehensive event documentation'),
('Portrait Sessions', 'Individual and family portrait photography'),
('Wedding Services', 'Specialized wedding photography and videography'),
('Corporate Services', 'Business and corporate event coverage');

-- Insert sample users (password_hash is 'password' for all)
INSERT INTO users (name, email, phone, role, password_hash, locale) VALUES
('Admin User', 'admin@bookmyshoot.com', '+94771234567', 'admin', '$2b$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345678901234', 'en'),
('John Photographer', 'john@bookmyshoot.com', '+94771234568', 'pro', '$2b$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345678901234', 'en'),
('Jane Videographer', 'jane@bookmyshoot.com', '+94771234569', 'pro', '$2b$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345678901234', 'en'),
('Client User', 'client@bookmyshoot.com', '+94771234570', 'client', '$2b$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345678901234', 'si');

-- Insert sample profiles
INSERT INTO profiles (user_id, business_name, bio, location_city, location_area, avg_rating, portfolio_count) VALUES
(2, 'John\'s Photography Studio', 'Professional photographer with 10+ years of experience specializing in weddings and portraits.', 'Colombo', 'Colombo 03', 4.8, 25),
(3, 'Jane\'s Video Production', 'Creative videographer offering cinematic wedding and event coverage.', 'Kandy', 'Kandy Town', 4.9, 18);

-- Insert sample services
INSERT INTO services (pro_id, title, category, description, base_price, duration_minutes) VALUES
(2, 'Wedding Photography Package', 'Wedding Services', 'Full day wedding photography coverage with all edited photos delivered within 2 weeks.', 85000.00, 480),
(2, 'Portrait Session', 'Portrait Sessions', 'Professional portrait session for individuals or families, including 10 edited photos.', 15000.00, 90),
(3, 'Cinematic Wedding Video', 'Wedding Services', 'Full wedding day cinematic video coverage with highlights and full ceremony edit.', 120000.00, 480),
(3, 'Event Highlights', 'Event Coverage', 'Short highlight video of your event, perfect for social media sharing.', 35000.00, 120);

-- Insert sample packages
INSERT INTO packages (service_id, name, price, hours, details) VALUES
(1, 'Basic Package', 85000.00, 8.0, '8 hours coverage, 2 photographers, all edited photos (200-300 images)'),
(1, 'Premium Package', 125000.00, 10.0, '10 hours coverage, 3 photographers, all edited photos (400-500 images) + engagement session'),
(3, 'Full Day Coverage', 120000.00, 8.0, 'Full wedding day coverage, highlights video (3-5 minutes) + full ceremony edit'),
(3, 'Half Day Coverage', 75000.00, 4.0, 'Half day coverage, highlights video (2-3 minutes)');

-- Insert sample availability
INSERT INTO availability (pro_id, date, start_time, end_time, is_booked) VALUES
(2, '2025-12-15', '09:00:00', '17:00:00', 0),
(2, '2025-12-16', '10:00:00', '18:00:00', 0),
(2, '2025-12-20', '08:00:00', '20:00:00', 1),
(3, '2025-12-15', '10:00:00', '18:00:00', 0),
(3, '2025-12-18', '09:00:00', '17:00:00', 0);

-- Insert sample portfolios
INSERT INTO portfolios (pro_id, media_url, media_type, caption) VALUES
(2, 'https://example.com/portfolio/wedding1.jpg', 'image', 'Beach wedding ceremony'),
(2, 'https://example.com/portfolio/portrait1.jpg', 'image', 'Family portrait session'),
(2, 'https://example.com/portfolio/wedding2.jpg', 'image', 'Traditional wedding rituals'),
(3, 'https://example.com/portfolio/wedding-video1.mp4', 'video', 'Cinematic wedding highlight'),
(3, 'https://example.com/portfolio/event1.mp4', 'video', 'Corporate event coverage');

-- Insert sample coupons
INSERT INTO coupons (code, discount_type, discount_value, valid_from, valid_to, max_uses) VALUES
('WELCOME10', 'percentage', 10.00, '2025-11-01 00:00:00', '2026-11-01 23:59:59', 100),
('HOLIDAY20', 'percentage', 20.00, '2025-12-01 00:00:00', '2025-12-31 23:59:59', 50);