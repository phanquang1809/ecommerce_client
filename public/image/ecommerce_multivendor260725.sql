-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 26, 2025 at 01:36 PM
-- Server version: 8.0.30
-- PHP Version: 8.3.22

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
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `customer_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_phone_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `province` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `district` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ward` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `user_id`, `customer_name`, `customer_phone_number`, `address`, `province`, `district`, `ward`, `is_default`, `created_at`, `updated_at`) VALUES
(3, 41, 'Pía', '0937027877', '117 Tổ 5, KP Khánh Thạnh', 'Bình Dương', 'Tân Uyên', 'Tân Phước Khánh', 1, '2025-07-16 19:06:01', '2025-07-16 19:06:01'),
(4, 43, 'wj2RxHFf', '0902323234', '19', 'Thành phố Hà Nội', 'Quận Hoàn Kiếm', 'Phường Hàng Mã', 1, '2025-07-21 04:27:36', '2025-07-21 04:27:36'),
(8, 40, 'Thế Quang', '0937027877', '111', 'Thành phố Hà Nội', 'Quận Đống Đa', 'Phường Ô Chợ Dừa', 1, '2025-07-26 06:21:45', '2025-07-26 06:34:16'),
(9, 40, 'Nick', '0901234567', '12', 'Tỉnh Lào Cai', 'Huyện Mường Khương', 'Xã Dìn Chin', 0, '2025-07-26 06:30:14', '2025-07-26 06:34:16'),
(10, 40, 'Yin', '0979279941', '12', 'Tỉnh Hà Giang', 'Huyện Mèo Vạc', 'Xã Pả Vi', 0, '2025-07-26 06:31:40', '2025-07-26 06:34:16'),
(12, 48, 'Thế Quang', '0937027877', '12', 'Thành phố Hà Nội', 'Quận Hoàn Kiếm', 'Phường Đồng Xuân', 1, '2025-07-26 09:45:22', '2025-07-26 09:45:22'),
(13, 49, 'Mio', '0936252525', '68 Hoàng Diệu', 'Thành phố Hồ Chí Minh', 'Quận 4', 'Phường 13', 1, '2025-07-26 10:25:08', '2025-07-26 10:25:08');

-- --------------------------------------------------------

--
-- Table structure for table `attributes`
--

CREATE TABLE `attributes` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('spec','variant') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_filter` tinyint NOT NULL DEFAULT '0',
  `can_add_new` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attributes`
--

INSERT INTO `attributes` (`id`, `name`, `slug`, `type`, `is_filter`, `can_add_new`, `created_at`, `updated_at`) VALUES
(1, 'Màu sắc', 'mau-sac', 'variant', 0, 0, NULL, '2025-07-11 07:02:21'),
(2, 'Kích thước', 'kich-thuoc', 'variant', 0, 0, NULL, NULL),
(3, 'Tình trạng', 'tinh-trang', 'variant', 0, 0, NULL, '2025-07-11 07:10:10'),
(4, 'Dung lượng', 'dung-luong', 'variant', 0, 0, NULL, NULL),
(5, 'Bảo hành', 'bao-hanh', 'variant', 0, 0, NULL, NULL),
(6, 'Phân loại', 'phan-loai', 'variant', 0, 0, NULL, NULL),
(7, 'Kiểu Switch', 'kieu-switch', 'variant', 0, 0, NULL, NULL),
(8, 'Đèn Led', 'den-led', 'variant', 0, 0, NULL, NULL),
(9, 'RAM', 'ram', 'spec', 0, 0, NULL, NULL),
(10, 'Camera trước', 'camera-truoc', 'spec', 0, 0, NULL, NULL),
(11, 'Chip xử lý', 'chip-xu-ly', 'spec', 0, 0, NULL, NULL),
(13, 'Thể loại game', 'the-loai-game', 'spec', 1, 0, '2025-07-11 09:41:02', '2025-07-11 09:41:02'),
(14, 'Dung lượng lưu trữ', 'dung-luong-luu-tru', 'spec', 1, 0, '2025-07-11 09:46:17', '2025-07-11 09:46:17'),
(15, 'Kích thước màn hình', 'kich-thuoc-man-hinh', 'spec', 0, 1, '2025-07-11 09:49:13', '2025-07-11 09:49:13'),
(16, 'Dung lượng pin', 'dung-luong-pin', 'spec', 0, 1, '2025-07-15 16:11:47', '2025-07-15 16:11:47'),
(17, 'Loại/ Công nghệ màn hình', 'loai-cong-nghe-man-hinh', 'spec', 0, 0, '2025-07-15 16:16:22', '2025-07-15 16:16:22'),
(18, 'Phụ kiện đi kèm', 'phu-kien-di-kem', 'spec', 0, 1, '2025-07-15 16:17:29', '2025-07-15 16:17:29'),
(20, 'Cổng sạc', 'cong-sac', 'spec', 0, 0, '2025-07-15 16:35:24', '2025-07-15 16:35:24'),
(23, 'Loại kết nối', 'loai-ket-noi', 'spec', 0, 0, '2025-07-16 08:00:09', '2025-07-16 08:00:09'),
(24, 'Loại phụ kiện', 'loai-phu-kien', 'spec', 0, 0, '2025-07-16 08:01:10', '2025-07-16 08:01:10'),
(25, 'Nền tảng tương thích', 'nen-tang-tuong-thich', 'spec', 0, 0, '2025-07-16 08:01:56', '2025-07-16 08:01:56'),
(26, 'Hạn bảo hành', 'han-bao-hanh', 'spec', 0, 0, '2025-07-16 08:03:02', '2025-07-16 08:03:02'),
(27, 'Loại bảo hành', 'loai-bao-hanh', 'spec', 0, 0, '2025-07-16 08:03:38', '2025-07-16 08:03:38');

-- --------------------------------------------------------

--
-- Table structure for table `attribute_category`
--

