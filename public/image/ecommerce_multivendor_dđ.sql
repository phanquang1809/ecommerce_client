-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 22, 2025 at 10:40 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce_multivendor`
--

-- --------------------------------------------------------

--
-- Table structure for table `attributes`
--

CREATE TABLE `attributes` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attribute_values`
--

CREATE TABLE `attribute_values` (
  `id` bigint UNSIGNED NOT NULL,
  `attribute_id` bigint UNSIGNED NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `color_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `banner_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover_mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `title`, `cover`, `thumbnail`, `banner_url`, `cover_mobile`, `created_at`, `updated_at`) VALUES
(1, 'Góp ý kiến', '/image/banner1_desktop.png', '/image/banner1_tablet.png', '', '/image/banner1_mobi.png', NULL, NULL),
(2, 'Góp ý kiến', '/image/banner2_desktop.png', '/image/banner2_tablet.png', '', '/image/banner2_mobi.png', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel_cache_1vXsHqjmB4KVozFR', 'a:1:{s:11:\"valid_until\";i:1742276266;}', 1743485866),
('laravel_cache_AiLxlj6fYSeW5cT8', 'a:1:{s:11:\"valid_until\";i:1742277787;}', 1743487447),
('laravel_cache_bnXHH27lx8cokoJl', 'a:1:{s:11:\"valid_until\";i:1742280657;}', 1743490317),
('laravel_cache_bUyMz1V0LGqY6jGw', 'a:1:{s:11:\"valid_until\";i:1742277804;}', 1743487464),
('laravel_cache_bYlKRjQpjeG0HK2N', 'a:1:{s:11:\"valid_until\";i:1742463729;}', 1743673389),
('laravel_cache_DoQWJrWxNIlXbJ7e', 'a:1:{s:11:\"valid_until\";i:1742463670;}', 1743673270),
('laravel_cache_jl2R24Hg1zAvTMtR', 'a:1:{s:11:\"valid_until\";i:1742463709;}', 1743673369),
('laravel_cache_k0tIOj7yBC25pgp2', 'a:1:{s:11:\"valid_until\";i:1742276854;}', 1743486514),
('laravel_cache_KFiG4LWwrZH4VdyA', 'a:1:{s:11:\"valid_until\";i:1742277020;}', 1743486680),
('laravel_cache_O1g3NGCaWoDtnUwQ', 'a:1:{s:11:\"valid_until\";i:1742280783;}', 1743490323),
('laravel_cache_S110f8cwsQB1AHTS', 'a:1:{s:11:\"valid_until\";i:1742276552;}', 1743486212),
('laravel_cache_Szxsf800g1zRAY0I', 'a:1:{s:11:\"valid_until\";i:1742276942;}', 1743486602),
('laravel_cache_uou6hEf9xDQGyCXB', 'a:1:{s:11:\"valid_until\";i:1742638112;}', 1743846392),
('laravel_cache_xhSTue5zfDjyWwyH', 'a:1:{s:11:\"valid_until\";i:1742278016;}', 1743487676),
('laravel_cache_z3gQwe5Sq0jDT5g6', 'a:1:{s:11:\"valid_until\";i:1742296204;}', 1743504664),
('laravel_cache_ZsRCQqohQNfeuMiA', 'a:1:{s:11:\"valid_until\";i:1742280635;}', 1743490295);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` bigint UNSIGNED DEFAULT NULL,
  `slug` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `parent_id`, `slug`, `image`, `created_at`, `updated_at`) VALUES
(2, 'Âm Thanh', NULL, 'am-thanh', '/image/cat_am_thanh.png', '2025-03-14 01:23:05', '2025-03-14 01:23:05'),
(3, 'Camera', NULL, 'camera', '/image/cat_camera.png', '2025-03-14 01:23:05', '2025-03-14 01:23:05'),
(4, 'Chăm Sóc Sức Khỏe', NULL, 'cham-soc-suc-khoe', '/image/cat_cham_soc_suc_khoe.png', '2025-03-14 01:23:05', '2025-03-14 01:23:05'),
(5, 'Điện Gia Dụng', NULL, 'dien-gia-dung', '/image/cat_dien_gia_dung.png', '2025-03-14 01:23:05', '2025-03-14 01:23:05'),
(6, 'Điện Máy', NULL, 'dien-may', '/image/cat_dien_may.png', '2025-03-14 01:23:05', '2025-03-14 01:23:05'),
(7, 'Điện Thoại', NULL, 'dien-thoai', '/image/cat_dien_thoai.png', '2025-03-14 01:23:05', '2025-03-14 01:23:05'),
(8, 'Đồng Hồ', NULL, 'dong-ho', '/image/cat_dong_ho.png', '2025-03-14 01:23:05', '2025-03-14 01:23:05'),
(9, 'Laptop', NULL, 'laptop', '/image/cat_laptop.png', '2025-03-14 01:23:05', '2025-03-14 01:23:05'),
(10, 'Linh Kiện', NULL, 'linh-kien', '/image/cat_linh_kien.png', '2025-03-14 01:23:05', '2025-03-14 01:23:05'),
(11, 'Máy Chơi Game', NULL, 'may-choi-game', '/image/cat_may_choi_game.png', '2025-03-14 01:23:05', '2025-03-14 01:23:05'),
(12, 'Mô Hình', NULL, 'mo-hinh', '/image/cat_mo_hinh.png', '2025-03-14 01:23:05', '2025-03-14 01:23:05'),
(13, 'Phần Mềm', NULL, 'phan-mem', '/image/cat_phan_mem.png', '2025-03-14 01:23:05', '2025-03-14 01:23:05'),
(14, 'Phụ Kiện Gaming', NULL, 'phu-kien-gaming', '/image/cat_phu_kien_gaming.png', '2025-03-14 01:23:05', '2025-03-14 01:23:05'),
(15, 'Phụ Kiện Setup', NULL, 'phu-kien-setup', '/image/cat_phu_kien_setup.png', '2025-03-14 01:23:05', '2025-03-14 01:23:05'),
(16, 'Router', NULL, 'router', '/image/cat_router.png', '2025-03-14 01:23:05', '2025-03-14 01:23:05'),
(17, 'Thiết Bị Văn Phòng', NULL, 'thiet-bi-van-phong', '/image/cat_thiet_bi_van_phong.png', '2025-03-14 01:23:05', '2025-03-14 01:23:05'),
(18, 'Laptop Gaming', 9, 'laptop-gaming', '/image/cat_laptop_gaming.png', '2025-03-14 01:28:58', '2025-03-14 01:28:58'),
(19, 'Laptop Văn Phòng', 9, 'laptop-van-phong', '/image/cat_laptop_van_phong.png', '2025-03-14 01:28:58', '2025-03-14 01:28:58'),
(20, 'Laptop Đồ Họa', 9, 'laptop-do-hoa', '/image/cat_laptop_do_hoa.png', '2025-03-14 01:28:58', '2025-03-14 01:28:58'),
(21, 'iPhone', 7, 'iphone', '/image/cat_iphone.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(22, 'Samsung', 7, 'samsung', '/image/cat_samsung.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(23, 'Xiaomi', 7, 'xiaomi', '/image/cat_xiaomi.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(24, 'Tai Nghe', 2, 'tai-nghe', '/image/cat_tai_nghe.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(25, 'Loa Bluetooth', 2, 'loa-bluetooth', '/image/cat_loa_bluetooth.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(26, 'Loa Soundbar', 2, 'loa-soundbar', '/image/cat_loa_soundbar.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(27, 'Mainboard', 10, 'mainboard', '/image/cat_mainboard.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(28, 'CPU', 10, 'cpu', '/image/cat_cpu.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(29, 'RAM', 10, 'ram', '/image/cat_ram.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(30, 'VGA', 10, 'vga', '/image/cat_vga.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(31, 'Bàn Phím Cơ', 14, 'ban-phim-co', '/image/cat_ban_phim_co.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(32, 'Chuột Gaming', 14, 'chuot-gaming', '/image/cat_chuot_gaming.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(33, 'Tai Nghe Gaming', 14, 'tai-nghe-gaming', '/image/cat_tai_nghe_gaming.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(34, 'Giá Đỡ Màn Hình', 15, 'gia-do-man-hinh', '/image/cat_gia_do_man_hinh.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(35, 'Đèn LED', 15, 'den-led', '/image/cat_den_led.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(36, 'Ghế Gaming', 15, 'ghe-gaming', '/image/cat_ghe_gaming.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(37, 'Máy In', 17, 'may-in', '/image/cat_may_in.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(38, 'Máy Scan', 17, 'may-scan', '/image/cat_may_scan.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(39, 'Màn Hình Văn Phòng', 17, 'man-hinh-van-phong', '/image/cat_man_hinh_van_phong.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(40, 'Camera Hành Trình', 3, 'camera-hanh-trinh', '/image/cat_camera_hanh_trinh.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(41, 'Camera Giám Sát', 3, 'camera-giam-sat', '/image/cat_camera_giam_sat.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(42, 'Webcam', 3, 'webcam', '/image/cat_webcam.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(43, 'Console', 11, 'console', '/image/cat_console.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(44, 'Phụ Kiện Máy Game', 11, 'phu-kien-may-game', '/image/cat_phu_kien_may_game.png', '2025-03-14 01:34:45', '2025-03-14 01:34:45'),
(69, 'Laptop Gaming Asus', 18, 'laptop-gaming-asus', '/image/cat_laptop_gaming_asus.png', '2025-03-14 01:39:54', '2025-03-14 01:39:54'),
(70, 'Laptop Gaming Acer', 18, 'laptop-gaming-acer', '/image/cat_laptop_gaming_acer.png', '2025-03-14 01:39:54', '2025-03-14 01:39:54'),
(71, 'Laptop Gaming MSI', 18, 'laptop-gaming-msi', '/image/cat_laptop_gaming_msi.png', '2025-03-14 01:39:54', '2025-03-14 01:39:54'),
(72, 'iPhone 14', 21, 'iphone-14', '/image/cat_iphone_14.png', '2025-03-14 01:39:54', '2025-03-14 01:39:54'),
(73, 'iPhone 15', 21, 'iphone-15', '/image/cat_iphone_15.png', '2025-03-14 01:39:54', '2025-03-14 01:39:54'),
(74, 'iPhone 16', 21, 'iphone-16', '/image/cat_iphone_16.png', '2025-03-14 01:39:54', '2025-03-14 01:39:54'),
(75, 'Tai Nghe Bluetooth', 24, 'tai-nghe-bluetooth', '/image/cat_tai_nghe_bluetooth.png', '2025-03-14 01:39:54', '2025-03-14 01:39:54'),
(76, 'Tai Nghe Có Dây', 24, 'tai-nghe-co-day', '/image/cat_tai_nghe_co_day.png', '2025-03-14 01:39:54', '2025-03-14 01:39:54'),
(77, 'Mainboard Intel', 27, 'mainboard-intel', '/image/cat_mainboard_intel.png', '2025-03-14 01:39:54', '2025-03-14 01:39:54'),
(78, 'Mainboard AMD', 27, 'mainboard-amd', '/image/cat_mainboard_amd.png', '2025-03-14 01:39:54', '2025-03-14 01:39:54'),
(79, 'Bàn Phím Cơ Không Dây', 31, 'ban-phim-co-khong-day', '/image/cat_ban_phim_co_khong_day.png', '2025-03-14 01:39:54', '2025-03-14 01:39:54'),
(80, 'Bàn Phím Cơ Có Dây', 31, 'ban-phim-co-co-day', '/image/cat_ban_phim_co_co_day.png', '2025-03-14 01:39:54', '2025-03-14 01:39:54'),
(153, 'Samsung Galaxy S23', 22, 'samsung-galaxy-s23', '/image/cat_samsung_galaxy_s23.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38'),
(154, 'Samsung Galaxy Z Flip', 22, 'samsung-galaxy-z-flip', '/image/cat_samsung_galaxy_z_flip.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38'),
(155, 'Samsung Galaxy Note', 22, 'samsung-galaxy-note', '/image/cat_samsung_galaxy_note.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38'),
(156, 'Samsung Galaxy A Series', 22, 'samsung-galaxy-a-series', '/image/cat_samsung_galaxy_a_series.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38'),
(157, 'Samsung Galaxy M Series', 22, 'samsung-galaxy-m-series', '/image/cat_samsung_galaxy_m_series.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38'),
(158, 'Xiaomi Redmi Note', 23, 'xiaomi-redmi-note', '/image/cat_xiaomi_redmi_note.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38'),
(159, 'Xiaomi Mi', 23, 'xiaomi-mi', '/image/cat_xiaomi_mi.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38'),
(160, 'Xiaomi POCO', 23, 'xiaomi-poco', '/image/cat_xiaomi_poco.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38'),
(161, 'Xiaomi Black Shark', 23, 'xiaomi-black-shark', '/image/cat_xiaomi_black_shark.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38'),
(162, 'Xiaomi Mix Series', 23, 'xiaomi-mix-series', '/image/cat_xiaomi_mix_series.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38'),
(163, 'Tai Nghe Chống Ồn', 24, 'tai-nghe-chong-on', '/image/cat_tai_nghe_chong_on.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38'),
(164, 'Tai Nghe True Wireless', 24, 'tai-nghe-true-wireless', '/image/cat_tai_nghe_true_wireless.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38'),
(165, 'Máy Ảnh DSLR', 25, 'may-anh-dslr', '/image/cat_may_anh_dslr.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38'),
(166, 'Máy Ảnh Mirrorless', 25, 'may-anh-mirrorless', '/image/cat_may_anh_mirrorless.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38'),
(167, 'Máy Ảnh Compact', 25, 'may-anh-compact', '/image/cat_may_anh_compact.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38'),
(168, 'Máy Ảnh Film', 25, 'may-anh-film', '/image/cat_may_anh_film.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38'),
(169, 'Máy Ảnh Action Cam', 25, 'may-anh-action-cam', '/image/cat_may_anh_action_cam.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38'),
(170, 'Apple Watch', 26, 'apple-watch', '/image/cat_apple_watch.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38'),
(171, 'Samsung Galaxy Watch', 26, 'samsung-galaxy-watch', '/image/cat_samsung_galaxy_watch.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38'),
(172, 'Garmin Watch', 26, 'garmin-watch', '/image/cat_garmin_watch.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38'),
(173, 'Xiaomi Smart Watch', 26, 'xiaomi-smart-watch', '/image/cat_xiaomi_smart_watch.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38'),
(174, 'Huawei Watch', 26, 'huawei-watch', '/image/cat_huawei_watch.png', '2025-03-14 01:45:38', '2025-03-14 01:45:38');

-- --------------------------------------------------------

--
-- Table structure for table `category_product`
--

CREATE TABLE `category_product` (
  `product_id` bigint UNSIGNED NOT NULL,
  `category_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `email_verifications`
--

CREATE TABLE `email_verifications` (
  `id` bigint UNSIGNED NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `email_verifications`
--

INSERT INTO `email_verifications` (`id`, `email`, `code`, `expires_at`, `created_at`, `updated_at`) VALUES
(14, 'phan@gma.conm', '181331', '2025-03-17 15:26:33', NULL, NULL),
(15, 'phanquang@gmail.com', '223243', '2025-03-17 15:44:53', NULL, NULL),
(16, 'dsadasd@gmail.copm', '918268', '2025-03-17 18:38:19', NULL, NULL),
(17, 'dá@gmail.com', '426676', '2025-03-18 06:13:49', NULL, NULL),
(18, 'phanq@gmail.com', '729169', '2025-03-18 06:17:18', NULL, NULL),
(19, 'phàn@gm.com', '662146', '2025-03-18 06:27:14', NULL, NULL),
(20, 'sad@gmail.com', '227447', '2025-03-18 06:39:24', NULL, NULL),
(21, 'adminds@gmail.com', '730731', '2025-03-18 07:05:00', NULL, NULL),
(22, 'phf@gmail.com', '154898', '2025-03-18 07:09:27', NULL, NULL),
(23, 'ádd@gmail.com', '819149', '2025-03-18 07:24:36', NULL, NULL),
(24, 'dsad@gmail.com', '199972', '2025-03-18 08:16:35', NULL, NULL),
(25, 'phanthequang12.3tpk@gmail.com', '788106', '2025-03-18 10:35:20', NULL, NULL),
(26, 'phanquang180918@gmail.dsds', '895058', '2025-03-18 11:03:14', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(54, '0001_01_01_000000_create_users_table', 1),
(55, '0001_01_01_000001_create_cache_table', 1),
(56, '0001_01_01_000002_create_jobs_table', 1),
(57, '2025_03_10_045604_create_shops_table', 1),
(58, '2025_03_10_045630_create_categories_table', 1),
(59, '2025_03_10_045811_create_brands_table', 1),
(60, '2025_03_10_045813_create_products_table', 1),
(61, '2025_03_10_050846_create_product_variants_table', 1),
(62, '2025_03_10_051108_create_attributes_table', 1),
(63, '2025_03_10_051112_create_attribute_values_table', 1),
(64, '2025_03_10_051119_create_product_variant_attributes_table', 1),
(65, '2025_03_10_051129_create_product_reviews_table', 1),
(66, '2025_03_10_051732_create_product_images_table', 1),
(67, '2025_03_11_062327_create_personal_access_tokens_table', 1),
(68, '2025_03_12_055942_create_category_product_table', 1),
(69, '2025_03_13_042407_create_banners_table', 2),
(70, '2025_03_17_055305_create_email_verifications_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint UNSIGNED NOT NULL,
  `shop_id` bigint UNSIGNED NOT NULL,
  `category_id` bigint UNSIGNED NOT NULL,
  `brand_id` bigint UNSIGNED DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `type` enum('basic','variants') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'basic',
  `status` enum('active','inactive','deleted') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_reviews`
--

CREATE TABLE `product_reviews` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `rating` int UNSIGNED NOT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `sku` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `stock_limit` int NOT NULL DEFAULT '1',
  `sold_count` int NOT NULL DEFAULT '0',
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_variant_attributes`
--

CREATE TABLE `product_variant_attributes` (
  `id` bigint UNSIGNED NOT NULL,
  `product_variant_id` bigint UNSIGNED NOT NULL,
  `attribute_id` bigint UNSIGNED NOT NULL,
  `attribute_value_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('ErnUqybbRhgGkTvRmIrD9WYpt13OJdj6x1muR8BN', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMWxkQ284UGdaQ2ZmaXhpdEFwb2ZRS2pHN0tESnFuUDk0cW51WVFHWSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1741800322);

-- --------------------------------------------------------

--
-- Table structure for table `shops`
--

CREATE TABLE `shops` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `shop_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `logo_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','active','banned') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `verify_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `verify_code_expired_at` timestamp NULL DEFAULT NULL,
  `role` enum('admin','shop','user') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_name`, `email`, `password`, `full_name`, `phone`, `email_verified_at`, `verify_code`, `verify_code_expired_at`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'nickphan', 'admin@gmail.com', '$2y$12$oJ24wnKE7EN9GTKMLxRrrOKFbf2OsHbwyekLp1BIZ8zCZB2sn3N6K', 'Thế Quang', '0937027877', NULL, NULL, NULL, 'admin', NULL, '2025-03-13 19:17:08', '2025-03-13 19:17:08'),
(2, NULL, 'admin99@gmail.com', '$2y$12$lcAH1Ii0BaWJoe4HPI/H6.FVjvut2GwmVzq5VVhhlNuokdpJkQ5ga', NULL, NULL, NULL, 'eWXhQetMEJshagzAiMpfdhHwZG96B81h3WIDdt7ht8f9J44M23aKUhiAKUOX', '2025-03-17 11:40:08', 'user', NULL, '2025-03-13 23:27:14', '2025-03-17 11:25:08'),
(3, 'S2F8v5ct', 'admin999@gmail.com', '$2y$12$PuOdzhSCiuiIGYBDAIbAz.tzSMMwZ5PpVdeGBKkpdqTkYQyviIC6.', NULL, NULL, NULL, 'ftBd4Ib6NQxezQOCeZ497EjEzLeMAz7kWMIX1ddhvmO6aA8HIFHVeX0a9RQ6', '2025-03-17 11:44:39', 'user', NULL, '2025-03-14 01:30:09', '2025-03-17 11:29:39'),
(22, '5Zvkckfo', 'phanquang180918@gmail.com', '$2y$12$pWJZ0TW2x6Bz.95xfVr8v.9XhpjJCc.o1TDdwY09vz46oYagki7wG', NULL, NULL, NULL, 'MvBf8Qbjnf72KODpKXampad8PTUBmYlgjED9PkPUPiQxKdYA1MlHLWrbbe29', '2025-03-18 11:04:56', 'user', NULL, '2025-03-17 07:34:19', '2025-03-18 10:49:56'),
(23, 'GnEg4O6F', 'trinhdomg114@gmail.com', '$2y$12$RfdYLZpTujT.gG4g7T.rkumAmc730sDShz8vGLNFjyOw3X7DUoG.2', NULL, NULL, NULL, NULL, NULL, 'user', NULL, '2025-03-17 08:18:33', '2025-03-17 08:18:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `attributes_name_unique` (`name`),
  ADD UNIQUE KEY `attributes_slug_unique` (`slug`);

--
-- Indexes for table `attribute_values`
--
ALTER TABLE `attribute_values`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `attribute_values_slug_unique` (`slug`),
  ADD KEY `attribute_values_attribute_id_foreign` (`attribute_id`);

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `brands_name_unique` (`name`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`),
  ADD KEY `categories_parent_id_foreign` (`parent_id`);

--
-- Indexes for table `category_product`
--
ALTER TABLE `category_product`
  ADD PRIMARY KEY (`product_id`,`category_id`),
  ADD KEY `category_product_category_id_foreign` (`category_id`);

--
-- Indexes for table `email_verifications`
--
ALTER TABLE `email_verifications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_verifications_email_unique` (`email`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_slug_unique` (`slug`),
  ADD KEY `products_shop_id_foreign` (`shop_id`),
  ADD KEY `products_brand_id_foreign` (`brand_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_images_product_id_foreign` (`product_id`);

--
-- Indexes for table `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_reviews_product_id_foreign` (`product_id`),
  ADD KEY `product_reviews_user_id_foreign` (`user_id`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_variants_sku_unique` (`sku`),
  ADD KEY `product_variants_product_id_foreign` (`product_id`);

--
-- Indexes for table `product_variant_attributes`
--
ALTER TABLE `product_variant_attributes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_variant_attributes_product_variant_id_foreign` (`product_variant_id`),
  ADD KEY `product_variant_attributes_attribute_id_foreign` (`attribute_id`),
  ADD KEY `product_variant_attributes_attribute_value_id_foreign` (`attribute_value_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `shops`
--
ALTER TABLE `shops`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `shops_shop_name_unique` (`shop_name`),
  ADD KEY `shops_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_username_unique` (`user_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attributes`
--
ALTER TABLE `attributes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attribute_values`
--
ALTER TABLE `attribute_values`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=175;

--
-- AUTO_INCREMENT for table `email_verifications`
--
ALTER TABLE `email_verifications`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_reviews`
--
ALTER TABLE `product_reviews`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_variant_attributes`
--
ALTER TABLE `product_variant_attributes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shops`
--
ALTER TABLE `shops`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attribute_values`
--
ALTER TABLE `attribute_values`
  ADD CONSTRAINT `attribute_values_attribute_id_foreign` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `category_product`
--
ALTER TABLE `category_product`
  ADD CONSTRAINT `category_product_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `category_product_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `products_shop_id_foreign` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD CONSTRAINT `product_reviews_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_variant_attributes`
--
ALTER TABLE `product_variant_attributes`
  ADD CONSTRAINT `product_variant_attributes_attribute_id_foreign` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_variant_attributes_attribute_value_id_foreign` FOREIGN KEY (`attribute_value_id`) REFERENCES `attribute_values` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_variant_attributes_product_variant_id_foreign` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `shops`
--
ALTER TABLE `shops`
  ADD CONSTRAINT `shops_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