CREATE TABLE `attribute_category` (
  `id` bigint UNSIGNED NOT NULL,
  `attribute_id` bigint UNSIGNED NOT NULL,
  `category_id` bigint UNSIGNED NOT NULL,
  `display_order` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attribute_category`
--

INSERT INTO `attribute_category` (`id`, `attribute_id`, `category_id`, `display_order`) VALUES
(17, 15, 222, 0),
(18, 15, 261, 0),
(19, 15, 255, 0),
(20, 15, 258, 0),
(21, 14, 255, 0),
(22, 14, 265, 0),
(23, 14, 233, 0),
(24, 14, 236, 0),
(25, 13, 234, 0),
(26, 16, 222, 0),
(27, 16, 224, 0),
(28, 16, 230, 0),
(29, 17, 222, 0),
(30, 17, 282, 0),
(31, 17, 255, 0),
(32, 17, 256, 0),
(33, 18, 255, 0),
(34, 18, 256, 0),
(35, 18, 233, 0),
(36, 18, 265, 0),
(37, 20, 265, 0),
(38, 20, 282, 0),
(39, 20, 255, 0),
(40, 20, 256, 0),
(41, 23, 235, 0),
(42, 24, 235, 0),
(43, 25, 235, 0),
(44, 26, 235, 0),
(45, 27, 235, 0);

-- --------------------------------------------------------

--
-- Table structure for table `attribute_values`
--

CREATE TABLE `attribute_values` (
  `id` bigint UNSIGNED NOT NULL,
  `attribute_id` bigint UNSIGNED NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `shop_id` bigint UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attribute_values`
--

INSERT INTO `attribute_values` (`id`, `attribute_id`, `value`, `slug`, `created_at`, `updated_at`, `shop_id`) VALUES
(45, 3, 'Mới', 'moi', '2025-06-13 05:04:27', '2025-07-15 18:40:40', NULL),
(47, 3, 'Cũ', 'cu', '2025-06-13 06:28:44', '2025-07-15 18:40:40', NULL),
(49, 4, '256 GB', '256-gb', '2025-06-16 04:50:00', '2025-07-15 18:40:40', NULL),
(50, 4, '512 GB', '512-gb', '2025-06-16 04:50:00', '2025-07-15 18:40:40', NULL),
(51, 4, '1 TB', '1-tb', '2025-06-16 04:50:00', '2025-07-15 18:40:40', NULL),
(52, 4, '128 GB', '128-gb', '2025-06-16 05:28:40', '2025-07-15 18:40:40', NULL),
(53, 1, 'Ultramarine', 'ultramarine', '2025-06-17 07:18:46', '2025-07-15 18:40:40', NULL),
(54, 1, 'Natuaral Titan', 'natuaral-titan', '2025-06-17 07:18:46', '2025-07-15 18:40:40', NULL),
(57, 5, '3 Tháng', '3-thang', '2025-06-19 07:28:41', '2025-07-15 18:40:40', NULL),
(58, 5, '12 Tháng', '12-thang', '2025-06-19 07:28:41', '2025-07-15 18:40:40', NULL),
(59, 6, 'ASIA', 'asia', '2025-06-19 08:54:33', '2025-07-15 18:40:40', NULL),
(60, 6, 'EURO', 'euro', '2025-06-19 08:54:34', '2025-07-15 18:40:40', NULL),
(61, 6, 'USA', 'usa', '2025-06-19 08:54:34', '2025-07-15 18:40:40', NULL),
(62, 4, '1TB', '1tb', '2025-06-19 08:57:35', '2025-07-15 18:40:40', NULL),
(63, 6, 'Chính hãng', 'chinh-hang', '2025-06-19 08:57:35', '2025-07-15 18:40:40', NULL),
(64, 6, 'Nhập khẩu', 'nhap-khau', '2025-06-19 08:57:35', '2025-07-15 18:40:40', NULL),
(65, 1, 'Sky Blue', 'sky-blue', '2025-06-19 09:37:32', '2025-07-15 18:40:40', NULL),
(66, 1, 'Midnight', 'midnight', '2025-06-19 09:37:32', '2025-07-15 18:40:40', NULL),
(67, 1, 'Silver', 'silver', '2025-06-19 09:37:32', '2025-07-15 18:40:40', NULL),
(68, 1, 'Starlight', 'starlight', '2025-06-19 09:37:32', '2025-07-15 18:40:40', NULL),
(69, 6, 'Basic', 'basic', '2025-06-19 10:07:47', '2025-07-15 18:40:40', NULL),
(70, 6, 'Creator Combo', 'creator-combo', '2025-06-19 10:07:47', '2025-07-15 18:40:40', NULL),
(71, 7, 'Cherry Brown', 'cherry-brown', '2025-06-19 10:42:59', '2025-07-15 18:40:40', NULL),
(72, 8, 'Không ', 'khong', '2025-06-19 10:42:59', '2025-07-15 18:40:40', NULL),
(73, 8, 'RGB', 'rgb', '2025-06-19 10:42:59', '2025-07-15 18:40:40', NULL),
(74, 7, 'Cherry Silent Red', 'cherry-silent-red', '2025-06-19 10:42:59', '2025-07-15 18:40:40', NULL),
(75, 7, 'TTC Gold Pink', 'ttc-gold-pink', '2025-06-19 10:42:59', '2025-07-15 18:40:40', NULL),
(76, 7, 'TTC Speed Silver', 'ttc-speed-silver', '2025-06-19 10:42:59', '2025-07-15 18:40:40', NULL),
(77, 1, 'Pink', 'pink', '2025-06-20 06:07:10', '2025-07-15 18:40:40', NULL),
(81, 2, '55 inch', '55-inch', '2025-06-20 06:20:54', '2025-07-15 18:40:40', NULL),
(82, 2, '65 inch', '65-inch', '2025-06-20 06:20:54', '2025-07-15 18:40:40', NULL),
(83, 2, '77 inch', '77-inch', '2025-06-20 06:20:54', '2025-07-15 18:40:40', NULL),
(84, 2, '83 inch ', '83-inch', '2025-06-20 06:20:54', '2025-07-15 18:40:40', NULL),
(85, 2, '97 inch', '97-inch', '2025-06-20 06:20:54', '2025-07-15 18:40:40', NULL),
(86, 6, 'ASIAN', 'asian', '2025-06-23 05:20:29', '2025-07-15 18:40:40', NULL),
(87, 6, 'Xách tay', 'xach-tay', '2025-07-07 06:10:27', '2025-07-15 18:40:40', NULL),
(100, 13, 'Hành động', 'hanh-dong', '2025-07-11 09:41:02', '2025-07-15 18:40:40', NULL),
(101, 13, 'Nhập vai', 'nhap-vai', '2025-07-11 09:41:02', '2025-07-15 18:40:40', NULL),
(102, 13, 'Trưởng thành', 'truong-thanh', '2025-07-11 09:41:02', '2025-07-15 18:40:40', NULL),
(103, 13, 'Phiêu lưu', 'phieu-luu', '2025-07-11 09:41:02', '2025-07-15 18:40:40', NULL),
(104, 14, '128GB', '128gb', '2025-07-11 09:46:17', '2025-07-15 18:40:40', NULL),
(105, 14, '256GB', '256gb', '2025-07-11 09:46:17', '2025-07-15 18:40:40', NULL),
(106, 14, '512GB', '512gb', '2025-07-11 09:46:17', '2025-07-15 18:40:40', NULL),
(107, 14, '1TB', '1tb', '2025-07-11 09:46:17', '2025-07-15 18:40:40', NULL),
(108, 14, '2TB', '2tb', '2025-07-11 09:46:17', '2025-07-15 18:40:40', NULL),
(110, 14, '32GB', '32gb', '2025-07-11 09:46:17', '2025-07-15 18:40:40', NULL),
(111, 15, '5.5inches', '55inches', '2025-07-11 09:49:13', '2025-07-15 18:40:40', NULL),
(112, 15, '5.8inches', '58inches', '2025-07-11 09:49:13', '2025-07-15 18:40:40', NULL),
(113, 15, '6inches', '6inches', '2025-07-11 09:49:13', '2025-07-15 18:40:40', NULL),
(114, 15, '6.3inches', '63inches', '2025-07-11 09:49:13', '2025-07-15 18:40:40', NULL),
(115, 6, 'Snow Drift', 'snow-drift', '2025-07-12 08:26:52', '2025-07-15 18:40:40', NULL),
(116, 2, 'XS', 'xs', '2025-07-12 08:26:52', '2025-07-15 18:40:40', NULL),
(117, 2, 'S', 's', '2025-07-12 08:26:52', '2025-07-15 18:40:40', NULL),
(118, 2, 'M', 'm', '2025-07-12 08:26:52', '2025-07-15 18:40:40', NULL),
(119, 6, 'Sandshell', 'sandshell', '2025-07-12 08:26:52', '2025-07-15 18:40:40', NULL),
(120, 1, 'Xanh lá', 'xanh-la', '2025-07-13 10:56:45', '2025-07-15 18:40:40', NULL),
(121, 1, 'Xanh da trời', 'xanh-da-troi', '2025-07-13 10:56:45', '2025-07-15 18:40:40', NULL),
(122, 1, 'Hồng', 'hong', '2025-07-13 10:56:45', '2025-07-15 18:40:40', NULL),
(123, 1, 'Đen', 'den', '2025-07-13 10:56:45', '2025-07-15 18:40:40', NULL),
(124, 1, 'Vàng', 'vang', '2025-07-13 10:56:45', '2025-07-15 18:40:40', NULL),
(125, 16, '3349 mAh', '3349-mah', '2025-07-15 16:12:16', '2025-07-15 18:40:40', NULL),
(126, 17, 'OLED', 'oled', '2025-07-15 16:16:22', '2025-07-15 18:40:40', NULL),
(127, 17, 'LCD', 'lcd', '2025-07-15 16:16:22', '2025-07-15 18:40:40', NULL),
(128, 18, 'Không', 'khong', '2025-07-15 16:17:54', '2025-07-15 18:40:40', NULL),
(129, 18, 'Cáp, Sách hướng dẫn, Cây lấy sim', 'cap-sach-huong-dan-cay-lay-sim', '2025-07-15 16:32:47', '2025-07-15 18:40:40', 6),
(130, 20, 'Type-C', 'type-c', '2025-07-15 16:35:24', '2025-07-15 18:40:40', NULL),
(135, 18, 'Bộ nguồn, Dock, Dây Hdmi, Joycon - Grip, 2 Straps', 'bo-nguon-dock-day-hdmi-joycon-grip-2-straps', '2025-07-15 17:43:29', '2025-07-15 18:40:40', 6),
(141, 14, '64 GB', '64-gb', NULL, NULL, NULL),
(142, 1, 'GOLD', 'gold', '2025-07-16 07:54:20', '2025-07-16 07:54:20', NULL),
(143, 1, 'BLACK', 'black', '2025-07-16 07:54:21', '2025-07-16 07:54:21', NULL),
(144, 23, 'Type C', 'type-c', '2025-07-16 08:00:09', '2025-07-16 08:00:09', NULL),
(145, 23, 'HDMI', 'hdmi', '2025-07-16 08:00:09', '2025-07-16 08:00:09', NULL),
(146, 23, 'USB', 'usb', '2025-07-16 08:00:09', '2025-07-16 08:00:09', NULL),
(147, 23, 'Bluetooth', 'bluetooth', '2025-07-16 08:00:09', '2025-07-16 08:00:09', NULL),
(148, 24, 'Cần điều khiển', 'can-dieu-khien', '2025-07-16 08:01:10', '2025-07-16 08:01:10', NULL),
(149, 24, 'Tai nghe', 'tai-nghe', '2025-07-16 08:01:10', '2025-07-16 08:01:10', NULL),
(150, 24, 'Cáp', 'cap', '2025-07-16 08:01:10', '2025-07-16 08:01:10', NULL),
(151, 25, 'PC-Laptop', 'pc-laptop', '2025-07-16 08:01:56', '2025-07-16 08:01:56', NULL),
(152, 25, 'Điện thoại', 'dien-thoai', '2025-07-16 08:01:56', '2025-07-16 08:01:56', NULL),
(153, 25, 'Switch', 'switch', '2025-07-16 08:01:56', '2025-07-16 08:01:56', NULL),
(154, 25, 'Playstation', 'playstation', '2025-07-16 08:01:56', '2025-07-16 08:01:56', NULL),
(155, 25, 'Xbox', 'xbox', '2025-07-16 08:01:56', '2025-07-16 08:01:56', NULL),
(156, 25, 'Khác', 'khac', '2025-07-16 08:01:56', '2025-07-16 08:01:56', NULL),
(157, 26, '1 tháng', '1-thang', '2025-07-16 08:03:02', '2025-07-16 08:03:02', NULL),
(158, 26, '2 tháng', '2-thang', '2025-07-16 08:03:02', '2025-07-16 08:03:02', NULL),
(159, 26, '3 tháng', '3-thang', '2025-07-16 08:03:02', '2025-07-16 08:03:02', NULL),
(160, 26, '6 tháng', '6-thang', '2025-07-16 08:03:02', '2025-07-16 08:03:02', NULL),
(161, 26, '12 tháng', '12-thang', '2025-07-16 08:03:02', '2025-07-16 08:03:02', NULL),
(162, 27, 'Bảo hành nhà cung cấp', 'bao-hanh-nha-cung-cap', '2025-07-16 08:03:38', '2025-07-16 08:03:38', NULL),
(163, 27, 'Bảo hành nhà sản xuất', 'bao-hanh-nha-san-xuat', '2025-07-16 08:03:38', '2025-07-16 08:03:38', NULL),
(164, 27, 'Không bảo hành', 'khong-bao-hanh', '2025-07-16 08:03:38', '2025-07-16 08:03:38', NULL),
(165, 15, '16inches', '16inches', '2025-07-18 15:15:53', '2025-07-18 15:15:53', 8),
(166, 16, '90WHrs', '90whrs', '2025-07-18 15:16:07', '2025-07-18 15:16:07', 8),
(167, 15, '13.4Inches', '134inches', '2025-07-18 15:36:52', '2025-07-18 15:36:52', 8),
(168, 16, '70WHrs', '70whrs', '2025-07-18 15:37:03', '2025-07-18 15:37:03', 8),
(169, 16, '4-Cell 99.9 Battery (Whr)', '4-cell-999-battery-whr', '2025-07-18 15:43:19', '2025-07-18 15:43:19', 8),
(170, 16, '80Wh, 245W Slim Tip (3-pin)', '80wh-245w-slim-tip-3-pin', '2025-07-18 15:57:20', '2025-07-18 15:57:20', 8);

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
(1, 'Góp ý kiến', 'https://tiki.vn/khuyen-mai/tikivip-khach-hang-than-thiet?itm_campaign=HMP_YPD_TKA_BNA_UNK_ALL_ALL_UNK_UNK_UNK_TMSX.c424dd6e-7779-40d4-9d6e-c667a7460661&itm_medium=CPD&itm_source=tiki-ads&tmsx=c424dd6e-7779-40d4-9d6e-c667a7460661', '/image/banner1_tablet.png', '', '/image/banner1_mobi.png', NULL, NULL),
(2, 'Góp ý kiến', 'https://tiki.vn/khuyen-mai/cong-nghe-gia-hoi?itm_campaign=HMP_YPD_TKA_BNA_UNK_ALL_ALL_UNK_UNK_UNK_TMSX.bd02a6f7-cd6a-4c04-a3f8-0f3ca9c3f880&itm_medium=CPD&itm_source=tiki-ads&tmsx=bd02a6f7-cd6a-4c04-a3f8-0f3ca9c3f880', '/image/banner2_tablet.png', '', '/image/banner2_mobi.png', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `media_file_id` bigint UNSIGNED DEFAULT NULL,
  `shop_id` bigint UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`, `slug`, `description`, `status`, `created_at`, `updated_at`, `media_file_id`, `shop_id`) VALUES
(1, 'Apple', 'apple', NULL, 'active', '2025-07-15 08:55:51', '2025-07-15 08:55:51', 933, NULL),
(2, 'Sony', 'sony', NULL, 'active', '2025-07-15 09:07:12', '2025-07-15 09:07:12', 934, NULL),
(3, 'Nintendo Switch', 'nintendo-switch', NULL, 'active', '2025-07-15 10:16:56', '2025-07-15 10:16:56', 935, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `brand_category`
--

CREATE TABLE `brand_category` (
  `brand_id` bigint UNSIGNED NOT NULL,
  `category_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brand_category`
--

INSERT INTO `brand_category` (`brand_id`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 220, '2025-07-15 08:55:51', '2025-07-15 08:55:51'),
(1, 222, '2025-07-15 08:55:51', '2025-07-15 08:55:51'),
(1, 230, '2025-07-15 08:55:51', '2025-07-15 08:55:51'),
(2, 220, '2025-07-15 09:07:13', '2025-07-15 09:07:13'),
(2, 223, '2025-07-15 09:07:13', '2025-07-15 09:07:13'),
(2, 224, '2025-07-15 09:07:13', '2025-07-15 09:07:13'),
(2, 230, '2025-07-15 09:07:13', '2025-07-15 09:07:13'),
(3, 233, '2025-07-15 10:16:56', '2025-07-15 10:16:56'),
(3, 286, '2025-07-15 10:16:56', '2025-07-15 10:16:56');

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
('laravel_cache_0ct3AFdXUqgVFGFk', 'a:1:{s:11:\"valid_until\";i:1752816539;}', 1754026079),
('laravel_cache_0hBUNH4aCxkYcfb7', 'a:1:{s:11:\"valid_until\";i:1746355381;}', 1747564981),
('laravel_cache_0HfIBGbXMrTkLcaf', 'a:1:{s:11:\"valid_until\";i:1753093340;}', 1754301500),
('laravel_cache_0z8QMuvaKAmE3W4l', 'a:1:{s:11:\"valid_until\";i:1753093331;}', 1754302931),
('laravel_cache_1kgPdMYlrHIeqTkp', 'a:1:{s:11:\"valid_until\";i:1750682241;}', 1751891121),
('laravel_cache_1TAQGb4SeYJuqXfD', 'a:1:{s:11:\"valid_until\";i:1753071771;}', 1754280951),
('laravel_cache_2R6PZ8nrvOPI09Up', 'a:1:{s:11:\"valid_until\";i:1753519424;}', 1754729084),
('laravel_cache_36iLbkhcTHnuz38e', 'a:1:{s:11:\"valid_until\";i:1751019921;}', 1752229581),
('laravel_cache_3cfUckY41UCIg7uL', 'a:1:{s:11:\"valid_until\";i:1753527731;}', 1754737391),
('laravel_cache_3qkMFwu6zVteiAzG', 'a:1:{s:11:\"valid_until\";i:1753536854;}', 1754746514),
('laravel_cache_46GDBB17jSNLG8ta', 'a:1:{s:11:\"valid_until\";i:1749531446;}', 1750741106),
('laravel_cache_4k9Rz9Y3gzkxKCyd', 'a:1:{s:11:\"valid_until\";i:1746344204;}', 1747553864),
('laravel_cache_4nEyKApqEMQzWjwu', 'a:1:{s:11:\"valid_until\";i:1745132757;}', 1746342417),
('laravel_cache_4NGxGDSHU69XyZLJ', 'a:1:{s:11:\"valid_until\";i:1752680707;}', 1753890127),
('laravel_cache_4nQW1EpSDcmY4rUJ', 'a:1:{s:11:\"valid_until\";i:1753521609;}', 1754731089),
('laravel_cache_4SE4bjnNYy0yQFrK', 'a:1:{s:11:\"valid_until\";i:1753028842;}', 1754237002),
('laravel_cache_5csm89nMIDM2IMxO', 'a:1:{s:11:\"valid_until\";i:1745130501;}', 1746340101),
('laravel_cache_5P5yDZIZx95Ye8jj', 'a:1:{s:11:\"valid_until\";i:1749192736;}', 1750402336),
('laravel_cache_6xz6i0MuLQtULyS9', 'a:1:{s:11:\"valid_until\";i:1753527786;}', 1754737386),
('laravel_cache_8ESRlJLlQgHONa7H', 'a:1:{s:11:\"valid_until\";i:1746504999;}', 1747714479),
('laravel_cache_8VaEsbTDckhetqfC', 'a:1:{s:11:\"valid_until\";i:1753526130;}', 1754735310),
('laravel_cache_9AwovxWgjsBnZljJ', 'a:1:{s:11:\"valid_until\";i:1752386517;}', 1753596177),
('laravel_cache_9uxYzXdTyubQ6SFJ', 'a:1:{s:11:\"valid_until\";i:1752384535;}', 1753593895),
('laravel_cache_ab4uUOQfbkcXQq09', 'a:1:{s:11:\"valid_until\";i:1745063989;}', 1746273589),
('laravel_cache_AHDqK3HIK1myJQMR', 'a:1:{s:11:\"valid_until\";i:1753524905;}', 1754734565),
('laravel_cache_AKrunpV7CmOTxg0H', 'a:1:{s:11:\"valid_until\";i:1752680493;}', 1753890093),
('laravel_cache_aMKhoDuXKl0rmB6P', 'a:1:{s:11:\"valid_until\";i:1750394976;}', 1751604576),
('laravel_cache_AmLlhuKMVK9eesbA', 'a:1:{s:11:\"valid_until\";i:1752680277;}', 1753889877),
('laravel_cache_aRjTa76dUm8CUvnf', 'a:1:{s:11:\"valid_until\";i:1753251953;}', 1754460773),
('laravel_cache_asieK4gtZIuWRAaa', 'a:1:{s:11:\"valid_until\";i:1746247038;}', 1747456698),
('laravel_cache_AWLYJOWkTtHeSq6M', 'a:1:{s:11:\"valid_until\";i:1753342410;}', 1754550330),
('laravel_cache_AzOM6SKFEC0lb9DG', 'a:1:{s:11:\"valid_until\";i:1753526487;}', 1754735787),
('laravel_cache_b72Sg8DFyHsY86xn', 'a:1:{s:11:\"valid_until\";i:1753205521;}', 1754415181),
('laravel_cache_bgitOix2kKp0PM5F', 'a:1:{s:11:\"valid_until\";i:1753519568;}', 1754729228),
('laravel_cache_BQe6us4myIYIrxCH', 'a:1:{s:11:\"valid_until\";i:1753076179;}', 1754285839),
('laravel_cache_btQCmyC77uGEYISY', 'a:1:{s:11:\"valid_until\";i:1753525545;}', 1754735145),
('laravel_cache_bTvoZXYQb9TztAtu', 'a:1:{s:11:\"valid_until\";i:1745062561;}', 1746272221),
('laravel_cache_C0V9jzW8KhVdTrn9', 'a:1:{s:11:\"valid_until\";i:1753525343;}', 1754734583),
('laravel_cache_cE83iO49jkc2KyFg', 'a:1:{s:11:\"valid_until\";i:1752387526;}', 1753597186),
('laravel_cache_ckv2E5owbZXKHr4s', 'a:1:{s:11:\"valid_until\";i:1752851112;}', 1754060592),
('laravel_cache_CQYsGl6MijkT2esV', 'a:1:{s:11:\"valid_until\";i:1753509677;}', 1754719277),
('laravel_cache_cuJShq7R564y4QKU', 'a:1:{s:11:\"valid_until\";i:1746343222;}', 1747552882),
('laravel_cache_d9qpRHzKsaWd5xLI', 'a:1:{s:11:\"valid_until\";i:1745317778;}', 1746527318),
('laravel_cache_dbYEpH3RkGiKNQWz', 'a:1:{s:11:\"valid_until\";i:1750231298;}', 1751440958),
('laravel_cache_dfhIZdTxjKPfbgr8', 'a:1:{s:11:\"valid_until\";i:1752983580;}', 1754192580),
('laravel_cache_dhpAhzSxXdimfj5Q', 'a:1:{s:11:\"valid_until\";i:1753361770;}', 1754571190),
('laravel_cache_dI4Zj4blZX31YMoU', 'a:1:{s:11:\"valid_until\";i:1746342539;}', 1747551239),
('laravel_cache_DIaqPBvlPuFN6YLg', 'a:1:{s:11:\"valid_until\";i:1753522494;}', 1754732034),
('laravel_cache_dMg3lHBuQ4O296yN', 'a:1:{s:11:\"valid_until\";i:1752057361;}', 1753266901),
('laravel_cache_DtBfhiL6tRiQJsY9', 'a:1:{s:11:\"valid_until\";i:1753360807;}', 1754570467),
('laravel_cache_dVH6Is2CFcjXQdod', 'a:1:{s:11:\"valid_until\";i:1752389763;}', 1753598223),
('laravel_cache_dVs5cpGzp77zim17', 'a:1:{s:11:\"valid_until\";i:1746343176;}', 1747552836),
('laravel_cache_edwRqAJgEuuvVXQA', 'a:1:{s:11:\"valid_until\";i:1746444987;}', 1747654647),
('laravel_cache_efB0wHyIKHPThVlP', 'a:1:{s:11:\"valid_until\";i:1750231699;}', 1751440939),
('laravel_cache_eH8t0j90xDZiwzB1', 'a:1:{s:11:\"valid_until\";i:1752388539;}', 1753597239),
('laravel_cache_EuAm0nJvrHdYEEAj', 'a:1:{s:11:\"valid_until\";i:1753359707;}', 1754569007),
('laravel_cache_EvIHXosMQvQ5eXBq', 'a:1:{s:11:\"valid_until\";i:1746355577;}', 1747565117),
('laravel_cache_eyZCibXiaKZvlPX5', 'a:1:{s:11:\"valid_until\";i:1746269396;}', 1747478456),
('laravel_cache_f8EJVOzE1HaodG0v', 'a:1:{s:11:\"valid_until\";i:1753522326;}', 1754731686),
('laravel_cache_FGGUdynSk9Kdzt4u', 'a:1:{s:11:\"valid_until\";i:1747993198;}', 1749202858),
('laravel_cache_FTe7ENR7sTPhVMlO', 'a:1:{s:11:\"valid_until\";i:1745137285;}', 1746346945),
('laravel_cache_FTicP5brR3ziR8A4', 'a:1:{s:11:\"valid_until\";i:1753536882;}', 1754746542),
('laravel_cache_Fzgg5QVO7APHQLA2', 'a:1:{s:11:\"valid_until\";i:1753191225;}', 1754400885),
('laravel_cache_G9eMnbMxu5idsEjA', 'a:1:{s:11:\"valid_until\";i:1753351842;}', 1754560902),
('laravel_cache_gaf7G4FZB6OGtG3U', 'a:1:{s:11:\"valid_until\";i:1753509513;}', 1754719113),
('laravel_cache_GAmT2TSGDiEVYBlz', 'a:1:{s:11:\"valid_until\";i:1752985224;}', 1754193324),
('laravel_cache_gIOdPfHMtQrexPMr', 'a:1:{s:11:\"valid_until\";i:1753353355;}', 1754562655),
('laravel_cache_gscNmiFuRIQBZCJM', 'a:1:{s:11:\"valid_until\";i:1746440233;}', 1747649893),
('laravel_cache_GtNbWSUvY7EsHJab', 'a:1:{s:11:\"valid_until\";i:1753526820;}', 1754736420),
('laravel_cache_gWBKyj9FX93xr9Te', 'a:1:{s:11:\"valid_until\";i:1746343731;}', 1747552911),
('laravel_cache_HeQFwgbFhTJpNOXD', 'a:1:{s:11:\"valid_until\";i:1745137221;}', 1746346881),
('laravel_cache_Hjmga1NtYKO6kqEF', 'a:1:{s:11:\"valid_until\";i:1750232331;}', 1751441391),
('laravel_cache_hOKuNhyGYeWSPu0w', 'a:1:{s:11:\"valid_until\";i:1753191196;}', 1754399956),
('laravel_cache_hTI1H8VYZGkdmgt7', 'a:1:{s:11:\"valid_until\";i:1745137189;}', 1746346849),
('laravel_cache_hV6szWRpVmO14es0', 'a:1:{s:11:\"valid_until\";i:1752392675;}', 1753602335),
('laravel_cache_hzMGRtkfN2WiZWXe', 'a:1:{s:11:\"valid_until\";i:1752680874;}', 1753890474),
('laravel_cache_i0Sadyqb8ECcgXH5', 'a:1:{s:11:\"valid_until\";i:1745137201;}', 1746346861),
('laravel_cache_i9CyrMStEZOrmtYy', 'a:1:{s:11:\"valid_until\";i:1752816407;}', 1754024387),
('laravel_cache_IdNWkx2SDhHyMz9F', 'a:1:{s:11:\"valid_until\";i:1752387024;}', 1753596264),
('laravel_cache_iGJ64zfJpwGB6A68', 'a:1:{s:11:\"valid_until\";i:1752692765;}', 1753902245),
('laravel_cache_imFZk60Qq2IJ37kb', 'a:1:{s:11:\"valid_until\";i:1745132701;}', 1746341521),
('laravel_cache_ip4Szk4jq8PppW9N', 'a:1:{s:11:\"valid_until\";i:1753520922;}', 1754730282),
('laravel_cache_ipDBKhccQx7bLyES', 'a:1:{s:11:\"valid_until\";i:1753524882;}', 1754734302),
('laravel_cache_IQUiELTwvlMrN9bz', 'a:1:{s:11:\"valid_until\";i:1750395181;}', 1751604661),
('laravel_cache_Ivyt9Po1zwsdx9Do', 'a:1:{s:11:\"valid_until\";i:1753521445;}', 1754731045),
('laravel_cache_JB0ons17h5DLHcUy', 'a:1:{s:11:\"valid_until\";i:1746344229;}', 1747553889),
('laravel_cache_jExb6goPQuituIgD', 'a:1:{s:11:\"valid_until\";i:1752387362;}', 1753596842),
('laravel_cache_jhLHtaspFUklBE4i', 'a:1:{s:11:\"valid_until\";i:1752387198;}', 1753596798),
('laravel_cache_jvFxbXYOqMoH6LU1', 'a:1:{s:11:\"valid_until\";i:1751602179;}', 1752811239),
('laravel_cache_JXQKXbLBwjvzu5Qq', 'a:1:{s:11:\"valid_until\";i:1745062467;}', 1746272067),
('laravel_cache_k1IzokLBGwt27QKU', 'a:1:{s:11:\"valid_until\";i:1753191209;}', 1754400869),
('laravel_cache_k6P1NWD6L7De1m5e', 'a:1:{s:11:\"valid_until\";i:1752383955;}', 1753593015),
('laravel_cache_KAoAnekiBWPxx6gC', 'a:1:{s:11:\"valid_until\";i:1753536828;}', 1754746488),
('laravel_cache_KIZ1CIJnbs2cg3Ef', 'a:1:{s:11:\"valid_until\";i:1753078968;}', 1754287728),
('laravel_cache_kmpPA6oxFHuqM9g0', 'a:1:{s:11:\"valid_until\";i:1752210579;}', 1753419399),
('laravel_cache_Kq0lxm3VbTUH3ezF', 'a:1:{s:11:\"valid_until\";i:1751020636;}', 1752229576),
('laravel_cache_kqdOnUjlvxp6moGc', 'a:1:{s:11:\"valid_until\";i:1745137154;}', 1746345314),
('laravel_cache_KZDPWbeo4Th8YsNU', 'a:1:{s:11:\"valid_until\";i:1752138042;}', 1753347522),
('laravel_cache_L0Scebo03suLR1nC', 'a:1:{s:11:\"valid_until\";i:1752384247;}', 1753593607),
('laravel_cache_ldtuq1bbf62BP3Tw', 'a:1:{s:11:\"valid_until\";i:1746426090;}', 1747635750),
('laravel_cache_LhAEOk5gXZp3oO1R', 'a:1:{s:11:\"valid_until\";i:1747992977;}', 1749202637),
('laravel_cache_lhui0hhbyoPifmaX', 'a:1:{s:11:\"valid_until\";i:1752680819;}', 1753890359),
('laravel_cache_lO73AnAlFbpRGHby', 'a:1:{s:11:\"valid_until\";i:1753203203;}', 1754411783),
('laravel_cache_lppznPml3XOYsk7x', 'a:1:{s:11:\"valid_until\";i:1747046717;}', 1748256197),
('laravel_cache_LRqamkNMBMorAPKS', 'a:1:{s:11:\"valid_until\";i:1750317357;}', 1751527017),
('laravel_cache_lx9Fk11PCIMu5cDn', 'a:1:{s:11:\"valid_until\";i:1752387476;}', 1753597136),
('laravel_cache_lyjLodhqZKZpkD2Y', 'a:1:{s:11:\"valid_until\";i:1752384576;}', 1753594236),
('laravel_cache_m3Ui8KY0VRYcqUZn', 'a:1:{s:11:\"valid_until\";i:1750393015;}', 1751601835),
('laravel_cache_M4i5Z9lv79AhUBAe', 'a:1:{s:11:\"valid_until\";i:1747046480;}', 1748256140),
('laravel_cache_MbW8d3LapQmLX9XG', 'a:1:{s:11:\"valid_until\";i:1750395196;}', 1751604856),
('laravel_cache_MgCVJjbIf47O6iO6', 'a:1:{s:11:\"valid_until\";i:1753521130;}', 1754730610),
('laravel_cache_mvsvSDopZvq4OY0N', 'a:1:{s:11:\"valid_until\";i:1753341033;}', 1754549433),
('laravel_cache_N4I1rDahUftdXUJL', 'a:1:{s:11:\"valid_until\";i:1750317200;}', 1751526860),
('laravel_cache_npkXJQmKlLaHcrMT', 'a:1:{s:11:\"valid_until\";i:1747046514;}', 1748256174),
('laravel_cache_nu5yWSm1NozwdGMg', 'a:1:{s:11:\"valid_until\";i:1745135661;}', 1746344721),
('laravel_cache_nZ0yhA6NoiqqkKlO', 'a:1:{s:11:\"valid_until\";i:1753536841;}', 1754746501),
('laravel_cache_ocCJYQcYa80oi2CO', 'a:1:{s:11:\"valid_until\";i:1751090170;}', 1752299770),
('laravel_cache_OeBBmWkMei7tEK5j', 'a:1:{s:11:\"valid_until\";i:1749193053;}', 1750402713),
('laravel_cache_oFezUoxpelKSEimo', 'a:1:{s:11:\"valid_until\";i:1753526515;}', 1754736175),
('laravel_cache_OGi9Bbah7PKfXmY2', 'a:1:{s:11:\"valid_until\";i:1753359373;}', 1754567533),
('laravel_cache_Om2pZM14bl1ccAGC', 'a:1:{s:11:\"valid_until\";i:1752388548;}', 1753598208),
('laravel_cache_oTafsZ6yqmvIetd8', 'a:1:{s:11:\"valid_until\";i:1747993182;}', 1749202722),
('laravel_cache_oWRJEiLGDsMIDa9Q', 'a:1:{s:11:\"valid_until\";i:1753335581;}', 1754543621),
('laravel_cache_phB3VZQ4cwHWQBTi', 'a:1:{s:11:\"valid_until\";i:1752386620;}', 1753596280),
('laravel_cache_PHpI7T2PZoDuh2UL', 'a:1:{s:11:\"valid_until\";i:1752393060;}', 1753602360),
('laravel_cache_Ppc4GqL5hYkoaNEa', 'a:1:{s:11:\"valid_until\";i:1753519547;}', 1754729087),
('laravel_cache_PQVrzSMZdJJbfYo8', 'a:1:{s:11:\"valid_until\";i:1753028866;}', 1754238526),
('laravel_cache_pRhuDa7QYYNAgdAP', 'a:1:{s:11:\"valid_until\";i:1750235924;}', 1751445584),
('laravel_cache_PwO9FEcjl6GCGf1Q', 'a:1:{s:11:\"valid_until\";i:1748846271;}', 1750055271),
('laravel_cache_q77v6akoeCN7edkB', 'a:1:{s:11:\"valid_until\";i:1752561859;}', 1753769899),
('laravel_cache_QixmLMnPEEJPl0XA', 'a:1:{s:11:\"valid_until\";i:1749193039;}', 1750402399),
('laravel_cache_R45HBOojNCrCC1di', 'a:1:{s:11:\"valid_until\";i:1747120317;}', 1748329857),
('laravel_cache_r4ObyC2ggcoYU1F7', 'a:1:{s:11:\"valid_until\";i:1752680447;}', 1753889927),
('laravel_cache_rbVuLmjEm2qwqMRI', 'a:1:{s:11:\"valid_until\";i:1752387470;}', 1753597130),
('laravel_cache_serR1h86Pji6Gc39', 'a:1:{s:11:\"valid_until\";i:1747993035;}', 1749202635),
('laravel_cache_sjmGIIjeqFTFqTLG', 'a:1:{s:11:\"valid_until\";i:1753351218;}', 1754559858),
('laravel_cache_SpfuffhxnWVMfRB8', 'a:1:{s:11:\"valid_until\";i:1747046528;}', 1748256188),
('laravel_cache_spm23Xs8JtNVHI9N', 'a:1:{s:11:\"valid_until\";i:1753351821;}', 1754560401),
('laravel_cache_sTha7cv8ojCMK1MG', 'a:1:{s:11:\"valid_until\";i:1749444210;}', 1750653870),
('laravel_cache_sVVudoidfM3e63nG', 'a:1:{s:11:\"valid_until\";i:1753509703;}', 1754719363),
('laravel_cache_SXmBgh8ym7D5X0p4', 'a:1:{s:11:\"valid_until\";i:1753521705;}', 1754731365),
('laravel_cache_tCISABVAQ7h64GqI', 'a:1:{s:11:\"valid_until\";i:1753536930;}', 1754746530),
('laravel_cache_tDTbVlf4KDDLcd8U', 'a:1:{s:11:\"valid_until\";i:1753511703;}', 1754721183),
('laravel_cache_TpONkPkr7ieIUnkB', 'a:1:{s:11:\"valid_until\";i:1752386551;}', 1753596211),
('laravel_cache_tVhwgZp9Ytxcwgnq', 'a:1:{s:11:\"valid_until\";i:1753352985;}', 1754561505),
('laravel_cache_tX88o546LUJZurzU', 'a:1:{s:11:\"valid_until\";i:1749444229;}', 1750653889),
('laravel_cache_TZQPy9Fnu532VWZU', 'a:1:{s:11:\"valid_until\";i:1746445026;}', 1747654686),
('laravel_cache_uDpyI50vLNWP1Kyh', 'a:1:{s:11:\"valid_until\";i:1752834233;}', 1754043593),
('laravel_cache_uGydsBBjgeykwuFR', 'a:1:{s:11:\"valid_until\";i:1747046504;}', 1748256164),
('laravel_cache_uJzofwkRqtTHziRc', 'a:1:{s:11:\"valid_until\";i:1751102349;}', 1752311709),
('laravel_cache_UO9O2PG4cjgc10pu', 'a:1:{s:11:\"valid_until\";i:1749531429;}', 1750740969),
('laravel_cache_UsAgmZYcxirbAluJ', 'a:1:{s:11:\"valid_until\";i:1749547945;}', 1750757605),
('laravel_cache_uTtyp8kOzv3JA945', 'a:1:{s:11:\"valid_until\";i:1751090090;}', 1752299690),
('laravel_cache_UYzOmTW4uFTb4tAS', 'a:1:{s:11:\"valid_until\";i:1753030275;}', 1754238675),
('laravel_cache_VDE85qYTScQkvz7x', 'a:1:{s:11:\"valid_until\";i:1752833158;}', 1754042458),
('laravel_cache_vHKatJj9O20peGz1', 'a:1:{s:11:\"valid_until\";i:1753509428;}', 1754718548),
('laravel_cache_vmE5rKVrnVknrk8C', 'a:1:{s:11:\"valid_until\";i:1751019906;}', 1752227886),
('laravel_cache_vQilLE4qt4qAuT3Z', 'a:1:{s:11:\"valid_until\";i:1745063932;}', 1746272392),
('laravel_cache_vSgeACxvJeCNcB4s', 'a:1:{s:11:\"valid_until\";i:1751108718;}', 1752318018),
('laravel_cache_VYomNhwNPhhojqXx', 'a:1:{s:11:\"valid_until\";i:1753360799;}', 1754570459),
('laravel_cache_w3qZqpFqgZhdJ5Nl', 'a:1:{s:11:\"valid_until\";i:1750393041;}', 1751602701),
('laravel_cache_W6HAFe0vdyComwdO', 'a:1:{s:11:\"valid_until\";i:1753525448;}', 1754735108),
('laravel_cache_wbJezGkpY1yaSGjn', 'a:1:{s:11:\"valid_until\";i:1752386463;}', 1753594383),
('laravel_cache_WLJDsmyPB7EBKku9', 'a:1:{s:11:\"valid_until\";i:1752680213;}', 1753888973),
('laravel_cache_WsinHmLFSisRLEtw', 'a:1:{s:11:\"valid_until\";i:1746343150;}', 1747552210),
('laravel_cache_WYqk4NI28qCpwK9S', 'a:1:{s:11:\"valid_until\";i:1752681015;}', 1753890555),
('laravel_cache_WZ4lG7j4WQ6Njf02', 'a:1:{s:11:\"valid_until\";i:1752693536;}', 1753902416),
('laravel_cache_xdFRYAbKT8UAqz6c', 'a:1:{s:11:\"valid_until\";i:1753509607;}', 1754719147),
('laravel_cache_xJZtCjxI8YXcN61e', 'a:1:{s:11:\"valid_until\";i:1749543911;}', 1750753151),
('laravel_cache_xTxMdyUsMrVGMKrA', 'a:1:{s:11:\"valid_until\";i:1752692582;}', 1753901822),
('laravel_cache_xV6FdJEavwrrIo5F', 'a:1:{s:11:\"valid_until\";i:1745137237;}', 1746346897),
('laravel_cache_Y2ShN7IgeE9sEg3C', 'a:1:{s:11:\"valid_until\";i:1746445273;}', 1747654693),
('laravel_cache_Y3TecTpj4dJpVO0k', 'a:1:{s:11:\"valid_until\";i:1750392016;}', 1751601616),
('laravel_cache_yae8AL0DvfDoAbBZ', 'a:1:{s:11:\"valid_until\";i:1745130447;}', 1746340107),
('laravel_cache_YaGJu5H2MLJ56P6X', 'a:1:{s:11:\"valid_until\";i:1753028998;}', 1754238598),
('laravel_cache_z2GMbDNfhTfaihl3', 'a:1:{s:11:\"valid_until\";i:1752137841;}', 1753345761),
('laravel_cache_zAqvKJnBiBaghb4E', 'a:1:{s:11:\"valid_until\";i:1753525650;}', 1754735190),
('laravel_cache_ZTZr5mVjlmUr94eW', 'a:1:{s:11:\"valid_until\";i:1753527842;}', 1754736482),
('laravel_cache_ZuyEnxcGcWaXj5kx', 'a:1:{s:11:\"valid_until\";i:1753299381;}', 1754507721),
('laravel_cache_zvX1deTkedg07AB3', 'a:1:{s:11:\"valid_until\";i:1746355611;}', 1747565271),
('laravel_cache_zykvua68ED8qoCg6', 'a:1:{s:11:\"valid_until\";i:1752983662;}', 1754193262);

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
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `shop_id` bigint UNSIGNED NOT NULL,
  `product_variant_id` bigint UNSIGNED NOT NULL,
  `unit_price_at_time` decimal(15,2) NOT NULL,
  `quantity` int UNSIGNED NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `user_id`, `shop_id`, `product_variant_id`, `unit_price_at_time`, `quantity`, `created_at`, `updated_at`) VALUES
(136, 43, 6, 371, 19500000.00, 0, '2025-07-21 04:29:37', '2025-07-21 04:31:03'),
(147, 43, 6, 377, 19500000.00, 0, '2025-07-21 16:58:37', '2025-07-21 17:00:24'),
(150, 43, 6, 372, 20500000.00, 0, '2025-07-21 17:08:28', '2025-07-21 17:13:05'),
(151, 43, 6, 378, 20500000.00, 0, '2025-07-21 17:10:35', '2025-07-21 17:11:26'),
(156, 43, 6, 384, 20500000.00, 0, '2025-07-21 17:14:49', '2025-07-21 17:16:00'),
(159, 43, 6, 373, 21500000.00, 0, '2025-07-21 17:20:46', '2025-07-21 17:24:22');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` bigint UNSIGNED DEFAULT NULL,
  `slug` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `sort_order` int NOT NULL DEFAULT '99',
  `media_file_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `parent_id`, `slug`, `status`, `sort_order`, `media_file_id`, `created_at`, `updated_at`) VALUES
(219, 'Đồ chơi - Mẹ & Bé', NULL, NULL, 'do-choi-me-be', 'active', 7, 897, '2025-07-11 11:01:09', '2025-07-12 06:37:00'),
(220, 'Thiết Bị Âm Thanh', NULL, NULL, 'thiet-bi-am-thanh', 'active', 4, 899, '2025-07-11 11:01:56', '2025-07-12 06:36:59'),
(221, 'Thiết Bị Điện Gia Dụng', NULL, NULL, 'thiet-bi-dien-gia-dung', 'active', 2, 911, '2025-07-11 11:03:14', '2025-07-12 06:36:59'),
(222, 'Laptop & Máy Tính', NULL, NULL, 'laptop-may-tinh', 'active', 6, 106, '2025-07-11 11:04:20', '2025-07-12 06:37:00'),
(223, 'Gaming & Console', NULL, NULL, 'gaming-console', 'active', 14, 112, '2025-07-12 04:30:00', '2025-07-12 06:56:08'),
(224, 'Máy Ảnh & Máy Quay Phim', NULL, NULL, 'may-anh-may-quay-phim', 'active', 1, 903, '2025-07-12 04:32:47', '2025-07-12 06:57:42'),
(225, 'Nhà Cửa & Đời Sống', NULL, NULL, 'nha-cua-doi-song', 'active', 5, 904, '2025-07-12 04:39:39', '2025-07-12 06:36:59'),
(226, 'Ô Tô - Xe Máy - Xe Đạp', NULL, NULL, 'o-to-xe-may-xe-dap', 'active', 3, 905, '2025-07-12 04:47:28', '2025-07-12 06:36:59'),
(227, 'Đồng hồ - Trang sức', NULL, NULL, 'dong-ho-trang-suc', 'active', 8, 107, '2025-07-12 04:50:35', '2025-07-12 06:37:00'),
(228, 'Thực Phẩm & Đồ Uống', NULL, NULL, 'thuc-pham-do-uong', 'active', 9, 908, '2025-07-12 04:58:49', '2025-07-12 06:37:00'),
(229, 'Chăm sóc thú cưng', NULL, NULL, 'cham-soc-thu-cung', 'active', 10, 909, '2025-07-12 05:01:21', '2025-07-12 06:37:00'),
(230, 'Điện thoại & Phụ kiện', NULL, NULL, 'dien-thoai-phu-kien', 'active', 11, 910, '2025-07-12 05:03:25', '2025-07-12 06:37:00'),
(231, 'Sắc Đẹp', NULL, NULL, 'sac-dep', 'active', 12, 912, '2025-07-12 05:16:42', '2025-07-12 06:37:00'),
(232, 'Sức khỏe', NULL, NULL, 'suc-khoe', 'active', 13, 913, '2025-07-12 05:20:38', '2025-07-12 06:37:00'),
(233, 'Máy chơi game', NULL, 223, 'may-choi-game', 'active', 1, NULL, '2025-07-12 05:51:13', '2025-07-12 07:01:35'),
(234, 'Video Games', NULL, 223, 'video-games', 'active', 8, NULL, '2025-07-12 05:53:20', '2025-07-12 06:38:04'),
(235, 'Phụ kiện console', NULL, 223, 'phu-kien-console', 'active', 6, NULL, '2025-07-12 05:54:14', '2025-07-12 06:38:04'),
(236, 'Máy ảnh', NULL, 224, 'may-anh', 'active', 2, NULL, '2025-07-12 05:55:57', '2025-07-12 06:38:04'),
(237, 'Camera giám sát', NULL, 224, 'camera-giam-sat', 'active', 3, NULL, '2025-07-12 05:56:28', '2025-07-12 06:38:04'),
(238, 'Flycam', NULL, 224, 'flycam', 'active', 4, NULL, '2025-07-12 05:56:42', '2025-07-12 06:38:04'),
(239, 'Phụ kiện Flycam', NULL, 224, 'phu-kien-flycam', 'active', 5, NULL, '2025-07-12 05:57:11', '2025-07-12 06:38:04'),
(240, 'Nội thất', NULL, 225, 'noi-that', 'active', 7, NULL, '2025-07-12 05:57:27', '2025-07-12 06:38:04'),
(241, 'Dụng cụ nhà bếp', NULL, 225, 'dung-cu-nha-bep', 'active', 9, NULL, '2025-07-12 05:57:43', '2025-07-12 06:38:04'),
(242, 'Trang trí nhà cửa', NULL, 225, 'trang-tri-nha-cua', 'active', 10, NULL, '2025-07-12 05:57:58', '2025-07-12 06:38:04'),
(243, 'Chăn ga gối nệm', NULL, 225, 'chan-ga-goi-nem', 'active', 3, NULL, '2025-07-12 05:58:09', '2025-07-12 06:38:13'),
(244, 'Xe gắn máy', NULL, 226, 'xe-gan-may', 'active', 1, NULL, '2025-07-12 05:58:42', '2025-07-12 06:38:13'),
(245, 'Xe đạp', NULL, 226, 'xe-dap', 'active', 2, NULL, '2025-07-12 05:58:49', '2025-07-12 06:38:13'),
(246, 'Phụ kiện ô tô', NULL, 226, 'phu-kien-o-to', 'active', 4, NULL, '2025-07-12 05:58:58', '2025-07-12 06:38:13'),
(247, 'Mũ bảo hiểm & Phụ kiện', NULL, 226, 'mu-bao-hiem-phu-kien', 'active', 5, NULL, '2025-07-12 05:59:20', '2025-07-12 06:38:13'),
(248, 'Thức ăn cho thú cưng', NULL, 229, 'thuc-an-cho-thu-cung', 'active', 6, NULL, '2025-07-12 06:00:08', '2025-07-12 06:38:13'),
(249, 'Phụ kiện cho thú cưng', NULL, 229, 'phu-kien-cho-thu-cung', 'active', 7, NULL, '2025-07-12 06:00:57', '2025-07-12 06:38:13'),
(250, 'Tai nghe nhét tai & chụp tai', NULL, 220, 'tai-nghe-nhet-tai-chup-tai', 'active', 8, NULL, '2025-07-12 06:07:13', '2025-07-12 06:38:13'),
(251, 'Máy nghe nhạc', NULL, 220, 'may-nghe-nhac', 'active', 9, NULL, '2025-07-12 06:08:07', '2025-07-12 06:38:13'),
(252, 'Đồng hồ nữ', NULL, 227, 'dong-ho-nu', 'active', 10, NULL, '2025-07-12 06:08:34', '2025-07-12 06:38:13'),
(253, 'Đồng hồ nam', NULL, 227, 'dong-ho-nam', 'active', 99, NULL, '2025-07-12 06:08:44', '2025-07-12 06:08:44'),
(254, 'Phụ kiện đồng hồ', NULL, 227, 'phu-kien-dong-ho', 'active', 99, NULL, '2025-07-12 06:08:52', '2025-07-12 06:08:52'),
(255, 'Điện thoại', NULL, 230, 'dien-thoai', 'active', 99, NULL, '2025-07-12 06:09:08', '2025-07-12 06:09:08'),
(256, 'Máy tính bảng', NULL, 230, 'may-tinh-bang', 'active', 99, NULL, '2025-07-12 06:09:16', '2025-07-12 06:09:16'),
(257, 'Phụ kiện', NULL, 230, 'phu-kien', 'active', 99, NULL, '2025-07-12 06:09:27', '2025-07-12 06:09:27'),
(258, 'Tivi & Phụ kiện', NULL, 221, 'tivi-phu-kien', 'active', 99, NULL, '2025-07-12 06:09:47', '2025-07-12 06:09:47'),
(259, 'Thiết bị điện gia dụng lớn', NULL, 221, 'thiet-bi-dien-gia-dung-lon', 'active', 99, NULL, '2025-07-12 06:10:14', '2025-07-12 06:10:14'),
(260, 'Thiết bị điện gia dụng nhỏ', NULL, 221, 'thiet-bi-dien-gia-dung-nho', 'active', 99, NULL, '2025-07-12 06:10:24', '2025-07-12 06:10:24'),
(261, 'Màn hình', NULL, 222, 'man-hinh', 'active', 99, NULL, '2025-07-12 06:10:48', '2025-07-12 06:10:48'),
(262, 'Link kiện máy tính', NULL, 222, 'link-kien-may-tinh', 'active', 99, NULL, '2025-07-12 06:11:03', '2025-07-12 06:11:03'),
(263, 'Thiết bị lưu trữ', NULL, 222, 'thiet-bi-luu-tru', 'active', 99, NULL, '2025-07-12 06:11:16', '2025-07-12 06:11:16'),
(264, 'Thiết bị văn phòng', NULL, 222, 'thiet-bi-van-phong', 'active', 99, NULL, '2025-07-12 06:11:34', '2025-07-12 06:11:34'),
(265, 'Laptop', NULL, 222, 'laptop', 'active', 99, NULL, '2025-07-12 06:11:52', '2025-07-12 06:11:52'),
(266, 'Phụ kiện máy tính', NULL, 222, 'phu-kien-may-tinh', 'active', 99, NULL, '2025-07-12 06:12:12', '2025-07-12 06:12:12'),
(267, 'Chuột & Bàn phím', NULL, 222, 'chuot-ban-phim', 'active', 99, NULL, '2025-07-12 06:12:25', '2025-07-12 06:12:25'),
(268, 'Chăm sóc da mặt', NULL, 231, 'cham-soc-da-mat', 'active', 99, NULL, '2025-07-12 06:13:28', '2025-07-12 06:13:28'),
(269, 'Chăm sóc tóc', NULL, 231, 'cham-soc-toc', 'active', 99, NULL, '2025-07-12 06:13:42', '2025-07-12 06:13:42'),
(270, 'Dụng cụ làm đẹp', NULL, 231, 'dung-cu-lam-dep', 'active', 99, NULL, '2025-07-12 06:14:00', '2025-07-12 06:14:00'),
(271, 'Thực phẩm chức năng', NULL, 232, 'thuc-pham-chuc-nang', 'active', 99, NULL, '2025-07-12 06:14:32', '2025-07-12 06:14:32'),
(272, 'Vật tư y tế', NULL, 232, 'vat-tu-y-te', 'active', 99, NULL, '2025-07-12 06:14:46', '2025-07-12 06:14:46'),
(273, 'Chăm sóc cá nhân', NULL, 232, 'cham-soc-ca-nhan', 'active', 99, NULL, '2025-07-12 06:15:00', '2025-07-12 06:15:00'),
(274, 'Đồ chơi', NULL, 219, 'do-choi', 'active', 99, NULL, '2025-07-12 06:15:33', '2025-07-12 06:17:16'),
(275, 'Chăm sóc sức khỏe mẹ', NULL, 219, 'cham-soc-suc-khoe-me', 'active', 99, NULL, '2025-07-12 06:16:17', '2025-07-12 06:17:35'),
(276, 'Chăm sóc sức khỏe bé', NULL, 219, 'cham-soc-suc-khoe-be', 'active', 99, NULL, '2025-07-12 06:16:38', '2025-07-12 06:17:58'),
(277, 'Đồ chế biến sẵn', NULL, 228, 'do-che-bien-san', 'active', 99, NULL, '2025-07-12 06:16:51', '2025-07-12 06:18:20'),
(278, 'Đồ ăn vặt', NULL, 228, 'do-an-vat', 'active', 99, NULL, '2025-07-12 06:18:36', '2025-07-12 06:18:36'),
(279, 'Nguyên liệu nấu ăn', NULL, 228, 'nguyen-lieu-nau-an', 'active', 99, NULL, '2025-07-12 06:18:48', '2025-07-12 06:18:48'),
(280, 'Đồ uống', NULL, 228, 'do-uong', 'active', 99, NULL, '2025-07-12 06:18:59', '2025-07-12 06:18:59'),
(281, 'Playstation', NULL, 233, 'playstation', 'active', 99, NULL, '2025-07-12 07:37:20', '2025-07-12 07:37:20'),
(282, 'Nintendo Switch', NULL, 233, 'nintendo-switch', 'active', 99, NULL, '2025-07-12 07:37:32', '2025-07-12 07:37:32'),
(283, 'Xbox', NULL, 233, 'xbox', 'active', 99, NULL, '2025-07-12 07:37:47', '2025-07-12 07:37:47'),
(284, 'Game Playstation', NULL, 234, 'game-playstation', 'active', 99, NULL, '2025-07-12 07:38:06', '2025-07-12 07:38:06'),
(285, 'Game Xbox', NULL, 234, 'game-xbox', 'active', 99, NULL, '2025-07-12 07:38:18', '2025-07-12 07:38:18'),
(286, 'Game Nintendo Switch', NULL, 234, 'game-nintendo-switch', 'active', 99, NULL, '2025-07-12 07:44:21', '2025-07-12 07:44:21'),
(287, 'Máy ảnh kỹ thuật số', NULL, 236, 'may-anh-ky-thuat-so', 'active', 99, NULL, '2025-07-12 07:44:41', '2025-07-12 07:44:41'),
(288, 'Máy quay phim', NULL, 236, 'may-quay-phim', 'active', 99, NULL, '2025-07-12 07:44:52', '2025-07-12 07:44:52'),
(289, 'Bàn', NULL, 240, 'ban', 'active', 99, NULL, '2025-07-12 07:45:43', '2025-07-12 07:45:43'),
(290, 'Tủ quần áo', NULL, 240, 'tu-quan-ao', 'active', 99, NULL, '2025-07-12 07:45:51', '2025-07-12 07:45:51'),
(291, 'Ghế sofa', NULL, 240, 'ghe-sofa', 'active', 99, NULL, '2025-07-12 07:46:05', '2025-07-12 07:46:05'),
(292, 'Tủ bếp', NULL, 240, 'tu-bep', 'active', 99, NULL, '2025-07-12 07:46:18', '2025-07-12 07:46:18'),
(293, 'Kệ & Giá', NULL, 240, 'ke-gia', 'active', 99, NULL, '2025-07-12 07:46:32', '2025-07-12 07:46:32'),
(294, 'Chăn, mền', NULL, 243, 'chan-men', 'active', 99, NULL, '2025-07-12 07:54:48', '2025-07-12 07:54:48'),
(295, 'Gối', NULL, 243, 'goi', 'active', 99, NULL, '2025-07-12 07:54:58', '2025-07-12 07:54:58'),
(296, 'Nệm', NULL, 243, 'nem', 'active', 99, NULL, '2025-07-12 07:55:12', '2025-07-12 07:55:12'),
(297, 'Lò nướng & phụ kiện', NULL, 241, 'lo-nuong-phu-kien', 'active', 99, NULL, '2025-07-12 07:56:14', '2025-07-12 07:56:14'),
(298, 'Chảo', NULL, 241, 'chao', 'active', 99, NULL, '2025-07-12 07:56:23', '2025-07-12 07:56:23'),
(299, 'Nồi', NULL, 241, 'noi', 'active', 99, NULL, '2025-07-12 07:56:28', '2025-07-12 07:56:28'),
(300, 'Dụng cụ pha trà, cà phê', NULL, 241, 'dung-cu-pha-tra-ca-phe', 'active', 99, NULL, '2025-07-12 07:56:44', '2025-07-12 07:56:44'),
(301, 'Dao & Kéo', NULL, 241, 'dao-keo', 'active', 99, NULL, '2025-07-12 07:56:59', '2025-07-12 07:56:59'),
(302, 'Sạc dự phòng & pin', NULL, 257, 'sac-du-phong-pin', 'active', 99, NULL, '2025-07-12 07:58:12', '2025-07-12 07:58:12'),
(303, 'Vỏ bao, Ốp lưng', NULL, 257, 'vo-bao-op-lung', 'active', 99, NULL, '2025-07-12 07:58:35', '2025-07-12 07:58:35'),
(304, 'Cáp, sạc & bộ chuyển đổi', NULL, 257, 'cap-sac-bo-chuyen-doi', 'active', 99, NULL, '2025-07-12 07:59:00', '2025-07-12 07:59:00'),
(305, 'Máy giặc & Máy sấy', NULL, 259, 'may-giac-may-say', 'active', 99, NULL, '2025-07-12 07:59:48', '2025-07-12 08:00:54'),
(306, 'Máy nước nóng', NULL, 259, 'may-nuoc-nong', 'active', 99, NULL, '2025-07-12 08:01:17', '2025-07-12 08:01:17'),
(307, 'Máy tăm nước', NULL, 260, 'may-tam-nuoc', 'active', 99, NULL, '2025-07-12 08:01:34', '2025-07-12 08:01:34'),
(308, 'Máy hút bụi', NULL, 260, 'may-hut-bui', 'active', 99, NULL, '2025-07-12 08:01:59', '2025-07-12 08:01:59'),
(309, 'Bàn là khô & hơi nước', NULL, 260, 'ban-la-kho-hoi-nuoc', 'active', 99, NULL, '2025-07-12 08:02:15', '2025-07-12 08:02:15'),
(310, 'Dầu gội', NULL, 269, 'dau-goi', 'active', 99, NULL, '2025-07-12 08:02:49', '2025-07-12 08:02:49'),
(311, 'Thuốc nhuộm tóc', NULL, 269, 'thuoc-nhuom-toc', 'active', 99, NULL, '2025-07-12 08:02:59', '2025-07-12 08:02:59'),
(312, 'Dầu xã', NULL, 269, 'dau-xa', 'active', 99, NULL, '2025-07-12 08:03:07', '2025-07-12 08:03:07'),
(313, 'Sữa rửa mặt', NULL, 268, 'sua-rua-mat', 'active', 99, NULL, '2025-07-12 08:03:34', '2025-07-12 08:03:34'),
(314, 'Kem dưỡng ẩm', NULL, 268, 'kem-duong-am', 'active', 99, NULL, '2025-07-12 08:03:43', '2025-07-12 08:03:43'),
(315, 'Xịt khoáng', NULL, 268, 'xit-khoang', 'active', 99, NULL, '2025-07-12 08:04:02', '2025-07-12 08:04:02'),
(316, 'Mặt nạ', NULL, 268, 'mat-na', 'active', 99, NULL, '2025-07-12 08:04:13', '2025-07-12 08:04:13'),
(317, 'Kem chóng nắng', NULL, 268, 'kem-chong-nang', 'active', 99, NULL, '2025-07-12 08:04:30', '2025-07-12 08:04:30'),
(318, 'Hỗ trợ làm đẹp', NULL, 271, 'ho-tro-lam-dep', 'active', 99, NULL, '2025-07-12 08:05:34', '2025-07-12 08:05:34'),
(319, 'Hỗ trợ sức khỏe', NULL, 271, 'ho-tro-suc-khoe', 'active', 99, NULL, '2025-07-12 08:05:44', '2025-07-12 08:05:44'),
(320, 'Dung dịch sát khuẩn', NULL, 273, 'dung-dich-sat-khuan', 'active', 99, NULL, '2025-07-12 08:06:12', '2025-07-12 08:06:12'),
(321, 'Vệ sinh răng miệng', NULL, 273, 've-sinh-rang-mieng', 'active', 99, NULL, '2025-07-12 08:06:31', '2025-07-12 08:06:31');

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--

CREATE TABLE `conversations` (
  `id` bigint UNSIGNED NOT NULL,
  `user1_id` bigint UNSIGNED DEFAULT NULL,
  `user2_id` bigint UNSIGNED DEFAULT NULL,
  `last_message_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`id`, `user1_id`, `user2_id`, `last_message_id`, `created_at`, `updated_at`) VALUES
(10, 40, 42, 270, '2025-07-23 19:34:46', '2025-07-26 06:31:53'),
(12, 40, 49, 271, '2025-07-26 10:25:27', '2025-07-26 10:25:27'),
(13, 40, 48, 272, '2025-07-26 12:06:27', '2025-07-26 12:06:27'),
(14, 42, 48, 274, '2025-07-26 13:27:33', '2025-07-26 13:31:24');

-- --------------------------------------------------------

--
-- Table structure for table `email_verifications`
--

CREATE TABLE `email_verifications` (
  `id` bigint UNSIGNED NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
(25, 'phanthequang12.3tpk@gmail.com', '686719', '2025-07-21 04:42:04', NULL, NULL),
(26, 'phanquang180918@gmail.dsds', '895058', '2025-03-18 11:03:14', NULL, NULL),
(27, 'phanquang180918@gmail.com', '554699', '2025-04-17 08:55:10', NULL, NULL),
(29, 'admin@gmail.com', '549484', '2025-04-16 10:33:54', NULL, NULL),
(30, 'thequang.work@gmail.com', '397375', '2025-07-18 15:23:36', NULL, NULL),
(31, 'hghgh@m.com', '294767', '2025-04-16 10:57:29', NULL, NULL),
(32, 'superadmin@demo.com', '351679', '2025-04-17 06:52:14', NULL, NULL),
(33, 'admin@example.org', '805892', '2025-04-17 08:11:35', NULL, NULL),
(34, 'shopmohinh.walmart@gmail.com', '528376', '2025-06-20 04:15:48', NULL, NULL),
(35, 'rholy921@gmail.com', '593294', '2025-07-18 11:31:44', NULL, NULL),
(36, 'ddonnelly@example.com', '605709', '2025-07-18 15:20:25', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `email_verification_tokens`
--

CREATE TABLE `email_verification_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `public_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int UNSIGNED DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `queue`, `payload`, `attempts`, `reserved_at`, `available_at`, `created_at`) VALUES
(1, 'default', '{\"uuid\":\"dfeaca95-2420-4376-90ea-972eb54cd5fc\",\"displayName\":\"App\\\\Jobs\\\\SyncProductsToRecombee\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\SyncProductsToRecombee\",\"command\":\"O:31:\\\"App\\\\Jobs\\\\SyncProductsToRecombee\\\":0:{}\"}}', 0, NULL, 1752144600, 1752144600),
(2, 'default', '{\"uuid\":\"d067b1d0-30cf-4013-ad51-9f0666db4a4f\",\"displayName\":\"App\\\\Jobs\\\\SyncProductsToRecombee\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\SyncProductsToRecombee\",\"command\":\"O:31:\\\"App\\\\Jobs\\\\SyncProductsToRecombee\\\":0:{}\"}}', 0, NULL, 1752144870, 1752144870),
(3, 'default', '{\"uuid\":\"b0ff5e3d-a566-41d8-8d27-82ffda4971d5\",\"displayName\":\"App\\\\Jobs\\\\SyncProductsToRecombee\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\SyncProductsToRecombee\",\"command\":\"O:31:\\\"App\\\\Jobs\\\\SyncProductsToRecombee\\\":0:{}\"}}', 0, NULL, 1752145084, 1752145084),
(4, 'default', '{\"uuid\":\"6b01c0cb-8968-4d34-aef4-063d9d2c01e2\",\"displayName\":\"App\\\\Jobs\\\\SyncProductsToRecombee\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\SyncProductsToRecombee\",\"command\":\"O:31:\\\"App\\\\Jobs\\\\SyncProductsToRecombee\\\":0:{}\"}}', 0, NULL, 1752145287, 1752145287),
(5, 'default', '{\"uuid\":\"130abb02-e812-4627-a2b8-57e0778e1981\",\"displayName\":\"App\\\\Jobs\\\\SyncProductsToRecombee\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\SyncProductsToRecombee\",\"command\":\"O:31:\\\"App\\\\Jobs\\\\SyncProductsToRecombee\\\":0:{}\"}}', 0, NULL, 1752145918, 1752145918),
(6, 'default', '{\"uuid\":\"b5b7887b-9e7b-4d5f-a856-a8400f7718c8\",\"displayName\":\"App\\\\Jobs\\\\SyncProductsToRecombee\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\SyncProductsToRecombee\",\"command\":\"O:31:\\\"App\\\\Jobs\\\\SyncProductsToRecombee\\\":0:{}\"}}', 0, NULL, 1752145956, 1752145956),
(7, 'default', '{\"uuid\":\"823beb1f-5a27-482b-ad53-7e25bff81459\",\"displayName\":\"App\\\\Events\\\\OrderEvent\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":14:{s:5:\\\"event\\\";O:21:\\\"App\\\\Events\\\\OrderEvent\\\":4:{s:5:\\\"title\\\";s:18:\\\"Đơn hàng mới\\\";s:7:\\\"message\\\";s:52:\\\"Bạn có đơn hàng mới #WM520832 từ 5Zvkckfo\\\";s:9:\\\"eventType\\\";s:12:\\\"OrderCreated\\\";s:7:\\\"channel\\\";s:6:\\\"shop.6\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\"}}', 0, NULL, 1753027756, 1753027756),
(8, 'default', '{\"uuid\":\"2caca4c9-839e-4c56-9330-87209fcfc9e2\",\"displayName\":\"App\\\\Events\\\\VariantStockUpdated\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":14:{s:5:\\\"event\\\";O:30:\\\"App\\\\Events\\\\VariantStockUpdated\\\":3:{s:6:\\\"userId\\\";i:22;s:9:\\\"variantId\\\";i:363;s:14:\\\"availableStock\\\";i:2;}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\"}}', 0, NULL, 1753029013, 1753029013);

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
-- Table structure for table `media_files`
--

CREATE TABLE `media_files` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `public_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `media_folder_id` bigint UNSIGNED DEFAULT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `size` int UNSIGNED DEFAULT NULL,
  `mime_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `media_files`
--

INSERT INTO `media_files` (`id`, `name`, `url`, `public_id`, `media_folder_id`, `user_id`, `size`, `mime_type`, `created_at`, `updated_at`, `deleted_at`) VALUES
(83, 'cat_dien_gia_dung.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751020355/cat_dien_gia_dung_1751020352.webp', 'cat_dien_gia_dung_1751020352', 114, 40, 18315, 'image/png', '2025-06-27 10:32:34', '2025-07-12 08:11:27', '2025-07-12 08:11:27'),
(84, 'cat_dien_may.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751020357/cat_dien_may_1751020355.webp', 'cat_dien_may_1751020355', 114, 40, 29605, 'image/png', '2025-06-27 10:32:36', '2025-07-12 08:11:27', '2025-07-12 08:11:27'),
(85, 'cat_camera.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751020360/cat_camera_1751020357.webp', 'cat_camera_1751020357', 114, 40, 151987, 'image/png', '2025-06-27 10:32:39', '2025-07-12 08:11:27', '2025-07-12 08:11:27'),
(86, 'cat_cham_soc_suc_khoe.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751020363/cat_cham_soc_suc_khoe_1751020360.webp', 'cat_cham_soc_suc_khoe_1751020360', 114, 40, 211794, 'image/png', '2025-06-27 10:32:42', '2025-07-12 08:11:27', '2025-07-12 08:11:27'),
(87, 'cat_am_thanh.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751020366/cat_am_thanh_1751020363.webp', 'cat_am_thanh_1751020363', 114, 40, 239235, 'image/png', '2025-06-27 10:32:46', '2025-07-12 08:11:27', '2025-07-12 08:11:27'),
(88, 'cat_laptop.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751020369/cat_laptop_1751020366.webp', 'cat_laptop_1751020366', 114, 40, 147963, 'image/png', '2025-06-27 10:32:48', '2025-07-12 08:11:20', '2025-07-12 08:11:20'),
(89, 'cat_dien_thoai.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751020372/cat_dien_thoai_1751020369.webp', 'cat_dien_thoai_1751020369', 114, 40, 317149, 'image/png', '2025-06-27 10:32:52', '2025-07-12 08:11:20', '2025-07-12 08:11:20'),
(90, 'cat_may_choi_game.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751020376/cat_may_choi_game_1751020373.webp', 'cat_may_choi_game_1751020373', 114, 40, 195217, 'image/png', '2025-06-27 10:32:56', '2025-07-12 08:11:20', '2025-07-12 08:11:20'),
(91, 'cat_phan_mem.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751020378/cat_phan_mem_1751020376.webp', 'cat_phan_mem_1751020376', 114, 40, 82725, 'image/png', '2025-06-27 10:32:58', '2025-07-12 08:11:27', '2025-07-12 08:11:27'),
(92, 'cat_dong_ho.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751020382/cat_dong_ho_1751020378.webp', 'cat_dong_ho_1751020378', 114, 40, 543659, 'image/png', '2025-06-27 10:33:02', '2025-07-12 08:11:27', '2025-07-12 08:11:27'),
(93, 'cat_phu_kien_setup.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751020385/cat_phu_kien_setup_1751020382.webp', 'cat_phu_kien_setup_1751020382', 114, 40, 186553, 'image/png', '2025-06-27 10:33:05', '2025-07-12 08:11:27', '2025-07-12 08:11:27'),
(94, 'cat_router.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751020387/cat_router_1751020385.webp', 'cat_router_1751020385', 114, 40, 58023, 'image/png', '2025-06-27 10:33:07', '2025-07-12 08:11:20', '2025-07-12 08:11:20'),
(95, 'cat_thiet_bi_van_phong.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751020390/cat_thiet_bi_van_phong_1751020388.webp', 'cat_thiet_bi_van_phong_1751020388', 114, 40, 34359, 'image/png', '2025-06-27 10:33:09', '2025-07-12 08:11:20', '2025-07-12 08:11:20'),
(96, 'cat_mo_hinh.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751020394/cat_mo_hinh_1751020390.webp', 'cat_mo_hinh_1751020390', 114, 40, 436276, 'image/png', '2025-06-27 10:33:13', '2025-07-12 08:11:20', '2025-07-12 08:11:20'),
(97, 'cat_phu_kien_gaming.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751020397/cat_phu_kien_gaming_1751020394.webp', 'cat_phu_kien_gaming_1751020394', 114, 40, 348963, 'image/png', '2025-06-27 10:33:17', '2025-07-12 08:11:20', '2025-07-12 08:11:20'),
(98, 'cat_linh_kien.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751020402/cat_linh_kien_1751020398.webp', 'cat_linh_kien_1751020398', 114, 40, 711565, 'image/png', '2025-06-27 10:33:22', '2025-07-12 08:11:20', '2025-07-12 08:11:20'),
(99, 'sac.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751020405/sac_1751020402.webp', 'sac_1751020402', 114, 40, 209678, 'image/png', '2025-06-27 10:33:25', '2025-07-12 08:11:20', '2025-07-12 08:11:20'),
(100, 'cat_dien_gia_dung.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751091009/cat_dien_gia_dung_1751091005.webp', 'cat_dien_gia_dung_1751091005', 116, 24, 18315, 'image/png', '2025-06-28 06:10:08', '2025-06-28 06:31:00', NULL),
(101, 'cat_dien_may.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751091011/cat_dien_may_1751091008.webp', 'cat_dien_may_1751091008', 116, 24, 29605, 'image/png', '2025-06-28 06:10:10', '2025-06-28 06:30:58', NULL),
(102, 'cat_camera.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751091014/cat_camera_1751091011.webp', 'cat_camera_1751091011', 116, 24, 151987, 'image/png', '2025-06-28 06:10:13', '2025-06-28 06:30:56', NULL),
(103, 'cat_cham_soc_suc_khoe.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751091017/cat_cham_soc_suc_khoe_1751091013.webp', 'cat_cham_soc_suc_khoe_1751091013', 116, 24, 211794, 'image/png', '2025-06-28 06:10:16', '2025-06-28 06:30:34', NULL),
(104, 'cat_am_thanh.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751091020/cat_am_thanh_1751091017.webp', 'cat_am_thanh_1751091017', 116, 24, 239235, 'image/png', '2025-06-28 06:10:20', '2025-06-28 06:29:56', NULL),
(105, 'cat_dien_thoai.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751091024/cat_dien_thoai_1751091020.webp', 'cat_dien_thoai_1751091020', 116, 24, 317149, 'image/png', '2025-06-28 06:10:23', '2025-06-28 06:29:56', NULL),
(106, 'cat_laptop.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751091027/cat_laptop_1751091023.webp', 'cat_laptop_1751091023', 116, 24, 147963, 'image/png', '2025-06-28 06:10:26', '2025-06-28 06:29:56', NULL),
(107, 'cat_dong_ho.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751091031/cat_dong_ho_1751091026.webp', 'cat_dong_ho_1751091026', 116, 24, 543659, 'image/png', '2025-06-28 06:10:30', '2025-06-28 06:29:56', NULL),
(108, 'cat_linh_kien.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751091035/cat_linh_kien_1751091030.webp', 'cat_linh_kien_1751091030', 116, 24, 711565, 'image/png', '2025-06-28 06:10:35', '2025-06-28 06:29:56', NULL),
(109, 'cat_router.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751091070/cat_router_1751091067.webp', 'cat_router_1751091067', 116, 24, 58023, 'image/png', '2025-06-28 06:11:09', '2025-06-28 06:29:56', NULL),
(110, 'cat_phan_mem.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751091072/cat_phan_mem_1751091069.webp', 'cat_phan_mem_1751091069', 116, 24, 82725, 'image/png', '2025-06-28 06:11:11', '2025-06-28 06:29:56', NULL),
(111, 'cat_thiet_bi_van_phong.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751091074/cat_thiet_bi_van_phong_1751091071.webp', 'cat_thiet_bi_van_phong_1751091071', 116, 24, 34359, 'image/png', '2025-06-28 06:11:13', '2025-06-28 06:29:56', NULL),
(112, 'cat_may_choi_game.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751091077/cat_may_choi_game_1751091074.webp', 'cat_may_choi_game_1751091074', 116, 24, 195217, 'image/png', '2025-06-28 06:11:16', '2025-06-28 06:29:56', NULL),
(113, 'cat_phu_kien_setup.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751091080/cat_phu_kien_setup_1751091077.webp', 'cat_phu_kien_setup_1751091077', 116, 24, 186553, 'image/png', '2025-06-28 06:11:19', '2025-06-28 06:29:56', NULL),
(114, 'cat_phu_kien_gaming.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751091083/cat_phu_kien_gaming_1751091079.webp', 'cat_phu_kien_gaming_1751091079', 116, 24, 348963, 'image/png', '2025-06-28 06:11:23', '2025-06-28 06:29:56', NULL),
(115, 'sac.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751091086/sac_1751091083.webp', 'sac_1751091083', 116, 24, 209678, 'image/png', '2025-06-28 06:11:26', '2025-06-28 06:29:56', NULL),
(116, 'cat_mo_hinh.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751091090/cat_mo_hinh_1751091086.webp', 'cat_mo_hinh_1751091086', 116, 24, 436276, 'image/png', '2025-06-28 06:11:29', '2025-06-28 06:29:56', NULL),
(117, 'vr.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751092316/vr_1751092312.webp', 'vr_1751092312', 116, 24, 189313, 'image/png', '2025-06-28 06:31:55', '2025-06-28 06:31:55', NULL),
(118, 'background_3.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1751098573/background_3_1751098570.webp', 'background_3_1751098570', 116, 24, 89006, 'image/jpeg', '2025-06-28 08:16:14', '2025-06-28 08:43:07', '2025-06-28 08:43:03'),
(646, 'macbook.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752047416/macbook_1752047406.webp', 'macbook_1752047406', NULL, 41, 147963, 'image/png', '2025-07-09 07:50:17', '2025-07-09 10:17:18', '2025-07-09 10:17:18'),
(647, 'iphone16.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752047422/iphone16_1752047419.webp', 'iphone16_1752047419', NULL, 41, 317149, 'image/png', '2025-07-09 07:50:23', '2025-07-09 10:17:19', '2025-07-09 10:17:19'),
(648, 'banphim.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752047426/banphim_1752047423.webp', 'banphim_1752047423', NULL, 41, 348963, 'image/png', '2025-07-09 07:50:27', '2025-07-09 10:17:19', '2025-07-09 10:17:19'),
(649, 'gundam.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752047430/gundam_1752047427.webp', 'gundam_1752047427', NULL, 41, 436276, 'image/png', '2025-07-09 07:50:31', '2025-07-09 10:17:19', '2025-07-09 10:17:19'),
(650, 'applewatch.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752047435/applewatch_1752047432.webp', 'applewatch_1752047432', NULL, 41, 543659, 'image/png', '2025-07-09 07:50:37', '2025-07-09 10:17:19', '2025-07-09 10:17:19'),
(658, 'vn-11134207-7qukw-lhnhyye81xvl91-1703047882052.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048399/vn-11134207-7qukw-lhnhyye81xvl91-1703047882052_1752048396.webp', 'vn-11134207-7qukw-lhnhyye81xvl91-1703047882052_1752048396', NULL, 41, 155139, 'image/jpeg', '2025-07-09 08:06:40', '2025-07-09 10:19:08', '2025-07-09 10:19:08'),
(659, 'vn-11134207-7qukw-lhnhyye7wblt0a-1703047882052.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048402/vn-11134207-7qukw-lhnhyye7wblt0a-1703047882052_1752048400.webp', 'vn-11134207-7qukw-lhnhyye7wblt0a-1703047882052_1752048400', NULL, 41, 174301, 'image/jpeg', '2025-07-09 08:06:43', '2025-07-09 10:19:08', '2025-07-09 10:19:08'),
(660, 'vn-11134207-7qukw-lhnhyye7xq6979-1703047882052.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048405/vn-11134207-7qukw-lhnhyye7xq6979-1703047882052_1752048403.webp', 'vn-11134207-7qukw-lhnhyye7xq6979-1703047882052_1752048403', NULL, 41, 166097, 'image/jpeg', '2025-07-09 08:06:46', '2025-07-09 10:19:08', '2025-07-09 10:19:08'),
(661, 'vn-11134207-7qukw-lhnhyye7z4qp6b-1703047882052.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048408/vn-11134207-7qukw-lhnhyye7z4qp6b-1703047882052_1752048407.webp', 'vn-11134207-7qukw-lhnhyye7z4qp6b-1703047882052_1752048407', NULL, 41, 155862, 'image/jpeg', '2025-07-09 08:06:49', '2025-07-09 10:19:08', '2025-07-09 10:19:08'),
(662, 'vn-11134207-7qukw-lhnhyye83cg1ae-1703047882052.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048411/vn-11134207-7qukw-lhnhyye83cg1ae-1703047882052_1752048409.webp', 'vn-11134207-7qukw-lhnhyye83cg1ae-1703047882052_1752048409', NULL, 41, 158713, 'image/jpeg', '2025-07-09 08:06:52', '2025-07-09 10:19:08', '2025-07-09 10:19:08'),
(663, 'vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048791/vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876_1752048789.webp', 'vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876_1752048789', NULL, 41, 66632, 'image/jpeg', '2025-07-09 08:13:11', '2025-07-09 10:19:08', '2025-07-09 10:19:08'),
(664, 'vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048793/vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876_1752048792.webp', 'vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876_1752048792', NULL, 41, 126171, 'image/jpeg', '2025-07-09 08:13:15', '2025-07-09 10:19:08', '2025-07-09 10:19:08'),
(665, 'vn-11134207-7r98o-ln4jngu001qw14-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048797/vn-11134207-7r98o-ln4jngu001qw14-1703472111876_1752048795.webp', 'vn-11134207-7r98o-ln4jngu001qw14-1703472111876_1752048795', NULL, 41, 114374, 'image/jpeg', '2025-07-09 08:13:18', '2025-07-09 10:19:08', '2025-07-09 10:19:08'),
(666, 'vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048799/vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876_1752048798.webp', 'vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876_1752048798', NULL, 41, 66632, 'image/jpeg', '2025-07-09 08:13:20', '2025-07-09 10:19:08', '2025-07-09 10:19:08'),
(667, 'vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048802/vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876_1752048801.webp', 'vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876_1752048801', NULL, 41, 126171, 'image/jpeg', '2025-07-09 08:13:23', '2025-07-09 10:19:08', '2025-07-09 10:19:08'),
(668, 'vn-11134207-7r98o-ln4jngu001qw14-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048805/vn-11134207-7r98o-ln4jngu001qw14-1703472111876_1752048804.webp', 'vn-11134207-7r98o-ln4jngu001qw14-1703472111876_1752048804', NULL, 41, 114374, 'image/jpeg', '2025-07-09 08:13:26', '2025-07-09 10:19:08', '2025-07-09 10:19:08'),
(669, 'vn-11134207-7r98o-ln4jngu001qw14-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048808/vn-11134207-7r98o-ln4jngu001qw14-1703472111876_1752048807.webp', 'vn-11134207-7r98o-ln4jngu001qw14-1703472111876_1752048807', NULL, 41, 114374, 'image/jpeg', '2025-07-09 08:13:29', '2025-07-09 10:19:08', '2025-07-09 10:19:08'),
(670, 'vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048811/vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876_1752048809.webp', 'vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876_1752048809', NULL, 41, 126171, 'image/jpeg', '2025-07-09 08:13:32', '2025-07-09 10:19:21', '2025-07-09 10:19:21'),
(671, 'vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048814/vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876_1752048812.webp', 'vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876_1752048812', NULL, 41, 66632, 'image/jpeg', '2025-07-09 08:13:35', '2025-07-09 10:19:21', '2025-07-09 10:19:21'),
(672, 'vn-11134207-7r98o-ln4jngu001qw14-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048817/vn-11134207-7r98o-ln4jngu001qw14-1703472111876_1752048815.webp', 'vn-11134207-7r98o-ln4jngu001qw14-1703472111876_1752048815', NULL, 41, 114374, 'image/jpeg', '2025-07-09 08:13:37', '2025-07-09 10:19:21', '2025-07-09 10:19:21'),
(673, 'vn-11134207-7r98o-ln4jngu001qw14-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048819/vn-11134207-7r98o-ln4jngu001qw14-1703472111876_1752048818.webp', 'vn-11134207-7r98o-ln4jngu001qw14-1703472111876_1752048818', NULL, 41, 114374, 'image/jpeg', '2025-07-09 08:13:40', '2025-07-09 10:19:21', '2025-07-09 10:19:21'),
(674, 'vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048822/vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876_1752048821.webp', 'vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876_1752048821', NULL, 41, 66632, 'image/jpeg', '2025-07-09 08:13:43', '2025-07-09 10:19:21', '2025-07-09 10:19:21'),
(675, 'vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048825/vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876_1752048824.webp', 'vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876_1752048824', NULL, 41, 126171, 'image/jpeg', '2025-07-09 08:13:46', '2025-07-09 10:19:21', '2025-07-09 10:19:21'),
(676, 'vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048828/vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876_1752048826.webp', 'vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876_1752048826', NULL, 41, 126171, 'image/jpeg', '2025-07-09 08:13:49', '2025-07-09 10:19:30', '2025-07-09 10:19:30'),
(677, 'vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048831/vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876_1752048829.webp', 'vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876_1752048829', NULL, 41, 66632, 'image/jpeg', '2025-07-09 08:13:53', '2025-07-09 10:19:30', '2025-07-09 10:19:30'),
(678, 'vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048834/vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876_1752048833.webp', 'vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876_1752048833', NULL, 41, 66632, 'image/jpeg', '2025-07-09 08:13:55', '2025-07-09 10:19:30', '2025-07-09 10:19:30'),
(679, 'vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048837/vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876_1752048836.webp', 'vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876_1752048836', NULL, 41, 126171, 'image/jpeg', '2025-07-09 08:13:58', '2025-07-09 10:19:30', '2025-07-09 10:19:30'),
(680, 'vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048840/vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876_1752048839.webp', 'vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876_1752048839', NULL, 41, 66632, 'image/jpeg', '2025-07-09 08:14:01', '2025-07-09 10:19:31', '2025-07-09 10:19:31'),
(681, 'vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048843/vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876_1752048841.webp', 'vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876_1752048841', NULL, 41, 126171, 'image/jpeg', '2025-07-09 08:14:04', '2025-07-09 10:19:31', '2025-07-09 10:19:31'),
(682, 'vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048846/vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876_1752048845.webp', 'vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876_1752048845', NULL, 41, 66632, 'image/jpeg', '2025-07-09 08:14:07', '2025-07-09 10:19:31', '2025-07-09 10:19:31'),
(683, 'vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752048849/vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876_1752048847.webp', 'vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876_1752048847', NULL, 41, 126171, 'image/jpeg', '2025-07-09 08:14:10', '2025-07-09 10:19:31', '2025-07-09 10:19:31'),
(684, 'PS5 gt7.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752049095/PS5%20gt7_1752049091.webp', 'PS5 gt7_1752049091', NULL, 41, 984818, 'image/png', '2025-07-09 08:18:17', '2025-07-09 10:19:31', '2025-07-09 10:19:31'),
(685, 'PS5 gt7.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752049102/PS5%20gt7_1752049098.webp', 'PS5 gt7_1752049098', NULL, 41, 984818, 'image/png', '2025-07-09 08:18:23', '2025-07-09 10:19:31', '2025-07-09 10:19:31'),
(751, 'macbook.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752050600/macbook_1752050598.webp', 'macbook_1752050598', NULL, 41, 147963, 'image/png', '2025-07-09 08:43:22', '2025-07-09 10:19:31', '2025-07-09 10:19:31'),
(752, 'iphone16.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752050607/iphone16_1752050605.webp', 'iphone16_1752050605', NULL, 41, 317149, 'image/png', '2025-07-09 08:43:28', '2025-07-09 10:19:31', '2025-07-09 10:19:31'),
(753, 'banphim.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752050611/banphim_1752050608.webp', 'banphim_1752050608', NULL, 41, 348963, 'image/png', '2025-07-09 08:43:32', '2025-07-09 10:29:18', '2025-07-09 10:29:18'),
(754, 'gundam.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752050616/gundam_1752050613.webp', 'gundam_1752050613', NULL, 41, 436276, 'image/png', '2025-07-09 08:43:37', '2025-07-09 10:29:18', '2025-07-09 10:29:18'),
(755, 'applewatch.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752050621/applewatch_1752050618.webp', 'applewatch_1752050618', NULL, 41, 543659, 'image/png', '2025-07-09 08:43:42', '2025-07-09 10:29:18', '2025-07-09 10:29:18'),
(756, 'router.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752050974/router_1752050972.webp', 'router_1752050972', NULL, 41, 58023, 'image/png', '2025-07-09 08:49:36', '2025-07-09 10:29:18', '2025-07-09 10:29:18'),
(757, 'printer.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752050977/printer_1752050976.webp', 'printer_1752050976', NULL, 41, 34359, 'image/png', '2025-07-09 08:49:38', '2025-07-09 10:29:18', '2025-07-09 10:29:18'),
(773, 'edge.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752051950/edge_1752051945.webp', 'edge_1752051945', NULL, 41, 693932, 'image/png', '2025-07-09 09:05:52', '2025-07-09 10:29:18', '2025-07-09 10:29:18'),
(774, 'dual.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752051957/dual_1752051952.webp', 'dual_1752051952', NULL, 41, 759537, 'image/png', '2025-07-09 09:05:59', '2025-07-09 10:29:18', '2025-07-09 10:29:18'),
(775, 'edge b.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752051963/edge%20b_1752051959.webp', 'edge b_1752051959', NULL, 41, 679253, 'image/png', '2025-07-09 09:06:05', '2025-07-09 10:29:18', '2025-07-09 10:29:18'),
(837, '77cfde23d693598edf913ef8f18b652b-1703477380210.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752057098/77cfde23d693598edf913ef8f18b652b-1703477380210_1752057095.webp', '77cfde23d693598edf913ef8f18b652b-1703477380210_1752057095', 171, 41, 109825, 'image/jpeg', '2025-07-09 10:31:39', '2025-07-09 10:31:39', NULL),
(838, 'd4444321fe10cc5c7806a81648d195de-1703477380210.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752057101/d4444321fe10cc5c7806a81648d195de-1703477380210_1752057099.webp', 'd4444321fe10cc5c7806a81648d195de-1703477380210_1752057099', 171, 41, 123417, 'image/jpeg', '2025-07-09 10:31:42', '2025-07-09 10:31:42', NULL),
(839, '4aa979e2c0daee4ddf8d9415938c7d98-1703477380210.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752057105/4aa979e2c0daee4ddf8d9415938c7d98-1703477380210_1752057103.webp', '4aa979e2c0daee4ddf8d9415938c7d98-1703477380210_1752057103', 171, 41, 139557, 'image/jpeg', '2025-07-09 10:31:46', '2025-07-09 10:31:46', NULL),
(840, '1da62b37f3881a12aef3f523b014cae0-1703047857954.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752057107/1da62b37f3881a12aef3f523b014cae0-1703047857954_1752057106.webp', '1da62b37f3881a12aef3f523b014cae0-1703047857954_1752057106', 171, 41, 156379, 'image/jpeg', '2025-07-09 10:31:48', '2025-07-09 10:31:48', NULL),
(841, '076cd7b94248019a6f0afb190ec6a114-1703477382931.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752057111/076cd7b94248019a6f0afb190ec6a114-1703477382931_1752057109.webp', '076cd7b94248019a6f0afb190ec6a114-1703477382931_1752057109', 171, 41, 227117, 'image/jpeg', '2025-07-09 10:31:52', '2025-07-09 10:31:52', NULL),
(842, 'fa40a83d53a8ce44093f93c50884276c-1703477380210.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752057113/fa40a83d53a8ce44093f93c50884276c-1703477380210_1752057112.webp', 'fa40a83d53a8ce44093f93c50884276c-1703477380210_1752057112', 171, 41, 131014, 'image/jpeg', '2025-07-09 10:31:54', '2025-07-09 10:31:54', NULL),
(843, 'vn-11134207-7qukw-lg6wh52b0cmv5f-1703047857954.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752057117/vn-11134207-7qukw-lg6wh52b0cmv5f-1703047857954_1752057115.webp', 'vn-11134207-7qukw-lg6wh52b0cmv5f-1703047857954_1752057115', 171, 41, 165284, 'image/jpeg', '2025-07-09 10:31:58', '2025-07-09 10:31:58', NULL),
(844, 'vn-11134207-7qukw-lg6wh52b1r7bb8-1703047857954.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752057120/vn-11134207-7qukw-lg6wh52b1r7bb8-1703047857954_1752057118.webp', 'vn-11134207-7qukw-lg6wh52b1r7bb8-1703047857954_1752057118', 171, 41, 175419, 'image/jpeg', '2025-07-09 10:32:01', '2025-07-09 10:32:01', NULL),
(845, 'vn-11134207-7qukw-lg6wh52b4kc7a1-1703047857954.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752057123/vn-11134207-7qukw-lg6wh52b4kc7a1-1703047857954_1752057121.webp', 'vn-11134207-7qukw-lg6wh52b4kc7a1-1703047857954_1752057121', 171, 41, 159885, 'image/jpeg', '2025-07-09 10:32:04', '2025-07-09 10:32:04', NULL),
(846, 'vn-11134207-7qukw-lhgh10dedio1c4-1703477380210.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752057141/vn-11134207-7qukw-lhgh10dedio1c4-1703477380210_1752057140.webp', 'vn-11134207-7qukw-lhgh10dedio1c4-1703477380210_1752057140', 171, 41, 166595, 'image/jpeg', '2025-07-09 10:32:23', '2025-07-09 10:32:23', NULL),
(847, 'vn-11134207-7qukw-lg6wh52b35rr34-1703047857954.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752057145/vn-11134207-7qukw-lg6wh52b35rr34-1703047857954_1752057143.webp', 'vn-11134207-7qukw-lg6wh52b35rr34-1703047857954_1752057143', 171, 41, 179289, 'image/jpeg', '2025-07-09 10:32:26', '2025-07-09 10:32:26', NULL),
(848, 'vn-11134207-7qukw-lhgk3vyasfwl52-1703477380210.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752057147/vn-11134207-7qukw-lhgk3vyasfwl52-1703477380210_1752057146.webp', 'vn-11134207-7qukw-lhgk3vyasfwl52-1703477380210_1752057146', 171, 41, 191214, 'image/jpeg', '2025-07-09 10:32:29', '2025-07-09 10:32:29', NULL),
(849, 'vn-11134207-7qukw-lhf43yfzhkn581-1703047857954.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752057151/vn-11134207-7qukw-lhf43yfzhkn581-1703047857954_1752057149.webp', 'vn-11134207-7qukw-lhf43yfzhkn581-1703047857954_1752057149', 171, 41, 205375, 'image/jpeg', '2025-07-09 10:32:32', '2025-07-09 10:32:32', NULL),
(850, 'vn-11134207-7qukw-lhnhyye7z4qp6b-1703047882052.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058010/vn-11134207-7qukw-lhnhyye7z4qp6b-1703047882052_1752058007.webp', 'vn-11134207-7qukw-lhnhyye7z4qp6b-1703047882052_1752058007', 171, 41, 155862, 'image/jpeg', '2025-07-09 10:46:51', '2025-07-09 10:46:51', NULL),
(851, 'vn-11134207-7qukw-lhnhyye81xvl91-1703047882052.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058012/vn-11134207-7qukw-lhnhyye81xvl91-1703047882052_1752058011.webp', 'vn-11134207-7qukw-lhnhyye81xvl91-1703047882052_1752058011', 171, 41, 155139, 'image/jpeg', '2025-07-09 10:46:53', '2025-07-09 10:46:53', NULL),
(852, 'vn-11134207-7qukw-lhnhyye7uwzp1c-1703047882052.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058015/vn-11134207-7qukw-lhnhyye7uwzp1c-1703047882052_1752058014.webp', 'vn-11134207-7qukw-lhnhyye7uwzp1c-1703047882052_1752058014', 171, 41, 173706, 'image/jpeg', '2025-07-09 10:46:56', '2025-07-09 10:46:56', NULL),
(853, 'vn-11134207-7qukw-lhnhyye7wblt0a-1703047882052.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058018/vn-11134207-7qukw-lhnhyye7wblt0a-1703047882052_1752058017.webp', 'vn-11134207-7qukw-lhnhyye7wblt0a-1703047882052_1752058017', 171, 41, 174301, 'image/jpeg', '2025-07-09 10:46:59', '2025-07-09 10:46:59', NULL),
(854, 'vn-11134207-7qukw-lhnhyye7xq6979-1703047882052.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058022/vn-11134207-7qukw-lhnhyye7xq6979-1703047882052_1752058020.webp', 'vn-11134207-7qukw-lhnhyye7xq6979-1703047882052_1752058020', 171, 41, 166097, 'image/jpeg', '2025-07-09 10:47:03', '2025-07-09 10:47:03', NULL),
(855, 'vn-11134207-7qukw-lhnhyye7ux1d1b-1703047882052.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058025/vn-11134207-7qukw-lhnhyye7ux1d1b-1703047882052_1752058023.webp', 'vn-11134207-7qukw-lhnhyye7ux1d1b-1703047882052_1752058023', 171, 41, 199187, 'image/jpeg', '2025-07-09 10:47:06', '2025-07-09 10:47:06', NULL),
(856, 'vn-11134207-7qukw-lhnhyyixo0jlb5-1703047882052.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058028/vn-11134207-7qukw-lhnhyyixo0jlb5-1703047882052_1752058026.webp', 'vn-11134207-7qukw-lhnhyyixo0jlb5-1703047882052_1752058026', 171, 41, 146575, 'image/jpeg', '2025-07-09 10:47:09', '2025-07-09 10:47:09', NULL),
(857, 'vn-11134207-7qukw-lhnhyyj7nlxd4a-1703047882052.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058031/vn-11134207-7qukw-lhnhyyj7nlxd4a-1703047882052_1752058029.webp', 'vn-11134207-7qukw-lhnhyyj7nlxd4a-1703047882052_1752058029', 171, 41, 155489, 'image/jpeg', '2025-07-09 10:47:12', '2025-07-09 10:47:12', NULL),
(858, 'vn-11134207-7qukw-lhnhyye83cg1ae-1703047882052.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058034/vn-11134207-7qukw-lhnhyye83cg1ae-1703047882052_1752058032.webp', 'vn-11134207-7qukw-lhnhyye83cg1ae-1703047882052_1752058032', 171, 41, 158713, 'image/jpeg', '2025-07-09 10:47:15', '2025-07-09 10:47:15', NULL),
(859, 'vn-11134207-7r98o-ln4jngtzufh4c1-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058245/vn-11134207-7r98o-ln4jngtzufh4c1-1703472111876_1752058243.webp', 'vn-11134207-7r98o-ln4jngtzufh4c1-1703472111876_1752058243', NULL, 41, 64537, 'image/jpeg', '2025-07-09 10:50:46', '2025-07-09 10:56:00', '2025-07-09 10:56:00'),
(860, 'vn-11134207-7r98o-ln4jngtzq7rs19-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058247/vn-11134207-7r98o-ln4jngtzq7rs19-1703472111876_1752058246.webp', 'vn-11134207-7r98o-ln4jngtzq7rs19-1703472111876_1752058246', NULL, 41, 76412, 'image/jpeg', '2025-07-09 10:50:48', '2025-07-09 10:56:00', '2025-07-09 10:56:00'),
(861, 'vn-11134207-7r98o-ln4jngtzrmc839-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058250/vn-11134207-7r98o-ln4jngtzrmc839-1703472111876_1752058248.webp', 'vn-11134207-7r98o-ln4jngtzrmc839-1703472111876_1752058248', NULL, 41, 82217, 'image/jpeg', '2025-07-09 10:50:51', '2025-07-09 10:56:00', '2025-07-09 10:56:00'),
(862, 'vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058253/vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876_1752058251.webp', 'vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876_1752058251', NULL, 41, 66632, 'image/jpeg', '2025-07-09 10:50:54', '2025-07-09 10:56:00', '2025-07-09 10:56:00'),
(863, 'vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058256/vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876_1752058254.webp', 'vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876_1752058254', NULL, 41, 126171, 'image/jpeg', '2025-07-09 10:50:57', '2025-07-09 10:56:00', '2025-07-09 10:56:00'),
(864, 'vn-11134207-7r98o-ln4jngtzot7cb2-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058259/vn-11134207-7r98o-ln4jngtzot7cb2-1703472111876_1752058257.webp', 'vn-11134207-7r98o-ln4jngtzot7cb2-1703472111876_1752058257', NULL, 41, 182804, 'image/jpeg', '2025-07-09 10:51:00', '2025-07-09 10:56:00', '2025-07-09 10:56:00'),
(865, 'vn-11134207-7r98o-ln4jngu001qw14-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058262/vn-11134207-7r98o-ln4jngu001qw14-1703472111876_1752058260.webp', 'vn-11134207-7r98o-ln4jngu001qw14-1703472111876_1752058260', NULL, 41, 114374, 'image/jpeg', '2025-07-09 10:51:03', '2025-07-09 10:56:00', '2025-07-09 10:56:00'),
(866, 'vn-11134207-7r98o-ln4jngtzyn6gd1-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058265/vn-11134207-7r98o-ln4jngtzyn6gd1-1703472111876_1752058263.webp', 'vn-11134207-7r98o-ln4jngtzyn6gd1-1703472111876_1752058263', NULL, 41, 169812, 'image/jpeg', '2025-07-09 10:51:06', '2025-07-09 10:56:00', '2025-07-09 10:56:00'),
(867, 'vn-11134207-7r98o-ln4jngtzq7rs19-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058401/vn-11134207-7r98o-ln4jngtzq7rs19-1703472111876_1752058400.webp', 'vn-11134207-7r98o-ln4jngtzq7rs19-1703472111876_1752058400', 171, 41, 76412, 'image/jpeg', '2025-07-09 10:53:22', '2025-07-09 10:53:22', NULL),
(868, 'vn-11134207-7r98o-ln4jngtzrmc839-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058404/vn-11134207-7r98o-ln4jngtzrmc839-1703472111876_1752058403.webp', 'vn-11134207-7r98o-ln4jngtzrmc839-1703472111876_1752058403', 171, 41, 82217, 'image/jpeg', '2025-07-09 10:53:25', '2025-07-09 10:53:25', NULL),
(869, 'vn-11134207-7r98o-ln4jngtzufh4c1-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058407/vn-11134207-7r98o-ln4jngtzufh4c1-1703472111876_1752058406.webp', 'vn-11134207-7r98o-ln4jngtzufh4c1-1703472111876_1752058406', 171, 41, 64537, 'image/jpeg', '2025-07-09 10:53:28', '2025-07-09 10:53:28', NULL),
(870, 'vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058410/vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876_1752058408.webp', 'vn-11134207-7r98o-ln4jngtzvu1k6e-1703472111876_1752058408', 171, 41, 66632, 'image/jpeg', '2025-07-09 10:53:32', '2025-07-09 10:53:32', NULL),
(871, 'vn-11134207-7r98o-ln4jngtzot7cb2-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058414/vn-11134207-7r98o-ln4jngtzot7cb2-1703472111876_1752058412.webp', 'vn-11134207-7r98o-ln4jngtzot7cb2-1703472111876_1752058412', 171, 41, 182804, 'image/jpeg', '2025-07-09 10:53:36', '2025-07-09 10:53:36', NULL),
(872, 'vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058418/vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876_1752058416.webp', 'vn-11134207-7r98o-ln4jngtzx8m0d7-1703472111876_1752058416', 171, 41, 126171, 'image/jpeg', '2025-07-09 10:53:39', '2025-07-09 10:53:39', NULL),
(873, 'vn-11134207-7r98o-ln4jngtzyn6gd1-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058421/vn-11134207-7r98o-ln4jngtzyn6gd1-1703472111876_1752058419.webp', 'vn-11134207-7r98o-ln4jngtzyn6gd1-1703472111876_1752058419', 171, 41, 169812, 'image/jpeg', '2025-07-09 10:53:42', '2025-07-09 10:53:42', NULL),
(874, 'vn-11134207-7r98o-ln4jngu001qw14-1703472111876.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752058424/vn-11134207-7r98o-ln4jngu001qw14-1703472111876_1752058422.webp', 'vn-11134207-7r98o-ln4jngu001qw14-1703472111876_1752058422', 171, 41, 114374, 'image/jpeg', '2025-07-09 10:53:45', '2025-07-09 10:53:45', NULL),
(875, 'b523df56968e6425e644395957974938.jpg.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752136276/b523df56968e6425e644395957974938.jpg_1752136186.webp', 'b523df56968e6425e644395957974938.jpg_1752136186', NULL, 41, 21446, 'image/webp', '2025-07-10 08:31:19', '2025-07-10 08:31:19', NULL),
(876, 'b95bed5f7afc2e2729761e8e48b6bddf.jpg.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752136318/b95bed5f7afc2e2729761e8e48b6bddf.jpg_1752136297.webp', 'b95bed5f7afc2e2729761e8e48b6bddf.jpg_1752136297', NULL, 41, 37580, 'image/webp', '2025-07-10 08:32:00', '2025-07-10 08:32:00', NULL),
(877, 'e683b63d58d6b3ff181190ab0d57bf6d.jpg.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752136321/e683b63d58d6b3ff181190ab0d57bf6d.jpg_1752136321.webp', 'e683b63d58d6b3ff181190ab0d57bf6d.jpg_1752136321', NULL, 41, 22976, 'image/webp', '2025-07-10 08:32:03', '2025-07-10 08:32:03', NULL),
(878, '6db3ba28a70f37541f624aec926af20b.jpg.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752136324/6db3ba28a70f37541f624aec926af20b.jpg_1752136323.webp', '6db3ba28a70f37541f624aec926af20b.jpg_1752136323', NULL, 41, 53238, 'image/webp', '2025-07-10 08:32:06', '2025-07-10 08:32:06', NULL),
(879, '0958459a15341cfd77ab618a1accc603.jpg.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752136327/0958459a15341cfd77ab618a1accc603.jpg_1752136326.webp', '0958459a15341cfd77ab618a1accc603.jpg_1752136326', NULL, 41, 52690, 'image/webp', '2025-07-10 08:32:09', '2025-07-10 08:32:09', NULL),
(880, 'a58203796200fcf1c53a807bdab9445f.jpg.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752136330/a58203796200fcf1c53a807bdab9445f.jpg_1752136329.webp', 'a58203796200fcf1c53a807bdab9445f.jpg_1752136329', NULL, 41, 52690, 'image/webp', '2025-07-10 08:32:12', '2025-07-10 08:32:12', NULL),
(881, 'e683b63d58d6b3ff181190ab0d57bf6d.jpg.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752136332/e683b63d58d6b3ff181190ab0d57bf6d.jpg_1752136332.webp', 'e683b63d58d6b3ff181190ab0d57bf6d.jpg_1752136332', NULL, 41, 22976, 'image/webp', '2025-07-10 08:32:14', '2025-07-10 08:32:14', NULL),
(882, 'may_nintendo_switch_2_bh_3_thang_46.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752138135/may_nintendo_switch_2_bh_3_thang_46_1752138133.webp', 'may_nintendo_switch_2_bh_3_thang_46_1752138133', 174, 40, 57899, 'image/jpeg', '2025-07-10 09:02:17', '2025-07-10 09:02:17', NULL),
(883, 'may_nintendo_switch_2_bh_3_thang_41.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752138137/may_nintendo_switch_2_bh_3_thang_41_1752138137.webp', 'may_nintendo_switch_2_bh_3_thang_41_1752138137', 174, 40, 75064, 'image/jpeg', '2025-07-10 09:02:20', '2025-07-10 09:02:20', NULL),
(884, 'may_nintendo_switch_2_bh_3_thang_42.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752138140/may_nintendo_switch_2_bh_3_thang_42_1752138140.webp', 'may_nintendo_switch_2_bh_3_thang_42_1752138140', 174, 40, 89491, 'image/jpeg', '2025-07-10 09:02:22', '2025-07-10 09:02:22', NULL),
(885, 'may_nintendo_switch_2_bh_3_thang_43.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752138143/may_nintendo_switch_2_bh_3_thang_43_1752138143.webp', 'may_nintendo_switch_2_bh_3_thang_43_1752138143', 174, 40, 93258, 'image/jpeg', '2025-07-10 09:02:25', '2025-07-10 09:02:25', NULL),
(886, 'may_nintendo_switch_2_bh_3_thang_44.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752138147/may_nintendo_switch_2_bh_3_thang_44_1752138146.webp', 'may_nintendo_switch_2_bh_3_thang_44_1752138146', 174, 40, 110901, 'image/jpeg', '2025-07-10 09:02:29', '2025-07-10 09:02:29', NULL),
(887, 'may_nintendo_switch_2_bh_3_thang_000.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752138150/may_nintendo_switch_2_bh_3_thang_000_1752138149.webp', 'may_nintendo_switch_2_bh_3_thang_000_1752138149', 174, 40, 170940, 'image/jpeg', '2025-07-10 09:02:32', '2025-07-10 09:02:32', NULL),
(888, 'may_nintendo_switch_2_bh_3_thang_47.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752138153/may_nintendo_switch_2_bh_3_thang_47_1752138153.webp', 'may_nintendo_switch_2_bh_3_thang_47_1752138153', 174, 40, 57281, 'image/jpeg', '2025-07-10 09:02:35', '2025-07-10 09:02:35', NULL),
(889, 'may_nintendo_switch_2_bh_3_thang_48.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752138156/may_nintendo_switch_2_bh_3_thang_48_1752138155.webp', 'may_nintendo_switch_2_bh_3_thang_48_1752138155', 174, 40, 57044, 'image/jpeg', '2025-07-10 09:02:37', '2025-07-10 09:02:37', NULL),
(890, 'may_nintendo_switch_2_bh_3_thang_45.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752138158/may_nintendo_switch_2_bh_3_thang_45_1752138158.webp', 'may_nintendo_switch_2_bh_3_thang_45_1752138158', 174, 40, 98716, 'image/jpeg', '2025-07-10 09:02:40', '2025-07-10 09:02:40', NULL),
(891, 'playstation_5_pro_43.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752139126/playstation_5_pro_43_1752139125.webp', 'playstation_5_pro_43_1752139125', 175, 40, 27904, 'image/jpeg', '2025-07-10 09:18:48', '2025-07-10 09:18:48', NULL),
(892, 'playstation_5_pro.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752139128/playstation_5_pro_1752139128.webp', 'playstation_5_pro_1752139128', 175, 40, 40537, 'image/jpeg', '2025-07-10 09:18:50', '2025-07-10 09:18:50', NULL),
(893, 'playstation_5_pro_41.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752139131/playstation_5_pro_41_1752139130.webp', 'playstation_5_pro_41_1752139130', 175, 40, 42736, 'image/jpeg', '2025-07-10 09:18:52', '2025-07-10 09:18:52', NULL),
(894, 'playstation_5_pro_42.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752139133/playstation_5_pro_42_1752139133.webp', 'playstation_5_pro_42_1752139133', 175, 40, 37086, 'image/jpeg', '2025-07-10 09:18:55', '2025-07-10 09:18:55', NULL),
(895, 'playstation_5_pro_44.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752139135/playstation_5_pro_44_1752139135.webp', 'playstation_5_pro_44_1752139135', 175, 40, 42779, 'image/jpeg', '2025-07-10 09:18:57', '2025-07-10 09:18:57', NULL),
(896, 'playstation_5_pro_45.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752139138/playstation_5_pro_45_1752139137.webp', 'playstation_5_pro_45_1752139137', 175, 40, 42016, 'image/jpeg', '2025-07-10 09:19:00', '2025-07-10 09:19:00', NULL),
(897, 'ai-generated-cute-teddy-bear-isolated-on-transparent-background-free-png.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752231447/ai-generated-cute-teddy-bear-isolated-on-transparent-background-free-png_1752231441.webp', 'ai-generated-cute-teddy-bear-isolated-on-transparent-background-free-png_1752231441', 116, 24, 718335, 'image/png', '2025-07-11 10:57:28', '2025-07-11 10:57:28', NULL),
(898, 'AirPods_Max_2024_Midnight_PDP_Image_Position_01__GBGB_2d8cb6fb-18f6-40e7-b466-774493040ab6.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752231511/AirPods_Max_2024_Midnight_PDP_Image_Position_01__GBGB_2d8cb6fb-18f6-40e7-b466-774493040ab6_1752231507.webp', 'AirPods_Max_2024_Midnight_PDP_Image_Position_01__GBGB_2d8cb6fb-18f6-40e7-b466-774493040ab6_1752231507', 116, 24, 496850, 'image/webp', '2025-07-11 10:58:32', '2025-07-11 11:00:29', '2025-07-11 11:00:29'),
(899, 'airpod-max.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752231639/airpod-max_1752231636.webp', 'airpod-max_1752231636', 116, 24, 164506, 'image/png', '2025-07-11 11:00:40', '2025-07-11 11:00:40', NULL),
(900, 'e683b63d58d6b3ff181190ab0d57bf6d.jpg.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752231787/e683b63d58d6b3ff181190ab0d57bf6d.jpg_1752231786.webp', 'e683b63d58d6b3ff181190ab0d57bf6d.jpg_1752231786', 116, 24, 22976, 'image/webp', '2025-07-11 11:03:08', '2025-07-12 04:29:24', '2025-07-12 04:29:24'),
(901, 'pngtree-white-loading-washing-machine-png-image_12531231.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752294547/pngtree-white-loading-washing-machine-png-image_12531231_1752294543.webp', 'pngtree-white-loading-washing-machine-png-image_12531231_1752294543', 116, 24, 67971, 'image/png', '2025-07-12 04:29:08', '2025-07-12 04:29:21', '2025-07-12 04:29:21'),
(902, '308169_nhjiel.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752294590/308169_nhjiel_1752294589.webp', '308169_nhjiel_1752294589', 116, 24, 70584, 'image/webp', '2025-07-12 04:29:52', '2025-07-12 04:29:52', NULL),
(903, 'osmopocket.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752294757/osmopocket_1752294754.webp', 'osmopocket_1752294754', 116, 24, 151987, 'image/png', '2025-07-12 04:32:38', '2025-07-12 04:32:38', NULL),
(904, 'TurnChairCozy.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752295172/TurnChairCozy_1752295170.webp', 'TurnChairCozy_1752295170', 116, 24, 119545, 'image/png', '2025-07-12 04:39:33', '2025-07-12 04:39:33', NULL),
(905, 'trek.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752295632/trek_1752295629.webp', 'trek_1752295629', 116, 24, 253575, 'image/png', '2025-07-12 04:47:13', '2025-07-12 04:47:13', NULL),
(906, 'maygiac.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752295764/maygiac_1752295763.webp', 'maygiac_1752295763', 116, 24, 102556, 'image/png', '2025-07-12 04:49:25', '2025-07-12 04:49:25', NULL),
(907, 'download.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752296080/download_1752296078.webp', 'download_1752296078', 116, 24, 89739, 'image/png', '2025-07-12 04:54:40', '2025-07-12 04:54:40', NULL),
(908, 'thucpham.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752296323/thucpham_1752296320.webp', 'thucpham_1752296320', 116, 24, 201531, 'image/png', '2025-07-12 04:58:43', '2025-07-12 04:58:43', NULL),
(909, 'thucung.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752296475/thucung_1752296472.webp', 'thucung_1752296472', 116, 24, 285380, 'image/png', '2025-07-12 05:01:16', '2025-07-12 05:01:16', NULL),
(910, 'dienthoai.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752296601/dienthoai_1752296599.webp', 'dienthoai_1752296599', 116, 24, 220967, 'image/png', '2025-07-12 05:03:21', '2025-07-12 05:03:21', NULL),
(911, 'diengiadung.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752296693/diengiadung_1752296691.webp', 'diengiadung_1752296691', 116, 24, 211892, 'image/png', '2025-07-12 05:04:54', '2025-07-12 05:04:54', NULL),
(912, 'suckhoesacdep.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752297398/suckhoesacdep_1752297396.webp', 'suckhoesacdep_1752297396', 116, 24, 93288, 'image/png', '2025-07-12 05:16:38', '2025-07-12 05:16:38', NULL),
(913, 'suckhoe.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752297633/suckhoe_1752297631.webp', 'suckhoe_1752297631', 116, 24, 170846, 'image/png', '2025-07-12 05:20:34', '2025-07-12 05:20:34', NULL),
(914, '2024_Escape1Disc_Sandshell_0.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752308577/2024_Escape1Disc_Sandshell_0_1752308570.webp', '2024_Escape1Disc_Sandshell_0_1752308570', 176, 40, 239019, 'image/jpeg', '2025-07-12 08:22:58', '2025-07-12 08:22:58', NULL),
(915, '2024_Escape1Disc_Sandshell_1.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752308581/2024_Escape1Disc_Sandshell_1_1752308578.webp', '2024_Escape1Disc_Sandshell_1_1752308578', 176, 40, 240463, 'image/jpeg', '2025-07-12 08:23:01', '2025-07-12 08:23:01', NULL),
(916, '2024_Escape1Disc_SnowDrift_0.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752308584/2024_Escape1Disc_SnowDrift_0_1752308582.webp', '2024_Escape1Disc_SnowDrift_0_1752308582', 176, 40, 230837, 'image/jpeg', '2025-07-12 08:23:05', '2025-07-12 08:23:05', NULL),
(917, '2024_Escape1Disc_SnowDrift_1.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752308588/2024_Escape1Disc_SnowDrift_1_1752308585.webp', '2024_Escape1Disc_SnowDrift_1_1752308585', 176, 40, 271006, 'image/jpeg', '2025-07-12 08:23:08', '2025-07-12 08:23:08', NULL),
(918, '2024_Escape1Disc_Sandshell_2.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752308591/2024_Escape1Disc_Sandshell_2_1752308589.webp', '2024_Escape1Disc_Sandshell_2_1752308589', 176, 40, 276263, 'image/jpeg', '2025-07-12 08:23:12', '2025-07-12 08:23:12', NULL),
(919, '2024_Escape1Disc_Sandshell_4.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752308595/2024_Escape1Disc_Sandshell_4_1752308592.webp', '2024_Escape1Disc_Sandshell_4_1752308592', 176, 40, 302386, 'image/jpeg', '2025-07-12 08:23:15', '2025-07-12 08:23:15', NULL),
(920, 'z-6135891330004-466-cf-359117359-f-1877-cf-4-be-4014524-a_3.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752308609/z-6135891330004-466-cf-359117359-f-1877-cf-4-be-4014524-a_3_1752308607.webp', 'z-6135891330004-466-cf-359117359-f-1877-cf-4-be-4014524-a_3_1752308607', 176, 40, 290392, 'image/jpeg', '2025-07-12 08:23:30', '2025-07-12 08:23:30', NULL),
(921, 'feedback-02-4.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752308614/feedback-02-4_1752308610.webp', 'feedback-02-4_1752308610', 176, 40, 749365, 'image/jpeg', '2025-07-12 08:23:35', '2025-07-12 08:23:35', NULL),
(922, 'touring-giant-escape-1-disc-2024.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752308619/touring-giant-escape-1-disc-2024_1752308615.webp', 'touring-giant-escape-1-disc-2024_1752308615', 176, 40, 886910, 'image/jpeg', '2025-07-12 08:23:40', '2025-07-12 08:23:40', NULL),
(923, 'iphone-15-black-700x700-1.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403971/iphone-15-black-700x700-1_1752403966.webp', 'iphone-15-black-700x700-1_1752403966', 177, 40, 7662, 'image/webp', '2025-07-13 10:52:52', '2025-07-13 10:52:52', NULL),
(924, 'iphone-15-blue-700x700-1.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403974/iphone-15-blue-700x700-1_1752403973.webp', 'iphone-15-blue-700x700-1_1752403973', 177, 40, 8804, 'image/webp', '2025-07-13 10:52:55', '2025-07-13 10:52:55', NULL),
(925, 'iphone-15-blue-42.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403977/iphone-15-blue-42_1752403975.webp', 'iphone-15-blue-42_1752403975', 177, 40, 53338, 'image/jpeg', '2025-07-13 10:52:57', '2025-07-13 10:52:57', NULL),
(926, 'iphone-15-42.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403980/iphone-15-42_1752403978.webp', 'iphone-15-42_1752403978', 177, 40, 67715, 'image/jpeg', '2025-07-13 10:53:00', '2025-07-13 10:53:00', NULL),
(927, 'iphone-15-green-700x700-1.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403982/iphone-15-green-700x700-1_1752403981.webp', 'iphone-15-green-700x700-1_1752403981', 177, 40, 8766, 'image/webp', '2025-07-13 10:53:03', '2025-07-13 10:53:03', NULL),
(928, 'iphone-15-41.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403985/iphone-15-41_1752403983.webp', 'iphone-15-41_1752403983', 177, 40, 106285, 'image/jpeg', '2025-07-13 10:53:06', '2025-07-13 10:53:06', NULL),
(929, 'iphone-15-yellow-700x700-1.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403988/iphone-15-yellow-700x700-1_1752403987.webp', 'iphone-15-yellow-700x700-1_1752403987', 177, 40, 9224, 'image/webp', '2025-07-13 10:53:09', '2025-07-13 10:53:09', NULL),
(930, 'iphone-15-43.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403991/iphone-15-43_1752403989.webp', 'iphone-15-43_1752403989', 177, 40, 135092, 'image/jpeg', '2025-07-13 10:53:11', '2025-07-13 10:53:11', NULL);
INSERT INTO `media_files` (`id`, `name`, `url`, `public_id`, `media_folder_id`, `user_id`, `size`, `mime_type`, `created_at`, `updated_at`, `deleted_at`) VALUES
(931, 'iphone-15-blue-43.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403994/iphone-15-blue-43_1752403992.webp', 'iphone-15-blue-43_1752403992', 177, 40, 148876, 'image/jpeg', '2025-07-13 10:53:14', '2025-07-13 10:53:14', NULL),
(932, 'iphone-15-plus-pink.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403997/iphone-15-plus-pink_1752403995.webp', 'iphone-15-plus-pink_1752403995', 177, 40, 120619, 'image/jpeg', '2025-07-13 10:53:18', '2025-07-13 10:53:18', NULL),
(933, 'apple-logo-png-dallas-shootings-don-add-are-speech-zones-used-4.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752567569/apple-logo-png-dallas-shootings-don-add-are-speech-zones-used-4_1752567566.webp', 'apple-logo-png-dallas-shootings-don-add-are-speech-zones-used-4_1752567566', 179, 24, 54493, 'image/png', '2025-07-15 08:19:31', '2025-07-15 08:19:31', NULL),
(934, 'sony-logo-300px-square.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752570281/sony-logo-300px-square_1752570278.webp', 'sony-logo-300px-square_1752570278', 179, 24, 5741, 'image/png', '2025-07-15 09:04:42', '2025-07-15 09:04:42', NULL),
(935, 'Nintendo_Switch_logo.svg.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752574559/Nintendo_Switch_logo.svg_1752574555.webp', 'Nintendo_Switch_logo.svg_1752574555', 179, 24, 19809, 'image/png', '2025-07-15 10:16:01', '2025-07-15 10:16:01', NULL),
(936, 'may-ps5-slim-standardl-edition-korea-41.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752651766/may-ps5-slim-standardl-edition-korea-41_1752651762.webp', 'may-ps5-slim-standardl-edition-korea-41_1752651762', 175, 40, 46490, 'image/jpeg', '2025-07-16 07:42:48', '2025-07-16 07:42:48', NULL),
(937, 'may-ps5-slim-standardl-edition-korea-42.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752651770/may-ps5-slim-standardl-edition-korea-42_1752651769.webp', 'may-ps5-slim-standardl-edition-korea-42_1752651769', 175, 40, 51464, 'image/jpeg', '2025-07-16 07:42:51', '2025-07-16 07:42:51', NULL),
(938, 'may-ps5-slim-standardl-edition-korea-43.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752651773/may-ps5-slim-standardl-edition-korea-43_1752651772.webp', 'may-ps5-slim-standardl-edition-korea-43_1752651772', 175, 40, 77702, 'image/jpeg', '2025-07-16 07:42:54', '2025-07-16 07:42:54', NULL),
(939, 'may-ps5-slim-standard-edition-41.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752651776/may-ps5-slim-standard-edition-41_1752651774.webp', 'may-ps5-slim-standard-edition-41_1752651774', 175, 40, 89465, 'image/jpeg', '2025-07-16 07:42:57', '2025-07-16 07:42:57', NULL),
(940, 'may-ps5-slim-standardl-edition-korea-00.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752651779/may-ps5-slim-standardl-edition-korea-00_1752651777.webp', 'may-ps5-slim-standardl-edition-korea-00_1752651777', 175, 40, 85967, 'image/jpeg', '2025-07-16 07:43:00', '2025-07-16 07:43:00', NULL),
(941, 'may-ps5-slim-standardl-edition-korea-44.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752651781/may-ps5-slim-standardl-edition-korea-44_1752651780.webp', 'may-ps5-slim-standardl-edition-korea-44_1752651780', 175, 40, 96678, 'image/jpeg', '2025-07-16 07:43:03', '2025-07-16 07:43:03', NULL),
(942, '22624-PS5-DUALSENSE-WIRELESS-CONTROLLER-GHOST-OF-YOTEI-GOLD-LIMITED-EDITION-43.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752652287/22624-PS5-DUALSENSE-WIRELESS-CONTROLLER-GHOST-OF-YOTEI-GOLD-LIMITED-EDITION-43_1752652285.webp', '22624-PS5-DUALSENSE-WIRELESS-CONTROLLER-GHOST-OF-YOTEI-GOLD-LIMITED-EDITION-43_1752652285', 175, 40, 8622, 'image/webp', '2025-07-16 07:51:28', '2025-07-16 07:51:28', NULL),
(943, '22624-PS5-DUALSENSE-WIRELESS-CONTROLLER-GHOST-OF-YOTEI-BLACK-LIMITED-EDITION-00.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752652289/22624-PS5-DUALSENSE-WIRELESS-CONTROLLER-GHOST-OF-YOTEI-BLACK-LIMITED-EDITION-00_1752652288.webp', '22624-PS5-DUALSENSE-WIRELESS-CONTROLLER-GHOST-OF-YOTEI-BLACK-LIMITED-EDITION-00_1752652288', 175, 40, 25098, 'image/webp', '2025-07-16 07:51:30', '2025-07-16 07:51:30', NULL),
(944, '22624-PS5-DUALSENSE-WIRELESS-CONTROLLER-GHOST-OF-YOTEI-BLACK-LIMITED-EDITION-41.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752652291/22624-PS5-DUALSENSE-WIRELESS-CONTROLLER-GHOST-OF-YOTEI-BLACK-LIMITED-EDITION-41_1752652290.webp', '22624-PS5-DUALSENSE-WIRELESS-CONTROLLER-GHOST-OF-YOTEI-BLACK-LIMITED-EDITION-41_1752652290', 175, 40, 16988, 'image/webp', '2025-07-16 07:51:32', '2025-07-16 07:51:32', NULL),
(945, '22624-PS5-DUALSENSE-WIRELESS-CONTROLLER-GHOST-OF-YOTEI-GOLD-LIMITED-EDITION-00.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752652294/22624-PS5-DUALSENSE-WIRELESS-CONTROLLER-GHOST-OF-YOTEI-GOLD-LIMITED-EDITION-00_1752652293.webp', '22624-PS5-DUALSENSE-WIRELESS-CONTROLLER-GHOST-OF-YOTEI-GOLD-LIMITED-EDITION-00_1752652293', 175, 40, 21908, 'image/webp', '2025-07-16 07:51:35', '2025-07-16 07:51:35', NULL),
(946, '22624-PS5-DUALSENSE-WIRELESS-CONTROLLER-GHOST-OF-YOTEI-GOLD-LIMITED-EDITION-44.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752652296/22624-PS5-DUALSENSE-WIRELESS-CONTROLLER-GHOST-OF-YOTEI-GOLD-LIMITED-EDITION-44_1752652295.webp', '22624-PS5-DUALSENSE-WIRELESS-CONTROLLER-GHOST-OF-YOTEI-GOLD-LIMITED-EDITION-44_1752652295', 175, 40, 7020, 'image/webp', '2025-07-16 07:51:37', '2025-07-16 07:51:37', NULL),
(947, 'dualsense-ps5-edge-wireless-controller-28-1.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752653189/dualsense-ps5-edge-wireless-controller-28-1_1752653187.webp', 'dualsense-ps5-edge-wireless-controller-28-1_1752653187', 175, 40, 11456, 'image/webp', '2025-07-16 08:06:31', '2025-07-16 08:06:31', NULL),
(948, 'dualsense-ps5-edge-wireless-controller-00-1400x1400-1.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752653192/dualsense-ps5-edge-wireless-controller-00-1400x1400-1_1752653191.webp', 'dualsense-ps5-edge-wireless-controller-00-1400x1400-1_1752653191', 175, 40, 30408, 'image/webp', '2025-07-16 08:06:33', '2025-07-16 08:06:33', NULL),
(949, 'dualsense-ps5-edge-wireless-controller-41-1400x1400-1.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752653195/dualsense-ps5-edge-wireless-controller-41-1400x1400-1_1752653194.webp', 'dualsense-ps5-edge-wireless-controller-41-1400x1400-1_1752653194', 175, 40, 24244, 'image/webp', '2025-07-16 08:06:37', '2025-07-16 08:06:37', NULL),
(950, 'dualsense-ps5-edge-wireless-controller-42-1400x1400-1.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752653198/dualsense-ps5-edge-wireless-controller-42-1400x1400-1_1752653197.webp', 'dualsense-ps5-edge-wireless-controller-42-1400x1400-1_1752653197', 175, 40, 18146, 'image/webp', '2025-07-16 08:06:39', '2025-07-16 08:06:39', NULL),
(951, 'dualsense-ps5-edge-wireless-controller-43-1400x1400-1.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752653200/dualsense-ps5-edge-wireless-controller-43-1400x1400-1_1752653200.webp', 'dualsense-ps5-edge-wireless-controller-43-1400x1400-1_1752653200', 175, 40, 27788, 'image/webp', '2025-07-16 08:06:42', '2025-07-16 08:06:42', NULL),
(952, 'dualsense-ps5-edge-wireless-controller-44-1400x1400-1.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752653203/dualsense-ps5-edge-wireless-controller-44-1400x1400-1_1752653202.webp', 'dualsense-ps5-edge-wireless-controller-44-1400x1400-1_1752653202', 175, 40, 19780, 'image/webp', '2025-07-16 08:06:44', '2025-07-16 08:06:44', NULL),
(953, 'dualsense-ps5-edge-wireless-controller-45-1400x1400-1.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752653205/dualsense-ps5-edge-wireless-controller-45-1400x1400-1_1752653204.webp', 'dualsense-ps5-edge-wireless-controller-45-1400x1400-1_1752653204', 175, 40, 17524, 'image/webp', '2025-07-16 08:06:47', '2025-07-16 08:06:47', NULL),
(954, 'dualsense-ps5-edge-wireless-controller-46-1400x1400-1.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752653208/dualsense-ps5-edge-wireless-controller-46-1400x1400-1_1752653207.webp', 'dualsense-ps5-edge-wireless-controller-46-1400x1400-1_1752653207', 175, 40, 25576, 'image/webp', '2025-07-16 08:06:49', '2025-07-16 08:06:49', NULL),
(955, 'Macbook vàng_1752723952.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752811325/Macbook%20v%C3%A0ng_1752723952_1752811322.webp', 'Macbook vàng_1752723952_1752811322', 175, 40, 29622, 'image/webp', '2025-07-18 04:02:06', '2025-07-18 04:02:06', NULL),
(956, 'mac m4 xanh dương_1752723958.webp', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752811327/mac%20m4%20xanh%20d%C6%B0%C6%A1ng_1752723958_1752811326.webp', 'mac m4 xanh dương_1752723958_1752811326', 175, 40, 29040, 'image/webp', '2025-07-18 04:02:09', '2025-07-18 04:02:09', NULL),
(957, 'rog_strix_g16_2025_g615_5_1ece0e_23affdf56af4498db2a7d529b4d0b982_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752853395/rog_strix_g16_2025_g615_5_1ece0e_23affdf56af4498db2a7d529b4d0b982_master_1752851455.webp', 'rog_strix_g16_2025_g615_5_1ece0e_23affdf56af4498db2a7d529b4d0b982_master_1752851455', 181, 42, 60491, 'image/png', '2025-07-18 15:10:57', '2025-07-18 15:11:21', '2025-07-18 15:11:21'),
(958, 'rog_strix_g16_2025_g615_6_f9607e_a3bcaddeb6c74975824ad87dc6c6e904_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752853395/rog_strix_g16_2025_g615_6_f9607e_a3bcaddeb6c74975824ad87dc6c6e904_master_1752851455.webp', 'rog_strix_g16_2025_g615_6_f9607e_a3bcaddeb6c74975824ad87dc6c6e904_master_1752851455', 181, 42, 440147, 'image/png', '2025-07-18 15:10:58', '2025-07-18 15:11:21', '2025-07-18 15:11:21'),
(959, 'rog_strix_g16_2025_g615_8_ae499a_790f120226fb4843a27e00aefa552298_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752853400/rog_strix_g16_2025_g615_8_ae499a_790f120226fb4843a27e00aefa552298_master_1752851457.webp', 'rog_strix_g16_2025_g615_8_ae499a_790f120226fb4843a27e00aefa552298_master_1752851457', 181, 42, 308148, 'image/png', '2025-07-18 15:11:03', '2025-07-18 15:11:21', '2025-07-18 15:11:21'),
(960, 'rog_strix_g16_2025_g615_1_b1f1f2_f3bcea8a1f734cbb80ac9481a2dfa9fa_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752853400/rog_strix_g16_2025_g615_1_b1f1f2_f3bcea8a1f734cbb80ac9481a2dfa9fa_master_1752851455.webp', 'rog_strix_g16_2025_g615_1_b1f1f2_f3bcea8a1f734cbb80ac9481a2dfa9fa_master_1752851455', 181, 42, 469718, 'image/png', '2025-07-18 15:11:03', '2025-07-18 15:11:21', '2025-07-18 15:11:21'),
(961, 'rog_strix_g16_2025_g615_4_036524_a23cac35f63b4a738c5a6456a76250ad_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752853400/rog_strix_g16_2025_g615_4_036524_a23cac35f63b4a738c5a6456a76250ad_master_1752851458.webp', 'rog_strix_g16_2025_g615_4_036524_a23cac35f63b4a738c5a6456a76250ad_master_1752851458', 181, 42, 96610, 'image/png', '2025-07-18 15:11:03', '2025-07-18 15:11:28', '2025-07-18 15:11:28'),
(962, 'rog_strix_g16_2025_g615_7_c8855b_983746aa5523438eaa5b5f5bf0df82eb_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752853400/rog_strix_g16_2025_g615_7_c8855b_983746aa5523438eaa5b5f5bf0df82eb_master_1752851457.webp', 'rog_strix_g16_2025_g615_7_c8855b_983746aa5523438eaa5b5f5bf0df82eb_master_1752851457', 181, 42, 147971, 'image/png', '2025-07-18 15:11:03', '2025-07-18 15:11:28', '2025-07-18 15:11:28'),
(963, 'rog_strix_g16_2025_g615_2_df1974_26bd56e2751f43d6aaa46e1ece76b626_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752853403/rog_strix_g16_2025_g615_2_df1974_26bd56e2751f43d6aaa46e1ece76b626_master_1752851457.webp', 'rog_strix_g16_2025_g615_2_df1974_26bd56e2751f43d6aaa46e1ece76b626_master_1752851457', 181, 42, 434457, 'image/png', '2025-07-18 15:11:06', '2025-07-18 15:11:28', '2025-07-18 15:11:28'),
(964, 'rog_strix_g16_2025_g615_3_d66ab4_fea81aff005a461e9832dc9c4b104953_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752853404/rog_strix_g16_2025_g615_3_d66ab4_fea81aff005a461e9832dc9c4b104953_master_1752851455.webp', 'rog_strix_g16_2025_g615_3_d66ab4_fea81aff005a461e9832dc9c4b104953_master_1752851455', 181, 42, 444153, 'image/png', '2025-07-18 15:11:07', '2025-07-18 15:11:28', '2025-07-18 15:11:28'),
(965, 'rog_strix_g16_2025_g615_4_036524_a23cac35f63b4a738c5a6456a76250ad_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752853435/rog_strix_g16_2025_g615_4_036524_a23cac35f63b4a738c5a6456a76250ad_master_1752851495.webp', 'rog_strix_g16_2025_g615_4_036524_a23cac35f63b4a738c5a6456a76250ad_master_1752851495', 181, 42, 96610, 'image/png', '2025-07-18 15:11:38', '2025-07-18 15:11:38', NULL),
(966, 'rog_strix_g16_2025_g615_2_df1974_26bd56e2751f43d6aaa46e1ece76b626_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752853435/rog_strix_g16_2025_g615_2_df1974_26bd56e2751f43d6aaa46e1ece76b626_master_1752851495.webp', 'rog_strix_g16_2025_g615_2_df1974_26bd56e2751f43d6aaa46e1ece76b626_master_1752851495', 181, 42, 434457, 'image/png', '2025-07-18 15:11:38', '2025-07-18 15:11:38', NULL),
(967, 'rog_strix_g16_2025_g615_3_d66ab4_fea81aff005a461e9832dc9c4b104953_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752853435/rog_strix_g16_2025_g615_3_d66ab4_fea81aff005a461e9832dc9c4b104953_master_1752851495.webp', 'rog_strix_g16_2025_g615_3_d66ab4_fea81aff005a461e9832dc9c4b104953_master_1752851495', 181, 42, 444153, 'image/png', '2025-07-18 15:11:38', '2025-07-18 15:11:38', NULL),
(968, 'rog_strix_g16_2025_g615_1_b1f1f2_f3bcea8a1f734cbb80ac9481a2dfa9fa_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752853436/rog_strix_g16_2025_g615_1_b1f1f2_f3bcea8a1f734cbb80ac9481a2dfa9fa_master_1752851495.webp', 'rog_strix_g16_2025_g615_1_b1f1f2_f3bcea8a1f734cbb80ac9481a2dfa9fa_master_1752851495', 181, 42, 469718, 'image/png', '2025-07-18 15:11:39', '2025-07-18 15:11:39', NULL),
(969, 'rog_strix_g16_2025_g615_5_1ece0e_23affdf56af4498db2a7d529b4d0b982_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752853448/rog_strix_g16_2025_g615_5_1ece0e_23affdf56af4498db2a7d529b4d0b982_master_1752851508.webp', 'rog_strix_g16_2025_g615_5_1ece0e_23affdf56af4498db2a7d529b4d0b982_master_1752851508', 181, 42, 60491, 'image/png', '2025-07-18 15:11:51', '2025-07-18 15:11:51', NULL),
(970, 'rog_strix_g16_2025_g615_7_c8855b_983746aa5523438eaa5b5f5bf0df82eb_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752853448/rog_strix_g16_2025_g615_7_c8855b_983746aa5523438eaa5b5f5bf0df82eb_master_1752851508.webp', 'rog_strix_g16_2025_g615_7_c8855b_983746aa5523438eaa5b5f5bf0df82eb_master_1752851508', 181, 42, 147971, 'image/png', '2025-07-18 15:11:51', '2025-07-18 15:11:51', NULL),
(971, 'rog_strix_g16_2025_g615_6_f9607e_a3bcaddeb6c74975824ad87dc6c6e904_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752853449/rog_strix_g16_2025_g615_6_f9607e_a3bcaddeb6c74975824ad87dc6c6e904_master_1752851508.webp', 'rog_strix_g16_2025_g615_6_f9607e_a3bcaddeb6c74975824ad87dc6c6e904_master_1752851508', 181, 42, 440147, 'image/png', '2025-07-18 15:11:51', '2025-07-18 15:11:51', NULL),
(972, 'rog_strix_g16_2025_g615_8_ae499a_790f120226fb4843a27e00aefa552298_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752853449/rog_strix_g16_2025_g615_8_ae499a_790f120226fb4843a27e00aefa552298_master_1752851508.webp', 'rog_strix_g16_2025_g615_8_ae499a_790f120226fb4843a27e00aefa552298_master_1752851508', 181, 42, 308148, 'image/png', '2025-07-18 15:11:52', '2025-07-18 15:11:52', NULL),
(973, '07_scar_new_16_l_39eea313e4234ba9a06b8093d73fd6f5_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752854257/07_scar_new_16_l_39eea313e4234ba9a06b8093d73fd6f5_master_1752852317.webp', '07_scar_new_16_l_39eea313e4234ba9a06b8093d73fd6f5_master_1752852317', 183, 42, 75931, 'image/png', '2025-07-18 15:25:20', '2025-07-18 15:25:20', NULL),
(974, '12_scar_new_16_l_8d850023cf394cb5be679c3be7540e5f_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752854258/12_scar_new_16_l_8d850023cf394cb5be679c3be7540e5f_master_1752852317.webp', '12_scar_new_16_l_8d850023cf394cb5be679c3be7540e5f_master_1752852317', 183, 42, 103660, 'image/png', '2025-07-18 15:25:20', '2025-07-18 15:25:20', NULL),
(975, '10_scar_new_16_l_c5b3493b119f4e7eafdd17918c363d7e_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752854258/10_scar_new_16_l_c5b3493b119f4e7eafdd17918c363d7e_master_1752852317.webp', '10_scar_new_16_l_c5b3493b119f4e7eafdd17918c363d7e_master_1752852317', 183, 42, 204406, 'image/png', '2025-07-18 15:25:21', '2025-07-18 15:25:21', NULL),
(976, '13_scar_new_16_l_a09ee07810044999897eb95270ef6b86_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752854259/13_scar_new_16_l_a09ee07810044999897eb95270ef6b86_master_1752852317.webp', '13_scar_new_16_l_a09ee07810044999897eb95270ef6b86_master_1752852317', 183, 42, 543020, 'image/png', '2025-07-18 15:25:22', '2025-07-18 15:25:22', NULL),
(977, '02_scar_new_16_l_06c9d4802df5460eb8e46b54335152db_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752854260/02_scar_new_16_l_06c9d4802df5460eb8e46b54335152db_master_1752852320.webp', '02_scar_new_16_l_06c9d4802df5460eb8e46b54335152db_master_1752852320', 183, 42, 371840, 'image/png', '2025-07-18 15:25:23', '2025-07-18 15:25:23', NULL),
(978, '06_scar_new_16_l_a4fd425ea57841628dff63fa8714799e_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752854260/06_scar_new_16_l_a4fd425ea57841628dff63fa8714799e_master_1752852321.webp', '06_scar_new_16_l_a4fd425ea57841628dff63fa8714799e_master_1752852321', 183, 42, 78024, 'image/png', '2025-07-18 15:25:23', '2025-07-18 15:25:23', NULL),
(979, '11_scar_new_16_l_47a3b04a316346efab618262a0379d7f_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752854261/11_scar_new_16_l_47a3b04a316346efab618262a0379d7f_master_1752852320.webp', '11_scar_new_16_l_47a3b04a316346efab618262a0379d7f_master_1752852320', 183, 42, 202977, 'image/png', '2025-07-18 15:25:23', '2025-07-18 15:25:23', NULL),
(980, '05_scar_new_16_l_8be9fd8837e446ca9222459eea0c5a07_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752854261/05_scar_new_16_l_8be9fd8837e446ca9222459eea0c5a07_master_1752852321.webp', '05_scar_new_16_l_8be9fd8837e446ca9222459eea0c5a07_master_1752852321', 183, 42, 329838, 'image/png', '2025-07-18 15:25:23', '2025-07-18 15:25:23', NULL),
(981, '14_scar_new_16_l_25b38e9b922b40f4b44c53fd28d36a5a_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752854261/14_scar_new_16_l_25b38e9b922b40f4b44c53fd28d36a5a_master_1752852320.webp', '14_scar_new_16_l_25b38e9b922b40f4b44c53fd28d36a5a_master_1752852320', 183, 42, 313448, 'image/png', '2025-07-18 15:25:24', '2025-07-18 15:25:24', NULL),
(982, '04_scar_new_16_l_fbd7fbf73e7a4573a942996d5039a284_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752854262/04_scar_new_16_l_fbd7fbf73e7a4573a942996d5039a284_master_1752852322.webp', '04_scar_new_16_l_fbd7fbf73e7a4573a942996d5039a284_master_1752852322', 183, 42, 327448, 'image/png', '2025-07-18 15:25:25', '2025-07-18 15:25:25', NULL),
(983, 'rog_flow_z13_black_13_kb_1_0990a2e014a74b45b80e1cb765b63526_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752854816/rog_flow_z13_black_13_kb_1_0990a2e014a74b45b80e1cb765b63526_master_1752852877.webp', 'rog_flow_z13_black_13_kb_1_0990a2e014a74b45b80e1cb765b63526_master_1752852877', 184, 42, 34690, 'image/png', '2025-07-18 15:34:39', '2025-07-18 15:34:39', NULL),
(984, 'rog_flow_z13_black_12_0e52c89d8cd44c398773a56ad7540964_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752854817/rog_flow_z13_black_12_0e52c89d8cd44c398773a56ad7540964_master_1752852877.webp', 'rog_flow_z13_black_12_0e52c89d8cd44c398773a56ad7540964_master_1752852877', 184, 42, 36185, 'image/png', '2025-07-18 15:34:39', '2025-07-18 15:34:39', NULL),
(985, 'rog_flow_z13_black_09_kb_16add9c2f1e8415397cba27bf7dc27f0_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752854830/rog_flow_z13_black_09_kb_16add9c2f1e8415397cba27bf7dc27f0_master_1752852877.webp', 'rog_flow_z13_black_09_kb_16add9c2f1e8415397cba27bf7dc27f0_master_1752852877', 184, 42, 127025, 'image/png', '2025-07-18 15:34:53', '2025-07-18 15:34:53', NULL),
(986, 'rog_flow_z13_black_05_kb_acbbc72472244bc79c5e4961d34e920e_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752854833/rog_flow_z13_black_05_kb_acbbc72472244bc79c5e4961d34e920e_master_1752852877.webp', 'rog_flow_z13_black_05_kb_acbbc72472244bc79c5e4961d34e920e_master_1752852877', 184, 42, 206588, 'image/png', '2025-07-18 15:34:55', '2025-07-18 15:34:55', NULL),
(987, 'rog_flow_z13_black_02_1b28a61486774478bbba25ca41754ce1_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752854838/rog_flow_z13_black_02_1b28a61486774478bbba25ca41754ce1_master_1752852879.webp', 'rog_flow_z13_black_02_1b28a61486774478bbba25ca41754ce1_master_1752852879', 184, 42, 161936, 'image/png', '2025-07-18 15:35:00', '2025-07-18 15:35:00', NULL),
(988, 'rog_flow_z13_black_01_1_5d3af0b756354f99a57b084de6a5ad66_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752854841/rog_flow_z13_black_01_1_5d3af0b756354f99a57b084de6a5ad66_master_1752852879.webp', 'rog_flow_z13_black_01_1_5d3af0b756354f99a57b084de6a5ad66_master_1752852879', 184, 42, 272572, 'image/png', '2025-07-18 15:35:04', '2025-07-18 15:35:04', NULL),
(989, 'rog_flow_z13_black_03_1_9fa44d4f07044198adc32164a5452a3c_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752854848/rog_flow_z13_black_03_1_9fa44d4f07044198adc32164a5452a3c_master_1752852880.webp', 'rog_flow_z13_black_03_1_9fa44d4f07044198adc32164a5452a3c_master_1752852880', 184, 42, 441247, 'image/png', '2025-07-18 15:35:11', '2025-07-18 15:35:11', NULL),
(990, 'rog_flow_z13_black_04_kb_46f516564c024a50863fab8cc3b9567f_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752854851/rog_flow_z13_black_04_kb_46f516564c024a50863fab8cc3b9567f_master_1752852879.webp', 'rog_flow_z13_black_04_kb_46f516564c024a50863fab8cc3b9567f_master_1752852879', 184, 42, 385409, 'image/png', '2025-07-18 15:35:14', '2025-07-18 15:35:14', NULL),
(991, '1024__1__1af05ad0a2fe40ea837ab59373d890ab_compact.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752855125/1024__1__1af05ad0a2fe40ea837ab59373d890ab_compact_1752853184.webp', '1024__1__1af05ad0a2fe40ea837ab59373d890ab_compact_1752853184', 187, 42, 15426, 'image/png', '2025-07-18 15:39:48', '2025-07-18 15:39:48', NULL),
(992, '1024__3__136644b70f374948814bd152efbd4c94_compact.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752855128/1024__3__136644b70f374948814bd152efbd4c94_compact_1752853188.webp', '1024__3__136644b70f374948814bd152efbd4c94_compact_1752853188', 187, 42, 14656, 'image/png', '2025-07-18 15:39:50', '2025-07-18 15:39:50', NULL),
(993, '1024__4__f7b6517cd2f8454da9a6682375e21da1_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752855145/1024__4__f7b6517cd2f8454da9a6682375e21da1_master_1752853184.webp', '1024__4__f7b6517cd2f8454da9a6682375e21da1_master_1752853184', 187, 42, 207377, 'image/png', '2025-07-18 15:40:07', '2025-07-18 15:40:07', NULL),
(994, '1024__5__97fb8f2a815c45bb917610e440d93f60_compact.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752855148/1024__5__97fb8f2a815c45bb917610e440d93f60_compact_1752853208.webp', '1024__5__97fb8f2a815c45bb917610e440d93f60_compact_1752853208', 187, 42, 12115, 'image/png', '2025-07-18 15:40:10', '2025-07-18 15:40:10', NULL),
(995, '1024__4__f7b6517cd2f8454da9a6682375e21da1_compact.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752855151/1024__4__f7b6517cd2f8454da9a6682375e21da1_compact_1752853211.webp', '1024__4__f7b6517cd2f8454da9a6682375e21da1_compact_1752853211', 187, 42, 9526, 'image/png', '2025-07-18 15:40:13', '2025-07-18 15:40:13', NULL),
(996, '1024__2__29cd81192dea4635ad9b1bea0df181f9_compact.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752855154/1024__2__29cd81192dea4635ad9b1bea0df181f9_compact_1752853214.webp', '1024__2__29cd81192dea4635ad9b1bea0df181f9_compact_1752853214', 187, 42, 12634, 'image/png', '2025-07-18 15:40:16', '2025-07-18 15:40:16', NULL),
(997, '1024__2__29cd81192dea4635ad9b1bea0df181f9_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752855155/1024__2__29cd81192dea4635ad9b1bea0df181f9_master_1752853184.webp', '1024__2__29cd81192dea4635ad9b1bea0df181f9_master_1752853184', 187, 42, 278063, 'image/png', '2025-07-18 15:40:18', '2025-07-18 15:40:18', NULL),
(998, '1024__5__97fb8f2a815c45bb917610e440d93f60_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752855155/1024__5__97fb8f2a815c45bb917610e440d93f60_master_1752853191.webp', '1024__5__97fb8f2a815c45bb917610e440d93f60_master_1752853191', 187, 42, 267122, 'image/png', '2025-07-18 15:40:18', '2025-07-18 15:40:18', NULL),
(999, '1024__1__1af05ad0a2fe40ea837ab59373d890ab_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752855158/1024__1__1af05ad0a2fe40ea837ab59373d890ab_master_1752853188.webp', '1024__1__1af05ad0a2fe40ea837ab59373d890ab_master_1752853188', 187, 42, 334102, 'image/png', '2025-07-18 15:40:21', '2025-07-18 15:40:21', NULL),
(1000, '1024__3__136644b70f374948814bd152efbd4c94_master.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752855161/1024__3__136644b70f374948814bd152efbd4c94_master_1752853188.webp', '1024__3__136644b70f374948814bd152efbd4c94_master_1752853188', 187, 42, 340589, 'image/png', '2025-07-18 15:40:23', '2025-07-18 15:40:23', NULL),
(1001, 'legion_pro_5_16iax10_ct1_04_cbee7fecc2f34c47a92335471bd06751_compact.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752855933/legion_pro_5_16iax10_ct1_04_cbee7fecc2f34c47a92335471bd06751_compact_1752853993.webp', 'legion_pro_5_16iax10_ct1_04_cbee7fecc2f34c47a92335471bd06751_compact_1752853993', 189, 42, 9686, 'image/png', '2025-07-18 15:53:15', '2025-07-18 15:53:15', NULL),
(1002, 'legion_pro_5_16iax10_ct1_06_320a275b4ee34f1fb35f06cf1b843129_compact.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752855933/legion_pro_5_16iax10_ct1_06_320a275b4ee34f1fb35f06cf1b843129_compact_1752853993.webp', 'legion_pro_5_16iax10_ct1_06_320a275b4ee34f1fb35f06cf1b843129_compact_1752853993', 189, 42, 20463, 'image/png', '2025-07-18 15:53:15', '2025-07-18 15:53:15', NULL),
(1003, 'legion_pro_5_16iax10_ct1_02_75204454953b4fd6af612b8d5bb53802_compact.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752855933/legion_pro_5_16iax10_ct1_02_75204454953b4fd6af612b8d5bb53802_compact_1752853993.webp', 'legion_pro_5_16iax10_ct1_02_75204454953b4fd6af612b8d5bb53802_compact_1752853993', 189, 42, 18392, 'image/png', '2025-07-18 15:53:15', '2025-07-18 15:53:15', NULL),
(1004, 'legion_pro_5_16iax10_ct1_03_0138290e75dd4d2ab715636153d5fb27_compact.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752855933/legion_pro_5_16iax10_ct1_03_0138290e75dd4d2ab715636153d5fb27_compact_1752853993.webp', 'legion_pro_5_16iax10_ct1_03_0138290e75dd4d2ab715636153d5fb27_compact_1752853993', 189, 42, 27215, 'image/png', '2025-07-18 15:53:15', '2025-07-18 15:53:15', NULL),
(1005, 'legion_pro_5_16iax10_ct1_05_cf97802053354553b30724dd554d085e_compact.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752855935/legion_pro_5_16iax10_ct1_05_cf97802053354553b30724dd554d085e_compact_1752853996.webp', 'legion_pro_5_16iax10_ct1_05_cf97802053354553b30724dd554d085e_compact_1752853996', 189, 42, 24613, 'image/png', '2025-07-18 15:53:17', '2025-07-18 15:53:17', NULL),
(1006, 'legion_pro_5_16iax10_ct1_10_64c6ff246bca438e83c1ec35a8cf7e79_compact.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752855935/legion_pro_5_16iax10_ct1_10_64c6ff246bca438e83c1ec35a8cf7e79_compact_1752853995.webp', 'legion_pro_5_16iax10_ct1_10_64c6ff246bca438e83c1ec35a8cf7e79_compact_1752853995', 189, 42, 8510, 'image/png', '2025-07-18 15:53:17', '2025-07-18 15:53:17', NULL),
(1007, 'legion_pro_5_16iax10_ct1_01_98d1023158ac4ec4940ba42a8d17f0b1_compact.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752855935/legion_pro_5_16iax10_ct1_01_98d1023158ac4ec4940ba42a8d17f0b1_compact_1752853995.webp', 'legion_pro_5_16iax10_ct1_01_98d1023158ac4ec4940ba42a8d17f0b1_compact_1752853995', 189, 42, 17845, 'image/png', '2025-07-18 15:53:17', '2025-07-18 15:53:17', NULL),
(1008, 'may-choi-game-sony-playstation-5-slim-3.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752856584/may-choi-game-sony-playstation-5-slim-3_1752854644.webp', 'may-choi-game-sony-playstation-5-slim-3_1752854644', 191, 42, 36071, 'image/png', '2025-07-18 16:04:06', '2025-07-18 16:04:06', NULL),
(1009, 'may-choi-game-sony-playstation-5-slim_4_.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752856585/may-choi-game-sony-playstation-5-slim_4__1752854644.webp', 'may-choi-game-sony-playstation-5-slim_4__1752854644', 191, 42, 59403, 'image/jpeg', '2025-07-18 16:04:07', '2025-07-18 16:04:07', NULL),
(1010, 'may-choi-game-sony-playstation-5-slim.png', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752856585/may-choi-game-sony-playstation-5-slim_1752854644.webp', 'may-choi-game-sony-playstation-5-slim_1752854644', 191, 42, 63601, 'image/png', '2025-07-18 16:04:07', '2025-07-18 16:04:07', NULL),
(1011, 'may-choi-game-sony-playstation-5-slim_2_.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752856586/may-choi-game-sony-playstation-5-slim_2__1752854644.webp', 'may-choi-game-sony-playstation-5-slim_2__1752854644', 191, 42, 85603, 'image/jpeg', '2025-07-18 16:04:08', '2025-07-18 16:04:08', NULL),
(1012, 'may-choi-game-sony-playstation-5-slim_1.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752856587/may-choi-game-sony-playstation-5-slim_1_1752854647.webp', 'may-choi-game-sony-playstation-5-slim_1_1752854647', 191, 42, 35028, 'image/jpeg', '2025-07-18 16:04:09', '2025-07-18 16:04:09', NULL),
(1013, 'may-choi-game-sony-playstation-5-slim.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752856587/may-choi-game-sony-playstation-5-slim_1752854647.webp', 'may-choi-game-sony-playstation-5-slim_1752854647', 191, 42, 93867, 'image/jpeg', '2025-07-18 16:04:09', '2025-07-18 16:04:09', NULL),
(1014, 'may-choi-game-sony-playstation-5-slim_2__1.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752856587/may-choi-game-sony-playstation-5-slim_2__1_1752854647.webp', 'may-choi-game-sony-playstation-5-slim_2__1_1752854647', 191, 42, 40687, 'image/jpeg', '2025-07-18 16:04:10', '2025-07-18 16:04:10', NULL),
(1015, 'may-choi-game-sony-playstation-5-slim_3_.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752856588/may-choi-game-sony-playstation-5-slim_3__1752854647.webp', 'may-choi-game-sony-playstation-5-slim_3__1752854647', 191, 42, 57426, 'image/jpeg', '2025-07-18 16:04:10', '2025-07-18 16:04:10', NULL),
(1016, 'may-choi-game-sony-playstation-5-slim_5_.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752856588/may-choi-game-sony-playstation-5-slim_5__1752854647.webp', 'may-choi-game-sony-playstation-5-slim_5__1752854647', 191, 42, 79277, 'image/jpeg', '2025-07-18 16:04:10', '2025-07-18 16:04:10', NULL),
(1017, 'may-choi-game-sony-playstation-5-slim_4__1.jpg', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752856588/may-choi-game-sony-playstation-5-slim_4__1_1752854648.webp', 'may-choi-game-sony-playstation-5-slim_4__1_1752854648', 191, 42, 39036, 'image/jpeg', '2025-07-18 16:04:10', '2025-07-18 16:04:10', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `media_file_product`
--

CREATE TABLE `media_file_product` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `media_file_id` bigint UNSIGNED NOT NULL,
  `position` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `media_file_product`
--

INSERT INTO `media_file_product` (`id`, `product_id`, `media_file_id`, `position`, `created_at`, `updated_at`) VALUES
(154, 110, 892, 0, '2025-07-12 08:14:05', '2025-07-20 16:51:40'),
(155, 110, 894, 1, '2025-07-12 08:14:05', '2025-07-20 16:51:40'),
(156, 110, 896, 2, '2025-07-12 08:14:05', '2025-07-20 16:51:40'),
(157, 110, 895, 3, '2025-07-12 08:14:05', '2025-07-20 16:51:40'),
(158, 110, 893, 4, '2025-07-12 08:14:05', '2025-07-20 16:51:40'),
(159, 110, 891, 5, '2025-07-12 08:14:05', '2025-07-20 16:51:40'),
(160, 111, 887, 0, '2025-07-12 08:19:39', '2025-07-16 06:02:56'),
(161, 111, 883, 1, '2025-07-12 08:19:39', '2025-07-16 06:02:56'),
(162, 111, 890, 2, '2025-07-12 08:19:39', '2025-07-16 06:02:56'),
(163, 111, 889, 3, '2025-07-12 08:19:39', '2025-07-16 06:02:56'),
(164, 111, 888, 4, '2025-07-12 08:19:39', '2025-07-16 06:02:56'),
(165, 111, 886, 5, '2025-07-12 08:19:39', '2025-07-16 06:02:56'),
(166, 111, 885, 6, '2025-07-12 08:19:39', '2025-07-16 06:02:56'),
(167, 111, 882, 7, '2025-07-12 08:19:39', '2025-07-16 06:02:56'),
(168, 111, 884, 8, '2025-07-12 08:19:39', '2025-07-16 06:02:56'),
(178, 113, 932, 0, '2025-07-13 10:56:45', '2025-07-23 08:14:36'),
(179, 113, 928, 1, '2025-07-13 10:56:45', '2025-07-23 08:14:36'),
(180, 113, 931, 2, '2025-07-13 10:56:45', '2025-07-23 08:14:36'),
(181, 113, 930, 3, '2025-07-13 10:56:45', '2025-07-23 08:14:36'),
(182, 113, 925, 4, '2025-07-13 10:56:45', '2025-07-23 08:14:36'),
(183, 114, 940, 0, '2025-07-16 07:44:39', '2025-07-21 11:08:11'),
(184, 114, 941, 1, '2025-07-16 07:44:39', '2025-07-21 11:08:11'),
(185, 114, 938, 2, '2025-07-16 07:44:39', '2025-07-21 11:08:11'),
(186, 114, 937, 3, '2025-07-16 07:44:39', '2025-07-21 11:08:11'),
(187, 114, 936, 4, '2025-07-16 07:44:39', '2025-07-21 11:08:11'),
(188, 114, 939, 5, '2025-07-16 07:44:39', '2025-07-21 11:08:11'),
(204, 118, 948, 0, '2025-07-16 08:08:09', '2025-07-18 05:11:49'),
(205, 118, 954, 1, '2025-07-16 08:08:09', '2025-07-18 05:11:49'),
(206, 118, 953, 2, '2025-07-16 08:08:09', '2025-07-18 05:11:49'),
(207, 118, 952, 3, '2025-07-16 08:08:09', '2025-07-18 05:11:49'),
(208, 118, 951, 4, '2025-07-16 08:08:09', '2025-07-18 05:11:49'),
(209, 118, 950, 5, '2025-07-16 08:08:09', '2025-07-18 05:11:49'),
(210, 118, 949, 6, '2025-07-16 08:08:09', '2025-07-18 05:11:49'),
(211, 118, 947, 7, '2025-07-16 08:08:09', '2025-07-18 05:11:49'),
(214, 117, 945, 0, '2025-07-18 04:49:33', '2025-07-18 05:09:43'),
(215, 117, 943, 1, '2025-07-18 04:49:33', '2025-07-18 05:09:43'),
(216, 117, 946, 2, '2025-07-18 04:49:33', '2025-07-18 05:09:43'),
(217, 117, 942, 3, '2025-07-18 04:49:33', '2025-07-18 05:09:43'),
(218, 117, 944, 4, '2025-07-18 04:49:33', '2025-07-18 05:09:43'),
(219, 119, 967, 0, '2025-07-18 15:17:09', '2025-07-18 15:28:48'),
(220, 119, 972, 1, '2025-07-18 15:17:09', '2025-07-18 15:28:48'),
(221, 119, 966, 2, '2025-07-18 15:17:09', '2025-07-18 15:28:48'),
(222, 119, 969, 3, '2025-07-18 15:17:09', '2025-07-18 15:28:48'),
(223, 119, 970, 4, '2025-07-18 15:17:09', '2025-07-18 15:28:48'),
(224, 119, 971, 5, '2025-07-18 15:17:09', '2025-07-18 15:28:48'),
(225, 119, 968, 6, '2025-07-18 15:17:09', '2025-07-18 15:28:48'),
(226, 119, 965, 7, '2025-07-18 15:17:09', '2025-07-18 15:28:48'),
(227, 120, 982, 0, '2025-07-18 15:28:32', '2025-07-18 15:28:32'),
(228, 120, 981, 1, '2025-07-18 15:28:32', '2025-07-18 15:28:32'),
(229, 120, 977, 2, '2025-07-18 15:28:32', '2025-07-18 15:28:32'),
(230, 120, 979, 3, '2025-07-18 15:28:32', '2025-07-18 15:28:32'),
(231, 120, 978, 4, '2025-07-18 15:28:32', '2025-07-18 15:28:32'),
(232, 120, 980, 5, '2025-07-18 15:28:32', '2025-07-18 15:28:32'),
(233, 120, 976, 6, '2025-07-18 15:28:32', '2025-07-18 15:28:32'),
(234, 120, 973, 7, '2025-07-18 15:28:32', '2025-07-18 15:28:32'),
(235, 120, 974, 8, '2025-07-18 15:28:32', '2025-07-18 15:28:32'),
(236, 121, 990, 0, '2025-07-18 15:37:38', '2025-07-18 15:37:38'),
(237, 121, 989, 1, '2025-07-18 15:37:38', '2025-07-18 15:37:38'),
(238, 121, 987, 2, '2025-07-18 15:37:38', '2025-07-18 15:37:38'),
(239, 121, 988, 3, '2025-07-18 15:37:38', '2025-07-18 15:37:38'),
(240, 121, 986, 4, '2025-07-18 15:37:38', '2025-07-18 15:37:38'),
(241, 121, 985, 5, '2025-07-18 15:37:38', '2025-07-18 15:37:38'),
(242, 121, 983, 6, '2025-07-18 15:37:38', '2025-07-18 15:37:38'),
(243, 121, 984, 7, '2025-07-18 15:37:38', '2025-07-18 15:37:38'),
(244, 122, 1000, 0, '2025-07-18 15:43:44', '2025-07-18 15:43:44'),
(245, 122, 999, 1, '2025-07-18 15:43:44', '2025-07-18 15:43:44'),
(246, 122, 997, 2, '2025-07-18 15:43:44', '2025-07-18 15:43:44'),
(247, 122, 998, 3, '2025-07-18 15:43:44', '2025-07-18 15:43:44'),
(248, 122, 996, 4, '2025-07-18 15:43:44', '2025-07-18 15:43:44'),
(249, 122, 995, 5, '2025-07-18 15:43:44', '2025-07-18 15:43:44'),
(250, 122, 992, 6, '2025-07-18 15:43:44', '2025-07-18 15:43:44'),
(251, 122, 991, 7, '2025-07-18 15:43:44', '2025-07-18 15:43:44'),
(252, 122, 993, 8, '2025-07-18 15:43:44', '2025-07-18 15:43:44'),
(253, 123, 1005, 0, '2025-07-18 15:57:52', '2025-07-18 15:57:52'),
(254, 123, 1006, 1, '2025-07-18 15:57:52', '2025-07-18 15:57:52'),
(255, 123, 1007, 2, '2025-07-18 15:57:52', '2025-07-18 15:57:52'),
(256, 123, 1001, 3, '2025-07-18 15:57:52', '2025-07-18 15:57:52'),
(257, 123, 1002, 4, '2025-07-18 15:57:52', '2025-07-18 15:57:52'),
(258, 123, 1003, 5, '2025-07-18 15:57:52', '2025-07-18 15:57:52'),
(259, 123, 1004, 6, '2025-07-18 15:57:52', '2025-07-18 15:57:52'),
(260, 124, 1008, 0, '2025-07-18 16:05:55', '2025-07-18 16:05:55'),
(261, 124, 1010, 1, '2025-07-18 16:05:55', '2025-07-18 16:05:55'),
(262, 124, 1009, 2, '2025-07-18 16:05:55', '2025-07-18 16:05:55'),
(263, 124, 1012, 3, '2025-07-18 16:05:55', '2025-07-18 16:05:55'),
(264, 124, 1013, 4, '2025-07-18 16:05:55', '2025-07-18 16:05:55'),
(265, 124, 1015, 5, '2025-07-18 16:05:55', '2025-07-18 16:05:55'),
(266, 124, 1011, 6, '2025-07-18 16:05:55', '2025-07-18 16:05:55'),
(267, 124, 1016, 7, '2025-07-18 16:05:55', '2025-07-18 16:05:55'),
(268, 124, 1017, 8, '2025-07-18 16:05:55', '2025-07-18 16:05:55');

-- --------------------------------------------------------

--
-- Table structure for table `media_folders`
--

CREATE TABLE `media_folders` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` bigint UNSIGNED DEFAULT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `media_folders`
--

INSERT INTO `media_folders` (`id`, `name`, `parent_id`, `user_id`, `created_at`, `updated_at`) VALUES
(114, 'Sản phẩm', NULL, 40, '2025-06-27 10:26:08', '2025-06-27 10:26:08'),
(115, 'media', NULL, 24, '2025-06-28 06:06:33', '2025-06-28 06:09:18'),
(116, 'Danh mục', 115, 24, '2025-06-28 06:09:35', '2025-06-28 06:09:35'),
(167, 'Mô hình Gundam', NULL, 41, '2025-07-09 10:29:47', '2025-07-09 10:29:47'),
(168, 'PG - 1/60', 167, 41, '2025-07-09 10:30:07', '2025-07-09 10:30:07'),
(169, 'MG - 1/100', 167, 41, '2025-07-09 10:30:16', '2025-07-09 10:30:16'),
(170, 'RG - 1/144', 167, 41, '2025-07-09 10:30:44', '2025-07-09 10:30:44'),
(171, 'Metal Build', 167, 41, '2025-07-09 10:30:51', '2025-07-09 10:30:51'),
(172, 'Figure', NULL, 41, '2025-07-09 11:07:39', '2025-07-09 11:07:39'),
(173, 'Naruto', 172, 41, '2025-07-09 11:07:53', '2025-07-09 11:07:53'),
(174, 'Nintendo', 114, 40, '2025-07-10 09:02:04', '2025-07-10 09:02:04'),
(175, 'Playstation', 114, 40, '2025-07-10 09:18:36', '2025-07-10 09:18:36'),
(176, 'Xe đạp', 114, 40, '2025-07-12 08:22:40', '2025-07-12 08:22:40'),
(177, 'Điện thoại', 114, 40, '2025-07-13 10:50:33', '2025-07-13 10:50:33'),
(179, 'Thương hiệu', NULL, 24, '2025-07-15 08:18:13', '2025-07-15 08:18:13'),
(180, 'Asus', NULL, 42, '2025-07-18 15:10:16', '2025-07-18 15:10:16'),
(181, 'rog_strix_g16_2025_g615_1', 180, 42, '2025-07-18 15:10:43', '2025-07-18 15:10:43'),
(183, 'Laptop gaming ASUS ROG Strix SCAR 16 G635LX RW192W', 180, 42, '2025-07-18 15:18:07', '2025-07-18 15:18:07'),
(184, 'Laptop gaming ASUS ROG Flow Z13 GZ302EA RU145WS', 180, 42, '2025-07-18 15:34:07', '2025-07-18 15:34:07'),
(186, 'MSI', NULL, 42, '2025-07-18 15:39:12', '2025-07-18 15:39:12'),
(187, 'Laptop gaming MSI Stealth A16 Mercedes AMG AI+ A3XWGG 032VN', 186, 42, '2025-07-18 15:39:29', '2025-07-18 15:39:29'),
(188, 'Lenovo', NULL, 42, '2025-07-18 15:44:26', '2025-07-18 15:44:26'),
(189, 'Laptop gaming Lenovo Legion Pro 5 16IAX10 83F3003VVN', 188, 42, '2025-07-18 15:53:01', '2025-07-18 15:53:01'),
(190, 'Console', NULL, 42, '2025-07-18 16:03:20', '2025-07-18 16:03:20'),
(191, 'Playstation 5', 190, 42, '2025-07-18 16:03:58', '2025-07-18 16:03:58');

-- --------------------------------------------------------

--
-- Table structure for table `media_product`
--

CREATE TABLE `media_product` (
  `media_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `ordering` int UNSIGNED DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media_usages`
--

CREATE TABLE `media_usages` (
  `id` bigint UNSIGNED NOT NULL,
  `media_id` bigint UNSIGNED NOT NULL,
  `mediable_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mediable_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint UNSIGNED NOT NULL,
  `conversation_id` bigint UNSIGNED DEFAULT NULL,
  `sender_id` bigint UNSIGNED DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `read_at` timestamp NULL DEFAULT NULL,
  `meta` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `conversation_id`, `sender_id`, `content`, `read_at`, `meta`, `created_at`, `updated_at`) VALUES
(234, 10, 42, 'Cảm ơn bạn đã đặt hàng! Nếu cần hỗ trợ gì hãy nhắn cho shop nhé.', '2025-07-23 19:35:19', NULL, '2025-07-23 19:34:46', '2025-07-23 19:35:19'),
(235, 10, 40, 'ok', NULL, NULL, '2025-07-23 19:35:52', '2025-07-23 19:35:52'),
(246, 10, 40, '0937027877', NULL, NULL, '2025-07-24 04:51:28', '2025-07-24 04:51:28'),
(250, 10, 40, 'fdsf', NULL, NULL, '2025-07-24 05:19:42', '2025-07-24 05:19:42'),
(270, 10, 42, 'Cảm ơn bạn đã đặt hàng! Nếu cần hỗ trợ gì hãy nhắn cho shop nhé.', '2025-07-26 11:17:00', NULL, '2025-07-26 06:31:53', '2025-07-26 11:17:00'),
(271, 12, 40, 'Cảm ơn bạn đã đặt hàng! Nếu cần hỗ trợ gì hãy nhắn cho shop nhé.', '2025-07-26 10:30:54', NULL, '2025-07-26 10:25:27', '2025-07-26 10:30:54'),
(272, 13, 40, 'Cảm ơn bạn đã đặt hàng! Nếu cần hỗ trợ gì hãy nhắn cho shop nhé.', '2025-07-26 13:33:26', NULL, '2025-07-26 12:06:27', '2025-07-26 13:33:26'),
(273, 14, 42, 'Cảm ơn bạn đã đặt hàng! Nếu cần hỗ trợ gì hãy nhắn cho shop nhé.', NULL, NULL, '2025-07-26 13:27:33', '2025-07-26 13:27:33'),
(274, 14, 42, 'Cảm ơn bạn đã đặt hàng! Nếu cần hỗ trợ gì hãy nhắn cho shop nhé.', '2025-07-26 13:33:24', NULL, '2025-07-26 13:31:24', '2025-07-26 13:33:24');

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
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Loại thông báo (order_created, order_updated, low_stock,...)',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nội dung thông báo hiển thị',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Liên kết chuyển hướng khi click',
  `is_read` tinyint(1) DEFAULT '0' COMMENT 'Đã đọc hay chưa',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `type`, `title`, `message`, `url`, `is_read`, `created_at`, `updated_at`) VALUES
(28, 40, 'order_created', 'Đơn hàng mới #WM242072', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM242072', 0, '2025-07-21 10:06:30', '2025-07-21 10:06:30'),
(29, 40, 'order_created', 'Đơn hàng mới #WM247323', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM247323', 0, '2025-07-21 10:09:07', '2025-07-21 10:09:07'),
(30, 41, 'order_created', 'Đơn hàng mới #WM650609', 'Bạn có đơn hàng mới từ wj2RxHFf', '/seller/orders/WM650609', 0, '2025-07-21 10:21:19', '2025-07-21 10:21:19'),
(31, 41, 'order_created', 'Đơn hàng mới #WM760235', 'Bạn có đơn hàng mới từ wj2RxHFf', '/seller/orders/WM760235', 0, '2025-07-21 16:29:13', '2025-07-21 16:29:13'),
(32, 40, 'order_created', 'Đơn hàng mới #WM695807', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM695807', 0, '2025-07-21 16:59:16', '2025-07-21 16:59:16'),
(33, 40, 'order_created', 'Đơn hàng mới #WM840164', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM840164', 0, '2025-07-21 17:00:25', '2025-07-21 17:00:25'),
(34, 40, 'order_created', 'Đơn hàng mới #WM847010', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM847010', 0, '2025-07-21 17:09:44', '2025-07-21 17:09:44'),
(35, 40, 'order_created', 'Đơn hàng mới #WM948964', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM948964', 0, '2025-07-21 17:11:27', '2025-07-21 17:11:27'),
(36, 40, 'order_created', 'Đơn hàng mới #WM638197', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM638197', 0, '2025-07-21 17:13:06', '2025-07-21 17:13:06'),
(37, 40, 'order_created', 'Đơn hàng mới #WM548990', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM548990', 0, '2025-07-21 17:15:32', '2025-07-21 17:15:32'),
(38, 40, 'order_created', 'Đơn hàng mới #WM463483', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM463483', 0, '2025-07-21 17:16:00', '2025-07-21 17:16:00'),
(39, 40, 'order_created', 'Đơn hàng mới #WM605114', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM605114', 0, '2025-07-21 17:24:23', '2025-07-21 17:24:23'),
(41, 42, 'order_created', 'Đơn hàng mới #WM173193', 'Bạn có đơn hàng mới từ zAZnWRIk', '/seller/orders/WM173193', 0, '2025-07-22 17:54:57', '2025-07-22 17:54:57'),
(44, 40, 'order_created', 'Đơn hàng mới #WM922304', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM922304', 0, '2025-07-23 06:45:59', '2025-07-23 06:45:59'),
(45, 40, 'order_created', 'Đơn hàng mới #WM497886', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM497886', 0, '2025-07-23 06:50:26', '2025-07-23 06:50:26'),
(46, 40, 'order_created', 'Đơn hàng mới #WM382186', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM382186', 0, '2025-07-23 07:09:52', '2025-07-23 07:09:52'),
(47, 40, 'order_created', 'Đơn hàng mới #WM382584', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM382584', 0, '2025-07-23 07:12:24', '2025-07-23 07:12:24'),
(48, 40, 'order_created', 'Đơn hàng mới #WM181181', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM181181', 0, '2025-07-23 07:15:52', '2025-07-23 07:15:52'),
(49, 40, 'order_created', 'Đơn hàng mới #WM694678', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM694678', 0, '2025-07-23 07:24:22', '2025-07-23 07:24:22'),
(50, 40, 'order_created', 'Đơn hàng mới #WM528022', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM528022', 0, '2025-07-23 07:32:33', '2025-07-23 07:32:33'),
(51, 40, 'order_created', 'Đơn hàng mới #WM623928', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM623928', 0, '2025-07-23 07:35:14', '2025-07-23 07:35:14'),
(52, 40, 'order_created', 'Đơn hàng mới #WM429050', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM429050', 0, '2025-07-23 07:36:41', '2025-07-23 07:36:41'),
(53, 40, 'order_created', 'Đơn hàng mới #WM487761', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM487761', 0, '2025-07-23 07:37:33', '2025-07-23 07:37:33'),
(54, 40, 'order_created', 'Đơn hàng mới #WM942735', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM942735', 0, '2025-07-23 07:46:32', '2025-07-23 07:46:32'),
(55, 40, 'order_created', 'Đơn hàng mới #WM929026', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM929026', 0, '2025-07-23 08:02:58', '2025-07-23 08:02:58'),
(56, 40, 'order_created', 'Đơn hàng mới #WM605898', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM605898', 0, '2025-07-23 08:07:13', '2025-07-23 08:07:13'),
(57, 40, 'order_created', 'Đơn hàng mới #WM437986', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM437986', 0, '2025-07-23 08:14:59', '2025-07-23 08:14:59'),
(58, 40, 'order_created', 'Đơn hàng mới #WM372419', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM372419', 0, '2025-07-23 08:17:50', '2025-07-23 08:17:50'),
(59, 40, 'order_created', 'Đơn hàng mới #WM543281', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM543281', 0, '2025-07-23 08:25:47', '2025-07-23 08:25:47'),
(60, 42, 'order_created', 'Đơn hàng mới #WM301878', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM301878', 0, '2025-07-23 08:56:14', '2025-07-23 08:56:14'),
(61, 42, 'order_created', 'Đơn hàng mới #WM438771', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM438771', 0, '2025-07-23 09:03:51', '2025-07-23 09:03:51'),
(62, 42, 'order_created', 'Đơn hàng mới #WM943607', 'Bạn có đơn hàng mới từ zAZnWRIk', '/seller/orders/WM943607', 0, '2025-07-23 11:50:20', '2025-07-23 11:50:20'),
(64, 42, 'order_created', 'Đơn hàng mới #WM673702', 'Bạn có đơn hàng mới từ zAZnWRIk', '/seller/orders/WM673702', 0, '2025-07-23 19:34:46', '2025-07-23 19:34:46'),
(65, 42, 'order_created', 'Đơn hàng mới #WM346881', 'Bạn có đơn hàng mới từ 5Zvkckfo', '/seller/orders/WM346881', 0, '2025-07-24 12:54:10', '2025-07-24 12:54:10'),
(66, 42, 'order_created', 'Đơn hàng mới #WM126335', 'Bạn có đơn hàng mới từ nickphan189', '/seller/orders/WM126335', 0, '2025-07-26 06:31:53', '2025-07-26 06:31:53'),
(67, 40, 'order_created', 'Đơn hàng mới #WM309868', 'Bạn có đơn hàng mới từ 3sLJ0V6g', '/seller/orders/WM309868', 1, '2025-07-26 10:25:26', '2025-07-26 10:26:05'),
(68, 40, 'order_created', 'Đơn hàng mới #WM227366', 'Bạn có đơn hàng mới từ thequang', '/seller/orders/WM227366', 0, '2025-07-26 12:06:26', '2025-07-26 12:06:26'),
(69, 42, 'order_created', 'Đơn hàng mới #WM835478', 'Bạn có đơn hàng mới từ thequang', '/seller/orders/WM835478', 0, '2025-07-26 13:27:32', '2025-07-26 13:27:32'),
(70, 42, 'order_created', 'Đơn hàng mới #WM279081', 'Bạn có đơn hàng mới từ thequang', '/seller/orders/WM279081', 0, '2025-07-26 13:31:24', '2025-07-26 13:31:24');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint UNSIGNED NOT NULL,
  `order_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `buyer_id` bigint UNSIGNED NOT NULL,
  `receiver_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiver_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shop_id` bigint UNSIGNED NOT NULL,
  `total_amount` decimal(12,0) NOT NULL,
  `discount_amount` decimal(12,0) DEFAULT '0',
  `final_amount` decimal(12,0) NOT NULL,
  `promotion_id` bigint UNSIGNED DEFAULT NULL,
  `coupon_code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','processing','shipping','completed','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `shipping_service_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_id` bigint UNSIGNED DEFAULT NULL,
  `shipping_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_fee` int NOT NULL,
  `payment_method` enum('momo','bank_transfer','vnpay','cod','wallet') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_status` enum('unpaid','paid','failed','pending','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unpaid',
  `paid_at` datetime DEFAULT NULL,
  `user_note` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cancel_reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `cancelled_by_shop` tinyint DEFAULT NULL,
  `shipping_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_number`, `buyer_id`, `receiver_name`, `receiver_phone`, `shop_id`, `total_amount`, `discount_amount`, `final_amount`, `promotion_id`, `coupon_code`, `status`, `shipping_service_name`, `address_id`, `shipping_address`, `shipping_fee`, `payment_method`, `payment_status`, `paid_at`, `user_note`, `cancel_reason`, `cancelled_by_shop`, `shipping_date`, `created_at`, `updated_at`) VALUES
(125, 'WM309868', 49, 'Mio', '0936252525', 6, 21500000, 100000, 21422000, NULL, NULL, 'processing', NULL, 13, '68 Hoàng Diệu, Phường 13, Quận 4, Thành phố Hồ Chí Minh', 22000, 'cod', 'unpaid', NULL, NULL, NULL, NULL, NULL, '2025-07-26 10:25:26', '2025-07-26 10:26:32'),
(126, 'WM227366', 48, 'Thế Quang', '0937027877', 6, 19800000, 100000, 19830000, NULL, NULL, 'pending', NULL, 12, '12, Phường Đồng Xuân, Quận Hoàn Kiếm, Thành phố Hà Nội', 130000, 'momo', 'pending', NULL, NULL, NULL, NULL, NULL, '2025-07-26 12:06:26', '2025-07-26 12:32:43'),
(127, 'WM835478', 48, 'Thế Quang', '0937027877', 8, 79990000, 100000, 79955000, NULL, NULL, 'pending', NULL, 12, '12, Phường Đồng Xuân, Quận Hoàn Kiếm, Thành phố Hà Nội', 65000, 'bank_transfer', 'pending', NULL, NULL, NULL, NULL, NULL, '2025-07-26 13:27:32', '2025-07-26 13:27:32'),
(128, 'WM279081', 48, 'Thế Quang', '0937027877', 8, 13090000, 100000, 13035000, NULL, NULL, 'pending', NULL, 12, '12, Phường Đồng Xuân, Quận Hoàn Kiếm, Thành phố Hà Nội', 45000, 'vnpay', 'pending', NULL, NULL, NULL, NULL, NULL, '2025-07-26 13:31:24', '2025-07-26 13:31:24');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `product_variant_id` bigint UNSIGNED DEFAULT NULL,
  `product_variant_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(12,0) NOT NULL,
  `total_price` decimal(12,0) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_variant_id`, `product_variant_name`, `product_name`, `image`, `quantity`, `price`, `total_price`, `created_at`, `updated_at`) VALUES
(132, 125, 113, 379, 'Hồng, 512 GB', 'iPhone 15 Chính Hãng VN', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403997/iphone-15-plus-pink_1752403995.webp', 1, 21500000, 21500000, '2025-07-26 10:25:26', '2025-07-26 10:25:26'),
(133, 126, 110, 361, '3 Tháng', 'PS5 Pro – PlayStation 5 Pro', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752139128/playstation_5_pro_1752139128.webp', 1, 19800000, 19800000, '2025-07-26 12:06:26', '2025-07-26 12:06:26'),
(134, 127, 121, 394, NULL, 'Laptop gaming ASUS ROG Flow Z13 GZ302EA RU145WS', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752854851/rog_flow_z13_black_04_kb_46f516564c024a50863fab8cc3b9567f_master_1752852879.webp', 1, 79990000, 79990000, '2025-07-26 13:27:32', '2025-07-26 13:27:32'),
(135, 128, 124, 397, NULL, 'Máy chơi game Sony PlayStation 5 Slim (PS5 Slim) Bản ổ đĩa | Chính hãng Sony Việt Nam', 'https://res.cloudinary.com/diaenxa58/image/upload/v1752856584/may-choi-game-sony-playstation-5-slim-3_1752854644.webp', 1, 13090000, 13090000, '2025-07-26 13:31:24', '2025-07-26 13:31:24');

-- --------------------------------------------------------

--
-- Table structure for table `order_logs`
--

CREATE TABLE `order_logs` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` bigint UNSIGNED NOT NULL,
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_logs`
--

INSERT INTO `order_logs` (`id`, `order_id`, `message`, `type`, `created_at`, `updated_at`) VALUES
(51, 125, 'Đơn hàng vừa được tạo', 'created', '2025-07-26 10:25:26', '2025-07-26 10:25:26'),
(52, 125, 'Shop đã chuẩn bị hàng', 'processing', '2025-07-26 10:26:32', '2025-07-26 10:26:32'),
(53, 126, 'Đơn hàng vừa được tạo', 'created', '2025-07-26 12:06:26', '2025-07-26 12:06:26'),
(54, 127, 'Đơn hàng vừa được tạo', 'created', '2025-07-26 13:27:32', '2025-07-26 13:27:32'),
(55, 128, 'Đơn hàng vừa được tạo', 'created', '2025-07-26 13:31:24', '2025-07-26 13:31:24');

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
-- Table structure for table `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment_methods`
--

INSERT INTO `payment_methods` (`id`, `name`, `code`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Thanh toán tiền mặt (COD)', 'cod', NULL, 1, '2025-07-18 06:20:48', '2025-07-18 06:22:55'),
(2, 'Thanh toán Momo', 'momo', NULL, 1, '2025-07-18 06:23:05', '2025-07-18 06:23:05'),
(3, 'Thanh toán Chuyển Khoản', 'bank_transfer', NULL, 1, '2025-07-18 06:24:38', '2025-07-18 06:24:38'),
(4, 'Thanh toán VNPay', 'vnpay', NULL, 1, '2025-07-18 06:24:53', '2025-07-18 06:24:53');

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
  `status` enum('pending','approved','rejected') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `is_visible` tinyint(1) NOT NULL DEFAULT '1',
  `type` enum('basic','variants') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'basic',
  `views` int DEFAULT NULL,
  `rejected_reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `shop_id`, `category_id`, `brand_id`, `name`, `slug`, `description`, `status`, `is_visible`, `type`, `views`, `rejected_reason`, `created_at`, `updated_at`) VALUES
(110, 6, 281, NULL, 'PS5 Pro – PlayStation 5 Pro', 'ps5-pro-playstation-5-pro', '<p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Sony PlayStation 5 Pro</strong></b><span style=\"white-space: pre-wrap;\">, hay&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Sony PS5 Pro</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;là cỗ máy chơi game thế hệ mới nhất của&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Sony</strong></b><span style=\"white-space: pre-wrap;\">, là phiên bản cải tiến tiếp nối sau sự thành công của&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">PlayStation 5 (PS5)</strong></b><span style=\"white-space: pre-wrap;\">.&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">PS5 Pro</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;được ra mắt chính thức vào ngày&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">7 tháng 11 năm 2024</strong></b><span style=\"white-space: pre-wrap;\">, mang đến một cỗ máy tiên tiến về mặt thiết kế lẫn phần cứng bên trong,&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">PS5 Pro</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;ra đời nhằm khắc phục khắc những khó khăn mà game thủ thường gặp khi chơi game trên&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">PS5</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;nên có những điểm nâng cấp như sau:</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">GPU lớn hơn, mạnh mẽ hơn: PS5 Pro</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;được nâng cấp GPU có nhiều số lượng vi mạch hơn 67% so với máy chơi game PS5 và tốc độ xử lý của bộ nhớ cũng tăng lên 28%. Điều này cho phép khả năng kết xuất của thiết bị tăng lên 45%, nâng cao độ chân thực của trò chơi với tốc độ khung hình mượt mà hơn.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Ray Tracing (Công nghệ Dò tia) tiên tiến hơn</strong></b><span style=\"white-space: pre-wrap;\">: Sony cho biết&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">PS5 Pro</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;có tốc độ tạo ra các hiệu ứng Dò tia nhanh gấp 2 hoặc gấp 3 lần so với tốc độ của PS5.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Nâng cấp hình ảnh theo AI:</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;PlayStation Spectral Super Resolution hay gọi tắt là PSSR, là một tính năng được Sony áp dụng trên&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">PS5 Pro</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;nhằm nâng cấp hình ảnh của game bằng cách sử dụng trí tuệ nhân tạo để tạo ra các hình ảnh siêu sắc nét và hiển thị nhiều chi tiết hơn</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: justify;\"><br></p><h3 dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Ngày phát hành và giá bán</span></h3><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">PS5 Pro</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;được Sony xác nhận sẽ&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">phát hành vào ngày 7 tháng 11 năm 2024.</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;Người dùng và các nhà bán lẻ bên thứ ba có thể&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">đặt mua PS5 Pro trước từ ngày 26 tháng 9</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;thông qua trang PlayStation Direct.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Giá bán dự kiến của&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">PS5 Pro</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;sẽ là&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">$699.99</strong></b><span style=\"white-space: pre-wrap;\">. Trọn bộ máy sẽ bao gồm ổ SSD 2TB,&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">tay cầm DualSense</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;và trò chơi Astro’s Playroom được cài đặt sẵn trong máy.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: justify;\"><br></p><h3 dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Thiết kế</span></h3><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">PS5 Pro</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;có thiết kế kết hợp giữa PS5 Fat và PS5 Slim. Sony cho biết máy sẽ có cùng chiều cao với bản Fat, còn chiều rộng sẽ ngang tầm bản Slim. Điểm khác biệt duy nhất về thiết kế của&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">PS5 Pro</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;đó là phần lưới tản nhiệt rộng nằm ở giữa thân máy.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Ngoài ra,&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">máy chơi game PlayStation 5 Pro</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;này sẽ không đi kèm ổ đĩa và người dùng có thể lựa chọn gắn thêm ổ đĩa Blu-Ray tuy nhiên mức giá sẽ tăng lên tới khoảng $800. Để bù lại việc không có ổ đĩa,&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">PS5 Pro</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;đi kèm ổ SSD gắn trong có dung lượng lên tới 2TB, gấp đôi dung lượng ổ cứng của PS5 Slim.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\"><br></p>', 'pending', 1, 'variants', 131, NULL, '2025-07-12 08:14:05', '2025-07-26 09:43:59'),
(111, 6, 282, 3, 'Nintendo Switch 2', 'nintendo-switch-2', '<h2 class=\"scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Nintendo</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">&nbsp;Switch 2 : Tất Cả Những Thông Tin Quan Trọng Về Ngày Phát Hành, Giá Bán, Phần Cứng Và Danh Sách Game Mới.</strong></b></h2><p class=\"leading-7 [&amp;:not(:first-child)]:mt-6\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Sự kiện được mong chờ nhất để mở màn mùa hè rực rỡ –&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Nintendo Switch 2&nbsp;Direct –</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;đã chính thức diễn ra, mang đến hàng loạt thông tin quan trọng về phần cứng, tính năng và các tựa game sẽ ra mắt cùng với hệ máy này trong tương lai. Dưới đây là tổng hợp tất cả những điều quan trọng nhất mà bạn cần biết về&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Nintendo Switch 2</strong></b><span style=\"white-space: pre-wrap;\">, từ ngày phát hành, giá bán, phần cứng, phụ kiện cho đến danh sách game hot nhất. Hãy cùng HALO điểm qua toàn cảnh sự kiện này nhé!.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-6\" style=\"text-align: justify;\"><br></p><h2 class=\"scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Phần Cứng, Tính Năng Và Phụ Kiện Mới Của Nintendo Switch 2</strong></b></h2><p class=\"leading-7 [&amp;:not(:first-child)]:mt-6\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Nintendo Switch 2 mang đến hàng loạt tính năng phần cứng và trải nghiệm mới, bắt đầu với chính chiếc máy console sở hữu màn hình LCD 7.9 inch hiển thị game ở độ phân giải 1080p. Tuy nhiên, những ai muốn có độ phân giải cao hơn sẽ vui mừng khi biết rằng dock mới có thể xuất hình ảnh lên đến 4K và chơi game với tốc độ khung hình lên đến 120fps. Joy-Con mới, kết nối với Nintendo Switch 2 thông qua cơ chế “snap” từ tính, trông khá giống với các mẫu trước đây nhưng được bổ sung nhiều tính năng mới, bao gồm cả chế độ điều khiển chuột. Joy-Con phải cũng được trang bị nút C mới, hỗ trợ cho tính năng trực tuyến GameChat mà bạn có thể tìm hiểu thêm bên dưới.</span></p>', 'pending', 1, 'variants', 153, NULL, '2025-07-12 08:19:39', '2025-07-23 06:39:20'),
(113, 6, 255, NULL, 'iPhone 15 Chính Hãng VN', 'iphone-15-chinh-hang-vn', '<p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\"><span style=\"white-space: pre-wrap;\">Apple chính thức giới thiệu&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">iPhone 15</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;và&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">iPhone 15 Plus</strong></b><span style=\"white-space: pre-wrap;\">: Bước tiến đột phá với thiết kế hoàn hảo, vỏ sau bền bỉ làm từ kính pha màu và viền bo tròn hiện đại, sử dụng&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">chip A16 Bionic, Dynamic Island</strong></b><span style=\"white-space: pre-wrap;\">,&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">camera chính lên đến 48MP</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;với camera Telephoto 2x, cùng&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">cổng kết nối USB‑C</strong></b><span style=\"white-space: pre-wrap;\">. Với những nâng cấp đáng kể so với thế hệ trước, ngoại hình trẻ trung năng động khiến iPhone 15 trở thành cái tên thu hút được đông đảo người dùng quan tâm tại thời điểm ra mắt.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\"><br></p>', 'pending', 1, 'variants', 104, NULL, '2025-07-13 10:56:44', '2025-07-26 10:24:22'),
(114, 7, 281, NULL, 'PS5 Slim Standard – Playstation 5 Slim Standard – VN', 'ps5-slim-standard-playstation-5-slim-standard-vn', '<p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Sony PlayStation 5</strong></b><span style=\"white-space: pre-wrap;\">, hay&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Sony PS5</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;là cỗ máy chơi game thế hệ mới nhất của&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Sony</strong></b><span style=\"white-space: pre-wrap;\">, tiếp nối sau sự thành công của&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">PlayStation 4 (PS4)</strong></b><span style=\"white-space: pre-wrap;\">.&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">PS5</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;được ra mắt chính thức vào ngày&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">12/11/2020</strong></b><span style=\"white-space: pre-wrap;\">, mang đến một cỗ máy tiên tiến về mặt thiết kế lẫn phần cứng bên trong, cùng với chiếc tay cầm&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">PS5</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;thế hệ mới mang tên&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">DualSense</strong></b><span style=\"white-space: pre-wrap;\">, mang đến nhiều trải nghiệm ấn tượng và độc đáo từ tương lai, và mới nhất vào năm&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">2023</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;này,&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">SONY</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;đã cho ra mắt phiên bản kể tiếp của&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">PS5</strong></b><span style=\"white-space: pre-wrap;\">, với tên tạm gọi là&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">PS5 Slim</strong></b><span style=\"white-space: pre-wrap;\">, thay thế hoàn toàn phiên bản&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">PS5</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;cũ, với thiết kế nhỏ gọn và nhẹ hơn, cùng với các nâng cấp, thay đổi để hoàn thiện hơn.</span></p>', 'pending', 1, 'basic', 66, NULL, '2025-07-16 07:44:39', '2025-07-26 13:31:10'),
(117, 6, 235, NULL, 'DualSense – PS5 Wireless Controller Ghost Of Yõtei – Limited Edition', 'dualsense-ps5-wireless-controller-ghost-of-yotei-limited-edition', '<h1 dir=\"ltr\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">DualSensen Wireless Controller Ghost of Yōtei Gold Limited Edition: Tay Cầm Đỉnh Cao Cho Game Thủ</strong></b></h1><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\"><br></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">DualSense Wireless Controller Ghost of Yōtei Gold Limited Edition</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;là phụ kiện chơi game cao cấp, được thiết kế đặc biệt để tôn vinh tựa game nổi tiếng&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Ghost of Yōtei</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;trên PlayStation 5. Với thiết kế độc đáo lấy cảm hứng từ nghệ thuật kintsugi truyền thống Nhật Bản, tay cầm này không chỉ mang lại trải nghiệm chơi game chân thực mà còn là một tác phẩm nghệ thuật, lý tưởng cho những ai muốn nâng tầm phong cách cá nhân hóa. Ra mắt vào ngày&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">2 tháng 10 năm 2025</strong></b><span style=\"white-space: pre-wrap;\">, sản phẩm được phát hành với số lượng giới hạn, hứa hẹn trở thành món đồ sưu tầm quý giá cho fan hâm mộ.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: justify;\"><br></p><h2 dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Thiết Kế Nghệ Thuật Đậm Chất Kintsugi</strong></b></h2><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\"><br></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Tay cầm&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Ghost of Yōtei Gold Limited Edition</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;gây ấn tượng với các đường nét vàng nổi tinh tế, được chế tác dựa trên nghệ thuật kintsugi – kỹ thuật vá gốm bằng vàng, tượng trưng cho sự tái sinh từ những mảnh vỡ. Thiết kế này lấy cảm hứng từ chiếc mặt nạ vỡ của nhân vật Atsu, phản ánh hành trình vượt qua nỗi đau để trở thành chiến binh huyền thoại trong&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Ghost of Yōtei</strong></b><span style=\"white-space: pre-wrap;\">. Hình ảnh Mount Yōtei hùng vĩ được khắc họa ở trung tâm, kết hợp với dấu ấn PlayStation đặc biệt trên touchpad, tạo nên một tay cầm vừa đẹp mắt vừa mang ý nghĩa văn hóa sâu sắc. Mỗi chi tiết vàng được gia công tỉ mỉ, biến tay cầm thành điểm nhấn sang trọng trong bộ sưu tập game của bạn.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: justify;\"><br></p><h2 dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Trải Nghiệm Chơi Game Tiên Tiến</strong></b></h2><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\"><br></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">DualSense Wireless Controller</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;được tích hợp công nghệ tiên phong như phản hồi haptic (rung phản hồi) và cò kích hoạt thích ứng, mang đến cảm giác chân thực khi trải nghiệm&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Ghost of Yōtei</strong></b><span style=\"white-space: pre-wrap;\">. Bạn sẽ cảm nhận được từng nhát kiếm sắc bén hay tiếng vó ngựa gõ trên đồng cỏ qua các vùng đất hoang sơ của Nhật Bản thế kỷ 17. Tay cầm tương thích hoàn hảo với PS5 Slim và PS5 Pro, đảm bảo hiệu suất tối ưu, giúp bạn hòa mình vào hành trình trả thù đầy cảm xúc của Atsu. Thiết kế ergonomics và độ chính xác cao mang lại sự thoải mái, lý tưởng cho những trận chiến kéo dài, nâng cấp trải nghiệm chơi game lên một tầm cao mới.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: justify;\"><br></p><h2 dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Số Lượng Giới Hạn – Cơ Hội Sở Hữu Độc Quyền</strong></b></h2><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\"><br></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">DualSense Wireless Controller Ghost of Yōtei Gold Limited Edition</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;được phát hành với số lượng giới hạn. Ra mắt cùng ngày với tựa game&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Ghost of Yōtei</strong></b><span style=\"white-space: pre-wrap;\">, đây là cơ hội vàng để sở hữu một tay cầm độc quyền, tăng giá trị sưu tầm. Khi kết hợp với vỏ bọc console cùng thiết kế kintsugi vàng, tay cầm này hoàn thiện bộ sưu tập&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Ghost of Yōtei Limited Edition</strong></b><span style=\"white-space: pre-wrap;\">, biến không gian chơi game của bạn thành một tác phẩm nghệ thuật đậm chất Nhật Bản.</span></p>', 'pending', 1, 'variants', 66, NULL, '2025-07-16 07:54:20', '2025-07-26 13:31:04'),
(118, 6, 235, NULL, 'DualSense Edge Wireless Controller', 'dualsense-edge-wireless-controller', '<h3 dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Tay cầm chuyên nghiệp nhất cho game thủ PS5</strong></b></h3><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: justify;\"><br></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">DualSense Edge Wireless Controller</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;sở hữu thiết kế cao cấp và chuyên nghiệp hơn bao giờ hết, chú trọng đến hiệu năng cao và khả năng cá nhân hóa cho game thủ. Phiên bản tay cầm mới của PlayStation này sẽ mang đến những trải nghiệm game cao cấp chưa từng có, để bạn có thể tự do khám phá những tựa game bom tấn theo cách của riêng mình.</span></p><h4 dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Thiết kế khác biệt</span></h4><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\"><br></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Vẫn giữ tone màu trắng quen thuộc như chiếc tay cầm DualSense trước đây nhưng giờ đây,&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">DualSense Edge Wireless Controller</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;mang đến một cảm hứng hoàn toàn mới với phần trackpad đen in lên đó là các biểu tượng PlayStation rất khác biệt. Cụm analog cũng mang tone màu đen bóng cao cấp, cùng với đó là cụm nút D-Pad và 4 nút chức năng cũng được chuyển sang màu đen.</span></p>', 'pending', 1, 'basic', 51, NULL, '2025-07-16 08:08:09', '2025-07-26 13:31:12'),
(119, 8, 265, NULL, 'Rog strix g16 2025 g615', 'rog-strix-g16-2025-g615', '<h2 dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Thông tin sản phẩm</span></h2><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: left;\"><br></p><h2 dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Thông số kỹ thuật:</strong></b></h2><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">CPU</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Intel® Core™ Ultra 9 Processor 275HX 2.7 GHz (36MB Cache, up to 5.4 GHz, 24 cores, 24 Threads); Intel® AI Boost NPU up to 13TOPS</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">RAM</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">32GB(1 x 32GB) DDR5-5600 SO-DIMM&nbsp; (Tổng 2 slots Sodimm, up to 64GB)</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Ổ lưu trữ</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">1TB PCIe® 4.0 NVMe™ M.2 SSD&nbsp;(2x slots, support&nbsp;512G/ 1TB /2TB G4x4 PCIe SSD)</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Card đồ họa</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">NVIDIA® GeForce RTX™ 5080 Laptop GPU&nbsp;16GB GDDR7</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Màn hình</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">16 inch&nbsp;2.5K (2560 x 1600, WQXGA) 16:10 aspect ratio, 240Hz,&nbsp;3ms,&nbsp;IPS-level,&nbsp;500nits,&nbsp;Anti-glare display,&nbsp;G-Sync,&nbsp;Pantone Validated,&nbsp;ROG Nebula Display</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Cổng giao tiếp</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">1x 2.5G LAN port</span><br><span style=\"white-space: pre-wrap;\">2x Thunderbolt™ 5 with support for DisplayPort™ / power delivery / G-SYNC (data speed up to 120Gbps)</span><br><span style=\"white-space: pre-wrap;\">3x USB 3.2 Gen 2 Type-A (data speed up to 10Gbps)</span><br><span style=\"white-space: pre-wrap;\">1x HDMI 2.1 FRL</span><br><span style=\"white-space: pre-wrap;\">1x 3.5mm Combo Audio Jack</span><br><span style=\"white-space: pre-wrap;\">Built-in array microphone</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Bàn phím</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Backlit Chiclet Keyboard 4-Zone RGB</span><br><span style=\"white-space: pre-wrap;\">With Copilot key</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Audio</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">AI noise-canceling technology</span><br><span style=\"white-space: pre-wrap;\">Dolby Atmos</span><br><span style=\"white-space: pre-wrap;\">Hi-Res certification (for headphone)</span><br><span style=\"white-space: pre-wrap;\">Smart Amp Technology</span><br><span style=\"white-space: pre-wrap;\">2-speaker system with Smart Amplifier Technology</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Đọc thẻ nhớ</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">None</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Kết nối có dây (LAN)</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">10/100/1000/2500 Mbps</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Kết nối không dây</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Wi-Fi 7(802.11be) (Triple band) 2*2</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Bluetooth</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Bluetooth® 5.4 Wireless Card</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Webcam</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">1080P FHD IR Camera for Windows Hello</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Hệ điều hành</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Windows 11 Home</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Pin</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">90WHrs, 4S1P, 4-cell Li-ion</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Trọng lượng</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">2.65 Kg (5.84 lbs)</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Màu sắc</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Eclipse Gray</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Kích thước</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">35.4 x 26.8 x 2.28 ~ 3.08 cm</span></p>', 'pending', 1, 'basic', 5, NULL, '2025-07-18 15:17:09', '2025-07-23 19:34:37'),
(120, 8, 265, 1, 'Laptop gaming ASUS ROG Strix SCAR 16 G635LX RW192W', 'laptop-gaming-asus-rog-strix-scar-16-g635lx-rw192w', '<h2 dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Thông tin sản phẩm</span></h2><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">&nbsp;</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: left;\"><br></p><h2 dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Thông số kỹ thuật:&nbsp;</strong></b></h2><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">CPU</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Intel® Core™ Ultra 9 Processor 275HX 2.7 GHz (36MB Cache, up to 5.4 GHz, 24 cores, 24 Threads); Intel® AI Boost NPU up to 13TOPS</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">RAM</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">64GB (2x32GB) DDR5 5600MHz (2x SO-DIMM socket, up to 64GB SDRAM)</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Ổ Cứng</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">2TB PCIe® 4.0 NVMe™ M.2 Performance SSD&nbsp;(2x slot SSD, nâng cấp tối đa 2TB/1 slot)</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Card đồ họa</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">NVIDIA® GeForce RTX™ 5090 Laptop GPU&nbsp;24GB GDDR7</span><br><span style=\"white-space: pre-wrap;\">ROG Boost: 1647MHz* at 175W (1597MHz Boost Clock+50MHz OC, 150W+25W Dynamic Boost</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Màn hình</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">16\" WQXGA (2560 x 1600) 16:10,&nbsp;240Hz/3ms, MiniLed, Non-Glare, NanoEdge, DCI-P3:100.00%, 1200nits, G-Sync, Pantone Validated, ROG Nebula Display, Support Dolby Vision HDR</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Cổng kết nối</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">1x 3.5mm Combo Audio Jack</span><br><span style=\"white-space: pre-wrap;\">2x Thunderbolt™ 5 with support for DisplayPort™ / power delivery / G-SYNC (data speed up to 120Gbps)</span><br><span style=\"white-space: pre-wrap;\">3x USB 3.2 Gen 2 Type-A (data speed up to 10Gbps)</span><br><span style=\"white-space: pre-wrap;\">1x 2.5G LAN port</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Bàn phím</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Backlit Chiclet Keyboard Per-Key RGB</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Audio</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Dolby&nbsp;Atmos, Hi-Res&nbsp;certification, Smart&nbsp;Amp&nbsp;Technology,&nbsp;AI noise-canceling technology,&nbsp;4-speaker system with Smart Amplifier Technology</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Lan</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">10/100/1000/2500 Mbps</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Wifi + Bluetooth</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Wi-Fi 7(802.11be) (Triple band) 2*2+Bluetooth® 5.4 Wireless Card (*Bluetooth® version may change with OS version different.)</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Webcam</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">1080P FHD IR Camera for Windows Hello</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Hệ điều hành</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Windows 11 Home</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Pin</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">90WHrs, 4S1P, 4-cell Li-ion</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Trọng lượng</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">2.80 Kg (6.17 lbs)</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Màu sắc</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Off Black</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Kích thước</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">35.4 x 26.8 x 2.28 ~ 3.08 cm</span></p><h2 dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Đánh giá chi tiết Laptop gaming ASUS ROG Strix SCAR 16 G635LX RW192W</strong></b></h2><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Laptop gaming ASUS ROG Strix SCAR 16 G635LX RW192W</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;là một trong những sản phẩm nổi bật trong dòng&nbsp;laptop gaming của ASUS. Với thiết kế mạnh mẽ, hiệu suất vượt trội và công nghệ hiện đại, sản phẩm này hứa hẹn sẽ mang đến trải nghiệm chơi game tuyệt vời cho người dùng. Trong bài viết này, chúng ta sẽ cùng tìm hiểu chi tiết về các tính năng nổi bật của chiếc&nbsp;laptop&nbsp;này.</span></p><h3 dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Thiết kế ấn tượng và chất lượng hoàn thiện</strong></b></h3><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">ASUS ROG Strix SCAR 16 G635LX RW192W được thiết kế với phong cách hiện đại và hầm hố, thể hiện sự mạnh mẽ của một chiếc&nbsp;laptop gaming. Màn hình 16 inch với viền mỏng giúp tối ưu hóa không gian hiển thị, mang đến trải nghiệm hình ảnh tuyệt vời cho game thủ. Chất liệu vỏ ngoài bằng nhôm cao cấp không chỉ gia tăng độ bền mà còn tạo cảm giác sang trọng.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: center;\"><br></p><h3 dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Hiệu suất vượt trội với bộ vi xử lý mạnh mẽ</strong></b></h3><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Với&nbsp;bộ vi xử lý Intel Core Ultra&nbsp;i9&nbsp;thế hệ thứ 13, ASUS ROG Strix SCAR 16 G635LX RW192W mang đến hiệu suất xử lý mạnh mẽ cho mọi tác vụ, từ chơi game nặng đến xử lý nhiều ứng dụng. Đi kèm với đó là card đồ họa NVIDIA GeForce&nbsp;RTX 5090, giúp nâng cao trải nghiệm đồ họa và cho phép người dùng trải nghiệm ánh sáng phản chiếu ray tracing trong các tựa game mới nhất.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: center;\"><br></p><h3 dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Màn hình sắc nét với tần số quét cao</strong></b></h3><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Màn hình của laptop được trang bị độ phân giải 2560 x 1600, cho hình ảnh sắc nét và màu sắc chân thực. Với tần số quét lên đến&nbsp;240Hz, ROG Strix SCAR 16 cho phép hiện thị hình ảnh mượt mà, giảm thiểu độ trễ và giúp game thủ có thể theo kịp mọi diễn biến trong game. Công nghệ&nbsp;HDR&nbsp;hỗ trợ hình ảnh rực rỡ hơn, làm nổi bật từng chi tiết trong game.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: center;\"><br></p><h3 dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Hệ thống tản nhiệt hiệu quả</strong></b></h3><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Một trong những yếu tố quan trọng khi lựa chọn laptop gaming chính là khả năng tản nhiệt. ASUS đã trang bị cho ROG Strix SCAR 16 một&nbsp;hệ thống tản nhiệt&nbsp;ROG Intelligent Cooling, giúp duy trì hiệu suất tối ưu mà không gặp phải tình trạng quá nhiệt. Bằng cách sử dụng các quạt được thiết kế đặc biệt và các ống dẫn nhiệt, sản phẩm đảm bảo duy trì nhiệt độ thấp ngay cả khi chạy những tác vụ nặng.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: center;\"><br></p><h3 dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Bàn phím và Touchpad chất lượng cao</strong></b></h3><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Bàn phím của laptop được thiết kế với hành trình phím hợp lý, phản hồi nhanh và có đèn nền RGB, cho phép tùy chỉnh theo sở thích. Điều này giúp mang đến trải nghiệm gõ phím tốt hơn, đặc biệt trong điều kiện ánh sáng yếu. Touchpad cũng được cải tiến với bề mặt mịn màng, giúp việc điều khiển trở nên dễ dàng hơn.</span></p><h3 dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Thời lượng pin đáng nể</strong></b></h3><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Mặc dù là một chiếc laptop gaming, ROG Strix SCAR 16 vẫn được trang bị thời lượng pin tốt, nhờ vào công nghệ tiết kiệm năng lượng và tối ưu hóa hiệu suất. Điều này giúp người dùng có thể chơi game, làm việc hoặc giải trí mà không lo lắng về việc hết pin giữa chừng.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: center;\"><br></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">ASUS ROG Strix SCAR 16 G635LX RW192W</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;là sự kết hợp hoàn hảo giữa hiệu suất và thiết kế. Đây là một sản phẩm lý tưởng cho các game thủ tìm kiếm một chiếc laptop mạnh mẽ, đa năng và bền bỉ. Với những đặc điểm nổi bật như hiệu suất cao, màn hình sắc nét, hệ thống tản nhiệt hiệu quả, chiếc laptop này chắc chắn sẽ mang đến những trải nghiệm tuyệt vời cho người dùng. Liên hệ&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">GEARVN&nbsp;</strong></b><span style=\"white-space: pre-wrap;\">nếu bạn cần tư vấn thêm về sản phẩm!</span></p>', 'pending', 1, 'basic', 2, NULL, '2025-07-18 15:28:32', '2025-07-18 15:31:52');
INSERT INTO `products` (`id`, `shop_id`, `category_id`, `brand_id`, `name`, `slug`, `description`, `status`, `is_visible`, `type`, `views`, `rejected_reason`, `created_at`, `updated_at`) VALUES
(121, 8, 265, 1, 'Laptop gaming ASUS ROG Flow Z13 GZ302EA RU145WS', 'laptop-gaming-asus-rog-flow-z13-gz302ea-ru145ws', '<h2 dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Thông tin sản phẩm</span></h2><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: left;\"><br></p><h2 dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Thông số kỹ thuật:&nbsp;</strong></b></h2><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">CPU</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">AMD Ryzen™ AI MAX+ 395 Processor 3.0GHz (80MB Cache, up to 5.1GHz, 16 cores, 32 Threads); AMD XDNA™ NPU up to 50TOPS</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">RAM</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">128GB LPDDR5X 8000 on board (Actual memory speeds may vary by CPU configuration.)</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Ổ cứng</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">1TB PCIe® 4.0 NVMe™ M.2 SSD (2230)&nbsp;( không nâng cấp)</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Card đồ họa</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">AMD Radeon™ Graphics</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Màn hình</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">13.4 inch 2.5K ROG Nebula (2560 x 1600, WQXGA) 16:10 180Hz IPS, 500 nits, 100% DCI-P3, Glossy display, Adaptive-Sync, PANTONE Validated, Dolby Vision HDR</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Cổng giao tiếp</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">1x USB 3.2 Gen 2 Type-A (data speed up to 10Gbps)</span><br><span style=\"white-space: pre-wrap;\">2x Type-C USB 4 with support for DisplayPort™ / power delivery (data speed up to 40Gbps)</span><br><span style=\"white-space: pre-wrap;\">1x card reader (microSD) (UHS-II)</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Bàn phím</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Backlit Chiclet 1-Zone RGB</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Wifi</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Wi-Fi 6E(802.11ax)+Bluetooth 5.2 (Dual band) 2*2</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Webcam</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">13MP camera and 5MP IR camera</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Hệ điều hành</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Windows 11 Home bản quyền + Trọn đời Microsoft Office Home 2024 + 1 năm Microsoft 365 Basic</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Pin</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">70WHrs, 4S1P, 4-cell Li-ion</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Trọng lượng</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">1.2 kg</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Màu sắc</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Off Black</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Kích thước</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">30.0 x 20.4 x 1.29 ~ 1.49 cm</span></p><h2 dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Đánh giá chi tiết Laptop gaming ASUS ROG Flow Z13 GZ302EA RU145WS</strong></b></h2><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Laptop gaming ASUS ROG Flow Z13 GZ302EA RU145WS</strong></b><span style=\"white-space: pre-wrap;\">&nbsp;là một trong những sản phẩm nổi bật trong dòng&nbsp;laptop gaming của ASUS, đặc biệt với thiết kế độc đáo và cấu hình mạnh mẽ. Trong bài viết này, chúng ta sẽ cùng tìm hiểu chi tiết về sản phẩm này, từ những đặc tính nổi bật cho đến hiệu năng của nó.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Thiết kế sáng tạo và linh hoạt</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">ASUS ROG Flow Z13 được thiết kế đặc biệt với dạng máy tính bảng 2 trong 1, cho phép người dùng có thể dễ dàng chuyển đổi giữa chế độ&nbsp;laptop&nbsp;và chế độ tablet. Vỏ máy được làm từ chất liệu nhôm cao cấp, không chỉ mang lại độ bền mà còn tạo nên vẻ ngoài sang trọng và hiện đại.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: center;\"><br></p><h3 dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Màn hình chất lượng cao</strong></b></h3><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">ASUS ROG Flow Z13 sở hữu màn hình 13.4 inch với độ phân giải 2.5K, mang đến hình ảnh sắc nét và sống động.&nbsp;Tần số quét&nbsp;lên tới 180Hz cùng công nghệ AMOLED hỗ trợ màu sắc chính xác, giúp trải nghiệm chơi game trở nên mượt mà hơn bao giờ hết.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: center;\"><br></p><h3 dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Hiệu năng vượt trội</strong></b></h3><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Sản phẩm được trang bị bộ vi xử lý&nbsp;AMD Ryzen™ AI MAX+ thế hệ mới và&nbsp;card đồ họa AMD Radeon™ Graphics&nbsp;mang lại hiệu năng xử lý mạnh mẽ cho các game thủ. Điều này giúp bạn chiến đấu và trải nghiệm những tựa game mới nhất một cách mượt mà, ngay cả khi có đồ họa cao.</span></p><h3 dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Hệ thống tản nhiệt hiệu quả</strong></b></h3><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">ASUS đã trang bị cho ROG Flow Z13 một&nbsp;hệ thống tản nhiệt&nbsp;hiện đại, giúp máy hoạt động ổn định trong thời gian dài mà không bị nóng. Công nghệ ROG Intelligent Cooling cho phép quản lý nhiệt độ một cách tối ưu, đem lại hiệu suất tốt nhất cho game thủ.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: center;\"><br></p><h3 dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Phím bấm và touchpad tiện lợi</strong></b></h3><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Bàn phím của ASUS ROG Flow Z13 được thiết kế với độ phản hồi tốt và cảm giác gõ thoải mái. Touchpad rộng rãi và nhạy bén, giúp người dùng dễ dàng điều khiển và tối ưu hóa trải nghiệm sử dụng.</span></p><h3 dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Kết nối và cổng giao tiếp phong phú</strong></b></h3><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Laptop được trang bị nhiều cổng kết nối hiện đại như USB-C,&nbsp;Thunderbolt 4,&nbsp;HDMI&nbsp;và đầu đọc&nbsp;thẻ nhớ&nbsp;microSD, giúp người dùng dễ dàng kết nối với các thiết bị ngoại vi và mở rộng khả năng sử dụng.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: center;\"><br></p><h3 dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Tính năng nổi bật của ASUS ROG Flow Z13 GZ302EA RU145WS</strong></b></h3><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Công nghệ đồ họa NVIDIA G-SYNC</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">ASUS ROG Flow Z13 hỗ trợ công nghệ G-SYNC, giúp giảm hiện tượng&nbsp;xé hình&nbsp;và gián đoạn khi chơi game, mang đến trải nghiệm mượt mà lý tưởng cho game thủ.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Âm thanh sống động với Dolby Atmos</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Máy được trang bị công nghệ âm thanh Dolby Atmos, tạo ra hiệu ứng 3D chân thực và sống động, giúp game thủ đắm chìm trong từng âm thanh của trận chiến.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: center;\"><br></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Thời lượng pin ấn tượng</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Với thời lượng pin lên đến 10 giờ, ASUS ROG Flow Z13 giúp bạn có thể làm việc hoặc chơi game mà không lo hết pin giữa chừng, rất phù hợp cho những người thường xuyên di chuyển.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Tính năng bảo mật cao</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">ASUS ROG Flow Z13 được trang bị cảm biến vân tay và nhận diện khuôn mặt, giúp bảo vệ dữ liệu của bạn an toàn và thuận tiện trong việc đăng nhập.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: center;\"><br></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Hệ điều hành Windows 11</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Máy được cài đặt sẵn hệ điều hành Windows 11 mới nhất, cùng nhiều tính năng cải tiến giúp tối ưu hóa hiệu suất và trải nghiệm người dùng.</span></p><h3 dir=\"ltr\" style=\"text-align: justify;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Tùy chọn mở rộng với ROG XG Mobile</strong></b></h3><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Một trong những tính năng nổi bật là khả năng kết nối với ROG XG Mobile – một bộ xử lý đồ họa bên ngoài, mang đến hiệu suất đồ họa cực mạnh mẽ cho những tác vụ đòi hỏi cao.</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: justify;\"><span style=\"white-space: pre-wrap;\">Tóm lại,&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">ASUS ROG Flow Z13 GZ302EA RU145WS&nbsp;</strong></b><span style=\"white-space: pre-wrap;\">không chỉ là một laptop gaming mạnh mẽ mà còn là một sản phẩm sáng tạo với nhiều tính năng nổi bật. Với thiết kế ấn tượng, hiệu năng vượt trội, màn hình chất lượng cao cùng hệ thống tản nhiệt hiệu quả, đây chắc chắn là một lựa chọn tuyệt vời cho những game thủ và người dùng đam mê công nghệ. Nếu bạn đang tìm kiếm một chiếc laptop gaming đa năng, liên hệ&nbsp;</span><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">GEARVN&nbsp;</strong></b><span style=\"white-space: pre-wrap;\">để sở hữu ngay!</span></p>', 'pending', 1, 'basic', 7, NULL, '2025-07-18 15:37:38', '2025-07-26 12:06:02'),
(122, 8, 265, 1, 'Laptop gaming MSI Stealth A16 Mercedes AMG AI+ A3XWGG 032VN', 'laptop-gaming-msi-stealth-a16-mercedes-amg-ai-a3xwgg-032vn', '<h2 dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Thông tin sản phẩm</span></h2><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: left;\"><br></p><h2 dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">THÔNG SỐ KĨ THUẬT:</strong></b></h2><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">CPU</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">AMD Ryzen™ AI 9 HX 370 Processor with up to 50 NPU TOPS (80 total AI TOPS)&nbsp;12 core, 24 thread, 36MB cache, Max Turbo Frequency 5.1 GHz</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">RAM</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">32GB (2x16GB) DDR5 5600MHz (2x SO-DIMM socket, up to 96GB SDRAM)</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Ổ lưu trữ</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">2TB NVMe SSD PCIe Gen4 (2 x M.2 SSD slots)</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Card đồ họa</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">NVIDIA® GeForce RTX™ 5070 Laptop GPU powers advanced AI with 798 AI TOPS</span><br><span style=\"white-space: pre-wrap;\">\"Up to 2025MHz Boost Clock 95W Maximum Graphics Power with Dynamic Boost.</span><br><span style=\"white-space: pre-wrap;\">&nbsp;*May vary by scenario\"</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Màn hình</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">16inch 16:10 QHD+(2560 x 1600) OLED, 240Hz, 100% DCI-P3,&nbsp;Tr+Tf 1ms, 400 nits,&nbsp;VESA DisplayHDR™ True Black 600 Certified</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><br><br><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Cổng giao tiếp</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">1x Type-C (USB4® / DisplayPort™/ Power Delivery 3.0/ Thunderbolt™ 4 compatible)</span><br><span style=\"white-space: pre-wrap;\">2x Type-A USB3.2 Gen2</span><br><span style=\"white-space: pre-wrap;\">1x 1x HDMI™ 2.1 (8K @ 60Hz / 4K @ 120Hz)</span><br><span style=\"white-space: pre-wrap;\">1x Micro SD Card Reader</span><br><span style=\"white-space: pre-wrap;\">1x RJ45</span><br><span style=\"white-space: pre-wrap;\">1x Mic-in/Headphone-out Combo Jack</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Bàn phím</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Per-Key RGB Gaming Keyboard by SteelSeries with Copilot Key</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Audio</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">2 x 2W loa con và 4 x 2W loa trầm, thiết kế bởi Dynaudio, Nahimic 3 Audio Enhancer, hỗ trợ Hi-Res Audio</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">LAN</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">2.5 Gigabit Ethernet</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Wifi + Bluetooth</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Wi-Fi 7 , Bluetooth v5.4</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Bảo mật</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Fingerprint Security</span><br><span style=\"white-space: pre-wrap;\">Firmware Trusted Platform Module(fTPM) 2.0</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Webcam</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">IR FHD type (30fps@1080p) with HDR</span><br><span style=\"white-space: pre-wrap;\">3D Noise Reduction+ (3DNR+)</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Pin</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">4-Cell 99.9 Battery (Whr)</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Trọng lượng</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">2.1 kg</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Hệ điều hành</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Windows 11 Home (MSI recommends Windows 11 Pro for business.)</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Màu sắc</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Selenite Gray</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Chất liệu</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">A,C,D: Metal</span><br><span style=\"white-space: pre-wrap;\">B : Plastic</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Kích thước</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">355.8 x 259.7 x 19.95 mm</span></p>', 'pending', 1, 'basic', 2, NULL, '2025-07-18 15:43:44', '2025-07-24 12:52:29'),
(123, 8, 265, 1, 'Laptop gaming Lenovo Legion Pro 5 16IAX10 83F3003VVN', 'laptop-gaming-lenovo-legion-pro-5-16iax10-83f3003vvn', '<h2 dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Thông tin sản phẩm</span></h2><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" style=\"text-align: left;\"><br></p><h2 dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Thông số kĩ thuật:&nbsp;</strong></b></h2><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">CPU</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Intel® Core™ Ultra 9 275HX, 24C (8P + 16E) / 24T, Max Turbo up to 5.4GHz, 36MB,&nbsp;Integrated Intel® AI Boost, up to 13 TOPS</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">RAM</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">32GB (2x16GB) SO-DIMM DDR5 5600MHz (2 slots, nâng cấp tối đa 32GB)</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Ổ cứng</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">1TB SSD M.2 2242 PCIe® 4.0x4 NVMe®</span><br><span style=\"white-space: pre-wrap;\">Up to two drives, 2x M.2 SSD</span><br><span style=\"white-space: pre-wrap;\">• M.2 2242 SSD up to 1TB</span><br><span style=\"white-space: pre-wrap;\">• M.2 2280 SSD up to 1TB</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Card đồ họa</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">NVIDIA® GeForce RTX™ 5060 8GB GDDR7, Boost Clock 2497MHz, TGP 115W, 572 AI TOPS</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Màn hình</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">16\" WQXGA (2560x1600) OLED 500nits Glossy, 100% DCI-P3, 165Hz, DisplayHDR™ True Black 1000, Dolby Vision®, G-SYNC®, Low Blue Light, High Gaming Performance, Flicker Free</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Cổng giao tiếp</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">2x USB-A (USB 5Gbps / USB 3.2 Gen 1)</span><br><span style=\"white-space: pre-wrap;\">1x USB-A (USB 10Gbps / USB 3.2 Gen 2), Always On</span><br><span style=\"white-space: pre-wrap;\">1x USB-C® (USB 10Gbps / USB 3.2 Gen 2), with USB PD 65-100W and DisplayPort™ 2.1</span><br><span style=\"white-space: pre-wrap;\">1x USB-C® (Thunderbolt™ 4 / USB4® 40Gbps), with DisplayPort™ 2.1</span><br><span style=\"white-space: pre-wrap;\">1x HDMI® 2.1, up to 8K/60Hz</span><br><span style=\"white-space: pre-wrap;\">1x Headphone / microphone combo jack (3.5mm)</span><br><span style=\"white-space: pre-wrap;\">1x Ethernet (RJ-45)</span><br><span style=\"white-space: pre-wrap;\">1x Power connector</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Bàn phím</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">24-Zone RGB Backlit, English</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Audio</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Stereo speakers, 2W x2, audio by HARMAN, optimized with Nahimic Audio</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Finger Print</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">None</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Chuẩn LAN</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">100/1000M (RJ-45)</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Chuẩn WIFI</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Wi-Fi® 7, 802.11be 2x2</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Bluetooth</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">v5.4</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Webcam</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">5.0MP with E-shutter</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Hệ điều hành</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Windows® 11 Home Single Language, English</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Pin</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">80Wh,&nbsp;245W Slim Tip (3-pin)</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Trọng lượng</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Starting at 2.57 kg (5.67 lbs)</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Màu sắc</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Eclipse Blac</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Chất liệu</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">Aluminium (Top), Aluminium (Bottom)</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Kích thước</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">364.38 x 268.06 x 21.69-25.95 mm</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Tính năng đặc biệt</strong></b></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: left;\"><span style=\"white-space: pre-wrap;\">AI Chip: LA3</span></p>', 'pending', 1, 'basic', 3, NULL, '2025-07-18 15:57:52', '2025-07-26 06:22:57'),
(124, 8, 281, 2, 'Máy chơi game Sony PlayStation 5 Slim (PS5 Slim) Bản ổ đĩa | Chính hãng Sony Việt Nam', 'may-choi-game-sony-playstation-5-slim-ps5-slim-ban-o-dia-chinh-hang-sony-viet-nam', '<h2 dir=\"ltr\" style=\"text-align: start;\"><b><strong class=\"font-bold\" style=\"white-space: pre-wrap;\">Thông số kỹ thuật</strong></b></h2><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"white-space: pre-wrap;\">Loại CPU</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"white-space: pre-wrap;\">x86-64-AMD Ryzen ™ “Zen 2” 8 lõi / 16 luồng 3,5 GHz</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"white-space: pre-wrap;\">Dòng điện vào</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"white-space: pre-wrap;\">100-240V, 50/60Hz</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"white-space: pre-wrap;\">Hãng sản xuất</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"white-space: pre-wrap;\">Sony</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"white-space: pre-wrap;\">Độ phân giải màn hình</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"white-space: pre-wrap;\">Hỗ trợ TV 4K 120Hz, TV 8K, VRR (được chỉ định bởi HDMI ver.2.1)</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"white-space: pre-wrap;\">Kết nối</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"white-space: pre-wrap;\">Ethernet (10BASE-T, 100BASE-TX, 1000BASE-T)</span><br><span style=\"white-space: pre-wrap;\">Wi-fi: IEEE 802.11 a/b/g/n/ac/ax</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"white-space: pre-wrap;\">Cổng giao tiếp</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"white-space: pre-wrap;\">Cổng USB Type-C® (USB siêu tốc 10Gbps)</span><br><span style=\"white-space: pre-wrap;\">Cổng USB Type-C® (USB tốc độ cao)</span><br><span style=\"white-space: pre-wrap;\">Cổng USB loại A (USB siêu tốc 10Gbps) x2</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"white-space: pre-wrap;\">Tính năng khác</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"white-space: pre-wrap;\">Âm thanh: Công nghệ âm thanh 3D “Bão tố”</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"white-space: pre-wrap;\">Tiện ích</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"white-space: pre-wrap;\">Đĩa trò chơi Ultra HD Blu-ray™, lên đến 100GB/đĩa</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"white-space: pre-wrap;\">Bộ nhớ</span></p><p class=\"leading-7 [&amp;:not(:first-child)]:mt-0\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"white-space: pre-wrap;\">Bộ nhớ hệ thống: GDDR6 16GB 448GB/giây</span><br><span style=\"white-space: pre-wrap;\">Bộ nhớ SSD: 1TB 5,5 GB/giây (Thô)</span></p>', 'pending', 1, 'basic', 8, NULL, '2025-07-18 16:05:55', '2025-07-26 13:31:15');

-- --------------------------------------------------------

--
-- Table structure for table `product_attribute_values`
--

CREATE TABLE `product_attribute_values` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `attribute_value_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_attribute_values`
--

INSERT INTO `product_attribute_values` (`id`, `product_id`, `attribute_value_id`, `created_at`, `updated_at`) VALUES
(2, 113, 114, '2025-07-15 15:20:01', '2025-07-15 15:20:01'),
(7, 113, 125, '2025-07-15 16:12:25', '2025-07-15 16:12:25'),
(8, 113, 126, '2025-07-15 16:16:31', '2025-07-15 16:16:31'),
(9, 111, 126, '2025-07-15 16:16:37', '2025-07-15 16:16:37'),
(10, 113, 129, '2025-07-15 16:33:04', '2025-07-15 16:33:04'),
(11, 113, 130, '2025-07-15 16:37:45', '2025-07-15 16:37:45'),
(12, 111, 130, '2025-07-15 16:37:58', '2025-07-15 16:37:58'),
(19, 111, 141, '2025-07-16 06:02:56', '2025-07-16 06:02:56'),
(20, 110, 108, '2025-07-16 07:44:50', '2025-07-16 07:44:50'),
(21, 114, 107, '2025-07-16 07:47:25', '2025-07-16 07:47:25'),
(22, 114, 128, '2025-07-16 07:47:25', '2025-07-16 07:47:25'),
(23, 117, 148, '2025-07-16 08:04:03', '2025-07-16 08:04:03'),
(24, 117, 154, '2025-07-16 08:04:03', '2025-07-16 08:04:03'),
(25, 117, 159, '2025-07-16 08:04:03', '2025-07-16 08:04:03'),
(26, 117, 162, '2025-07-16 08:04:03', '2025-07-16 08:04:03'),
(27, 118, 147, '2025-07-16 19:21:09', '2025-07-16 19:21:09'),
(28, 118, 148, '2025-07-16 19:21:09', '2025-07-16 19:21:09'),
(29, 118, 154, '2025-07-16 19:21:09', '2025-07-16 19:21:09'),
(30, 118, 161, '2025-07-16 19:21:09', '2025-07-16 19:21:09'),
(31, 118, 163, '2025-07-16 19:21:09', '2025-07-16 19:21:09');

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
  `price` decimal(15,0) NOT NULL,
  `discount_price` int DEFAULT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stock_limit` int NOT NULL DEFAULT '1',
  `sold_count` int NOT NULL DEFAULT '0',
  `weight` int NOT NULL COMMENT 'gram',
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_variants`
--

INSERT INTO `product_variants` (`id`, `product_id`, `sku`, `price`, `discount_price`, `stock`, `image`, `stock_limit`, `sold_count`, `weight`, `status`, `created_at`, `updated_at`) VALUES
(361, 110, 'SP00353', 19800000, NULL, 97, NULL, 1, 0, 5000, 'active', '2025-07-12 08:14:05', '2025-07-26 12:06:26'),
(362, 110, 'SP00354', 20800000, NULL, 2, NULL, 1, 0, 5000, 'active', '2025-07-12 08:14:05', '2025-07-23 06:45:59'),
(363, 111, 'SP00355', 13200000, NULL, 0, NULL, 1, 0, 900, 'active', '2025-07-12 08:19:39', '2025-07-20 16:34:34'),
(364, 111, 'SP00356', 14200000, NULL, 0, NULL, 1, 0, 900, 'active', '2025-07-12 08:19:39', '2025-07-20 16:47:10'),
(371, 113, 'SP00363', 19500000, NULL, 0, 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403982/iphone-15-green-700x700-1_1752403981.webp', 1, 0, 1500, 'active', '2025-07-13 10:56:45', '2025-07-23 08:14:37'),
(372, 113, 'SP00364', 20500000, NULL, 0, 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403982/iphone-15-green-700x700-1_1752403981.webp', 1, 0, 1500, 'active', '2025-07-13 10:56:45', '2025-07-23 08:14:37'),
(373, 113, 'SP00365', 21500000, NULL, 0, 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403982/iphone-15-green-700x700-1_1752403981.webp', 1, 0, 1500, 'active', '2025-07-13 10:56:45', '2025-07-23 08:14:37'),
(374, 113, 'SP00366', 19500000, NULL, 0, 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403974/iphone-15-blue-700x700-1_1752403973.webp', 1, 0, 1500, 'active', '2025-07-13 10:56:45', '2025-07-23 08:14:37'),
(375, 113, 'SP00367', 20500000, NULL, 0, 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403974/iphone-15-blue-700x700-1_1752403973.webp', 1, 0, 1500, 'active', '2025-07-13 10:56:45', '2025-07-23 08:14:58'),
(376, 113, 'SP00368', 21500000, NULL, 13, 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403974/iphone-15-blue-700x700-1_1752403973.webp', 1, 0, 1500, 'active', '2025-07-13 10:56:45', '2025-07-23 08:25:47'),
(377, 113, 'SP00369', 19500000, NULL, 0, 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403997/iphone-15-plus-pink_1752403995.webp', 1, 0, 1500, 'active', '2025-07-13 10:56:45', '2025-07-23 08:14:37'),
(378, 113, 'SP00370', 20500000, NULL, 0, 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403997/iphone-15-plus-pink_1752403995.webp', 1, 0, 1500, 'active', '2025-07-13 10:56:45', '2025-07-23 08:14:37'),
(379, 113, 'SP00371', 21500000, NULL, 6, 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403997/iphone-15-plus-pink_1752403995.webp', 1, 0, 1500, 'active', '2025-07-13 10:56:45', '2025-07-26 10:25:26'),
(380, 113, 'SP00372', 19500000, NULL, 4, 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403971/iphone-15-black-700x700-1_1752403966.webp', 1, 0, 1500, 'active', '2025-07-13 10:56:45', '2025-07-23 08:14:37'),
(381, 113, 'SP00373', 20500000, NULL, 3, 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403971/iphone-15-black-700x700-1_1752403966.webp', 1, 0, 1500, 'active', '2025-07-13 10:56:45', '2025-07-23 08:14:37'),
(382, 113, 'SP00374', 21500000, NULL, 7, 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403971/iphone-15-black-700x700-1_1752403966.webp', 1, 0, 1500, 'active', '2025-07-13 10:56:45', '2025-07-23 08:14:37'),
(383, 113, 'SP00375', 19500000, NULL, 5, 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403988/iphone-15-yellow-700x700-1_1752403987.webp', 1, 0, 1500, 'active', '2025-07-13 10:56:45', '2025-07-23 08:14:37'),
(384, 113, 'SP00376', 20500000, NULL, 0, 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403988/iphone-15-yellow-700x700-1_1752403987.webp', 1, 0, 1500, 'active', '2025-07-13 10:56:45', '2025-07-23 08:14:37'),
(385, 113, 'SP00377', 21500000, NULL, 15, 'https://res.cloudinary.com/diaenxa58/image/upload/v1752403988/iphone-15-yellow-700x700-1_1752403987.webp', 1, 0, 1500, 'active', '2025-07-13 10:56:45', '2025-07-23 08:14:37'),
(386, 114, 'SP00378', 12800000, NULL, 0, NULL, 1, 0, 1500, 'active', '2025-07-16 07:44:39', '2025-07-21 16:29:12'),
(389, 117, 'SP00379', 3600000, NULL, 0, 'https://res.cloudinary.com/diaenxa58/image/upload/v1752652294/22624-PS5-DUALSENSE-WIRELESS-CONTROLLER-GHOST-OF-YOTEI-GOLD-LIMITED-EDITION-00_1752652293.webp', 1, 0, 500, 'active', '2025-07-16 07:54:20', '2025-07-20 04:21:00'),
(390, 117, 'SP00380', 3500000, NULL, 0, 'https://res.cloudinary.com/diaenxa58/image/upload/v1752652289/22624-PS5-DUALSENSE-WIRELESS-CONTROLLER-GHOST-OF-YOTEI-BLACK-LIMITED-EDITION-00_1752652288.webp', 1, 0, 500, 'active', '2025-07-16 07:54:21', '2025-07-23 07:32:33'),
(391, 118, 'SP00381', 4500000, NULL, 0, NULL, 1, 0, 1000, 'active', '2025-07-16 08:08:09', '2025-07-23 07:15:51'),
(392, 119, 'SP00382', 67990000, NULL, 199, NULL, 1, 0, 2650, 'active', '2025-07-18 15:17:09', '2025-07-23 19:34:46'),
(393, 120, 'SP00383', 117990000, NULL, 5000, NULL, 1, 0, 2800, 'active', '2025-07-18 15:28:32', '2025-07-18 15:28:32'),
(394, 121, 'SP00384', 79990000, NULL, 3498, NULL, 1, 0, 1200, 'active', '2025-07-18 15:37:38', '2025-07-26 13:27:32'),
(395, 122, 'SP00385', 78490000, NULL, 3495, NULL, 1, 0, 2100, 'active', '2025-07-18 15:43:44', '2025-07-24 12:54:10'),
(396, 123, 'SP00386', 50990000, NULL, 3499, NULL, 1, 0, 2570, 'active', '2025-07-18 15:57:52', '2025-07-23 09:03:51'),
(397, 124, 'SP00387', 13090000, NULL, 295, NULL, 1, 0, 500, 'active', '2025-07-18 16:05:55', '2025-07-26 13:31:24');

-- --------------------------------------------------------

--
-- Table structure for table `product_variant_attributes`
--

CREATE TABLE `product_variant_attributes` (
  `id` bigint UNSIGNED NOT NULL,
  `product_variant_id` bigint UNSIGNED NOT NULL,
  `attribute_value_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_variant_attributes`
--

INSERT INTO `product_variant_attributes` (`id`, `product_variant_id`, `attribute_value_id`, `created_at`, `updated_at`) VALUES
(317, 361, 57, NULL, NULL),
(318, 362, 58, NULL, NULL),
(319, 363, 57, NULL, NULL),
(320, 364, 58, NULL, NULL),
(333, 371, 120, NULL, NULL),
(334, 371, 52, NULL, NULL),
(335, 372, 120, NULL, NULL),
(336, 372, 49, NULL, NULL),
(337, 373, 120, NULL, NULL),
(338, 373, 50, NULL, NULL),
(339, 374, 121, NULL, NULL),
(340, 374, 52, NULL, NULL),
(341, 375, 121, NULL, NULL),
(342, 375, 49, NULL, NULL),
(343, 376, 121, NULL, NULL),
(344, 376, 50, NULL, NULL),
(345, 377, 122, NULL, NULL),
(346, 377, 52, NULL, NULL),
(347, 378, 122, NULL, NULL),
(348, 378, 49, NULL, NULL),
(349, 379, 122, NULL, NULL),
(350, 379, 50, NULL, NULL),
(351, 380, 123, NULL, NULL),
(352, 380, 52, NULL, NULL),
(353, 381, 123, NULL, NULL),
(354, 381, 49, NULL, NULL),
(355, 382, 123, NULL, NULL),
(356, 382, 50, NULL, NULL),
(357, 383, 124, NULL, NULL),
(358, 383, 52, NULL, NULL),
(359, 384, 124, NULL, NULL),
(360, 384, 49, NULL, NULL),
(361, 385, 124, NULL, NULL),
(362, 385, 50, NULL, NULL),
(363, 389, 142, NULL, NULL),
(364, 390, 143, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `promotions`
--

CREATE TABLE `promotions` (
  `id` bigint UNSIGNED NOT NULL,
  `type` enum('voucher','product_discount') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_by` bigint UNSIGNED NOT NULL,
  `discount_type` enum('percent','amount') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'percent',
  `discount_value` decimal(10,2) NOT NULL,
  `max_discount` decimal(10,2) DEFAULT NULL,
  `min_order_value` decimal(10,2) DEFAULT NULL,
  `scope` enum('platform','category','shop','product') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `usage_limit` int DEFAULT NULL,
  `usage_limit_per_user` int DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `promotions`
--

INSERT INTO `promotions` (`id`, `type`, `code`, `name`, `description`, `created_by`, `discount_type`, `discount_value`, `max_discount`, `min_order_value`, `scope`, `usage_limit`, `usage_limit_per_user`, `start_date`, `end_date`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'voucher', 'GIAMGIA5%', 'Giảm giá 5%', NULL, 41, 'percent', 5.00, 100000.00, 50000.00, 'platform', 10, 1, '2025-07-02 10:00:00', '2025-07-02 11:00:00', 1, '2025-07-02 09:12:01', '2025-07-02 09:12:01'),
(2, 'voucher', 'GIAMGIA5%1', 'Giảm giá 5% cho một số sản phẩm', NULL, 41, 'percent', 5.00, 100000.00, 50000.00, 'platform', 10, 5, '2025-07-02 10:00:00', '2025-07-02 11:00:00', 1, '2025-07-02 09:14:30', '2025-07-02 09:14:30'),
(3, 'voucher', 'SALE10%', 'Giảm giá 10%', NULL, 41, 'percent', 5.00, 100000.00, 50000.00, 'shop', 10, 1, '2025-07-09 11:00:00', '2025-07-09 12:00:00', 1, '2025-07-09 11:02:03', '2025-07-09 11:02:03');

-- --------------------------------------------------------

--
-- Table structure for table `promotion_product`
--

CREATE TABLE `promotion_product` (
  `id` bigint UNSIGNED NOT NULL,
  `promotion_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `promotion_user_usages`
--

CREATE TABLE `promotion_user_usages` (
  `id` bigint UNSIGNED NOT NULL,
  `promotion_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `used_count` int DEFAULT '1',
  `last_used_at` datetime DEFAULT CURRENT_TIMESTAMP
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
('ErnUqybbRhgGkTvRmIrD9WYpt13OJdj6x1muR8BN', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMWxkQ284UGdaQ2ZmaXhpdEFwb2ZRS2pHN0tESnFuUDk0cW51WVFHWSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1741800322),
('pm6EH3eY4NW28O0hKQO8OTDWZfiKuABgDKJ83h5B', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNFJma0k0eFFSd3hnek9xT05qZFVRVzNEQ3lZc1NQSlRNNkVsUzdWVyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1744970356);

-- --------------------------------------------------------

--
-- Table structure for table `shops`
--

CREATE TABLE `shops` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ward` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `province` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `district` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `banner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','active','banned') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `rating` float NOT NULL DEFAULT '0',
  `total_reviews` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shops`
--

INSERT INTO `shops` (`id`, `user_id`, `name`, `phone`, `address`, `ward`, `province`, `district`, `slug`, `description`, `logo`, `banner`, `status`, `is_active`, `rating`, `total_reviews`, `created_at`, `updated_at`) VALUES
(6, 40, 'Phong Vũ', '0937027877', '132, Phường Tân Phước Khánh, Thành phố Tân Uyên, Tỉnh Bình Dương', '', 'TP Hồ Chí Minh', 'Quận 1', 'phong-vu', NULL, 'https://shopfront-cdn.tekoapis.com/static/phongvu/logo.svg', NULL, 'active', 1, 0, 0, '2025-05-23 09:39:28', '2025-05-23 09:39:28'),
(7, 41, 'Cheap Hobby', '0912345678', '29 đường Võ Thị Sáu', 'Phường Võ Thị Sáu', 'Hà Nội', 'Quận Cầu Giấy', 'cheap-hobby', NULL, 'https://bizweb.dktcdn.net/100/524/018/themes/960057/assets/logo.png?1750243044069', NULL, 'active', 1, 0, 0, '2025-06-20 04:42:19', '2025-06-20 04:47:12'),
(8, 42, 'Tom Gaming', '0876554123', 'Bến tre City, Ward 8', 'Phường 8', 'Tỉnh Bến Tre', 'Thành phố Bến Tre', 'tom-gaming', NULL, 'https://res.cloudinary.com/diaenxa58/image/upload/v1752839637/360_F_139667450_iZYYGIKviQig3UIbGwAp9aeNvktW29Tb_1752837697.webp', NULL, 'active', 1, 0, 0, '2025-07-18 11:22:39', '2025-07-18 11:22:39');

-- --------------------------------------------------------

--
-- Table structure for table `sku_sequences`
--

CREATE TABLE `sku_sequences` (
  `id` bigint UNSIGNED NOT NULL,
  `prefix` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'SP',
  `current_number` bigint UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sku_sequences`
--

INSERT INTO `sku_sequences` (`id`, `prefix`, `current_number`) VALUES
(1, 'SP', 387);

-- --------------------------------------------------------

--
-- Table structure for table `social_accounts`
--

CREATE TABLE `social_accounts` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `provider_user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `social_accounts`
--

INSERT INTO `social_accounts` (`id`, `user_id`, `provider_user_id`, `provider`, `created_at`, `updated_at`) VALUES
(6, 48, '113005670716771396684', 'google', '2025-07-26 09:33:11', '2025-07-26 09:33:11'),
(7, 49, '101558422621578097864', 'google', '2025-07-26 10:23:00', '2025-07-26 10:23:00'),
(8, 40, '105758567825779650519', 'google', '2025-07-26 11:01:47', '2025-07-26 11:01:47');

-- --------------------------------------------------------

--
-- Table structure for table `temporary_images`
--

CREATE TABLE `temporary_images` (
  `id` int NOT NULL,
  `public_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `temporary_images`
--

INSERT INTO `temporary_images` (`id`, `public_id`, `url`, `created_at`, `updated_at`) VALUES
(1, 'pro2_1753359182', 'https://res.cloudinary.com/diaenxa58/image/upload/v1753359187/pro2_1753359182.webp', '2025-07-24 12:13:08', '2025-07-24 12:13:08'),
(2, 'de_1753359256', 'https://res.cloudinary.com/diaenxa58/image/upload/v1753359260/de_1753359256.webp', '2025-07-24 12:14:22', '2025-07-24 12:14:22'),
(3, 'pro2_1753359288', 'https://res.cloudinary.com/diaenxa58/image/upload/v1753359291/pro2_1753359288.webp', '2025-07-24 12:14:52', '2025-07-24 12:14:52'),
(4, 'pro2_1753359466', 'https://res.cloudinary.com/diaenxa58/image/upload/v1753359470/pro2_1753359466.webp', '2025-07-24 12:17:51', '2025-07-24 12:17:51'),
(5, '9718b9b7-8444-49d0-8e44-c9deb6f9_1753359567', 'https://res.cloudinary.com/diaenxa58/image/upload/v1753359568/9718b9b7-8444-49d0-8e44-c9deb6f9_1753359567.webp', '2025-07-24 12:19:29', '2025-07-24 12:19:29'),
(6, '6e7cff6f-8bad-4ec3-9521-773bcf2e_1753359593', 'https://res.cloudinary.com/diaenxa58/image/upload/v1753359595/6e7cff6f-8bad-4ec3-9521-773bcf2e_1753359593.webp', '2025-07-24 12:19:56', '2025-07-24 12:19:56'),
(7, '81ja7cKE70L._AC_SL1500__1753359632', 'https://res.cloudinary.com/diaenxa58/image/upload/v1753359634/81ja7cKE70L._AC_SL1500__1753359632.webp', '2025-07-24 12:20:35', '2025-07-24 12:20:35'),
(8, 'images_1753359841', 'https://res.cloudinary.com/diaenxa58/image/upload/v1753359844/images_1753359841.webp', '2025-07-24 12:24:06', '2025-07-24 12:24:06'),
(9, '7a58316afb25e24feff942f6a3c125d3_1753360198', 'https://res.cloudinary.com/diaenxa58/image/upload/v1753360199/7a58316afb25e24feff942f6a3c125d3_1753360198.webp', '2025-07-24 12:30:00', '2025-07-24 12:30:00'),
(10, 'png-cute-cartoon-boy-avatar-in-purple-hoodie-smiling-3d-pixar-style--MPwItsTG_1753360933', 'https://res.cloudinary.com/diaenxa58/image/upload/v1753360934/png-cute-cartoon-boy-avatar-in-purple-hoodie-smiling-3d-pixar-style--MPwItsTG_1753360933.webp', '2025-07-24 12:42:15', '2025-07-24 12:42:15'),
(11, 'pngtree-adorable-blue-snake-character-in-pixar-style-with-bright-colors-and-png-image_16625371_1753360944', 'https://res.cloudinary.com/diaenxa58/image/upload/v1753360946/pngtree-adorable-blue-snake-character-in-pixar-style-with-bright-colors-and-png-image_16625371_1753360944.webp', '2025-07-24 12:42:27', '2025-07-24 12:42:27'),
(12, 'png-transparent-ratatouille-hollywood-ratatouille-film-pixar-the-walt-disney-company-rat-mammal-animals-cooking-thumbnail_1753361088', 'https://res.cloudinary.com/diaenxa58/image/upload/v1753361089/png-transparent-ratatouille-hollywood-ratatouille-film-pixar-the-walt-disney-company-rat-mammal-animals-cooking-thumbnail_1753361088.webp', '2025-07-24 12:44:50', '2025-07-24 12:44:50'),
(13, 'png-clipart-film-poster-pixar-the-walt-disney-company-remy-ratatuille-mammal-mouse_1753361102', 'https://res.cloudinary.com/diaenxa58/image/upload/v1753361103/png-clipart-film-poster-pixar-the-walt-disney-company-remy-ratatuille-mammal-mouse_1753361102.webp', '2025-07-24 12:45:04', '2025-07-24 12:45:04'),
(14, '532-5329061_day-18-disney-challenge-favorite-pixar-movie-ratatouille_1753361133', 'https://res.cloudinary.com/diaenxa58/image/upload/v1753361135/532-5329061_day-18-disney-challenge-favorite-pixar-movie-ratatouille_1753361133.webp', '2025-07-24 12:45:36', '2025-07-24 12:45:36'),
(15, 'quirky-d-animation-cartoon-zebra-free-isolated-background-animated-cartoon-zebra-created-png-cartoon-style-john-296367769_1753361179', 'https://res.cloudinary.com/diaenxa58/image/upload/v1753361181/quirky-d-animation-cartoon-zebra-free-isolated-background-animated-cartoon-zebra-created-png-cartoon-style-john-296367769_1753361179.webp', '2025-07-24 12:46:22', '2025-07-24 12:46:22'),
(16, 'z6731128112608_988955853ed320aa0cea49b9959703bc_1753511667', 'https://res.cloudinary.com/diaenxa58/image/upload/v1753511670/z6731128112608_988955853ed320aa0cea49b9959703bc_1753511667.webp', '2025-07-26 06:34:31', '2025-07-26 06:34:31');

-- --------------------------------------------------------

--
-- Table structure for table `transporters`
--

CREATE TABLE `transporters` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `api_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `api_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transporters`
--

INSERT INTO `transporters` (`id`, `name`, `api_url`, `api_token`, `status`, `created_at`, `updated_at`) VALUES
(3, 'Giao hàng tiết kiệm', 'https://services.giaohangtietkiem.vn/services/shipment/fee', '1SRdcXpKiL6X9DpkFKshtycKvAkpo3R4EDzMgkD', 'active', '2025-06-12 07:09:47', '2025-06-12 11:00:48'),
(4, 'Giao hàng nhanh', 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', 'f2f77791-45e9-11f0-ae32-f65f120fddc0', 'active', '2025-06-12 07:58:02', '2025-06-12 10:39:21');

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
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('male','female','other','') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `verify_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `verify_code_expired_at` timestamp NULL DEFAULT NULL,
  `role` enum('admin','shop','user') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `status` enum('inactive','active','ban','') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'inactive',
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `has_changed_user_name` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_name`, `email`, `password`, `full_name`, `date_of_birth`, `gender`, `avatar`, `phone`, `email_verified_at`, `verify_code`, `verify_code_expired_at`, `role`, `status`, `remember_token`, `has_changed_user_name`, `created_at`, `updated_at`) VALUES
(2, 'Nick', 'admin99@gmail.com', '$2y$12$lcAH1Ii0BaWJoe4HPI/H6.FVjvut2GwmVzq5VVhhlNuokdpJkQ5ga', 'Thế Quang', NULL, NULL, 'http://demos.themeselection.com/materio-mui-nextjs-admin-template/demo-1/images/avatars/2.png', '0901234567', NULL, 'eWXhQetMEJshagzAiMpfdhHwZG96B81h3WIDdt7ht8f9J44M23aKUhiAKUOX', '2025-03-17 11:40:08', 'user', 'ban', NULL, 0, '2025-03-13 23:27:14', '2025-03-17 11:25:08'),
(3, 'S2F8v5ct', 'admin999@gmail.com', '$2y$12$PuOdzhSCiuiIGYBDAIbAz.tzSMMwZ5PpVdeGBKkpdqTkYQyviIC6.', 'Hoàng Yến', NULL, NULL, 'http://demos.themeselection.com/materio-mui-nextjs-admin-template/demo-1/images/avatars/3.png', '0989889558', NULL, 'ftBd4Ib6NQxezQOCeZ497EjEzLeMAz7kWMIX1ddhvmO6aA8HIFHVeX0a9RQ6', '2025-03-17 11:44:39', 'user', 'active', NULL, 0, '2025-03-14 01:30:09', '2025-03-17 11:29:39'),
(4, 'sophia_wilson', 'sophiawilson77@gmail.com', '$2y$12$abcdefgh12345678ijklmnop', 'Sophia Wilson', NULL, NULL, 'http://demos.themeselection.com/materio-mui-nextjs-admin-template/demo-1/images/avatars/6.png', '0945678901', NULL, NULL, NULL, 'admin', 'active', NULL, 0, '2025-03-15 01:30:22', '2025-03-15 01:30:22'),
(5, 'michael_brown', 'michaelbrown55@gmail.com', '$2y$12$abcdefgh12345678ijklmnop', 'Michael Brown', NULL, NULL, 'http://demos.themeselection.com/materio-mui-nextjs-admin-template/demo-1/images/avatars/7.png', '0956789012', NULL, NULL, NULL, 'user', 'ban', NULL, 0, '2025-03-15 02:45:10', '2025-03-15 02:45:10'),
(6, 'olivia_taylor', 'oliviataylor22@gmail.com', '$2y$12$abcdefgh12345678ijklmnop', 'Olivia Taylor', NULL, NULL, 'http://demos.themeselection.com/materio-mui-nextjs-admin-template/demo-1/images/avatars/8.png', '0967890123', NULL, NULL, NULL, 'user', 'active', NULL, 0, '2025-03-15 04:12:50', '2025-03-15 04:12:50'),
(7, 'daniel_miller', 'danielmiller44@gmail.com', '$2y$12$abcdefgh12345678ijklmnop', 'Daniel Miller', NULL, NULL, 'http://demos.themeselection.com/materio-mui-nextjs-admin-template/demo-1/images/avatars/1.png', '0978901234', NULL, NULL, NULL, 'user', 'inactive', NULL, 0, '2025-03-15 08:20:40', '2025-03-15 08:20:40'),
(8, 'ava_davis', 'avadavis99@gmail.com', '$2y$12$abcdefgh12345678ijklmnop', 'Ava Davis', NULL, NULL, 'http://demos.themeselection.com/materio-mui-nextjs-admin-template/demo-1/images/avatars/2.png', '0989012345', NULL, NULL, NULL, 'user', 'active', NULL, 0, '2025-03-16 00:50:15', '2025-03-16 00:50:15'),
(9, 'william_moore', 'williammore77@gmail.com', '$2y$12$abcdefgh12345678ijklmnop', 'William Moore', NULL, NULL, 'http://demos.themeselection.com/materio-mui-nextjs-admin-template/demo-1/images/avatars/5.png', '0990123456', NULL, NULL, NULL, 'user', 'inactive', NULL, 0, '2025-03-16 01:22:35', '2025-03-16 01:22:35'),
(10, 'mia_clark', 'miaclark11@gmail.com', '$2y$12$abcdefgh12345678ijklmnop', 'Mia Clark', NULL, NULL, 'http://demos.themeselection.com/materio-mui-nextjs-admin-template/demo-1/images/avatars/8.png', '0910123456', NULL, NULL, NULL, 'admin', 'active', NULL, 0, '2025-03-16 02:33:29', '2025-03-16 02:33:29'),
(11, 'noah_white', 'noahwhite88@gmail.com', '$2y$12$abcdefgh12345678ijklmnop', 'Noah White', NULL, NULL, 'http://demos.themeselection.com/materio-mui-nextjs-admin-template/demo-1/images/avatars/5.png', '0921234567', NULL, NULL, NULL, 'user', 'ban', NULL, 0, '2025-03-16 05:44:55', '2025-03-16 05:44:55'),
(12, 'ella_hall', 'ellahall77@gmail.com', '$2y$12$abcdefgh12345678ijklmnop', 'Ella Hall', NULL, NULL, 'http://demos.themeselection.com/materio-mui-nextjs-admin-template/demo-1/images/avatars/2.png', '0932345678', NULL, NULL, NULL, 'user', 'active', NULL, 0, '2025-03-17 07:22:10', '2025-03-17 07:22:10'),
(13, 'james_adams', 'jamesadams99@gmail.com', '$2y$12$abcdefgh12345678ijklmnop', 'James Adams', NULL, NULL, 'http://demos.themeselection.com/materio-mui-nextjs-admin-template/demo-1/images/avatars/5.png', '0943456789', NULL, NULL, NULL, 'user', 'inactive', NULL, 0, '2025-03-17 09:45:00', '2025-03-17 09:45:00'),
(14, 'grace_wright', 'gracewright66@gmail.com', '$2y$12$abcdefgh12345678ijklmnop', 'Grace Wright', NULL, NULL, 'http://demos.themeselection.com/materio-mui-nextjs-admin-template/demo-1/images/avatars/3.png', '0954567890', NULL, NULL, NULL, 'user', 'active', NULL, 0, '2025-03-18 00:30:18', '2025-03-18 00:30:18'),
(15, 'benjamin_harris', 'benjaminharris55@gmail.com', '$2y$12$abcdefgh12345678ijklmnop', 'Benjamin Harris', NULL, NULL, 'http://demos.themeselection.com/materio-mui-nextjs-admin-template/demo-1/images/avatars/1.png', '0965678901', NULL, NULL, NULL, 'admin', 'active', NULL, 0, '2025-03-18 02:20:45', '2025-03-18 02:20:45'),
(16, 'charlotte_thomas', 'charlottethomas77@gmail.com', '$2y$12$abcdefgh12345678ijklmnop', 'Charlotte Thomas', NULL, NULL, 'http://demos.themeselection.com/materio-mui-nextjs-admin-template/demo-1/images/avatars/2.png', '0976789012', NULL, NULL, NULL, 'user', 'inactive', NULL, 0, '2025-03-18 04:50:30', '2025-03-18 04:50:30'),
(17, 'henry_martin', 'henrymartin33@gmail.com', '$2y$12$abcdefgh12345678ijklmnop', 'Henry Martin', NULL, NULL, 'http://demos.themeselection.com/materio-mui-nextjs-admin-template/demo-1/images/avatars/6.png', '0987890123', NULL, NULL, NULL, 'user', 'active', NULL, 0, '2025-03-18 06:40:20', '2025-03-18 06:40:20'),
(18, 'amelia_jackson', 'ameliajackson99@gmail.com', '$2y$12$abcdefgh12345678ijklmnop', 'Amelia Jackson', NULL, NULL, 'http://demos.themeselection.com/materio-mui-nextjs-admin-template/demo-1/images/avatars/3.png', '0998901234', NULL, NULL, NULL, 'user', 'ban', NULL, 0, '2025-03-18 07:10:55', '2025-03-18 07:10:55'),
(19, 'lucas_thompson', 'lucasthompson44@gmail.com', '$2y$12$abcdefgh12345678ijklmnop', 'Lucas Thompson', NULL, NULL, 'http://demos.themeselection.com/materio-mui-nextjs-admin-template/demo-1/images/avatars/2.png', '0919012345', NULL, NULL, NULL, 'user', 'active', NULL, 0, '2025-03-19 01:15:40', '2025-03-19 01:15:40'),
(20, 'harper_lewis', 'harperlewis88@gmail.com', '$2y$12$abcdefgh12345678ijklmnop', 'Harper Lewis', NULL, NULL, 'http://demos.themeselection.com/materio-mui-nextjs-admin-template/demo-1/images/avatars/4.png', '0920123456', NULL, NULL, NULL, 'user', 'inactive', NULL, 0, '2025-03-19 02:40:25', '2025-03-19 02:40:25'),
(23, 'GnEg4O6F', 'bongbong@gmail.com', '$2y$12$RfdYLZpTujT.gG4g7T.rkumAmc730sDShz8vGLNFjyOw3X7DUoG.2', 'Bông', NULL, NULL, 'http://demos.themeselection.com/materio-mui-nextjs-admin-template/demo-1/images/avatars/5.png', '0902323234', NULL, NULL, NULL, 'user', 'inactive', NULL, 0, '2025-03-17 08:18:33', '2025-03-17 08:18:33'),
(24, 'Admin', 'admin@gmail.com', '$2y$12$Q6.niznI/Or1x.H7YKk3Wul4ZwWO3u6.dsaS1WaH0RoS5FgEOSDSi', NULL, NULL, NULL, 'http://demos.themeselection.com/materio-mui-nextjs-admin-template/demo-1/images/avatars/5.png', '0937027877', NULL, NULL, NULL, 'admin', 'inactive', NULL, 0, '2025-03-26 09:42:54', '2025-03-26 09:42:54'),
(38, '4ethncSj', 'admin@example.org', '$2y$12$zqxNWmkfyRW08B6L3fEtUOMwcdDE.q9kgY0O672eqsvLpSFHySDdO', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'user', 'inactive', NULL, 0, '2025-04-17 07:57:12', '2025-04-17 07:57:12'),
(40, 'nickphannn', 'thequang.work@gmail.com', '$2y$12$RmUfLe.vOKsZ0VGKc3kHoes96Pfqu0bMwrcY6DdMVVGJsS7wwR5Za', 'Thế Quang', '2025-07-10', 'male', 'https://res.cloudinary.com/diaenxa58/image/upload/v1753361181/quirky-d-animation-cartoon-zebra-free-isolated-background-animated-cartoon-zebra-created-png-cartoon-style-john-296367769_1753361179.webp', '0937027877', NULL, NULL, NULL, 'shop', 'inactive', NULL, 1, '2025-04-19 06:39:45', '2025-07-26 11:06:36'),
(41, 'Mu1aw7Bh', 'shopmohinh.walmart@gmail.com', '$2y$12$vEnc2tpkeSCfbHfOaHx/M./87CRJCgOc1V406psol53B2NCSV2giO', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'shop', 'inactive', NULL, 0, '2025-06-20 04:01:49', '2025-06-20 04:01:49'),
(42, 'CrivWdhp', 'rholy921@gmail.com', '$2y$12$/y8HwsJ1yW3t4SF.nzBvquvvUywVzq/S9QaExOcVKtH7MLs97jrke', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'shop', 'inactive', NULL, 0, '2025-07-18 11:10:22', '2025-07-18 11:17:03'),
(43, 'wj2RxHFf', 'phanthequang12.3tpk@gmail.com', '$2y$12$CXTsEa1s6aKTp8xozPjQNOOXBlOGLWCP1cTCX95WvcIV.mbaP2FOC', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'user', 'inactive', NULL, 0, '2025-07-21 04:27:36', '2025-07-21 04:27:36'),
(48, 'thequangg', 'phanquang180918@gmail.com', '$2y$12$r6gufduzCZQylsAgjiXrEeZqx8wXywitMbJo4d35bu4.8rzfx1Dcq', 'Phan Thế Quang', '2003-12-19', 'male', 'https://lh3.googleusercontent.com/a/ACg8ocLm8zRMJqdqfoJGLGgZO5WWJ0UsIPQapo_woflCJNpCi1Hl5KiT=s96-c', '0937027877', '2025-07-26 09:33:11', NULL, NULL, 'user', 'active', NULL, 1, '2025-07-26 09:33:11', '2025-07-26 13:35:03'),
(49, '3sLJ0V6g', 'm10store.vn@gmail.com', '$2y$12$kQzV88CJQx1/JU9ownWOOulPMpG6FpjkTpVYJsW.lqBliMwMo3QkO', 'M10 Store', NULL, NULL, 'https://lh3.googleusercontent.com/a/ACg8ocL-fqZsvvqR31zUAoYWlvZbdMWFpy3zU6zpIhBrlTJ77uYWc-s=s96-c', '0902323234', '2025-07-26 10:23:00', NULL, NULL, 'user', 'active', NULL, 0, '2025-07-26 10:23:00', '2025-07-26 10:31:50');

-- --------------------------------------------------------

--
-- Table structure for table `variant_reservations`
--

CREATE TABLE `variant_reservations` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `variant_id` bigint UNSIGNED NOT NULL,
  `quantity` int UNSIGNED NOT NULL DEFAULT '1',
  `reserved_at` datetime NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wallets`
--

CREATE TABLE `wallets` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `balance` decimal(12,2) DEFAULT '0.00',
  `frozen` decimal(12,2) DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wallet_transactions`
--

CREATE TABLE `wallet_transactions` (
  `id` bigint UNSIGNED NOT NULL,
  `wallet_id` bigint UNSIGNED NOT NULL,
  `type` enum('order_income','purchase','refund','withdrawal','fee') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `direction` enum('in','out') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `attributes_name_unique` (`name`),
  ADD UNIQUE KEY `attributes_slug_unique` (`slug`);

--
-- Indexes for table `attribute_category`
--
ALTER TABLE `attribute_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attribute_id` (`attribute_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `attribute_values`
--
ALTER TABLE `attribute_values`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_attr_shop_value` (`attribute_id`,`shop_id`,`value`),
  ADD KEY `attribute_values_attribute_id_foreign` (`attribute_id`),
  ADD KEY `fk_attr_values_shop_id` (`shop_id`);

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
  ADD UNIQUE KEY `brands_name_unique` (`name`),
  ADD UNIQUE KEY `uq_shop_brand_name` (`shop_id`,`name`),
  ADD KEY `brands_media_file_id_foreign` (`media_file_id`);

--
-- Indexes for table `brand_category`
--
ALTER TABLE `brand_category`
  ADD PRIMARY KEY (`brand_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

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
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `shop_id` (`shop_id`),
  ADD KEY `product_variant_id` (`product_variant_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`),
  ADD KEY `categories_parent_id_foreign` (`parent_id`),
  ADD KEY `fk_categories_media_file_id` (`media_file_id`);

--
-- Indexes for table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_conversations_user1` (`user1_id`),
  ADD KEY `fk_conversations_user2` (`user2_id`),
  ADD KEY `fk_conversations_last_message` (`last_message_id`);

--
-- Indexes for table `email_verifications`
--
ALTER TABLE `email_verifications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_verifications_email_unique` (`email`);

--
-- Indexes for table `email_verification_tokens`
--
ALTER TABLE `email_verification_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

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
-- Indexes for table `media_files`
--
ALTER TABLE `media_files`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_public_id` (`public_id`),
  ADD KEY `folder_id` (`media_folder_id`),
  ADD KEY `uploader_id` (`user_id`);

--
-- Indexes for table `media_file_product`
--
ALTER TABLE `media_file_product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_product_media` (`product_id`,`media_file_id`),
  ADD KEY `media_file_id` (`media_file_id`);

--
-- Indexes for table `media_folders`
--
ALTER TABLE `media_folders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `media_product`
--
ALTER TABLE `media_product`
  ADD PRIMARY KEY (`media_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `media_usages`
--
ALTER TABLE `media_usages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_usage` (`media_id`,`mediable_type`,`mediable_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conversation_id` (`conversation_id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buyer_id` (`buyer_id`),
  ADD KEY `shop_id` (`shop_id`),
  ADD KEY `promotion_id` (`promotion_id`),
  ADD KEY `orders_address_id_foreign` (`address_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `fk_order_items_variant` (`product_variant_id`);

--
-- Indexes for table `order_logs`
--
ALTER TABLE `order_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_order_logs_order_id` (`order_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

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
  ADD UNIQUE KEY `unique_slug_per_shop` (`slug`,`shop_id`),
  ADD KEY `products_shop_id_foreign` (`shop_id`),
  ADD KEY `products_brand_id_foreign` (`brand_id`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Indexes for table `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `attribute_value_id` (`attribute_value_id`);

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
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `product_variants_product_id_foreign` (`product_id`);

--
-- Indexes for table `product_variant_attributes`
--
ALTER TABLE `product_variant_attributes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_variant_attributes_product_variant_id_foreign` (`product_variant_id`),
  ADD KEY `product_variant_attributes_attribute_value_id_foreign` (`attribute_value_id`);

--
-- Indexes for table `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `fk_promotions_creator` (`created_by`);

--
-- Indexes for table `promotion_product`
--
ALTER TABLE `promotion_product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_promotion_product` (`promotion_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `promotion_user_usages`
--
ALTER TABLE `promotion_user_usages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_promotion_user` (`promotion_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

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
  ADD UNIQUE KEY `shops_shop_name_unique` (`name`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `shops_user_id_foreign` (`user_id`);

--
-- Indexes for table `sku_sequences`
--
ALTER TABLE `sku_sequences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_accounts`
--
ALTER TABLE `social_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `temporary_images`
--
ALTER TABLE `temporary_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transporters`
--
ALTER TABLE `transporters`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_username_unique` (`user_name`);

--
-- Indexes for table `variant_reservations`
--
ALTER TABLE `variant_reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `variant_id` (`variant_id`);

--
-- Indexes for table `wallets`
--
ALTER TABLE `wallets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `wallet_transactions`
--
ALTER TABLE `wallet_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wallet_id` (`wallet_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `attributes`
--
ALTER TABLE `attributes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `attribute_category`
--
ALTER TABLE `attribute_category`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `attribute_values`
--
ALTER TABLE `attribute_values`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=192;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=322;

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `email_verifications`
--
ALTER TABLE `email_verifications`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `email_verification_tokens`
--
ALTER TABLE `email_verification_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=474;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `media_files`
--
ALTER TABLE `media_files`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1019;

--
-- AUTO_INCREMENT for table `media_file_product`
--
ALTER TABLE `media_file_product`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=269;

--
-- AUTO_INCREMENT for table `media_folders`
--
ALTER TABLE `media_folders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=192;

--
-- AUTO_INCREMENT for table `media_usages`
--
ALTER TABLE `media_usages`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=275;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `order_logs`
--
ALTER TABLE `order_logs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT for table `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

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
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=398;

--
-- AUTO_INCREMENT for table `product_variant_attributes`
--
ALTER TABLE `product_variant_attributes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=365;

--
-- AUTO_INCREMENT for table `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `promotion_product`
--
ALTER TABLE `promotion_product`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `promotion_user_usages`
--
ALTER TABLE `promotion_user_usages`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shops`
--
ALTER TABLE `shops`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sku_sequences`
--
ALTER TABLE `sku_sequences`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `social_accounts`
--
ALTER TABLE `social_accounts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `temporary_images`
--
ALTER TABLE `temporary_images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `transporters`
--
ALTER TABLE `transporters`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `variant_reservations`
--
ALTER TABLE `variant_reservations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `wallets`
--
ALTER TABLE `wallets`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wallet_transactions`
--
ALTER TABLE `wallet_transactions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `attribute_category`
--
ALTER TABLE `attribute_category`
  ADD CONSTRAINT `attribute_category_ibfk_1` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `attribute_category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `attribute_values`
--
ALTER TABLE `attribute_values`
  ADD CONSTRAINT `attribute_values_attribute_id_foreign` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_attr_values_shop_id` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `brands`
--
ALTER TABLE `brands`
  ADD CONSTRAINT `brands_media_file_id_foreign` FOREIGN KEY (`media_file_id`) REFERENCES `media_files` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_brands_shop_id` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `brand_category`
--
ALTER TABLE `brand_category`
  ADD CONSTRAINT `brand_category_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `brand_category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_3` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_categories_media_file_id` FOREIGN KEY (`media_file_id`) REFERENCES `media_files` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `conversations`
--
ALTER TABLE `conversations`
  ADD CONSTRAINT `fk_conversations_last_message` FOREIGN KEY (`last_message_id`) REFERENCES `messages` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_conversations_user1` FOREIGN KEY (`user1_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_conversations_user2` FOREIGN KEY (`user2_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `media_files`
--
ALTER TABLE `media_files`
  ADD CONSTRAINT `media_files_ibfk_1` FOREIGN KEY (`media_folder_id`) REFERENCES `media_folders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `media_files_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `media_file_product`
--
ALTER TABLE `media_file_product`
  ADD CONSTRAINT `media_file_product_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `media_file_product_ibfk_2` FOREIGN KEY (`media_file_id`) REFERENCES `media_files` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `media_folders`
--
ALTER TABLE `media_folders`
  ADD CONSTRAINT `media_folders_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `media_folders` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `media_folders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `media_product`
--
ALTER TABLE `media_product`
  ADD CONSTRAINT `media_product_ibfk_1` FOREIGN KEY (`media_id`) REFERENCES `media_files` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `media_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `media_usages`
--
ALTER TABLE `media_usages`
  ADD CONSTRAINT `media_usages_ibfk_1` FOREIGN KEY (`media_id`) REFERENCES `media_files` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_shop` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_order_items_variant` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `order_logs`
--
ALTER TABLE `order_logs`
  ADD CONSTRAINT `fk_order_logs_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_shop_id_foreign` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_attribute_values`
--
ALTER TABLE `product_attribute_values`
  ADD CONSTRAINT `product_attribute_values_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_attribute_values_ibfk_2` FOREIGN KEY (`attribute_value_id`) REFERENCES `attribute_values` (`id`) ON DELETE CASCADE;

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
  ADD CONSTRAINT `product_variant_attributes_attribute_value_id_foreign` FOREIGN KEY (`attribute_value_id`) REFERENCES `attribute_values` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_variant_attributes_product_variant_id_foreign` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `promotions`
--
ALTER TABLE `promotions`
  ADD CONSTRAINT `fk_promotions_creator` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `promotion_product`
--
ALTER TABLE `promotion_product`
  ADD CONSTRAINT `promotion_product_ibfk_1` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `promotion_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `promotion_user_usages`
--
ALTER TABLE `promotion_user_usages`
  ADD CONSTRAINT `promotion_user_usages_ibfk_1` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `promotion_user_usages_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `shops`
--
ALTER TABLE `shops`
  ADD CONSTRAINT `shops_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `social_accounts`
--
ALTER TABLE `social_accounts`
  ADD CONSTRAINT `social_accounts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `variant_reservations`
--
ALTER TABLE `variant_reservations`
  ADD CONSTRAINT `variant_reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `variant_reservations_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wallets`
--
ALTER TABLE `wallets`
  ADD CONSTRAINT `wallets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wallet_transactions`
--
ALTER TABLE `wallet_transactions`
  ADD CONSTRAINT `wallet_transactions_ibfk_1` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
