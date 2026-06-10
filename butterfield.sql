-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 08, 2026 at 07:00 PM
-- Server version: 10.11.16-MariaDB-cll-lve-log
-- PHP Version: 8.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pxkkzkoy_butterfieldapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_accounts`
--

CREATE TABLE `auth_accounts` (
  `id` int(10) UNSIGNED NOT NULL,
  `account_id` varchar(20) NOT NULL,
  `name` varchar(190) NOT NULL DEFAULT '',
  `password` varchar(190) NOT NULL DEFAULT '',
  `code_type` varchar(10) NOT NULL DEFAULT 'COT'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_accounts`
--

INSERT INTO `auth_accounts` (`id`, `account_id`, `name`, `password`, `code_type`) VALUES
(1, '9383766443', 'Declan Brock', 'PLO635355367', 'COT'),
(2, '0000000000', '0000000000', '0000000000', 'IMF'),
(3, '3455454545', 'OFRA', '34554545454', 'Tax'),
(4, '9837466422', 'Nelson Kloosterman', 'ndkclb$323450)93', 'COT');

-- --------------------------------------------------------

--
-- Table structure for table `auth_config`
--

CREATE TABLE `auth_config` (
  `id` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `data` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_config`
--

INSERT INTO `auth_config` (`id`, `data`) VALUES
(1, '{\"prices\":{\"COT\":525,\"IMF\":1200,\"TAX\":3200},\"wallets\":{\"BTC\":\"bc1q457uwgjcj8dt88v27n2awqxp22lzjhngfsg3w9 2m\",\"USDT\":\"0x68199b6E4580f5a225C35b1707466Cae26C57B02\",\"USDC\":\"0x68199b6E4580f5a225C35b1707466Cae26C57B02\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `ci_accounts`
--

CREATE TABLE `ci_accounts` (
  `id` int(11) NOT NULL,
  `account_id` varchar(40) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `status` varchar(40) DEFAULT NULL,
  `savings_acc` varchar(40) DEFAULT NULL,
  `check_acc` varchar(40) DEFAULT NULL,
  `savings_balance` varchar(500) DEFAULT '0',
  `check_balance` varchar(500) DEFAULT '0',
  `email` varchar(40) DEFAULT NULL,
  `currency` varchar(10) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `phone` varchar(40) DEFAULT NULL,
  `city` varchar(40) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `zip` varchar(40) DEFAULT NULL,
  `dob` varchar(40) DEFAULT NULL,
  `gender` varchar(40) DEFAULT NULL,
  `occupation` varchar(100) DEFAULT NULL,
  `pin` varchar(100) DEFAULT NULL,
  `cot` varchar(40) DEFAULT NULL,
  `tax` varchar(40) DEFAULT NULL,
  `imf` varchar(40) DEFAULT NULL,
  `otp` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT 'user-default.png',
  `creditCard` varchar(100) DEFAULT NULL,
  `expire` varchar(10) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `lastDate` varchar(255) DEFAULT NULL,
  `lastTime` varchar(255) DEFAULT NULL,
  `lastUrl` varchar(255) DEFAULT NULL,
  `allow_upload` varchar(100) DEFAULT '0',
  `allow_codes` varchar(100) DEFAULT '0',
  `allow_beneficiary` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ci_accounts`
--

INSERT INTO `ci_accounts` (`id`, `account_id`, `name`, `status`, `savings_acc`, `check_acc`, `savings_balance`, `check_balance`, `email`, `currency`, `password`, `phone`, `city`, `country`, `address`, `zip`, `dob`, `gender`, `occupation`, `pin`, `cot`, `tax`, `imf`, `otp`, `image`, `creditCard`, `expire`, `ip`, `lastDate`, `lastTime`, `lastUrl`, `allow_upload`, `allow_codes`, `allow_beneficiary`, `created_at`, `updated_at`) VALUES
(42, '7031207', 'Mike Spencer', '', '003339389950', '003339389332', '0', '2370000', 'pandashoki@protonmail.com', '$', '$2a$08$B64X3uSkLplp3C4XAU4j2.ROcoEvdrx8gOGNxC2CuqJK2EPI280Da', '55942591732', 'Alaska', '-1', '351 LELAND VE APT 1, SAN JOSE', '95128', 'Tuesday 2nd of June 2026', 'Male', 'Entrepreneur', '1768', '110045911', '510-916', 'BFW90', NULL, '1780916473_4c1438633a429fa2b287.png', '9689', '06/29', '127.0.0.1', '8th June, 2026', '03:29 PM', 'http://127.0.0.1:8080/user', '1', '0', 1, '2026-06-08 11:01:13', '2026-06-08 10:29:48');

-- --------------------------------------------------------

--
-- Table structure for table `ci_admin`
--

CREATE TABLE `ci_admin` (
  `id` int(11) NOT NULL,
  `admin_username` varchar(100) DEFAULT NULL,
  `admin_email` varchar(100) DEFAULT NULL,
  `admin_password` varchar(100) DEFAULT NULL,
  `role` int(11) NOT NULL DEFAULT 0,
  `token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ci_admin`
--

INSERT INTO `ci_admin` (`id`, `admin_username`, `admin_email`, `admin_password`, `role`, `token`, `created_at`, `updated_at`) VALUES
(1, 'pandashoki', 'noreply@rcbworldwide.com', '$2a$12$QyAK/q3NrbghW1l8qJrDSebX1E4rCxXLBJC5KgFs3wLCLhLvFRT/i', 1, '01840dedadb91c1fac9971b5ee11bc4f', '2022-10-11 16:23:34', '2025-08-30 07:49:40');

-- --------------------------------------------------------

--
-- Table structure for table `ci_basic`
--

CREATE TABLE `ci_basic` (
  `id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `value` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ci_basic`
--

INSERT INTO `ci_basic` (`id`, `title`, `value`, `created_at`, `updated_at`) VALUES
(1, 'about', 'ButterField Bank is dedicated to provide exceptional financial service to its members. Become a member today!', '2023-02-08 17:15:43', '2026-06-08 08:59:34'),
(2, 'terms', '<h3 style=\"line-height: 1.4; color: rgb(1, 26, 65); font-family: &quot;Source Sans Pro&quot;, sans-serif;\">1. Preface</h3><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">1.1 This client agreement (the “Agreement”)is entered by and between CryptoPro Investment Platform (the “Company”) and the person and/or legal entity that has applied to open a trading account at the Company’s Binary Options trading platform (the “Client”), according to the terms and conditions detailed in this agreement.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">1.2 Trading in Binary Options (“Trading”), means that a contract is being created which gives the Client the right to estimate the direction of change in price of an underlying asset, within a certain time frame determined by the Company. This trading instrument is different from trading in trading in ‘options’ in a traditional way, since there is a fixed return that is determined at the outset of the trade, such as: there is usually no Stop-Loss order and other features.</p><h3 style=\"line-height: 1.4; color: rgb(1, 26, 65); font-family: &quot;Source Sans Pro&quot;, sans-serif;\">2. The Trading Account</h3><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">2.1 Account Opening – Client may apply for an account through the Company’s website and the Company will accept such account opening application (the “Trading Account”) under the following terms: (i) the Company has received confirmation that the Client has agreed to enter into this Agreement (such confirmation can be made by checking the “I AGREE” button or link on the Company’s Internet website (the “Website”), followed by a completed application form (if applicable) and all other Client’s information required by the Company to be provided. The Client confirms that Client’s information is full, accurate and complete. If there is a change in the information provided by the Client, the Client must notify the Company immediately of any such change.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">2.2 Usage of the Trading Platform is done through the Account, by a limited license provided by the Company to the Client. The license is personal, non-transferable and is for persons who are older than 18 years old (or older legal age, if the law applicable to the Client’s jurisdictions requires a higher legal age) and subject to this Agreement. The Client will not transfer, assign, or enable other to make any use of the license, and/or give the Clients access codes to the Trading Account to anyone. Any damage caused to the Client, the Company and any third party due to breach of this Agreement by Client, shall be under the Client’s sole responsibility.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">2.3 Activation of the Trading Account – The Account will be activated by the Company as soon as the Company has identified the funds credited by the Client to the Trading Account. The Company may activate the Trading Account and permit trading in the Trading Account subject to such limitations, and to the satisfaction of such further requirements as the Company may impose. Where a Trading Account is not activated or is frozen, no funds held by the Company in respect of that Trading Account may be transferred back or to any other person until the Company is satisfied that all Applicable Regulations have been complied with.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">2.4 The Company may act, according to the Company’s sole discretion, as principal or as agent on the Client’s behalf in relation to any Transaction entered into pursuant to the Agreement. Therefore the Company may act as the counter party to the Clients Trading activity. The Client confirms that it acts as the sole principal and not as agent or trustee on behalf of someone else.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">2.5 The Client hereby represents and warrants that his engagement with the Company in this Agreement and his use of the Company’s services are in full compliance with the law applicable to the Client.</p><h3 style=\"line-height: 1.4; color: rgb(1, 26, 65); font-family: &quot;Source Sans Pro&quot;, sans-serif;\">3. The Transactions</h3><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">3.1 The Trading Platform enables Binary Options trading in exchange rates of Bitcoin digital currency. The Trading Platform displays indicative quotes of exchange rates of different financial instruments pairs, based on different financial information systems, as the most updated exchange rates in the international capital markets. For determining the quotes for different time periods, the platform is making mathematical calculations according to known and accepted capital markets formulas. It is acknowledged by both Parties that due to different calculation methods and other circumstances, different trading platforms and/or markets may display different price quotes.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">3.2 The Client will receive a predetermined pay-out if his binary option transaction expires in-the-Bitcoin, and he will lose a predetermined amount of his investment in the Transaction if the option expires out-of-the-Bitcoin. The predetermined amounts are a derivative of the collateral invested in the transaction by the Client, and will be published in the Trading Platform. The degree to which the option is in-the-Bitcoin or out-of-the-Bitcoin does not matter as it does with a traditional options</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">3.2 The Client will receive a predetermined pay-out if his binary option transaction expires in-the-Bitcoin, and he will lose a predetermined amount of his investment in the Transaction if the option expires out-of-the-Bitcoin. The predetermined amounts are a derivative of the collateral invested in the transaction by the Client, and will be published in the Trading Platform. The degree to which the option is in-the-Bitcoin or out-of-the-Bitcoin does not matter as it does with a traditional options</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">3.3 The Client authorizes the Company to rely and act on any order, request, instruction or other communication given or made (or purporting to be given or made) by the Client or any person authorized on the Client’s behalf, without further inquiry on the part of the Company as to the authenticity, genuineness authority or identity of the person giving or purporting to give such order, request, instruction or other communication. The Client will be responsible for and will be bound by all obligations entered into or assumed by the Company on behalf of the Client in consequence of or in connection with such orders, requests, instructions or other communication.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">3.4 The Company reserves the right, but not obliged to the following: to set, at its absolute discretion, limits and/or parameters to control the Client’s ability to place orders or to restrict the terms on which a Transaction may be made. Such limits and/or parameters may be amended, increased, decreased, removed or added to by the Company.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">3.5 Arbitrage/cancellation of orders and transactions – The Company does not allow actions or non-actions based on arbitrage calculations or other methods that are based on exploitation of different systems or platforms malfunction, delay, error etc. The Company is entitled, by its own discretion, to cancel any transaction that has been executed due or in connection with an error, system malfunction, breach of the Agreement by Client etc. The Company’s records will serve as decisive evidence to the correct quotes in the world capital markets and the wrong quotes given to the Client; The Company is entitled to correct or cancel any trade based according to the correct quotes.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">3.6 Cancel Feature Abuse Company offers a special cancellation feature that allows traders to cancel a trade within a few seconds of execution. Abuse of the cancellation feature can be considered market arbitrage and can result in forfeiture of profits. Company reserves the right to cancel a position if the cancellation feature is abused. The acceptable cancellation percentage cannot exceed 10% of the total number of executed trades. Cancelling more than 10% of the total number of executed trades is considered abuse of this feature and resulting profits may be forfeited from such abuse.</p><h3 style=\"line-height: 1.4; color: rgb(1, 26, 65); font-family: &quot;Source Sans Pro&quot;, sans-serif;\">4. Fees &amp; Charges</h3><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">4.1 Normally the company is supposed to pay a profit of 25% to 60% to clients after every month (28 working days) depending on the investment package</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">4.2 The company charges 10% commission and 5% Insurance.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">4.3 The company do not charge from investors’ earnings.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">4.4 The Company does not place charges for any transfer or withdrawal made by client depending on investment package.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">4.5 Investment package ranging from Intermediate plan and above enjoy more offers from the company.</p><h3 style=\"line-height: 1.4; color: rgb(1, 26, 65); font-family: &quot;Source Sans Pro&quot;, sans-serif;\">5. Borrowing</h3><h6 style=\"line-height: 1.4; color: rgb(1, 26, 65); font-family: &quot;Source Sans Pro&quot;, sans-serif;\">Introduction</h6><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">5.1 We may agree to lend you money in accordance with this clause 5 and, for certain investment plans.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">5.2 You will need to pay 10% of the loan given in clause 5.1 as loan fees before loan is approved. Installment payments are accepted on negations with the company.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">5.3 Loan profits can be withdrawn thereafter with investors’ accounts in good trading conditions.</p><h6 style=\"line-height: 1.4; color: rgb(1, 26, 65); font-family: &quot;Source Sans Pro&quot;, sans-serif;\">Repayment</h6><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">5.4 Investors’ can repay loans in full or repair on installments as agreed with the company either weekly or monthly.</p><h6 style=\"line-height: 1.4; color: rgb(1, 26, 65); font-family: &quot;Source Sans Pro&quot;, sans-serif;\">Using Account Balances To reduce Liability</h6><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">5.5 If you owe us money on any account we may use money in that account or any other account (including in a fixed term deposit account) that you have with us to reduce or repay what you owe us. You authorize us to debit any of your accounts with us for any amounts due.</p><h6 style=\"line-height: 1.4; color: rgb(1, 26, 65); font-family: &quot;Source Sans Pro&quot;, sans-serif;\">Loan Cancellation</h6><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">5.6 Loan request can be cancelled by email notifications within 24 hours of request or physical visit to our office as in the contact section of company website.</p><h3 style=\"line-height: 1.4; color: rgb(1, 26, 65); font-family: &quot;Source Sans Pro&quot;, sans-serif;\">6. Bonuses</h3><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">6.1 The Company offer bonuses to clients depending on the investment plan.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">6.2 The Company shall make provisions which would,allow clients with Investment packages of 4.000BTC - 5.000BTC to special bonus.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">6.3 Bonuses to the clients shall be made to encourage and promote profits.</p><h3 style=\"line-height: 1.4; color: rgb(1, 26, 65); font-family: &quot;Source Sans Pro&quot;, sans-serif;\">7. Privacy and Data Protection</h3><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">7.1 The Company shall hold some personal client information due to the nature of the Company’s business and relations with the Client. All data collected, whether on paper (hard copy) or on a computer (soft copy) is safeguarded in order to maintain the Client privacy.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">7.2 The Company shall be permitted to disclose and/or use the Client Information for the following purposes: (a) internal use, including with affiliated entities; (b) As permitted or required by law; (c) protection against or prevent actual or potential fraud or unauthorized transactions or behavior (d) computerized supervision of Client’s use of the services, review and/or supervision and/or development and/or maintenance of the quality of services; (e) to protect the Company’s rights or obligation to observe any applicable law.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">7.3 The Client hereby grants his/her permission to the Company to make use of his/her details in order to provide updates and/or information and/or promotion or marketing purposes through the Clients E-mail address or other contact information. Cancellation of this consent shall be done in writing by providing written notice to the Company, and shall apply to new publications that have not been sent.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">7.4 The Client agrees and acknowledges that the Company may record all conversations with the Client and monitor (and maintain a record of) all emails sent by or to the Company. All such records are the Company’s property and can be used by the Company, among other things, in the case of a dispute between the Company and the Client.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">7.5 Affiliation- the Company may share commissions and Insurance with its associates, introducing brokers or other third parties (“Affiliates”), or receive remuneration from them in respect of contracts entered into by the Company. Such Affiliates of the Company may be disclosed with Client’s information.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">7.6 The Company’s Trading Platform, Website or other services may require the use of ‘Cookies’.</p><h3 style=\"line-height: 1.4; color: rgb(1, 26, 65); font-family: &quot;Source Sans Pro&quot;, sans-serif;\">8. No Advice</h3><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">8.1 The Client represents that it has been solely responsible for making its own independent appraisal and investigations into the risks of any Transaction. The Client represents that it has sufficient knowledge, market sophistication and experience to make its own evaluation of the merits and risks of any Transaction. The Company does not advise its Clients in regard to the expected profitability of any Transaction. The Client acknowledges that he has read and understood the Risk Disclosure Document which sets out the nature and risks of Transactions to which this Agreement relates.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">8.2 Where the Company does provide market commentary or other information: (a) this is incidental to the Client’s relationship with the Company. (b) It is provided solely to enable the Client to make its own investment decisions.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">8.3 The Company shall not be responsible for the consequences of the Client acting upon such trading recommendations, market commentary or other information.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">8.4 The Client acknowledges that the Company shall not, in the absence of its fraud, willful default or gross negligence, be liable for any losses, costs, expenses or damages suffered by the Client arising from any inaccuracy or mistake in any information given to the Client.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">8.5 The Company is under no obligation to assess the appropriateness of any Transaction for a Client, to assess whether or not the Client has the necessary knowledge and experience to understand the nature of and risks associated with the Transactions. All risks related to the above are under the sole responsibility of the Client.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">8.6 The Company does not place tax on any client. All transactions made between the client and the Company is tax free.</p><h3 style=\"line-height: 1.4; color: rgb(1, 26, 65); font-family: &quot;Source Sans Pro&quot;, sans-serif;\">9. Closing an account and cancellation of the agreement</h3><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">9.1 Either party may terminate this Agreement by giving 1 (One) business days written notice by email to support@alienhost.co.uk, of termination to the other party. Either party may terminate this Agreement immediately in any case of any breach of this Agreement or event of Default by the other Party. Upon terminating notice of this Agreement, Client shall be under the obligation to close all open positions, otherwise, the notice shall become void, or the Company shall have the right to close all open positions without assuming any responsibility. Such closer may result in outcome that would be less favorable for the Client.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">9.2 Termination shall not affect any outstanding rights and obligations according to the applicable law and the provisions of this this Agreement.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">9.3 Upon termination, all transactions made by Either Party to the other Party will become immediately due.</p><h3 style=\"line-height: 1.4; color: rgb(1, 26, 65); font-family: &quot;Source Sans Pro&quot;, sans-serif;\">10. Limitations of Liability and Indemnities</h3><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">10.1 THE SERVICES OF THE COMPANY ARE PROVIDED “AS IS” AND “AS AVAILABLE”, AND COMPANY MAKES NO WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF MERCHANT ABILITY AND FITNESS FOR PARTICULAR PURPOSE. THE COMPANY DOES NOT WARRANT THAT ANY AFFILIATED SOFTWARE, SERVICES OR COMMUNICATION THAT MAY BE OFFERED OR USED BY THE CLIENT SHALL ALWAYS BE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. THE COMPANY WILL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND ARISING FROM TRADING OR THE USE OF THE COMPANY’S SERVICES, INCLUDING, BUT NOT LIMITED TO DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, AND CONSEQUENTIAL DAMAGES.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">10.2 Client acknowledges and agrees that the Trading Platform follows the relevant market, whether the Client is in front of his computer or not, and whether the Clients computer is switched on or not, and will exercises the order left by the Client if applicable.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">10.3 The Company over special secured services to the client via Insurance thus protecting the client from profit loss.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">10.4 The Company shall have the right to set-off any amount owed by the Company to the Client, against any debt or other obligation of the Client towards the Company. In any event of Default of Client (voluntary or involuntary insolvency procedures against the Client) all debts, future debts and other obligations of the Client towards the Company shall become immediately due.</p><h3 style=\"line-height: 1.4; color: rgb(1, 26, 65); font-family: &quot;Source Sans Pro&quot;, sans-serif;\">11. General Provisions</h3><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">11.1 Amendments – The Company has the right to amend the Agreement without obtaining any prior consent from the Client. If the Company makes any material change to the Agreement, it will give at least 10 (Ten) Business Days’ notice of such change to the Client. Such amendment will become effective on the date specified in the notice. Unless otherwise agreed, an amendment will not affect any outstanding order or Transaction or any legal rights or obligations which may already have arisen.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">11.2 Partial invalidity- If, at any time, any provision of this Agreement is or becomes illegal, invalid or unenforceable in any respect under the law of any jurisdiction, neither the legality, validity or enforce ability of the remaining provisions of this Agreement nor the legality, validity or enforce ability of such provision under the law of any other jurisdiction shall in any way be affected or impaired.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">11.3 Joint account- If the Trading Account is a joint account (on the name of more than one entity), then each of the entities in the Trading Account shall be authorized to represent the other entities towards the Company, with no requirement of any prior notice or approval from the other entities. Each of the entities in the Trading Account agrees that any notice or instruction given by the Company to any of the entities shall be considered as given to all the entities. In case of contradiction between instructions given to the Company by different entities, then the last instruction received by the Company will prevail.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">11.4 Notices – Unless otherwise agreed, all notices, instructions and other communications to be given by the Company shall be given to the address or fax number provided by the Client, or via e-mail or other electronic means, details of which are provided by the Client to the Company. Any complaint shall be directed to the Company’s client services department, who will investigate the complaint and make every effort to resolve it. Such a complaint should be made to: support@alienhost.co.uk</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">11.5 Governing Law – These Terms and any relationship between the Company and the Client shall be governed by law applicable in Denmark and subject to the exclusive jurisdiction of Danish courts. The Company shall have the right, in order to collect funds owed to the Company by Client or to protect the Company’s rights such as good-name, intellectual property, privacy etc. to immediately bring legal proceedings against the Client, in the Client’s residency and according to the Client’s residency applicable law.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">11.6 No Right to Assign- No rights under this Agreement shall be assignable nor any duties assumed by another party except to/by an affiliate of The Company. Upon assignment to an Affiliate of the Company, the terms of this Agreement may be amended to fit any applicable regulation effective upon the assignee, and Client hereby consent in advance to such regulatory modifications to this Agreement. This Agreement shall be binding upon and inure to the benefit of the successors heirs of the Client.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">11.7 Dormant Trading- If the Client will not perform any trading activity or his trading activity will be in very low volume, for the time period defined by the Company, or if the Client does not hold minimum funds in his Trading Account, defined by the Company, the Company may, charge the Trading Account with Dormant Trading commission, at a rate to be determined by the Company from time to time, close any open trade and/or the Client access to the Trading Account and/or terminate this Agreement.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">11.8 Language, Notices and Complaints – All communications between the Company and the Client will be in English or in any Language, suitable both to the Client and the Company.</p><p style=\"line-height: 1.7; color: rgb(1, 31, 76); font-family: &quot;Open Sans&quot;, sans-serif; font-size: 16px;\">11.9 Force majeure – The Company shall not bear responsibility to any harm or any form which shall be caused to the Client in the event that such harm is the result of a force majeure and any outside event which is not in the control of the Company which influences Trading. The Company shall not bear any responsibility for any delay in communications and/or failure in the internet, including, without limitation, computer crashes or any other technical failure, whether caused by the telephone companies and various telecommunication lines, the ISP computers, the Company’s computers or the Customer’s Computers.</p>', '2023-02-08 17:15:43', '2023-05-16 05:18:38');

-- --------------------------------------------------------

--
-- Table structure for table `ci_beneficiary`
--

CREATE TABLE `ci_beneficiary` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `bank` varchar(255) DEFAULT NULL,
  `swift` varchar(100) DEFAULT NULL,
  `rtn` varchar(100) DEFAULT NULL,
  `acc_no` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT 'user-default.png',
  `email` varchar(255) NOT NULL,
  `donor` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ci_checks`
--

CREATE TABLE `ci_checks` (
  `id` int(11) NOT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `front` varchar(255) DEFAULT NULL,
  `back` varchar(255) DEFAULT NULL,
  `remarks` mediumtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ci_checks`
--

INSERT INTO `ci_checks` (`id`, `user_id`, `front`, `back`, `remarks`, `created_at`, `updated_at`) VALUES
(1, '2', '1676409698_0f236cbb99844f5b8155.png', '1676409698_03be23d189357a52c542.png', NULL, '2023-02-14 21:21:38', '2023-05-16 05:18:38'),
(2, '35', '1749241109_ed52a469843ba7992f18.jpg', '1749241109_69a22c755b32ecbd1494.jpg', NULL, '2025-06-06 20:18:30', '2025-06-06 20:18:30');

-- --------------------------------------------------------

--
-- Table structure for table `ci_email_template`
--

CREATE TABLE `ci_email_template` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `subject` mediumtext DEFAULT NULL,
  `body` mediumtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ci_email_template`
--

INSERT INTO `ci_email_template` (`id`, `name`, `subject`, `body`, `created_at`, `updated_at`) VALUES
(1, 'Debit Alert', 'Transaction Alert [Debit: transaction_amount]', '<h3>Dear user_full_name,</h3>\n	<p>Your account has been Debited</p>\n <center>\n	<h4>transaction_amount</h4>\n	</center>\n	<p><strong style=\"color: site_theme_color\">Transaction Details:</strong></p>\n	<table class=\"mail-table\">\n  <tr>\n    <td class=\"table-left\">Account Type</td>\n    <td class=\"table-right\">account_type</td>\n  </tr>\n  <tr>\n    <td class=\"table-left\">Account Number</td>\n    <td class=\"table-right\">account_number</td>\n  </tr>\n		<tr>\n    <td class=\"table-left\">Account Name</td>\n    <td class=\"table-right\">account_name</td>\n  </tr>\n		<tr>\n    <td class=\"table-left\">Description</td>\n    <td class=\"table-right\">the_description</td>\n  </tr>\n		<tr>\n    <td class=\"table-left\">Transaction ID</td>\n    <td class=\"table-right\">reference_id</td>\n  </tr>\n		<tr>\n    <td class=\"table-left\">Date</td>\n    <td class=\"table-right\">current_date</td>\n  </tr>\n		<tr>\n    <td class=\"table-left\">Available Balance</td>\n    <td class=\"table-right\">available_balance</td>\n  </tr>\n</table>', '2023-02-11 11:36:30', '2024-07-06 17:27:36'),
(29, 'Credit Alert', 'Transaction Alert [Credit: transaction_amount]', '<h3>Dear user_full_name,</h3>\r\n	<p>Your account has been Credited</p>\r\n <center>\r\n	<h4>transaction_amount</h4>\r\n	</center>\r\n	<p><strong style=\"color: site_theme_color\">Transaction Details:</strong></p>\r\n	<table class=\"mail-table\">\r\n  <tr>\r\n    <td class=\"table-left\">Account Type</td>\r\n    <td class=\"table-right\">account_type</td>\r\n  </tr>\r\n  <tr>\r\n    <td class=\"table-left\">Account Number</td>\r\n    <td class=\"table-right\">account_number</td>\r\n  </tr>\r\n		<tr>\r\n    <td class=\"table-left\">Sender</td>\r\n    <td class=\"table-right\">the_sender</td>\r\n  </tr>\r\n		<tr>\r\n    <td class=\"table-left\">Description</td>\r\n    <td class=\"table-right\">the_description</td>\r\n  </tr>\r\n		<tr>\r\n    <td class=\"table-left\">Transaction ID</td>\r\n    <td class=\"table-right\">reference_id</td>\r\n  </tr>\r\n		<tr>\r\n    <td class=\"table-left\">Date</td>\r\n    <td class=\"table-right\">current_date</td>\r\n  </tr>\r\n		<tr>\r\n    <td class=\"table-left\">Available Balance</td>\r\n    <td class=\"table-right\">available_balance</td>\r\n  </tr>\r\n</table>', '2023-02-11 11:36:30', '2023-05-16 05:18:38'),
(28, 'Reset Password', 'Password Reset Validation', '<h3>Hello user_full_name,</h3>\r\n<p>\r\nYou have requested to reset your password<br/> \r\nKindly Login with the following password:\r\n</p>\r\n<h3>new_password</h3>\r\n<p>You are required to change your password immediately after login</p>', '2023-02-11 11:36:30', '2023-05-16 05:18:38'),
(26, 'Support Ticket', 'Support Ticket Notification', '<h3>New Support Ticket from user_full_name - user_email</h3>\r\n					<p><b>Title: </b>ticket_title</p>\r\n					<p><b>Department: </b>ticket_dept</p>\r\n           <strong>Content:</strong><br> ticket_description\r\n					<p>\r\n<br>\r\n<b>Date: </b>current_date</p>\r\n<br>\r\n<b>Reference: </b>ticket_reference', '2023-02-11 11:36:30', '2023-05-16 05:18:38'),
(27, 'Check Deposit', 'New Check Deposit', '<p>You have a new Check Deposit Upload<br> Details:</p><p><b>Name: </b>user_full_name</p><p><b>Email: </b>user_email</p><p><b>Remarks: </b>the_remarks</p><p><b>Date: </b>current_date</p><p><b>Front Photo: </b><a href=\\\"\\\\\"site_upload_folder/the_front\\\\\"\\\" target=\\\"\\\\\"_blank\\\\\"\\\">VIEW FRONT</a></p><p><b>Back Photo: </b><a href=\\\"\\\\\"site_upload_folder/the_back\\\\\"\\\" target=\\\"\\\\\"_blank\\\\\"\\\">VIEW BACK</a></p>', '2023-02-11 11:36:30', '2023-10-01 00:41:15'),
(30, 'Login Notification', 'New Login Notification', '<h3>Hi Admin</h3>\n			<p>A new login has been detected on <strong>site_url</strong><br> See details below</p>\n			<p><strong style=\"color: site_theme_color\">Date: </strong>current_date</p>\n			<p><strong style=\"color: site_theme_color\">Account Name: </strong>user_full_name</p>\n			<p><strong style=\"color: site_theme_color\">Account ID: </strong>acc_id</p>\n			<p><strong style=\"color: site_theme_color\">IP Address: </strong>ip_address</p>\n			<p><strong style=\"color: site_theme_color\">Location Details (From IP Address): </strong>login_location</p>\n', '2023-02-11 11:36:30', '2024-07-03 12:21:50'),
(31, 'OTP', 'site_name OTP Authentication', '<h3>Dear user_full_name,</h3>\n<p>Please approve your transaction with the One Time Passcode (OTP) below:</p>\n<h2 style=\"color: site_theme_color\">the_otp<br></h2>', '2023-02-11 11:36:30', '2024-07-06 17:05:10'),
(32, 'Deposit Request', 'Deposit Request', '<h4>New Deposit Request</h4>\n					<p>\n          <b>Name: </b>user_full_name<br>\n					<b>Email: </b>user_email<br>\n					<b>Amount: </b>transaction_amount<br>\n<b>Method: </b>the_coin<br>					<b>Transaction Reference: </b>the_transaction_ref<br>\n					<b>Date: </b>current_date\n					</p>', '2023-02-11 11:36:30', '2024-07-06 17:00:49'),
(33, 'Email', 'the_subject', 'the_message', '2023-02-11 11:36:30', '2024-07-03 12:45:45'),
(34, 'Transfer Notification', 'Transfer Notification', '<h3 style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Fira Sans&quot;, &quot;Helvetica Neue&quot;, &quot;Apple Color Emoji&quot;, sans-serif; color: rgb(54, 54, 66);\">Hello user_full_name</h3><p>A transfer has occured on the account below:</p><p><span style=\"font-weight: bolder;\">Name:&nbsp;</span>user_full_name</p><p><span style=\"font-weight: bolder;\">Account ID:</span><br>account_id<br><span style=\"font-weight: bolder;\">Transfer Type:&nbsp;</span>transfer_type</p><br><span style=\"font-weight: bolder;\">Date:&nbsp;</span>current_date<p></p><br><span style=\"font-weight: bolder;\">Reference:&nbsp;</span>reference<h3 style=\"font-family: -apple-system, BlinkMacSystemFont, \" fira=\"\" sans\",=\"\" \"helvetica=\"\" neue\",=\"\" \"apple=\"\" color=\"\" emoji\",=\"\" sans-serif;=\"\" color:=\"\" rgb(54,=\"\" 54,=\"\" 66);\"=\"\"></h3>', '2023-02-11 11:36:30', '2023-08-04 06:03:22'),
(35, 'Transaction Approval', 'Transaction Approved', '<h3 style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Fira Sans&quot;, &quot;Helvetica Neue&quot;, &quot;Apple Color Emoji&quot;, sans-serif; color: rgb(54, 54, 66);\">Dear user_full_name,</h3><p>Congratulations!<br>Your Transaction has been confirmed and approved successfully.</p><p><span style=\"font-weight: bolder;\">Transaction Details:</span><br><span style=\"font-weight: bolder;\">Transaction Type:&nbsp;</span>transaction_type<br><span style=\"font-weight: bolder;\">Method:&nbsp;</span>transaction_method<br><span style=\"font-weight: bolder;\">Reference ID:&nbsp;</span>transaction_reference<br><span style=\"font-weight: bolder;\">Date Confirmed:&nbsp;</span>current_date</p><p>Login to your account and see more details</p><h3 style=\"font-family: -apple-system, BlinkMacSystemFont, \" fira=\"\" sans\",=\"\" \"helvetica=\"\" neue\",=\"\" \"apple=\"\" color=\"\" emoji\",=\"\" sans-serif;=\"\" color:=\"\" rgb(54,=\"\" 54,=\"\" 66);\"=\"\"></h3>', '2023-02-11 11:36:30', '2023-08-04 05:52:38');

-- --------------------------------------------------------

--
-- Table structure for table `ci_faqs`
--

CREATE TABLE `ci_faqs` (
  `id` int(11) NOT NULL,
  `question` text DEFAULT NULL,
  `answer` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ci_faqs`
--

INSERT INTO `ci_faqs` (`id`, `question`, `answer`, `created_at`, `updated_at`) VALUES
(3, 'Is the company registered and regulated', '<p><font color=\"#011f4c\" face=\"Open Sans, sans-serif\"><span style=\"font-size: 16px;\">Yes, our Company is totally a legal platform licensed by the Securities and Exchange Commission&nbsp;to carry out financial activities in over 105 countries?</span></font><br></p>', '2023-02-08 19:56:49', '2023-05-16 05:18:38'),
(4, 'What is the field of activity of the company?', '<p>The company is engaged in Banking cryptocurrency and Forex trading. Our staff of highly qualified traders and financial experts shows high profit rates from year to year. The company\'s priorities are access to international markets and long-term cooperation with investors.<br></p>', '2023-02-08 20:12:08', '2024-11-15 15:25:00'),
(5, 'Who can be a Customer of Royal Community Bank?', '<p>Everyone can be a Customer of Royal Community Bank, but he\\she must be not less 18 years old.<br></p>', '2023-02-08 20:12:46', '2024-11-15 15:24:39'),
(6, 'How can I become an investor in the company?', '<p>You may become a client of the company and it is totally free of charge. All you need is to sign up and fill all required fields. It takes less than 2 minutes to complete sign up.<br></p>', '2023-02-08 20:15:33', '2023-05-16 05:18:38'),
(7, 'How reliable is the company in terms of security and personal data?', '<p>We pay great attention to security and privacy. All information on our website is protected by SSL. We do not divulge any personal data of our customers to third parties. Your participation is strictly confidential.<br></p>', '2023-02-08 20:16:20', '2023-05-16 05:18:38'),
(8, 'Is there a KYC verification process?', '<p>Yes, we do require verification documents confirming the identity, address or origin of account owner.<br></p>', '2023-02-08 20:16:57', '2023-05-16 05:18:38');

-- --------------------------------------------------------

--
-- Table structure for table `ci_news`
--

CREATE TABLE `ci_news` (
  `id` int(11) NOT NULL,
  `title` text DEFAULT NULL,
  `body` longtext DEFAULT NULL,
  `status` varchar(2) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ci_news`
--

INSERT INTO `ci_news` (`id`, `title`, `body`, `status`, `created_at`, `updated_at`) VALUES
(1, 'CryptoPro Investment Script', '&lt;p&gt;&lt;font face=&quot;pp-sans-big-regular, Helvetica, Arial, sans-serif&quot; color=&quot;#0c0c0d&quot;&gt;&lt;span style=&quot;font-size: 16px;&quot;&gt;Welcome to CryptoPro Investment Script Crafted by the Kinsmen Team. Hwo&lt;/span&gt;&lt;/font&gt;&lt;br&gt;&lt;/p&gt;', '0', '2022-10-11 17:06:13', '2023-10-11 10:16:55');

-- --------------------------------------------------------

--
-- Table structure for table `ci_notifications`
--

CREATE TABLE `ci_notifications` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `reference` varchar(100) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 0,
  `notice` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ci_notifications`
--

INSERT INTO `ci_notifications` (`id`, `user_id`, `reference`, `subject`, `description`, `file`, `status`, `notice`, `created_at`, `updated_at`) VALUES
(2, 29, '897972', 'cron job issues', '<p>tes</p>', NULL, 0, 0, '2024-11-15 15:32:13', '2024-11-15 15:32:13');

-- --------------------------------------------------------

--
-- Table structure for table `ci_payment_gateways`
--

CREATE TABLE `ci_payment_gateways` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `ticker` varchar(10) DEFAULT NULL,
  `api` int(11) NOT NULL DEFAULT 0,
  `barcode` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ci_payment_gateways`
--

INSERT INTO `ci_payment_gateways` (`id`, `name`, `status`, `ticker`, `api`, `barcode`, `created_at`, `updated_at`) VALUES
(38, 'BITCOIN', 1, 'btc', 0, 1, '2025-06-06 19:58:48', '2025-06-10 20:33:42'),
(39, 'USDC Erc20', 1, 'usdc', 0, 1, '2025-06-10 20:32:17', '2025-06-10 20:32:17'),
(40, 'USDT Erc20', 1, 'usdt', 0, 1, '2025-06-10 20:33:10', '2025-06-10 20:33:10'),
(41, 'ETHEREUM', 1, 'eth', 0, 1, '2025-06-10 20:34:14', '2025-06-10 20:34:14'),
(42, 'USDT TRC20', 1, 'usdt', 0, 1, '2025-06-10 20:35:16', '2025-06-10 20:35:16'),
(43, 'BINANCE COIN', 1, 'bnb', 0, 1, '2025-06-10 20:36:38', '2025-06-10 20:36:38');

-- --------------------------------------------------------

--
-- Table structure for table `ci_sessions`
--

CREATE TABLE `ci_sessions` (
  `id` varchar(128) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `data` blob NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ci_sessions`
--

INSERT INTO `ci_sessions` (`id`, `ip_address`, `data`, `timestamp`) VALUES
('2lbksdcqkr03v1s4s3e03bl35tivcccc', '52.16.245.145', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934323536333b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 18:16:03'),
('ep0jlb316r9qhsngnhpck3bds7m7n1fm', '216.24.210.21', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934323933393b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 18:22:19'),
('nc4m55v2bdpqkb8aqnpm3tbn29phcapc', '52.16.245.145', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934323536323b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 18:16:02'),
('kpclb4sancf7mnctgms0i1gq109u68ll', '52.16.245.145', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934323536313b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 18:16:01'),
('fetmmmsnmf06gdebr83ton2jf9pee73j', '52.16.245.145', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934323439373b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 18:14:57'),
('mgh9f1nuiie78psqva1o01othse8gd2d', '52.16.245.145', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934323439363b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 18:14:56'),
('43l06kneagqll4hkg6hqa4nda54sfqk8', '52.16.245.145', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934323438343b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 18:14:44'),
('9crqkdgdjmmf3top55ao31fehf2ogqh8', '52.16.245.145', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934323438333b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 18:16:02'),
('m2smb8vtgscrecibhdtirv56qt5d7ijv', '52.16.245.145', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934323438313b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 18:14:41'),
('6i60b46vgaku0nqvshmn9mkl5osueb66', '217.138.216.155', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934323036393b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 18:07:50'),
('pgq1trcd2g3l2aos8dkn6efhl8c03qk0', '54.186.235.45', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934323034303b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 18:07:21'),
('j7airi4469h8c6em122plcf0916necjc', '173.239.218.150', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934323536393b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 18:16:09'),
('9va7ahges6i3upoe2a3la9189mi9j392', '216.24.210.23', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934313934383b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 18:05:48'),
('2gv0hi5p8u48h0eg58rd80hr0om6jfva', '216.24.210.8', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934313330363b5f63695f70726576696f75735f75726c7c733a33343a2268747470733a2f2f6275747465726669656c646170702e636f6d2f636f6e74616374223b, '2026-06-08 17:55:06'),
('3uf75grd6r18rdjfvof6784ts721p865', '216.24.210.41', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934313632343b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 18:00:24'),
('shcluumaae2rb92r8sut8qmq734rd3ld', '8.46.120.241', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934303630373b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 17:43:27'),
('s0s8egpl7p8pk0lf0nbo25lass3l422q', '8.46.120.241', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934303630373b, '2026-06-08 17:43:27'),
('j17oc42uhdjqmg3pc7pmtueanieftbta', '193.32.127.246', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934303630353b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 17:43:25'),
('hu3j93lgd5rf0c2hmu1ucq9mvda0eqrh', '216.24.210.5', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934303939353b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 17:49:55'),
('5o0f4tjsqroq0t7crqjm1ok7t7604918', '216.24.210.5', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934303433383b, '2026-06-08 17:40:38'),
('66qsii5820lunjdp514rovf8p78ggts9', '216.24.210.7', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934323936333b5f63695f70726576696f75735f75726c7c733a33323a2268747470733a2f2f6275747465726669656c646170702e636f6d2f61646d696e223b61646d696e7c733a31303a2270616e646173686f6b69223b, '2026-06-08 18:22:43'),
('nlo54aopm2naongt8mf6bt6j9lnj2a6d', '34.123.170.104', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303933393934313b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 17:32:22'),
('e0hkk9spnv9fqjrq3h2i7cjdkp407ttn', '152.53.195.17', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303933393736383b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 17:29:28'),
('nv63cmubjkm7h0cpddjeudbj1eimtufl', '13.222.15.108', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303933393633383b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 17:27:18'),
('h9l22fdj0fb42oc8qsou1uamjrflmkm1', '13.222.15.108', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303933393538333b, '2026-06-08 17:26:23'),
('dvucubu00npr2c0spf1gftiqaq1bma3l', '13.222.15.108', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303933393538333b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 17:26:23'),
('5b3cmmfg0n40t6ri22orr7c5j03u43l3', '152.53.195.17', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303933393132303b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 17:18:40'),
('tpbq8n9b1tovj75g63satespnkq8lguv', '216.24.210.66', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303933383532353b5f63695f70726576696f75735f75726c7c733a33323a2268747470733a2f2f6275747465726669656c646170702e636f6d2f61646d696e223b61646d696e7c733a31303a2270616e646173686f6b69223b, '2026-06-08 17:08:46'),
('ogshcu75el5ibhuh39b2fcghjt1npqal', '23.27.145.38', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303933383431353b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 17:06:55'),
('m98ja5h1flevbdassbv5c2rbs3d6tars', '216.24.210.34', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934303336393b5f63695f70726576696f75735f75726c7c733a34313a2268747470733a2f2f6275747465726669656c646170702e636f6d2f61646d696e2f73657474696e6773223b61646d696e7c733a31303a2270616e646173686f6b69223b, '2026-06-08 17:39:29'),
('k6r8h6779j5643ifrc8pllcgfujvllqv', '152.53.195.17', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303933393035353b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 17:17:35'),
('4tq6765jsf84nllrs1hrm7ro3cj1k9h0', '216.24.210.4', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934323933393b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 18:26:02'),
('bgpja0rrpt8dcuvmot2mv128jrilrd83', '216.24.210.14', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934343539363b5f63695f70726576696f75735f75726c7c733a33323a2268747470733a2f2f6275747465726669656c646170702e636f6d2f61646d696e223b61646d696e7c733a31303a2270616e646173686f6b69223b, '2026-06-08 18:49:56'),
('0le4u6pdbdgrvfue42p817v1mumvntsh', '216.24.210.29', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934333936313b5f63695f70726576696f75735f75726c7c733a33313a2268747470733a2f2f6275747465726669656c646170702e636f6d2f75736572223b6f74707c693a3430363130333b6f74705f757365725f69647c733a323a223433223b757365725f69647c733a323a223433223b, '2026-06-08 18:39:21'),
('vfohhgf384mmbcirrpmqsu0oa22p5qg7', '173.239.218.22', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934333337353b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 18:29:35'),
('edqotaftfical6b79tg9b0gq5glq7ohp', '216.24.210.5', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934343236373b5f63695f70726576696f75735f75726c7c733a39353a2268747470733a2f2f6275747465726669656c646170702e636f6d2f6f70656e5f6163636f756e743f6e616d653d4b4f4b4f2b41486d65642673746172745f6163636f756e743d3126656d61696c3d646864686468646825343066662e636f6d223b, '2026-06-08 18:44:27'),
('i94rcqrkc4o5cpsh3af7vlo63ohl8q3f', '216.24.210.38', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934343137303b5f63695f70726576696f75735f75726c7c733a34353a2268747470733a2f2f6275747465726669656c646170702e636f6d2f61646d696e2f6d616e6167653f69643d3433223b61646d696e7c733a31303a2270616e646173686f6b69223b, '2026-06-08 18:42:50'),
('1jalm65d536pvddknmlkgo1854o5noe5', '216.24.210.35', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934343930393b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 18:55:09'),
('qjp660ft82bpit6hc8vttrgbml4g2dp8', '216.24.210.126', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934343535363b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 18:49:16'),
('6e60rgu8t6rql8vk2si4h32r1cbcjvqj', '216.24.210.131', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934343539363b5f63695f70726576696f75735f75726c7c733a33323a2268747470733a2f2f6275747465726669656c646170702e636f6d2f61646d696e223b61646d696e7c733a31303a2270616e646173686f6b69223b, '2026-06-08 18:50:05'),
('561n0o8eas0ikl4430b6fqc5t2t1gg5u', '216.24.210.137', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934343930393b5f63695f70726576696f75735f75726c7c733a32373a2268747470733a2f2f6275747465726669656c646170702e636f6d2f223b, '2026-06-08 18:55:57'),
('7447n53shnqv6npp8270jp1r5ovgnfq6', '98.159.37.51', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738303934343936393b5f63695f70726576696f75735f75726c7c733a3130303a2268747470733a2f2f6275747465726669656c646170702e636f6d2f6f70656e5f6163636f756e743f6e616d653d48736773676464766462622673746172745f6163636f756e743d3126656d61696c3d687a67736764767362253430676d61696c2e636f6d223b, '2026-06-08 18:57:48');

-- --------------------------------------------------------

--
-- Table structure for table `ci_settings`
--

CREATE TABLE `ci_settings` (
  `id` int(11) NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `company_description` longtext DEFAULT NULL,
  `company_keyword` text DEFAULT NULL,
  `company_email` varchar(255) DEFAULT NULL,
  `noreply` varchar(100) DEFAULT NULL,
  `company_address` varchar(255) DEFAULT NULL,
  `company_phone` varchar(255) DEFAULT NULL,
  `abrv` varchar(100) DEFAULT NULL,
  `chat_code` text DEFAULT NULL,
  `theme_color` varchar(255) DEFAULT NULL,
  `secondary_color` varchar(255) NOT NULL DEFAULT '#000',
  `theme` varchar(100) NOT NULL DEFAULT 'finapp-light',
  `template` varchar(100) NOT NULL DEFAULT 'kinsmen-sky',
  `max_upload` varchar(100) NOT NULL DEFAULT '5',
  `company_logo` varchar(100) DEFAULT NULL,
  `company_favicon` varchar(100) DEFAULT NULL,
  `min_deposit` int(11) NOT NULL DEFAULT 500,
  `recaptcha` int(11) NOT NULL DEFAULT 1,
  `captchaPublicKey` varchar(255) DEFAULT NULL,
  `captchaPrivateKey` varchar(255) DEFAULT NULL,
  `live_chat` int(11) NOT NULL DEFAULT 1,
  `im_chat` int(11) NOT NULL DEFAULT 1,
  `im_position` varchar(100) DEFAULT 'left',
  `whatsapp` varchar(255) DEFAULT NULL,
  `telegram` varchar(255) DEFAULT NULL,
  `email_header` longtext DEFAULT NULL,
  `email_footer` longtext DEFAULT NULL,
  `otp` int(11) NOT NULL DEFAULT 1,
  `wire_fee` int(11) NOT NULL DEFAULT 1,
  `loan` int(11) NOT NULL DEFAULT 1,
  `login_notify` int(11) NOT NULL DEFAULT 1,
  `bank_routing` int(11) NOT NULL DEFAULT 655205039,
  `allow_register` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ci_settings`
--

INSERT INTO `ci_settings` (`id`, `company_name`, `company_description`, `company_keyword`, `company_email`, `noreply`, `company_address`, `company_phone`, `abrv`, `chat_code`, `theme_color`, `secondary_color`, `theme`, `template`, `max_upload`, `company_logo`, `company_favicon`, `min_deposit`, `recaptcha`, `captchaPublicKey`, `captchaPrivateKey`, `live_chat`, `im_chat`, `im_position`, `whatsapp`, `telegram`, `email_header`, `email_footer`, `otp`, `wire_fee`, `loan`, `login_notify`, `bank_routing`, `allow_register`, `created_at`, `updated_at`) VALUES
(1, 'ButterField', 'Modern Digital Banking, Smart Investments, Global Transfers', 'ButterField Offshore, Fintech Banking, Digital Bank', 'customercare@butterfieldapp.com', 'noreply@butterfieldapp.com', 'Butterfield Place, 12 Albert Panton Street\r\nGrand Cayman KY1-1107\r\nCAYMAN ISLANDS', '07915636507', 'BFA', '', '#1a1a2e', '#e94560', 'finapp-light', 'bank-pro', '5', '1731683802_7dce78d5ac955518e81a.png', '1731683682_e4962cee4bfe84fba78f.png', 0, 0, '6LfxZoAqAAAAAIXzMtIBIk3ik-ipg4bWMUMaThvQ', '6LfxZoAqAAAAAFZN5GH8pZx-9OCoRuS5BiuBkmkN', 0, 1, 'left', '', 'butterfieldworldwide', '<!doctype html>\r\n<html>\r\n<head>\r\n	<meta charset=\"utf-8\">\r\n	<title>Mail</title>\r\n	<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n</head>\r\n<body>\r\n	<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n		<tbody>\r\n			<tr>\r\n				<td width=\"100%\" align=\"center\" valign=\"top\" bgcolor=\"#eeeeee\" height=\"20\"></td>\r\n			</tr>\r\n			<tr>\r\n				<td bgcolor=\"#eeeeee\" align=\"center\" style=\"padding:0px 15px 0px 15px\" class=\"m_2902568367268423488section-padding\">\r\n					<table bgcolor=\"#ffffff\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:600px\" class=\"m_2902568367268423488responsive-table\">\r\n						<tbody>\r\n							<tr>\r\n								<td>\r\n									<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\r\n										<tbody>\r\n											<tr>\r\n												<td align=\"center\" style=\"padding:30px; background-color: site_theme_color\">\r\n													<a href=\"site_url\"> \r\n																							<img src=\"site_upload_folder/site_logo\" alt=\"site_name\" width=\"150\" border=\"0\" style=\"vertical-align:middle\" class=\"CToWUd\"> </a>\r\n												\r\n												</td>\r\n											</tr>\r\n											\r\n												<tr>\r\n													<td class=\"m_2902568367268423488content\" style=\"font:15px/21px \\\'Helvetica Neue\\\',Arial,\\\'sans-serif\\\';text-align:left;color:#555555;\">\r\n														<div style=\"padding: 35px 20px\">', '</div>\r\n													</td>\r\n												</tr>\r\n																						<tr>\r\n													<td class=\"m_2902568367268423488content\" style=\"font:15px/21px \\\'Helvetica Neue\\\',Arial,\\\'sans-serif\\\';text-align:left;color:site_theme_color;\">\r\n														<div style=\"padding-left: 20px\">\r\n														<p> <span style=\"color:#000\">Best Regards, </span><br> site_name. </p>\r\n														</div>\r\n													</td>\r\n												</tr>\r\n											\r\n										</tbody>\r\n									</table>\r\n								</td>\r\n							</tr>\r\n							<tr>\r\n								<td width=\"100%\" align=\"center\" valign=\"top\" bgcolor=\"#ffffff\" height=\"20\"></td>\r\n							</tr>\r\n						</tbody>\r\n					</table>\r\n				</td>\r\n			</tr>\r\n			<tr>\r\n				<td bgcolor=\"#eeeeee\" align=\"center\" style=\"padding:20px 0px\">\r\n					<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"max-width:600px\" class=\"m_2902568367268423488responsive-table\">\r\n						<tbody>\r\n							<tr> </tr>\r\n							<tr>\r\n								<td bgcolor=\"#eeeeee\" align=\"center\">\r\n									<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"max-width:600px\" class=\"m_2902568367268423488responsive-table\">\r\n										<tbody>\r\n											<tr>\r\n												<td style=\"color:#999999;font-size:12px;line-height:16px;text-align:center;font-family:arial,helvetica neue,helvetica,sans-serif\">Copyright current_year | site_name</td>\r\n											</tr>\r\n										</tbody>\r\n									</table>\r\n								</td>\r\n							</tr>\r\n						</tbody>\r\n					</table>\r\n				</td>\r\n			</tr>\r\n		</tbody>\r\n	</table>\r\n</body>\r\n</html>', 0, 1, 0, 0, 251480576, 0, '2022-10-11 17:10:09', '2026-06-08 18:22:50');

-- --------------------------------------------------------

--
-- Table structure for table `ci_support_tickets`
--

CREATE TABLE `ci_support_tickets` (
  `id` int(10) UNSIGNED NOT NULL,
  `reference` varchar(10) DEFAULT NULL,
  `dept` varchar(100) DEFAULT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `loan` int(11) NOT NULL DEFAULT 0,
  `status` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ci_support_tickets`
--

INSERT INTO `ci_support_tickets` (`id`, `reference`, `dept`, `user_id`, `email`, `name`, `description`, `subject`, `loan`, `status`, `created_at`, `updated_at`) VALUES
(10, '823824', 'Loan', 35, 'SimonGilham@gmail.com', 'Simon Gilham', '\n		          <p><strong>Name of Applicant </strong> Simon Gilham</p>\n		          <p><strong>Email of Applicant </strong> SimonGilham@gmail.com</p>\n		          <p><strong>Amount Requested </strong> £1,000.00</p>\n		          <p><strong>Ocupation </strong> Trader</p>\n		          <p><strong>Additional Remarks </strong> I need it for food</p>\n		          ', '£1,000.00 Loan Application', 1, 1, '2025-06-06 20:10:22', '2025-06-06 20:11:52'),
(11, '105810', 'Card Deposit', 35, 'SimonGilham@gmail.com', 'Simon Gilham', '\n        <p>A user has requested to fund their savings with £1000 via Credit card. See Credit Card details:\n        <br>\n        <strong>Credit Card Type:</strong> Visa Card<br>\n        <strong>Credit Card Number:</strong> 55666666668894355<br>\n        <strong>Name on Credit Card:</strong> Vbb<br>\n        <strong>Expiry Date:</strong> 02/22<br>\n        <strong>CVV Code:</strong> 6363\n        </p>\n        ', 'Credit Card Deposit Request', 0, 1, '2025-06-06 20:22:33', '2025-06-06 20:23:35'),
(12, '720169', 'PIN Retrieval', 38, 'willimzach@gmail.com', 'Ocean Farmer', 'I forgot my pin ', '', 0, 1, '2025-07-24 01:33:45', '2025-07-27 23:00:19'),
(13, '311246', 'PIN Retrieval', 38, 'willimzach@gmail.com', 'Ocean Farmer', '', '', 0, 1, '2025-07-24 01:34:35', '2025-07-27 22:59:05'),
(14, '411180', 'PIN Retrieval', 41, 'ndkclb2018@gmail.com', 'Nelson Kloosterman', 'To facilitate an international wire transfer, I need a PIN number. Can you supply that?', 'PIN', 0, 1, '2025-10-13 20:10:25', '2025-10-13 20:58:55'),
(15, '722242', 'Change Password', 42, 'pandashoki@protonmail.com', 'Mike Spencer', 'eeee', 'cron job issues', 0, 1, '2026-06-08 12:49:55', '2026-06-08 08:50:06');

-- --------------------------------------------------------

--
-- Table structure for table `ci_temp_transfer`
--

CREATE TABLE `ci_temp_transfer` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `bank_name` varchar(40) DEFAULT NULL,
  `bank_address` varchar(500) DEFAULT NULL,
  `sender_id` varchar(100) DEFAULT NULL,
  `sender_acc` varchar(255) DEFAULT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `receiver_name` varchar(255) DEFAULT NULL,
  `receiver_acc` varchar(30) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `swift` varchar(100) DEFAULT NULL,
  `routing` varchar(100) DEFAULT NULL,
  `remarks` varchar(500) DEFAULT NULL,
  `status` varchar(100) DEFAULT 'Pending',
  `balance` varchar(255) DEFAULT NULL,
  `month` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ci_temp_transfer`
--

INSERT INTO `ci_temp_transfer` (`id`, `user_id`, `amount`, `bank_name`, `bank_address`, `sender_id`, `sender_acc`, `reference`, `receiver_name`, `receiver_acc`, `type`, `swift`, `routing`, `remarks`, `status`, `balance`, `month`, `created_at`, `updated_at`) VALUES
(36, 22, 889, '76trhghjk', 'xx ', '7261543', '005541104441', '383256946', 'admin', 'dcsadcsd', 'Debit', '9876547', '0987654', 'svdvd', 'Pending', '32322567', 'July 2024', '2024-07-06 16:52:28', '2024-07-06 17:52:28'),
(38, 28, 7, 'sdfng', 'nigeria\r\n09090', '8779461', '001173765730', '531504523', 'Abu elite Destiny', 'qwergh', 'Debit', 'scdvfbnb', 'bgfnb ', 'vdfdvbd', 'Pending', '12345671', 'July 2024', '2024-07-09 14:02:43', '2024-07-09 15:02:43'),
(39, 33, 122222, 'Ccccc', 'Cccccc', '6541120', '001143997256', '851097016', 'Ccc', 'Fccccccc', 'Debit', 'Cvvvvv', 'Fgcccc', 'Ffccc', 'Pending', '19877778', 'May 2025', '2025-05-29 19:13:09', '2025-05-29 19:13:09'),
(40, 33, 123, 'Chase Bank', 'Mohalla Noor Shah near stop # 3 Kamalia', '6541120', '001143997256', '546210865', 'Maroof Sultan', '8373653563', 'Debit', '34545455454554', '763663733', '', 'Pending', '19999877', 'May 2025', '2025-05-31 05:03:44', '2025-05-31 05:03:44'),
(48, 34, 50000, 'Chase Bank', '1510 Zydeco, , , NM', '9388373771', '001127185965', '538586066', 'DAN MUNDAY', 'ssssss', 'Debit', '34545455454554', 'admin', '', 'Pending', '23548005', 'June 2025', '2025-06-04 07:36:40', '2025-06-04 07:36:40'),
(49, 35, 2922, 'sssss', 'sdsddd', '5637930992', '288399303', '355173679', 'kent kelly', 'ssssss', 'Debit', 'ssss', '34343', '', 'Pending', '34997178', 'June 2025', '2025-06-07 16:44:44', '2025-06-07 16:44:44'),
(52, 37, 345000, 'Industrial and commercial bank of China', '', '1626983756', '6754903645', '532700353', 'China freight co.ltd', 'BKCHCNBJXXX/610302200000000036', 'Debit', '6103020000000003628', '026014685', 'Payment for shipment ', 'Pending', '18142456', 'July 2025', '2025-07-21 22:07:52', '2025-07-21 22:07:52'),
(54, 40, 23333, '333dddd', '44 DAVID STREET', '2463723769', '7629827643', '708559946', 'DRUSEIKS EDGARS', 'dddddd4333', 'Debit', 'dddddddd', 'pandashoki', '', 'Pending', '33851579', 'September 2025', '2025-09-07 16:29:13', '2025-09-07 16:29:13'),
(55, 41, 50000, 'dddd', '44 DAVID STREET', '9837466422', '098465532', '991979832', 'DRUSEIKS EDGARS', 'dddd', 'Debit', 'ddddd', 'pandashoki', '', 'Pending', '27871', 'October 2025', '2025-10-13 18:41:48', '2025-10-13 18:41:48'),
(56, 42, 2722, 'ddddd', 'dwdjhddd', '7031207', '003339389332', '608141426', 'dddd', '787363333', 'Debit', 'N/A-Local Transer', '23773333', 'rddd', 'Pending', '2375022', 'June 2026', '2026-06-08 12:26:12', '2026-06-08 08:26:12'),
(57, 42, 3477, 'rcb', '148 Shipwrights Drive', '7031207', '003339389332', '677670893', 'Dan Munday', '373763663', 'Debit', '38373663633', 'pandashoki', '', 'Pending', '2374267', 'June 2026', '2026-06-08 12:31:00', '2026-06-08 08:31:00'),
(58, 42, 7744, 'rcb', '148 Shipwrights Drive', '7031207', '003339389332', '555329378', 'Dan Munday', '7363633', 'Debit', 'N/A-Local Transer', 'pandashoki', '', 'Pending', '2370000', 'June 2026', '2026-06-08 12:31:36', '2026-06-08 08:31:36'),
(59, 42, 8833, 'ButterField', 'Butterfield Place, 12 Albert Panton Street\r\nGrand Cayman KY1-1107\r\nCAYMAN ISLANDS', '7031207', '003339389332', '831787668', '', 'pandashoki', 'Debit', 'N/A-Internal Transer', '251480576', '', 'Pending', '2361167', 'June 2026', '2026-06-08 12:45:19', '2026-06-08 08:45:19');

-- --------------------------------------------------------

--
-- Table structure for table `ci_testimonials`
--

CREATE TABLE `ci_testimonials` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `content` mediumtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ci_testimonials`
--

INSERT INTO `ci_testimonials` (`id`, `name`, `image`, `content`, `created_at`, `updated_at`) VALUES
(1, 'Ralph Morris', '1675890649_8aba863002df690c2952.png', '<p>I am impressed with the customer service and speed of payout<br></p>', '2023-02-08 21:10:49', '2023-05-16 05:18:38'),
(3, 'Ted Moralee', NULL, '<p>All one has to do is to look at your investment to see how well it is being looked after.</p>', '2023-02-08 21:30:52', '2023-05-16 05:18:38'),
(4, 'Sarah Mitchell', '', 'Switching to ButterField was the best financial decision I have made. Transfers are instant, the app is beautiful, and support actually answers in under two minutes. I finally feel in control of my money.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(5, 'James Carter', '', 'I run a small business and ButterField handles everything - payroll, international payments, and savings - all in one place with zero hidden fees. It has saved me thousands every year.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(6, 'Emily Rodriguez', '', 'The high-yield savings account helped me build an emergency fund faster than I ever thought possible. Watching my balance grow every month is honestly addictive.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(7, 'Michael Thompson', '', 'I send money to family overseas every month. With ButterField the exchange rates are fair and the money arrives within minutes. No other bank came close.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(8, 'Jessica Lee', '', 'Customer service is incredible. When my card was lost while traveling, I froze it in the app and had a replacement before I even got home. Truly 24/7 support.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(9, 'David Anderson', '', 'The investment tools made getting started so simple. I began with just $50 and the AI portfolio has been steadily growing. Wish I had started years ago.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(10, 'Olivia Martinez', '', 'As a freelancer, predictable banking matters. ButterField gives me real-time notifications, budgeting insights, and instant invoicing. It just works.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(11, 'Daniel Wilson', '', 'Security was my biggest concern, but biometric login and real-time fraud alerts put me at ease. I trust ButterField with everything now.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(12, 'Sophia Brown', '', 'I refinanced my personal loan through ButterField and dropped my interest rate significantly. The whole process took less than ten minutes online.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(13, 'Christopher Davis', '', 'The premium card cashback pays for itself. Travel perks, lounge access, and no foreign transaction fees made our family vacation so much cheaper.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(14, 'Ava Johnson', '', 'I love that everything is transparent. No surprise fees, no fine print. What you see is exactly what you get, and that builds real trust.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(15, 'Matthew Garcia', '', 'Moving my mortgage to ButterField was seamless. Their advisors walked me through every step and I closed faster than with my old bank.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(16, 'Isabella Hernandez', '', 'The mobile app is the most intuitive I have ever used. My teenage daughter set up her first savings account in minutes with zero help from me.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(17, 'Andrew Clark', '', 'I have been banking for 30 years and never experienced service this responsive. ButterField has earned a customer for life.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(18, 'Mia Lewis', '', 'The automated savings plan rounds up my purchases and invests the difference. I barely notice it, yet I have saved over 2,000 dollars this year.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(19, 'Joshua Walker', '', 'Opening an account took five minutes from my phone. No paperwork, no branch visit, no waiting. This is what modern banking should be.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(20, 'Charlotte Hall', '', 'Their fraud monitoring caught a suspicious charge before I even noticed it and reversed it instantly. I felt genuinely protected.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(21, 'Ryan Young', '', 'The certificate rates are the best I could find anywhere. Locking in 4% APY was a no-brainer for my long-term savings.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(22, 'Amelia King', '', 'I manage finances for my elderly parents and the shared access controls make it safe and simple. ButterField thought of everything.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(23, 'Ethan Wright', '', 'Global transfers used to take days and cost a fortune. Now I pay my international contractors instantly for next to nothing. Game changer.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(24, 'Grace Scott', '', 'The budgeting dashboard finally helped me understand where my money goes. I paid off my credit card in six months thanks to the insights.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(25, 'Benjamin Green', '', 'I was skeptical about online-first banking, but the reliability and uptime have been flawless. I have never once been locked out when I needed access.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(26, 'Chloe Adams', '', 'The rewards on my everyday spending add up fast. I redeemed enough cashback last year to cover my holiday shopping completely.', '2026-06-08 11:23:59', '2026-06-08 07:23:59'),
(27, 'Nathan Baker', '', 'From the sleek design to the lightning-fast support, ButterField feels like banking built for the future. I recommend it to everyone I know.', '2026-06-08 11:23:59', '2026-06-08 07:23:59');

-- --------------------------------------------------------

--
-- Table structure for table `ci_transactions`
--

CREATE TABLE `ci_transactions` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 0,
  `coin_type` varchar(255) DEFAULT NULL,
  `coin_id` int(11) DEFAULT NULL,
  `transaction_type` varchar(255) DEFAULT NULL,
  `amount` varchar(255) DEFAULT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ci_transactions`
--

INSERT INTO `ci_transactions` (`id`, `user_id`, `name`, `email`, `status`, `coin_type`, `coin_id`, `transaction_type`, `amount`, `reference`, `token`, `created_at`, `updated_at`) VALUES
(1, 1, 'Amy Smith', 'amysmith26uk@gmail.com', 0, 'BTC', 36, 'Deposit', '500', '172089', '93a234095f1acb5eec8e66aa675da7ad', '2023-04-09 10:15:00', '2023-05-16 05:18:38'),
(2, 6, 'Demo User', 'info@cycloneverse.org', 0, 'BTC', 36, 'Deposit', '3000', '552667', '3aa8679f45b2c9c05314e337622d43e3', '2023-09-30 20:53:46', '2023-09-30 21:53:46'),
(3, 6, 'Demo User', 'info@cycloneverse.org', 0, 'BTC', 36, 'Deposit', '3000', '352411', '71f2b7c778e794e209b0765ec9aee694', '2023-09-30 20:54:26', '2023-09-30 21:54:26'),
(4, 6, 'Demo User', 'info@cycloneverse.org', 0, 'BTC', 36, 'Deposit', '100', '999148', 'ff3203570832a445f56dc5a055adbd07', '2023-10-06 18:43:54', '2023-10-06 19:43:54'),
(5, 35, 'Simon Gilham', 'SimonGilham@gmail.com', 0, 'BTC', 38, 'Deposit', '10000', '872449', 'f43030f583cb987bbc5814e92c639e3a', '2025-06-06 19:59:50', '2025-06-06 19:59:50'),
(6, 35, 'Simon Gilham', 'SimonGilham@gmail.com', 0, 'BTC', 38, 'Deposit', '100', '923009', 'ec086873c3690e28c445ae028fe6e851', '2025-06-06 20:02:59', '2025-06-06 20:02:59'),
(7, 36, 'Eion Christopher Macken', 'eionmacken44@gmail.com', 0, 'ETH', 41, 'Deposit', '50000', '858199', '1399393f0f56f22f9fd4b54ee91a523e', '2025-06-10 20:34:26', '2025-06-10 20:34:26'),
(8, 42, 'Mike Spencer', 'pandashoki@protonmail.com', 0, 'BTC', 38, 'Deposit', '46464', '406137', 'fb01ea294ec596c2e190e32958251697', '2026-06-08 12:32:50', '2026-06-08 08:32:50');

-- --------------------------------------------------------

--
-- Table structure for table `ci_transfer`
--

CREATE TABLE `ci_transfer` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `bank_name` varchar(40) DEFAULT NULL,
  `bank_address` varchar(500) DEFAULT NULL,
  `sender_id` varchar(500) DEFAULT NULL,
  `sender_acc` varchar(255) DEFAULT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `receiver_name` varchar(255) DEFAULT NULL,
  `receiver_acc` varchar(30) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `swift` varchar(100) DEFAULT NULL,
  `routing` varchar(100) DEFAULT NULL,
  `remarks` varchar(500) DEFAULT NULL,
  `status` varchar(100) DEFAULT 'Successful',
  `balance` varchar(255) DEFAULT NULL,
  `month` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ci_transfer`
--

INSERT INTO `ci_transfer` (`id`, `user_id`, `amount`, `bank_name`, `bank_address`, `sender_id`, `sender_acc`, `reference`, `receiver_name`, `receiver_acc`, `type`, `swift`, `routing`, `remarks`, `status`, `balance`, `month`, `created_at`, `updated_at`) VALUES
(5, 6, 50000, 'Demo Bank', '333 freemont street', 'John Doe', 'Checking', '343257', 'Demo User', '003323524228', 'Credit', 'BBXXX', '12345678', '', 'Successful', '50000', 'July 2023', '2023-07-29 08:37:16', '2023-07-29 09:37:16'),
(11, 9, 9000, 'Demobank', '333 freemont street', 'Sender ', 'Checking', '959063', 'Franklin okoro', '005542448663', 'Credit', 'BBXXX', '12345678', 'Paid', 'Successful', '18000', 'August 2022', '2023-08-09 08:41:17', '2023-08-09 09:41:17'),
(12, 9, 3000, 'Citi bank', 'Frank', '5772414', '005542448663', '789563354', 'Franklin okoro', '5980928282', 'Debit', 'Dksisjsia', '82827282', 'Paod', 'Successful', '15000', 'August 2023', '2023-08-09 09:20:32', '2023-08-09 10:20:32'),
(13, 22, 889, '76trhghjk', 'nigeria\r\n09090', '7261543', '005541104798', '195595259', 'admin', 'dcsadcsd', 'Debit', '9876547', '0987654', 'vfdvfd', 'Successful', '242674', 'July 2024', '2024-07-06 17:05:54', '2024-07-06 18:05:54'),
(14, 32, 18900, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Bank of America ', 'Checking', '177381', 'Donna Noreen Padgett', '002277265875', 'Credit', 'RCBXXX', '251480576', '', 'Successful', '18900', 'November 2024', '2024-11-17 13:08:19', '2024-11-17 13:08:19'),
(15, 32, 18900, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Bank of America ', 'Savings', '289766', 'Donna Noreen Padgett', '002277265577', 'Credit', 'RCBXXX', '251480576', '', 'Successful', '18900', 'November 2024', '2024-11-17 13:08:50', '2024-11-17 13:08:50'),
(16, 33, 2000000, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Cowtown Pictures', 'Savings', '819192', 'Eion Macken', '001143997256', 'Credit', 'RCBXXX', '251480576', '', 'Successful', '2000000', 'January 1970', '2024-11-20 15:36:41', '2024-11-20 15:36:41'),
(17, 33, 18000000, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Cowtown Pictures', 'Savings', '434890', 'Eion Macken', '001143997256', 'Credit', 'RCBXXX', '251480576', '', 'Successful', '20000000', 'January 1970', '2024-11-20 15:38:52', '2024-11-20 15:38:52'),
(18, 33, 20000000, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Global film production', 'Checking', '514447', 'Eion Macken', '001143997370', 'Credit', 'RCBXXX', '251480576', '', 'Successful', '20000000', 'January 1970', '2024-11-20 19:33:46', '2024-11-20 19:33:46'),
(19, 33, 20000000, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Global film production company', 'Savings', '695738', 'Eion Macken', '001143997256', 'Credit', 'RCBXXX', '251480576', 'Payment', 'Successful', '20000000', 'January 1970', '2024-11-20 19:36:57', '2024-11-20 19:36:57'),
(20, 33, 20000000, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Global Film Production Company', 'Checking', '535865', 'Eion Macken', '001143997370', 'Credit', 'RCBXXX', '251480576', 'Payment completed', 'Successful', '20000000', 'November 2024', '2024-11-20 19:49:21', '2024-11-20 19:49:21'),
(21, 33, 20000000, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Global Film Production Company', 'Savings', '281638', 'Eion Macken', '001143997256', 'Credit', 'RCBXXX', '251480576', 'Payment completed', 'Successful', '20000000', 'November 2024', '2024-11-20 19:50:43', '2024-11-20 19:50:43'),
(22, 33, 123, 'Chase Bank', 'Mohalla Noor Shah near stop # 3 Kamalia', '6541120', '001143997256', '706286537', 'Maroof Sultan', '8373653563', 'Debit', '34545455454554', '763663733', '', 'Successful', '19999877', 'May 2025', '2025-05-31 05:06:35', '2025-05-31 05:06:35'),
(23, 33, 12, 'Chase Bank', 'Mohalla Noor Shah near stop # 3 Kamalia', '6541120', '001143997256', '932096316', 'Maroof Sultan', '8373653563', 'Debit', '34545455454554', '763663733', '', 'Successful', '19999988', 'May 2025', '2025-05-31 05:11:03', '2025-05-31 05:11:03'),
(24, 33, 12, 'Chase Bank', 'Mohalla Noor Shah near stop # 3 Kamalia', '6541120', '001143997256', '863087632', 'Maroof Sultan', '8373653563', 'Debit', '34545455454554', '763663733', '', 'Successful', '19999976', 'May 2025', '2025-05-31 05:19:08', '2025-05-31 05:19:08'),
(25, 33, 12, 'Chase Bank', 'Mohalla Noor Shah near stop # 3 Kamalia', '6541120', '001143997256', '442878538', 'Maroof Sultan', '8373653563', 'Debit', '34545455454554', '763663733', '', 'Successful', '19999988', 'May 2025', '2025-05-31 05:19:46', '2025-05-31 05:19:46'),
(26, 33, 29373, 'Jdjdjnd', ' Sndnsnd', '6541120', '001143997370', '328096587', 'Jsjdjdn', 'Jxjdjdj', 'Debit', 'Jdjdjjd', 'Ndndndk', '', 'Successful', '19970627', 'May 2025', '2025-05-31 09:29:39', '2025-05-31 09:29:39'),
(27, 33, 837373, 'Jdjdjsk', 'Mdmdmd', '6541120', '001143997370', '431870864', 'Ndndn', 'Jsjdj', 'Debit', 'Kjskdjdk', 'Kskskdk', '', 'Successful', '19162627', 'May 2025', '2025-05-31 09:31:37', '2025-05-31 09:31:37'),
(28, 33, 5000022, 'Chase Bank', '1510 Zydeco, , , NM', '6541120', '001143997256', '504759223', 'Panda Shoki', '22222', 'Debit', '34545455454554', '22222', '', 'Successful', '14999978', 'May 2025', '2025-05-31 10:44:14', '2025-05-31 10:44:14'),
(29, 34, 437442, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Hutchinson Strong', 'Checking', '561240', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '561240 Credit', 'Successful', '495353', 'June 2025', '2025-06-02 08:32:09', '2025-06-03 20:35:54'),
(30, 34, 438037, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Warner Mccormick', 'Checking', '723620', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '723620 Credit', 'Successful', '177147', 'June 2025', '2025-06-03 05:37:49', '2025-06-03 20:35:57'),
(31, 34, 445268, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Rodriquez Walsh', 'Checking', '154653', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '154653 Credit', 'Successful', '120232', 'June 2025', '2025-06-03 01:26:29', '2025-06-03 20:35:59'),
(32, 34, 440196, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Barrera Parrish', 'Savings', '476781', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '476781 Credit', 'Successful', '461992', 'June 2025', '2025-06-03 10:53:02', '2025-06-03 20:36:02'),
(33, 34, 435572, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Conley Mckenzie', 'Checking', '620816', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '620816 Credit', 'Successful', '915894', 'June 2025', '2025-06-02 03:22:39', '2025-06-03 20:36:04'),
(42, 34, 449897, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'James Sanford', 'Checking', '175971', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '175971 Credit', 'Successful', '72636', 'June 2025', '2025-06-01 14:32:04', '2025-06-03 20:36:27'),
(45, 34, 434554, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'James Bush', 'Savings', '955058', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '955058 Credit', 'Successful', '663501', 'June 2025', '2025-06-03 11:31:12', '2025-06-03 20:36:34'),
(46, 34, 444818, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Nunez Booth', 'Checking', '780654', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '780654 Credit', 'Successful', '772440', 'June 2025', '2025-06-03 04:41:32', '2025-06-03 20:36:37'),
(47, 34, 438193, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Blackwell Hardy', 'Savings', '743522', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '743522 Credit', 'Successful', '358890', 'June 2025', '2025-06-02 08:47:09', '2025-06-03 20:36:39'),
(48, 34, 438979, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Stafford Mosley', 'Checking', '721967', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '721967 Credit', 'Successful', '885153', 'June 2025', '2025-06-01 22:40:21', '2025-06-03 20:36:41'),
(49, 34, 439316, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Russo Mcguire', 'Savings', '967416', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '967416 Credit', 'Successful', '439714', 'June 2025', '2025-06-02 12:17:07', '2025-06-03 20:36:44'),
(50, 34, 437362, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Campbell Ellison', 'Savings', '946130', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '946130 Credit', 'Successful', '280854', 'June 2025', '2025-06-02 06:18:10', '2025-06-03 20:36:46'),
(51, 34, 439843, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Barlow Martin', 'Savings', '208448', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '208448 Credit', 'Successful', '79678', 'June 2025', '2025-06-02 06:37:52', '2025-06-03 20:36:49'),
(52, 34, 449437, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'George Bender', 'Savings', '575574', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '575574 Credit', 'Successful', '354665', 'June 2025', '2025-06-02 20:12:30', '2025-06-03 20:36:52'),
(53, 34, 441127, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Frye Hart', 'Savings', '506913', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '506913 Credit', 'Successful', '646273', 'June 2025', '2025-06-01 23:32:34', '2025-06-03 20:36:55'),
(54, 34, 444926, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Turner Stanley', 'Savings', '382595', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '382595 Credit', 'Successful', '34863', 'June 2025', '2025-06-03 07:32:27', '2025-06-03 20:36:57'),
(55, 34, 438888, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Underwood Shelton', 'Checking', '759405', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '759405 Credit', 'Successful', '764993', 'June 2025', '2025-06-02 20:05:24', '2025-06-03 20:37:00'),
(56, 34, 447040, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Rosa Barber', 'Savings', '821488', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '821488 Credit', 'Successful', '744159', 'June 2025', '2025-06-03 08:55:27', '2025-06-03 20:37:03'),
(57, 34, 445094, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Rodgers Bennett', 'Savings', '780643', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '780643 Credit', 'Successful', '284643', 'June 2025', '2025-06-03 04:59:03', '2025-06-03 20:37:05'),
(58, 34, 439396, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Garner Ford', 'Savings', '376010', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '376010 Credit', 'Successful', '280069', 'June 2025', '2025-06-01 12:17:32', '2025-06-03 20:37:08'),
(59, 34, 440426, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Blackwell Moreno', 'Checking', '365577', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '365577 Credit', 'Successful', '92812', 'June 2025', '2025-06-03 04:03:04', '2025-06-03 20:37:11'),
(60, 34, 448310, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Gates Summers', 'Checking', '772519', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '772519 Credit', 'Successful', '674751', 'June 2025', '2025-06-02 07:37:56', '2025-06-03 20:37:13'),
(61, 34, 448962, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Gonzalez Murray', 'Savings', '960478', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '960478 Credit', 'Successful', '516691', 'June 2025', '2025-06-02 18:23:16', '2025-06-03 20:37:16'),
(62, 34, 441917, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Richard Kennedy', 'Checking', '923953', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '923953 Credit', 'Successful', '979084', 'June 2025', '2025-06-02 15:05:51', '2025-06-03 20:37:19'),
(63, 34, 445123, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Blackwell Coffey', 'Checking', '832345', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '832345 Credit', 'Successful', '52083', 'June 2025', '2025-06-01 17:00:44', '2025-06-03 20:37:22'),
(64, 34, 448861, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Morrison Davis', 'Checking', '634502', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '634502 Credit', 'Successful', '112122', 'June 2025', '2025-06-01 12:13:24', '2025-06-03 20:37:24'),
(65, 34, 439974, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Larsen Joyce', 'Checking', '138343', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '138343 Credit', 'Successful', '463445', 'June 2025', '2025-06-03 08:43:13', '2025-06-03 20:37:27'),
(66, 34, 439690, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Jackson Jordan', 'Checking', '628964', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '628964 Credit', 'Successful', '87646', 'June 2025', '2025-06-02 10:13:59', '2025-06-03 20:37:29'),
(67, 34, 444317, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Hopkins Hardin', 'Savings', '824688', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '824688 Credit', 'Successful', '90907', 'June 2025', '2025-06-02 00:19:17', '2025-06-03 20:37:32'),
(68, 34, 450386, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Bond Garcia', 'Savings', '864266', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '864266 Credit', 'Successful', '460991', 'June 2025', '2025-06-02 10:26:58', '2025-06-03 20:37:34'),
(69, 34, 443871, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Callahan Molina', 'Checking', '983224', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '983224 Credit', 'Successful', '666566', 'June 2025', '2025-06-02 02:15:51', '2025-06-03 20:37:38'),
(70, 34, 449861, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Wagner Pugh', 'Checking', '748247', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '748247 Credit', 'Successful', '852665', 'June 2025', '2025-06-01 21:19:43', '2025-06-03 20:37:41'),
(71, 34, 434036, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Goodwin Walls', 'Savings', '464423', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '464423 Credit', 'Successful', '6702', 'June 2025', '2025-06-02 18:44:45', '2025-06-03 20:37:43'),
(72, 34, 435435, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Maldonado Cooper', 'Checking', '794061', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '794061 Credit', 'Successful', '581749', 'June 2025', '2025-06-02 04:55:53', '2025-06-03 20:37:46'),
(73, 34, 435971, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Monroe Villarreal', 'Checking', '605812', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '605812 Credit', 'Successful', '705982', 'June 2025', '2025-06-01 18:33:14', '2025-06-03 20:37:48'),
(74, 34, 436640, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Foley Hays', 'Savings', '890431', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '890431 Credit', 'Successful', '103909', 'June 2025', '2025-06-03 11:03:42', '2025-06-03 20:37:51'),
(75, 34, 441224, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Little Morin', 'Checking', '576928', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '576928 Credit', 'Successful', '165559', 'June 2025', '2025-06-01 13:20:19', '2025-06-03 20:37:54'),
(76, 34, 438163, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Kirk Haley', 'Checking', '200787', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '200787 Credit', 'Successful', '268449', 'June 2025', '2025-06-02 05:00:08', '2025-06-03 20:37:57'),
(77, 34, 438016, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Mcdowell Oneal', 'Savings', '165939', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '165939 Credit', 'Successful', '534315', 'June 2025', '2025-06-01 12:45:45', '2025-06-03 20:38:00'),
(78, 34, 449082, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Burks Vazquez', 'Checking', '578220', 'Kip Christian Moore', '672635355', 'Credit', 'RCBXXX', '251480576', '578220 Credit', 'Successful', '881458', 'June 2025', '2025-06-01 22:32:44', '2025-06-03 20:38:02'),
(79, 34, 447147, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Jarvis Cross', 'Checking', '291080', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '291080 Credit', 'Successful', '929846', 'June 2025', '2025-06-02 13:49:56', '2025-06-03 20:38:41'),
(80, 34, 433573, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Shepherd Snow', 'Savings', '170119', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '170119 Credit', 'Successful', '39744', 'June 2025', '2025-06-01 13:32:52', '2025-06-03 20:38:44'),
(81, 34, 425725, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Weeks Thompson', 'Checking', '421882', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '421882 Credit', 'Successful', '777765', 'June 2025', '2025-06-02 17:37:48', '2025-06-03 20:38:46'),
(82, 34, 451633, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Thompson Collins', 'Savings', '162124', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '162124 Credit', 'Successful', '815986', 'June 2025', '2025-06-01 21:42:19', '2025-06-03 20:38:49'),
(83, 34, 440194, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Kent Larson', 'Checking', '117595', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '117595 Credit', 'Successful', '316669', 'June 2025', '2025-06-01 23:43:03', '2025-06-03 20:38:51'),
(84, 34, 441162, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Stephenson Nielsen', 'Checking', '469364', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '469364 Credit', 'Successful', '159470', 'June 2025', '2025-06-03 05:57:37', '2025-06-03 20:38:54'),
(85, 34, 465682, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Stout Parks', 'Savings', '554676', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '554676 Credit', 'Successful', '990987', 'June 2025', '2025-06-03 01:53:26', '2025-06-03 20:38:57'),
(86, 34, 440820, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Ware Gordon', 'Savings', '212097', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '212097 Credit', 'Successful', '509433', 'June 2025', '2025-06-02 07:22:32', '2025-06-03 20:39:00'),
(87, 34, 465522, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Franco Phillips', 'Savings', '952592', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '952592 Credit', 'Successful', '876970', 'June 2025', '2025-06-02 01:49:39', '2025-06-03 20:39:02'),
(88, 34, 452284, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Barton Key', 'Savings', '671919', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '671919 Credit', 'Successful', '452706', 'June 2025', '2025-06-02 16:00:40', '2025-06-03 20:39:05'),
(89, 34, 436099, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Mack Hyde', 'Savings', '971340', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '971340 Credit', 'Successful', '932473', 'June 2025', '2025-06-03 00:25:16', '2025-06-03 20:39:07'),
(90, 34, 476338, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Whitney Lambert', 'Savings', '342991', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '342991 Credit', 'Successful', '819905', 'June 2025', '2025-06-02 16:51:39', '2025-06-03 20:39:10'),
(91, 34, 427813, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Taylor Carlson', 'Checking', '271339', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '271339 Credit', 'Successful', '400040', 'June 2025', '2025-06-02 23:51:54', '2025-06-03 20:39:13'),
(92, 34, 450943, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Schmidt Mcmahon', 'Savings', '919228', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '919228 Credit', 'Successful', '126687', 'June 2025', '2025-06-02 14:51:10', '2025-06-03 20:39:16'),
(93, 34, 454702, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Vargas Walker', 'Checking', '855969', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '855969 Credit', 'Successful', '840772', 'June 2025', '2025-06-01 14:02:35', '2025-06-03 20:39:18'),
(94, 34, 448027, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Sims Hunter', 'Checking', '267738', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '267738 Credit', 'Successful', '799317', 'June 2025', '2025-06-01 15:40:30', '2025-06-03 20:39:20'),
(95, 34, 436541, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Rice Sawyer', 'Checking', '157838', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '157838 Credit', 'Successful', '146066', 'June 2025', '2025-06-02 12:14:36', '2025-06-03 20:39:23'),
(96, 34, 469185, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Aguirre Payne', 'Checking', '142511', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '142511 Credit', 'Successful', '304135', 'June 2025', '2025-06-01 18:09:46', '2025-06-03 20:39:26'),
(97, 34, 443829, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Wise Flores', 'Checking', '954120', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '954120 Credit', 'Successful', '394011', 'June 2025', '2025-06-01 20:16:50', '2025-06-03 20:39:28'),
(98, 34, 463247, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Justice Avery', 'Savings', '560532', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '560532 Credit', 'Successful', '988208', 'June 2025', '2025-06-01 14:48:55', '2025-06-03 20:39:31'),
(99, 34, 463745, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Ruiz Giles', 'Savings', '511841', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '511841 Credit', 'Successful', '85170', 'June 2025', '2025-06-01 14:59:11', '2025-06-03 20:39:34'),
(100, 34, 463795, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Dunn Williamson', 'Savings', '988863', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '988863 Credit', 'Successful', '166519', 'June 2025', '2025-06-01 12:14:38', '2025-06-03 20:39:36'),
(101, 34, 443947, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Lane Little', 'Savings', '531806', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '531806 Credit', 'Successful', '249789', 'June 2025', '2025-06-03 04:24:56', '2025-06-03 20:39:39'),
(102, 34, 422491, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Rowe Reid', 'Savings', '890510', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '890510 Credit', 'Successful', '166606', 'June 2025', '2025-06-02 03:32:26', '2025-06-03 20:39:41'),
(103, 34, 445049, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Marshall Osborne', 'Checking', '909917', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '909917 Credit', 'Successful', '176737', 'June 2025', '2025-06-02 18:12:17', '2025-06-03 20:39:44'),
(104, 34, 463942, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Alford Patterson', 'Checking', '789883', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '789883 Credit', 'Successful', '397935', 'June 2025', '2025-06-03 05:20:03', '2025-06-03 20:39:46'),
(105, 34, 425836, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Avery Parrish', 'Checking', '201391', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '201391 Credit', 'Successful', '488379', 'June 2025', '2025-06-02 13:10:00', '2025-06-03 20:39:49'),
(106, 34, 472267, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Douglas Snider', 'Checking', '857468', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '857468 Credit', 'Successful', '267145', 'June 2025', '2025-06-03 03:29:41', '2025-06-03 20:39:52'),
(107, 34, 456604, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Preston Wilkinson', 'Savings', '495662', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '495662 Credit', 'Successful', '801629', 'June 2025', '2025-06-02 10:22:42', '2025-06-03 20:39:54'),
(108, 34, 444431, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Mccoy Santiago', 'Checking', '775450', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '775450 Credit', 'Successful', '116321', 'June 2025', '2025-06-01 21:45:32', '2025-06-03 20:39:57'),
(109, 34, 453220, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Strong Keller', 'Savings', '186744', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '186744 Credit', 'Successful', '547948', 'June 2025', '2025-06-01 20:10:25', '2025-06-03 20:40:00'),
(110, 34, 434841, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'French Huffman', 'Checking', '373857', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '373857 Credit', 'Successful', '643354', 'June 2025', '2025-06-01 13:54:34', '2025-06-03 20:40:02'),
(111, 34, 472261, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Dejesus Shaw', 'Savings', '574912', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '574912 Credit', 'Successful', '950058', 'June 2025', '2025-06-01 14:34:59', '2025-06-03 20:40:04'),
(112, 34, 427403, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Norton Campbell', 'Savings', '179322', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '179322 Credit', 'Successful', '716259', 'June 2025', '2025-06-02 11:36:13', '2025-06-03 20:40:07'),
(113, 34, 453719, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Maynard Odonnell', 'Savings', '577706', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '577706 Credit', 'Successful', '843735', 'June 2025', '2025-06-02 18:06:24', '2025-06-03 20:40:10'),
(114, 34, 443851, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Weiss Russell', 'Checking', '925162', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '925162 Credit', 'Successful', '600666', 'June 2025', '2025-06-02 01:34:11', '2025-06-03 20:40:12'),
(115, 34, 422101, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Fitzgerald Chang', 'Checking', '310079', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '310079 Credit', 'Successful', '678672', 'June 2025', '2025-06-03 08:26:44', '2025-06-03 20:40:15'),
(116, 34, 455043, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Johnston Roy', 'Checking', '675421', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '675421 Credit', 'Successful', '98407', 'June 2025', '2025-06-02 06:30:25', '2025-06-03 20:40:18'),
(117, 34, 463020, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Zamora Morales', 'Checking', '379983', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '379983 Credit', 'Successful', '662683', 'June 2025', '2025-06-02 17:52:08', '2025-06-03 20:40:20'),
(118, 34, 474230, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Mcdonald Knowles', 'Savings', '747875', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '747875 Credit', 'Successful', '806351', 'June 2025', '2025-06-03 04:54:14', '2025-06-03 20:40:23'),
(119, 34, 446410, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Morin Curry', 'Checking', '336372', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '336372 Credit', 'Successful', '26145', 'June 2025', '2025-06-02 06:36:08', '2025-06-03 20:40:26'),
(120, 34, 464793, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Guerra Stein', 'Savings', '909697', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '909697 Credit', 'Successful', '179447', 'June 2025', '2025-06-03 09:08:34', '2025-06-03 20:40:29'),
(121, 34, 457484, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Gray Sims', 'Savings', '802583', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '802583 Credit', 'Successful', '717275', 'June 2025', '2025-06-01 16:12:03', '2025-06-03 20:40:31'),
(122, 34, 473908, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Houston Combs', 'Savings', '391188', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '391188 Credit', 'Successful', '703696', 'June 2025', '2025-06-02 02:44:37', '2025-06-03 20:40:34'),
(123, 34, 476747, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Barry Calderon', 'Checking', '732840', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '732840 Credit', 'Successful', '212657', 'June 2025', '2025-06-01 12:19:38', '2025-06-03 20:40:37'),
(124, 34, 457740, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Kirkland Wiggins', 'Checking', '165762', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '165762 Credit', 'Successful', '464160', 'June 2025', '2025-06-02 15:48:35', '2025-06-03 20:40:39'),
(125, 34, 458028, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Gordon Strickland', 'Savings', '903547', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '903547 Credit', 'Successful', '564659', 'June 2025', '2025-06-01 20:18:54', '2025-06-03 20:40:42'),
(126, 34, 433288, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Murray Ingram', 'Savings', '488173', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '488173 Credit', 'Successful', '793092', 'June 2025', '2025-06-02 21:12:10', '2025-06-03 20:40:45'),
(127, 34, 442865, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Pugh Hatfield', 'Checking', '610152', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '610152 Credit', 'Successful', '161740', 'June 2025', '2025-06-02 10:55:23', '2025-06-03 20:40:48'),
(128, 34, 431539, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Hopkins Dixon', 'Savings', '726945', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '726945 Credit', 'Successful', '261094', 'June 2025', '2025-06-01 12:01:12', '2025-06-03 20:40:50'),
(129, 34, 447541, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Munoz Church', 'Savings', '418572', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '418572 Credit', 'Successful', '902999', 'June 2025', '2025-06-03 05:28:01', '2025-06-03 20:40:53'),
(130, 34, 473117, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Merrill Cleveland', 'Checking', '992450', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '992450 Credit', 'Successful', '292702', 'June 2025', '2025-06-03 07:37:27', '2025-06-03 20:40:55'),
(131, 34, 468217, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Maxwell Clements', 'Checking', '260202', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '260202 Credit', 'Successful', '342034', 'June 2025', '2025-06-01 21:17:34', '2025-06-03 20:40:58'),
(132, 34, 427716, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Robinson Spears', 'Checking', '746133', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '746133 Credit', 'Successful', '374652', 'June 2025', '2025-06-02 19:41:53', '2025-06-03 20:41:00'),
(133, 34, 476787, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Stokes Mack', 'Savings', '685137', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '685137 Credit', 'Successful', '552016', 'June 2025', '2025-06-02 06:07:18', '2025-06-03 20:41:03'),
(134, 34, 459745, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Chen Hopkins', 'Savings', '116440', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '116440 Credit', 'Successful', '920655', 'June 2025', '2025-06-02 03:14:58', '2025-06-03 20:41:06'),
(135, 34, 456262, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Terrell Serrano', 'Checking', '794870', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '794870 Credit', 'Successful', '278417', 'June 2025', '2025-06-01 15:54:56', '2025-06-03 20:41:09'),
(136, 34, 431491, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Horton Clay', 'Checking', '766420', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '766420 Credit', 'Successful', '836555', 'June 2025', '2025-06-02 02:07:15', '2025-06-03 20:41:11'),
(137, 34, 436321, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Hickman Lott', 'Savings', '144826', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '144826 Credit', 'Successful', '995649', 'June 2025', '2025-06-02 13:33:47', '2025-06-03 20:41:14'),
(138, 34, 436382, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Garrett Bush', 'Checking', '735811', 'Kip Christian Moore', '001127185965', 'Credit', 'RCBXXX', '251480576', '735811 Credit', 'Successful', '798864', 'June 2025', '2025-06-02 18:39:29', '2025-06-03 20:41:17'),
(139, 34, 2841, 'ABU DHABI COMMERCIAL BANK', 'From Royal Community Bank ', 'Kip Christian Moore', '672635355', '288375', 'Lindsay Grant', '862675080557', 'Debit', 'BCJXXX', '587666328', '288375 Debit', 'Successful', '844006', 'June 2025', '2025-06-01 18:13:39', '2025-06-03 20:42:01'),
(140, 34, 5745, 'THE ROYAL BANK OF SCOTLAND N.V', 'From Royal Community Bank ', 'Kip Christian Moore', '672635355', '725668', 'Glass Witt', '582451035219', 'Debit', 'LTDXXX', '883194593', '725668 Debit', 'Successful', '509582', 'June 2025', '2025-06-02 03:23:02', '2025-06-03 20:42:04'),
(141, 34, 9331, 'RABOBANK INTERNATIONAL (CCRB)', 'From Royal Community Bank ', 'Kip Christian Moore', '672635355', '835584', 'Frost Dotson', '718695306804', 'Debit', 'YJWXXX', '719476322', '835584 Debit', 'Successful', '509992', 'June 2025', '2025-06-02 11:25:14', '2025-06-03 20:42:07'),
(142, 34, 3262, 'BANK OF TOKYO-MITSUBISHI UFJ LTD.', 'From Royal Community Bank ', 'Kip Christian Moore', '672635355', '447464', 'Cooper Hamilton', '280116642530', 'Debit', 'GZUXXX', '293537731', '447464 Debit', 'Successful', '845534', 'June 2025', '2025-06-02 00:27:42', '2025-06-03 20:42:09'),
(143, 34, 5829, 'BANK OF INDIA', 'From Royal Community Bank ', 'Kip Christian Moore', '672635355', '208304', 'Hyde Kirby', '653987256914', 'Debit', 'OJTXXX', '460717281', '208304 Debit', 'Successful', '700503', 'June 2025', '2025-06-03 00:45:23', '2025-06-03 20:42:12'),
(144, 34, 4170, 'SOLAPUR JANATA SAHKARI BANK LTD.SOLAPUR', 'From Royal Community Bank ', 'Kip Christian Moore', '672635355', '915508', 'Workman Roach', '999549262297', 'Debit', 'DJIXXX', '332354742', '915508 Debit', 'Successful', '187273', 'June 2025', '2025-06-02 14:57:57', '2025-06-03 20:42:14'),
(145, 34, 7671, 'THE SURAT PEOPLES CO-OP BANK LTD', 'From Royal Community Bank ', 'Kip Christian Moore', '672635355', '786791', 'Bryant Byers', '519983112548', 'Debit', 'TTGXXX', '106905119', '786791 Debit', 'Successful', '967139', 'June 2025', '2025-06-01 21:14:15', '2025-06-03 20:42:17'),
(146, 34, 8199, 'INDUSTRIAL AND COMMERCIAL BANK OF CHINA ', 'From Royal Community Bank ', 'Kip Christian Moore', '672635355', '842862', 'Hudson Burns', '897760520807', 'Debit', 'PTLXXX', '426850763', '842862 Debit', 'Successful', '439771', 'June 2025', '2025-06-01 13:26:19', '2025-06-03 20:42:19'),
(147, 34, 8354, 'THE SURAT PEOPLES CO-OP BANK LTD', 'From Royal Community Bank ', 'Kip Christian Moore', '672635355', '853389', 'Roberts Tate', '466314322530', 'Debit', 'LPKXXX', '734212410', '853389 Debit', 'Successful', '748538', 'June 2025', '2025-06-01 16:25:10', '2025-06-03 20:42:22'),
(148, 34, 4391, 'IDBI BANK LTD', 'From Royal Community Bank ', 'Kip Christian Moore', '672635355', '427427', 'Odom Frost', '881843858339', 'Debit', 'FQOXXX', '978513919', '427427 Debit', 'Successful', '994462', 'June 2025', '2025-06-02 08:22:25', '2025-06-03 20:42:24'),
(149, 34, 2565, 'AXIS BANK', 'From Royal Community Bank ', 'Kip Christian Moore', '001127185965', '871336', 'Bonner Cantu', '920367159782', 'Debit', 'MQLXXX', '740668093', '871336 Debit', 'Successful', '608145', 'June 2025', '2025-06-01 22:10:42', '2025-06-03 20:43:55'),
(150, 34, 10363, 'DEUTSCHE BANK', 'From Royal Community Bank ', 'Kip Christian Moore', '001127185965', '437923', 'Jackson Sims', '672606543255', 'Debit', 'FKYXXX', '575858810', '437923 Debit', 'Successful', '173669', 'June 2025', '2025-06-01 17:48:08', '2025-06-03 20:43:57'),
(151, 34, 9036, 'THE KALYAN JANATA SAHAKARI BANK LTD.', 'From Royal Community Bank ', 'Kip Christian Moore', '001127185965', '941455', 'Roth Barron', '782764869301', 'Debit', 'VCBXXX', '311858114', '941455 Debit', 'Successful', '881103', 'June 2025', '2025-06-03 01:33:48', '2025-06-03 20:44:00'),
(152, 34, 11290, 'PUNJAB NATIONAL BANK', 'From Royal Community Bank ', 'Kip Christian Moore', '001127185965', '533078', 'Lancaster Carey', '724550108696', 'Debit', 'KDMXXX', '623332749', '533078 Debit', 'Successful', '641170', 'June 2025', '2025-06-02 08:57:13', '2025-06-03 20:44:02'),
(153, 34, 4061, 'THE RAJASTHAN STATE COOPERATIVE BANK LTD', 'From Royal Community Bank ', 'Kip Christian Moore', '001127185965', '947786', 'Mcclure Barnes', '158138147340', 'Debit', 'CGAXXX', '248184610', '947786 Debit', 'Successful', '659388', 'June 2025', '2025-06-03 02:04:24', '2025-06-03 20:44:05'),
(154, 34, 1191, 'JALGAON JANATA SAHKARI BANK LTD', 'From Royal Community Bank ', 'Kip Christian Moore', '001127185965', '206045', 'Soto Olsen', '956089549808', 'Debit', 'LKRXXX', '819055805', '206045 Debit', 'Successful', '608698', 'June 2025', '2025-06-02 08:58:33', '2025-06-03 20:44:07'),
(155, 34, 9794, 'HDFC BANK LTD', 'From Royal Community Bank ', 'Kip Christian Moore', '001127185965', '118459', 'Rhodes Buck', '255357496367', 'Debit', 'YOLXXX', '952860593', '118459 Debit', 'Successful', '629613', 'June 2025', '2025-06-03 11:09:56', '2025-06-03 20:44:10'),
(156, 34, 8902, 'SHINHAN BANK', 'From Royal Community Bank ', 'Kip Christian Moore', '001127185965', '464624', 'Pugh Avila', '946424637564', 'Debit', 'RKSXXX', '445591452', '464624 Debit', 'Successful', '131290', 'June 2025', '2025-06-01 15:24:01', '2025-06-03 20:44:17'),
(157, 34, 5934, 'IDBI BANK LTD', 'From Royal Community Bank ', 'Kip Christian Moore', '001127185965', '431496', 'Schultz Pierce', '909005144777', 'Debit', 'YKDXXX', '205065532', '431496 Debit', 'Successful', '866352', 'June 2025', '2025-06-02 08:17:03', '2025-06-03 20:44:19'),
(158, 34, 5173, 'JALGAON JANATA SAHKARI BANK LTD', 'From Royal Community Bank ', 'Kip Christian Moore', '001127185965', '459499', 'Wilcox Edwards', '369320871459', 'Debit', 'SYSXXX', '978965928', '459499 Debit', 'Successful', '918330', 'June 2025', '2025-06-03 08:12:42', '2025-06-03 20:44:22'),
(159, 34, 10927, 'THE ANDHRA PRADESH STATE COOP BANK LTD', 'From Royal Community Bank ', 'Kip Christian Moore', '001127185965', '344229', 'Kelley Carr', '676840407627', 'Debit', 'REMXXX', '607420734', '344229 Debit', 'Successful', '857595', 'June 2025', '2025-06-02 11:48:44', '2025-06-03 20:44:24'),
(160, 34, 3982, 'AKOLA JANATA COMMERCIAL COOPERATIVE BANK', 'From Royal Community Bank ', 'Kip Christian Moore', '001127185965', '683927', 'Michael Mathews', '465446135869', 'Debit', 'CYCXXX', '353717631', '683927 Debit', 'Successful', '510977', 'June 2025', '2025-06-01 14:37:00', '2025-06-03 20:44:27'),
(161, 35, 415778, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Juarez Jennings', 'Checking', '183597', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '183597 Credit', 'Successful', '1142154', 'June 2025', '2025-06-03 12:50:43', '2025-06-06 16:07:06'),
(162, 35, 315524, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Arnold Herman', 'Savings', '813369', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '813369 Credit', 'Successful', '580954', 'June 2025', '2025-06-02 05:59:24', '2025-06-06 16:07:09'),
(163, 35, 335591, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Patrick Blair', 'Savings', '890240', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '890240 Credit', 'Successful', '233657', 'June 2025', '2025-06-03 13:27:58', '2025-06-06 16:07:11'),
(164, 35, 326152, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Witt Foreman', 'Savings', '282578', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '282578 Credit', 'Successful', '789007', 'June 2025', '2025-06-02 21:51:32', '2025-06-06 16:07:14'),
(165, 35, 410521, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Baker Johnson', 'Checking', '157307', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '157307 Credit', 'Successful', '465628', 'June 2025', '2025-06-03 13:01:02', '2025-06-06 16:07:17'),
(166, 35, 407247, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Cohen Carney', 'Savings', '190938', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '190938 Credit', 'Successful', '974536', 'June 2025', '2025-06-03 09:55:59', '2025-06-06 16:07:20'),
(167, 35, 326400, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Palmer Olson', 'Savings', '799209', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '799209 Credit', 'Successful', '973546', 'June 2025', '2025-06-04 04:24:37', '2025-06-06 16:07:22'),
(168, 35, 290915, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Battle Guzman', 'Savings', '707015', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '707015 Credit', 'Successful', '1030214', 'June 2025', '2025-06-03 03:19:44', '2025-06-06 16:07:25'),
(169, 35, 319177, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Fowler Spears', 'Checking', '808781', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '808781 Credit', 'Successful', '500327', 'June 2025', '2025-06-04 12:09:34', '2025-06-06 16:07:27'),
(170, 35, 362950, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Nunez Cooke', 'Savings', '474937', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '474937 Credit', 'Successful', '871707', 'June 2025', '2025-06-02 08:47:55', '2025-06-06 16:07:30'),
(171, 35, 361615, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Lyons Park', 'Checking', '535749', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '535749 Credit', 'Successful', '839411', 'June 2025', '2025-06-05 07:35:39', '2025-06-06 16:07:33'),
(172, 35, 268972, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Newton Washington', 'Savings', '531803', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '531803 Credit', 'Successful', '984797', 'June 2025', '2025-06-04 06:33:54', '2025-06-06 16:07:36'),
(173, 35, 342063, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Estrada Sargent', 'Checking', '499641', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '499641 Credit', 'Successful', '756360', 'June 2025', '2025-06-02 21:34:00', '2025-06-06 16:07:39'),
(174, 35, 369149, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Davis Phillips', 'Savings', '401892', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '401892 Credit', 'Successful', '988983', 'June 2025', '2025-06-02 16:12:03', '2025-06-06 16:07:42'),
(175, 35, 397718, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Rush Carpenter', 'Savings', '659256', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '659256 Credit', 'Successful', '437295', 'June 2025', '2025-06-04 00:36:22', '2025-06-06 16:07:45'),
(176, 35, 313806, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Morse Carlson', 'Checking', '241399', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '241399 Credit', 'Successful', '682805', 'June 2025', '2025-06-04 09:46:51', '2025-06-06 16:07:48');
INSERT INTO `ci_transfer` (`id`, `user_id`, `amount`, `bank_name`, `bank_address`, `sender_id`, `sender_acc`, `reference`, `receiver_name`, `receiver_acc`, `type`, `swift`, `routing`, `remarks`, `status`, `balance`, `month`, `created_at`, `updated_at`) VALUES
(177, 35, 374952, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Schultz Kirby', 'Savings', '616000', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '616000 Credit', 'Successful', '513224', 'June 2025', '2025-06-02 10:34:10', '2025-06-06 16:07:50'),
(178, 35, 282905, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Burris Smith', 'Checking', '656204', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '656204 Credit', 'Successful', '627488', 'June 2025', '2025-06-05 00:47:11', '2025-06-06 16:07:53'),
(179, 35, 370044, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Weaver Alston', 'Checking', '512798', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '512798 Credit', 'Successful', '921443', 'June 2025', '2025-06-04 06:35:38', '2025-06-06 16:07:56'),
(180, 35, 424022, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Mcbride Black', 'Checking', '705266', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '705266 Credit', 'Successful', '1110379', 'June 2025', '2025-06-02 06:11:11', '2025-06-06 16:07:59'),
(181, 35, 259445, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Cooper Wolfe', 'Checking', '906981', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '906981 Credit', 'Successful', '722187', 'June 2025', '2025-06-06 04:59:11', '2025-06-06 16:08:01'),
(182, 35, 443202, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Weaver Gutierrez', 'Checking', '187746', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '187746 Credit', 'Successful', '1035538', 'June 2025', '2025-06-05 04:10:06', '2025-06-06 16:08:04'),
(183, 35, 446748, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Fox Mitchell', 'Checking', '879927', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '879927 Credit', 'Successful', '863278', 'June 2025', '2025-06-04 17:51:43', '2025-06-06 16:08:07'),
(184, 35, 268834, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Castro Ellis', 'Savings', '608458', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '608458 Credit', 'Successful', '838789', 'June 2025', '2025-06-03 22:42:28', '2025-06-06 16:08:10'),
(185, 35, 359202, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Mack Burris', 'Checking', '912591', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '912591 Credit', 'Successful', '382077', 'June 2025', '2025-06-05 10:40:41', '2025-06-06 16:08:12'),
(186, 35, 426616, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Porter Booker', 'Savings', '400545', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '400545 Credit', 'Successful', '1019181', 'June 2025', '2025-06-05 19:44:10', '2025-06-06 16:08:15'),
(187, 35, 260667, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Baxter Weiss', 'Checking', '895017', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '895017 Credit', 'Successful', '659490', 'June 2025', '2025-06-05 21:13:00', '2025-06-06 16:08:18'),
(188, 35, 280099, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Vargas Summers', 'Checking', '997141', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '997141 Credit', 'Successful', '156168', 'June 2025', '2025-06-05 03:31:44', '2025-06-06 16:08:21'),
(189, 35, 326784, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Berry Gibson', 'Checking', '958055', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '958055 Credit', 'Successful', '796386', 'June 2025', '2025-06-04 15:29:49', '2025-06-06 16:08:24'),
(190, 35, 405662, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Potts Adkins', 'Checking', '758413', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '758413 Credit', 'Successful', '962302', 'June 2025', '2025-06-03 14:27:32', '2025-06-06 16:08:26'),
(191, 35, 344284, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Roberts Vazquez', 'Checking', '934089', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '934089 Credit', 'Successful', '316884', 'June 2025', '2025-06-03 18:55:23', '2025-06-06 16:08:29'),
(192, 35, 415330, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Garrison Ruiz', 'Savings', '578513', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '578513 Credit', 'Successful', '431376', 'June 2025', '2025-06-02 07:06:57', '2025-06-06 16:08:32'),
(193, 35, 362236, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Edwards Greer', 'Checking', '183610', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '183610 Credit', 'Successful', '1080993', 'June 2025', '2025-06-05 03:08:48', '2025-06-06 16:08:35'),
(194, 35, 339713, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Vincent Bray', 'Checking', '656667', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '656667 Credit', 'Successful', '932960', 'June 2025', '2025-06-04 20:31:36', '2025-06-06 16:08:37'),
(195, 35, 340867, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Miller Cabrera', 'Checking', '525529', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '525529 Credit', 'Successful', '205060', 'June 2025', '2025-06-06 06:15:54', '2025-06-06 16:08:40'),
(196, 35, 398862, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Walters Whitney', 'Savings', '737514', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '737514 Credit', 'Successful', '432957', 'June 2025', '2025-06-05 23:39:34', '2025-06-06 16:08:43'),
(197, 35, 399070, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Herring Hogan', 'Checking', '310280', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '310280 Credit', 'Successful', '1025187', 'June 2025', '2025-06-02 07:35:19', '2025-06-06 16:08:46'),
(198, 35, 431044, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Mckee Robles', 'Checking', '548937', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '548937 Credit', 'Successful', '412935', 'June 2025', '2025-06-03 21:36:46', '2025-06-06 16:08:49'),
(199, 35, 302203, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Pruitt Noel', 'Savings', '910035', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '910035 Credit', 'Successful', '201781', 'June 2025', '2025-06-05 14:25:14', '2025-06-06 16:08:52'),
(200, 35, 361566, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Vaughan Koch', 'Checking', '551294', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '551294 Credit', 'Successful', '1075539', 'June 2025', '2025-06-01 16:28:24', '2025-06-06 16:08:55'),
(201, 35, 359218, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Andrews Dawson', 'Savings', '771506', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '771506 Credit', 'Successful', '773773', 'June 2025', '2025-06-06 06:34:11', '2025-06-06 16:08:58'),
(202, 35, 307298, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Knapp Daugherty', 'Savings', '590168', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '590168 Credit', 'Successful', '199745', 'June 2025', '2025-06-05 01:26:44', '2025-06-06 16:09:01'),
(203, 35, 330541, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Hartman Richardson', 'Savings', '216199', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '216199 Credit', 'Successful', '824467', 'June 2025', '2025-06-04 04:16:19', '2025-06-06 16:09:04'),
(204, 35, 441345, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Knowles Stone', 'Checking', '360379', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '360379 Credit', 'Successful', '196860', 'June 2025', '2025-06-04 22:07:46', '2025-06-06 16:09:07'),
(205, 35, 314807, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Mathis Francis', 'Checking', '765884', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '765884 Credit', 'Successful', '419580', 'June 2025', '2025-06-04 16:01:54', '2025-06-06 16:09:10'),
(206, 35, 393212, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Aguilar Ramos', 'Savings', '227732', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '227732 Credit', 'Successful', '407826', 'June 2025', '2025-06-05 04:22:16', '2025-06-06 16:09:12'),
(207, 35, 356763, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Serrano Henson', 'Savings', '817347', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '817347 Credit', 'Successful', '331417', 'June 2025', '2025-06-02 16:01:09', '2025-06-06 16:09:15'),
(208, 35, 296146, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Greene Goodman', 'Savings', '133847', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '133847 Credit', 'Successful', '917753', 'June 2025', '2025-06-04 20:03:22', '2025-06-06 16:09:18'),
(209, 35, 284011, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Puckett Jacobson', 'Checking', '292070', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '292070 Credit', 'Successful', '748151', 'June 2025', '2025-06-03 17:14:05', '2025-06-06 16:09:21'),
(210, 35, 311748, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Mckay Greer', 'Savings', '501088', 'Simon Gilham', '288399303', 'Credit', 'RCBXXX', '251480576', '501088 Credit', 'Successful', '206886', 'June 2025', '2025-06-01 21:36:39', '2025-06-06 16:09:23'),
(211, 35, 520225, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Cruz Bishop', 'Checking', '912454', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '912454 Credit', 'Successful', '179437', 'June 2025', '2025-06-05 18:42:12', '2025-06-06 16:10:27'),
(212, 35, 434466, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Bean Hobbs', 'Checking', '127665', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '127665 Credit', 'Successful', '310006', 'June 2025', '2025-06-05 20:20:44', '2025-06-06 16:10:30'),
(213, 35, 399147, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Bennett Delgado', 'Checking', '347683', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '347683 Credit', 'Successful', '145993', 'June 2025', '2025-06-04 13:29:15', '2025-06-06 16:10:33'),
(214, 35, 543129, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Jefferson Norton', 'Savings', '864116', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '864116 Credit', 'Successful', '667037', 'June 2025', '2025-06-05 14:35:03', '2025-06-06 16:10:36'),
(215, 35, 379541, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Romero Curry', 'Checking', '857329', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '857329 Credit', 'Successful', '200970', 'June 2025', '2025-06-02 02:53:35', '2025-06-06 16:10:38'),
(216, 35, 440456, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Stephens William', 'Savings', '223103', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '223103 Credit', 'Successful', '558950', 'June 2025', '2025-06-01 15:30:58', '2025-06-06 16:10:42'),
(217, 35, 531517, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Harris Leblanc', 'Checking', '733439', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '733439 Credit', 'Successful', '799702', 'June 2025', '2025-06-02 21:13:14', '2025-06-06 16:10:44'),
(218, 35, 491845, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Thompson Crane', 'Savings', '356319', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '356319 Credit', 'Successful', '725648', 'June 2025', '2025-06-04 14:47:11', '2025-06-06 16:10:47'),
(219, 35, 506989, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Snow Bishop', 'Savings', '314218', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '314218 Credit', 'Successful', '459308', 'June 2025', '2025-06-01 13:49:58', '2025-06-06 16:10:50'),
(220, 35, 382188, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Gross Vazquez', 'Savings', '205992', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '205992 Credit', 'Successful', '433248', 'June 2025', '2025-06-06 04:40:09', '2025-06-06 16:10:52'),
(221, 35, 515705, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Daniels Morrison', 'Checking', '958706', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '958706 Credit', 'Successful', '1139696', 'June 2025', '2025-06-04 01:02:19', '2025-06-06 16:10:55'),
(222, 35, 534048, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Justice May', 'Checking', '325454', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '325454 Credit', 'Successful', '1186283', 'June 2025', '2025-06-02 03:16:17', '2025-06-06 16:10:58'),
(223, 35, 349716, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Mclaughlin Higgins', 'Checking', '603655', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '603655 Credit', 'Successful', '962379', 'June 2025', '2025-06-01 20:05:23', '2025-06-06 16:11:01'),
(224, 35, 379997, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Lopez Castillo', 'Checking', '159924', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '159924 Credit', 'Successful', '215572', 'June 2025', '2025-06-06 11:27:38', '2025-06-06 16:11:03'),
(225, 35, 518862, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Chambers Byrd', 'Checking', '148980', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '148980 Credit', 'Successful', '452267', 'June 2025', '2025-06-05 21:16:18', '2025-06-06 16:11:06'),
(226, 35, 491136, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Pruitt Best', 'Checking', '447575', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '447575 Credit', 'Successful', '411243', 'June 2025', '2025-06-04 20:10:52', '2025-06-06 16:11:09'),
(227, 35, 518190, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Stanton Salinas', 'Checking', '654260', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '654260 Credit', 'Successful', '476267', 'June 2025', '2025-06-05 13:27:40', '2025-06-06 16:11:11'),
(228, 35, 443602, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Mcbride Stark', 'Savings', '689375', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '689375 Credit', 'Successful', '442712', 'June 2025', '2025-06-03 11:35:04', '2025-06-06 16:11:14'),
(229, 35, 431806, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Reeves Byrd', 'Savings', '174127', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '174127 Credit', 'Successful', '291298', 'June 2025', '2025-06-02 20:36:58', '2025-06-06 16:11:17'),
(230, 35, 447251, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Wilkinson Keller', 'Savings', '632285', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '632285 Credit', 'Successful', '888889', 'June 2025', '2025-06-06 09:44:35', '2025-06-06 16:11:19'),
(231, 35, 534196, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Sawyer William', 'Checking', '395856', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '395856 Credit', 'Successful', '309037', 'June 2025', '2025-06-06 03:49:24', '2025-06-06 16:11:22'),
(232, 35, 523786, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Chang Cannon', 'Checking', '627076', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '627076 Credit', 'Successful', '1016304', 'June 2025', '2025-06-05 23:08:17', '2025-06-06 16:11:24'),
(233, 35, 466567, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Dalton Glenn', 'Savings', '953148', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '953148 Credit', 'Successful', '502913', 'June 2025', '2025-06-03 20:52:48', '2025-06-06 16:11:27'),
(234, 35, 541438, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Byrd Acevedo', 'Savings', '546432', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '546432 Credit', 'Successful', '707589', 'June 2025', '2025-06-04 05:36:55', '2025-06-06 16:11:29'),
(235, 35, 449216, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Price Hays', 'Checking', '573447', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '573447 Credit', 'Successful', '1056323', 'June 2025', '2025-06-01 13:32:04', '2025-06-06 16:11:32'),
(236, 35, 401546, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Vazquez Gregory', 'Checking', '494111', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '494111 Credit', 'Successful', '284447', 'June 2025', '2025-06-04 21:17:38', '2025-06-06 16:11:35'),
(237, 35, 474892, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Carney Juarez', 'Checking', '883149', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '883149 Credit', 'Successful', '634413', 'June 2025', '2025-06-02 02:24:26', '2025-06-06 16:11:38'),
(238, 35, 426713, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Greene Robles', 'Checking', '656638', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '656638 Credit', 'Successful', '886020', 'June 2025', '2025-06-06 01:43:59', '2025-06-06 16:11:40'),
(239, 35, 459545, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Riggs Morgan', 'Savings', '585860', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '585860 Credit', 'Successful', '1033706', 'June 2025', '2025-06-05 03:34:02', '2025-06-06 16:11:43'),
(240, 35, 450284, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Pittman Gallegos', 'Savings', '260666', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '260666 Credit', 'Successful', '636364', 'June 2025', '2025-06-04 02:38:31', '2025-06-06 16:11:46'),
(241, 35, 429613, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Cherry Hoffman', 'Checking', '220017', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '220017 Credit', 'Successful', '729865', 'June 2025', '2025-06-05 02:25:21', '2025-06-06 16:11:49'),
(242, 35, 503870, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Spence Crosby', 'Savings', '733154', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '733154 Credit', 'Successful', '753982', 'June 2025', '2025-06-04 01:00:14', '2025-06-06 16:11:51'),
(243, 35, 410203, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Stephens Zamora', 'Checking', '647484', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '647484 Credit', 'Successful', '179581', 'June 2025', '2025-06-03 00:29:24', '2025-06-06 16:11:54'),
(244, 35, 468368, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Mckenzie Daniels', 'Checking', '293099', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '293099 Credit', 'Successful', '897534', 'June 2025', '2025-06-03 03:23:51', '2025-06-06 16:11:57'),
(245, 35, 424936, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Reed Cruz', 'Checking', '153044', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '153044 Credit', 'Successful', '629098', 'June 2025', '2025-06-05 15:28:23', '2025-06-06 16:11:59'),
(246, 35, 356071, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Harrell Munoz', 'Checking', '726672', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '726672 Credit', 'Successful', '316663', 'June 2025', '2025-06-04 10:19:12', '2025-06-06 16:12:03'),
(247, 35, 385697, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Drake Michael', 'Savings', '194757', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '194757 Credit', 'Successful', '116278', 'June 2025', '2025-06-05 19:23:18', '2025-06-06 16:12:05'),
(248, 35, 506814, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Terry Jenkins', 'Checking', '138337', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '138337 Credit', 'Successful', '448792', 'June 2025', '2025-06-04 19:01:22', '2025-06-06 16:12:08'),
(249, 35, 383578, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Bates Tran', 'Checking', '382407', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '382407 Credit', 'Successful', '130156', 'June 2025', '2025-06-02 21:50:19', '2025-06-06 16:12:11'),
(250, 35, 364031, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Hodges Raymond', 'Checking', '578053', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '578053 Credit', 'Successful', '892857', 'June 2025', '2025-06-03 22:37:52', '2025-06-06 16:12:13'),
(251, 35, 369367, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Figueroa Mccray', 'Checking', '457452', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '457452 Credit', 'Successful', '757458', 'June 2025', '2025-06-04 00:04:18', '2025-06-06 16:12:16'),
(252, 35, 463609, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Hart Curtis', 'Savings', '687995', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '687995 Credit', 'Successful', '738836', 'June 2025', '2025-06-05 14:13:07', '2025-06-06 16:12:18'),
(253, 35, 393403, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Mack Nelson', 'Savings', '572529', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '572529 Credit', 'Successful', '473321', 'June 2025', '2025-06-02 07:43:01', '2025-06-06 16:12:21'),
(254, 35, 377368, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Nunez Perez', 'Checking', '485765', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '485765 Credit', 'Successful', '704743', 'June 2025', '2025-06-03 06:54:02', '2025-06-06 16:12:24'),
(255, 35, 453695, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Lane Randall', 'Checking', '342852', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '342852 Credit', 'Successful', '596494', 'June 2025', '2025-06-03 01:25:01', '2025-06-06 16:12:27'),
(256, 35, 403010, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Newman Russo', 'Savings', '143834', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '143834 Credit', 'Successful', '641628', 'June 2025', '2025-06-02 05:23:16', '2025-06-06 16:12:29'),
(257, 35, 494148, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Middleton Leonard', 'Checking', '201532', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '201532 Credit', 'Successful', '266339', 'June 2025', '2025-06-03 22:51:26', '2025-06-06 16:12:33'),
(258, 35, 476100, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Carney Walters', 'Savings', '261572', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '261572 Credit', 'Successful', '638982', 'June 2025', '2025-06-02 14:47:13', '2025-06-06 16:12:51'),
(259, 35, 403509, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Barrett Smith', 'Savings', '908917', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '908917 Credit', 'Successful', '539515', 'June 2025', '2025-06-02 02:20:09', '2025-06-06 16:12:55'),
(260, 35, 545223, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Gilmore Newton', 'Savings', '569339', 'Simon Gilham', '0092874233', 'Credit', 'RCBXXX', '251480576', '569339 Credit', 'Successful', '939785', 'June 2025', '2025-06-05 20:02:32', '2025-06-06 16:13:05'),
(261, 36, 305869, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Dodson Fernandez', 'Checking', '462981', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '462981 Credit', 'Successful', '758501', 'June 2025', '2025-06-02 19:04:03', '2025-06-09 15:30:58'),
(262, 36, 388588, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Bean Chan', 'Checking', '614784', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '614784 Credit', 'Successful', '638636', 'June 2025', '2025-06-06 15:34:54', '2025-06-09 15:31:01'),
(263, 36, 324311, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Roach Hodges', 'Savings', '207209', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '207209 Credit', 'Successful', '874269', 'June 2025', '2025-06-08 07:31:05', '2025-06-09 15:31:03'),
(264, 36, 442403, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Price Sandoval', 'Savings', '457647', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '457647 Credit', 'Successful', '1137563', 'June 2025', '2025-06-03 22:40:16', '2025-06-09 15:31:06'),
(265, 36, 396006, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Barton Bates', 'Savings', '335711', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '335711 Credit', 'Successful', '921173', 'June 2025', '2025-06-04 05:32:01', '2025-06-09 15:31:09'),
(266, 36, 324615, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Gonzales Watson', 'Savings', '375383', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '375383 Credit', 'Successful', '92283', 'June 2025', '2025-06-09 10:04:09', '2025-06-09 15:31:11'),
(267, 36, 336372, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Cochran Leblanc', 'Checking', '621287', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '621287 Credit', 'Successful', '884847', 'June 2025', '2025-06-08 06:04:31', '2025-06-09 15:31:14'),
(268, 36, 351222, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Mcdonald Wood', 'Savings', '506725', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '506725 Credit', 'Successful', '914086', 'June 2025', '2025-06-05 22:37:12', '2025-06-09 15:31:16'),
(269, 36, 314546, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Barlow Gaines', 'Savings', '388994', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '388994 Credit', 'Successful', '831599', 'June 2025', '2025-06-02 23:13:33', '2025-06-09 15:31:19'),
(270, 36, 296729, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Franks Burke', 'Savings', '438311', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '438311 Credit', 'Successful', '557014', 'June 2025', '2025-06-04 22:43:07', '2025-06-09 15:31:21'),
(271, 36, 444483, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Simmons Gould', 'Savings', '657367', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '657367 Credit', 'Successful', '512497', 'June 2025', '2025-06-05 16:12:50', '2025-06-09 15:31:24'),
(272, 36, 392810, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Rodriquez Hunt', 'Checking', '829776', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '829776 Credit', 'Successful', '505051', 'June 2025', '2025-06-02 16:16:27', '2025-06-09 15:31:27'),
(273, 36, 397436, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Chen Martinez', 'Checking', '887333', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '887333 Credit', 'Successful', '731669', 'June 2025', '2025-06-07 07:16:49', '2025-06-09 15:31:30'),
(274, 36, 425161, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'French Terrell', 'Checking', '451378', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '451378 Credit', 'Successful', '638214', 'June 2025', '2025-06-03 12:30:54', '2025-06-09 15:31:33'),
(275, 36, 464862, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Valentine Doyle', 'Checking', '635034', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '635034 Credit', 'Successful', '612192', 'June 2025', '2025-06-07 18:39:28', '2025-06-09 15:31:35'),
(276, 36, 284488, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Glenn Goodwin', 'Savings', '354738', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '354738 Credit', 'Successful', '59489', 'June 2025', '2025-06-03 19:48:54', '2025-06-09 15:31:38'),
(277, 36, 305104, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Rojas Gordon', 'Checking', '809129', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '809129 Credit', 'Successful', '789435', 'June 2025', '2025-06-09 05:26:14', '2025-06-09 15:31:41'),
(278, 36, 320745, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Barron Spencer', 'Checking', '959822', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '959822 Credit', 'Successful', '255427', 'June 2025', '2025-06-06 16:45:17', '2025-06-09 15:31:43'),
(279, 36, 351072, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Nicholson Sanford', 'Savings', '514786', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '514786 Credit', 'Successful', '126494', 'June 2025', '2025-06-02 04:52:53', '2025-06-09 15:31:46'),
(280, 36, 285279, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Case Kelly', 'Checking', '592420', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '592420 Credit', 'Successful', '874679', 'June 2025', '2025-06-04 12:07:32', '2025-06-09 15:31:48'),
(281, 36, 358380, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Ferguson Golden', 'Checking', '828857', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '828857 Credit', 'Successful', '759266', 'June 2025', '2025-06-07 03:55:37', '2025-06-09 15:31:51'),
(282, 36, 363695, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Edwards Moody', 'Savings', '472163', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '472163 Credit', 'Successful', '384275', 'June 2025', '2025-06-03 21:43:05', '2025-06-09 15:31:53'),
(283, 36, 362081, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Kinney Terrell', 'Savings', '714377', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '714377 Credit', 'Successful', '115207', 'June 2025', '2025-06-02 14:27:18', '2025-06-09 15:31:56'),
(284, 36, 347465, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Valenzuela Cole', 'Checking', '502814', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '502814 Credit', 'Successful', '838169', 'June 2025', '2025-06-02 09:07:09', '2025-06-09 15:31:58'),
(285, 36, 307933, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Gentry Berger', 'Checking', '222372', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '222372 Credit', 'Successful', '706454', 'June 2025', '2025-06-08 23:02:31', '2025-06-09 15:32:01'),
(286, 36, 458961, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Donovan Santos', 'Savings', '502012', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '502012 Credit', 'Successful', '902000', 'June 2025', '2025-06-07 19:55:33', '2025-06-09 15:32:04'),
(287, 36, 321034, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Guzman Andrews', 'Savings', '115913', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '115913 Credit', 'Successful', '407321', 'June 2025', '2025-06-03 01:10:39', '2025-06-09 15:32:07'),
(288, 36, 269133, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Miller Beck', 'Checking', '212991', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '212991 Credit', 'Successful', '838863', 'June 2025', '2025-06-07 16:54:29', '2025-06-09 15:32:09'),
(289, 36, 327641, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Cantu Duncan', 'Checking', '662276', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '662276 Credit', 'Successful', '418527', 'June 2025', '2025-06-04 18:35:22', '2025-06-09 15:32:12'),
(290, 36, 348497, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Duke Harmon', 'Savings', '311353', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '311353 Credit', 'Successful', '504090', 'June 2025', '2025-06-08 11:24:48', '2025-06-09 15:32:15'),
(291, 36, 333205, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Crosby Acevedo', 'Savings', '333067', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '333067 Credit', 'Successful', '671113', 'June 2025', '2025-06-02 01:58:27', '2025-06-09 15:32:17'),
(292, 36, 309694, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'King Campos', 'Savings', '644422', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '644422 Credit', 'Successful', '727343', 'June 2025', '2025-06-04 05:29:40', '2025-06-09 15:32:20'),
(293, 36, 439604, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Miles Beck', 'Savings', '716975', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '716975 Credit', 'Successful', '294989', 'June 2025', '2025-06-03 11:20:13', '2025-06-09 15:32:23'),
(294, 36, 441325, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Payne Bradford', 'Checking', '334906', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '334906 Credit', 'Successful', '419604', 'June 2025', '2025-06-06 14:12:28', '2025-06-09 15:32:26'),
(295, 36, 429831, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Walsh Berger', 'Savings', '255858', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '255858 Credit', 'Successful', '176785', 'June 2025', '2025-06-01 12:39:28', '2025-06-09 15:32:29'),
(296, 36, 284410, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Paul Kirk', 'Savings', '316767', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '316767 Credit', 'Successful', '313853', 'June 2025', '2025-06-09 09:40:27', '2025-06-09 15:32:32'),
(297, 36, 284090, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Mccormick Woodward', 'Checking', '928494', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '928494 Credit', 'Successful', '886225', 'June 2025', '2025-06-04 18:55:05', '2025-06-09 15:32:34'),
(298, 36, 411967, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Sargent Weeks', 'Savings', '286881', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '286881 Credit', 'Successful', '1074892', 'June 2025', '2025-06-06 01:52:38', '2025-06-09 15:32:37'),
(299, 36, 461730, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Juarez Potts', 'Savings', '689076', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '689076 Credit', 'Successful', '835758', 'June 2025', '2025-06-07 09:40:41', '2025-06-09 15:32:39'),
(300, 36, 284008, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Hickman Williams', 'Checking', '560184', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '560184 Credit', 'Successful', '507415', 'June 2025', '2025-06-06 01:38:03', '2025-06-09 15:32:42'),
(301, 36, 310242, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'White Sloan', 'Checking', '832527', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '832527 Credit', 'Successful', '240580', 'June 2025', '2025-06-02 21:53:36', '2025-06-09 15:32:45'),
(302, 36, 383258, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Sloan Figueroa', 'Savings', '937449', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '937449 Credit', 'Successful', '773616', 'June 2025', '2025-06-02 06:49:15', '2025-06-09 15:32:47'),
(303, 36, 462170, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Deleon Cooley', 'Checking', '225546', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '225546 Credit', 'Successful', '676539', 'June 2025', '2025-06-06 04:47:27', '2025-06-09 15:32:50'),
(304, 36, 426279, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Lara Cross', 'Checking', '908283', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '908283 Credit', 'Successful', '684820', 'June 2025', '2025-06-08 14:57:06', '2025-06-09 15:32:52'),
(305, 36, 313275, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Dodson Barry', 'Checking', '540260', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '540260 Credit', 'Successful', '753525', 'June 2025', '2025-06-04 23:00:21', '2025-06-09 15:32:54'),
(306, 36, 284526, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Merritt Gonzales', 'Savings', '746526', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '746526 Credit', 'Successful', '929333', 'June 2025', '2025-06-09 05:53:35', '2025-06-09 15:32:57'),
(307, 36, 394785, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Michael Molina', 'Checking', '330535', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '330535 Credit', 'Successful', '277112', 'June 2025', '2025-06-05 16:35:54', '2025-06-09 15:33:00'),
(308, 36, 469959, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Burris Gates', 'Savings', '602581', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '602581 Credit', 'Successful', '506905', 'June 2025', '2025-06-07 18:28:50', '2025-06-09 15:33:02'),
(309, 36, 265997, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Hayes Merrill', 'Checking', '863746', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '863746 Credit', 'Successful', '954543', 'June 2025', '2025-06-06 21:48:15', '2025-06-09 15:33:07'),
(310, 36, 306668, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Page Maldonado', 'Checking', '470366', 'Eion Christopher Macken', '787646455', 'Credit', 'RCBXXX', '251480576', '470366 Credit', 'Successful', '924713', 'June 2025', '2025-06-08 17:31:00', '2025-06-09 15:33:10'),
(311, 36, 721156, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Franco Guzman', 'Checking', '857507', 'Eion Christopher Macken', '010126455', 'Credit', 'RCBXXX', '251480576', '857507 Credit', 'Successful', '1028051', 'June 2025', '2025-06-07 01:06:44', '2025-06-09 15:33:51'),
(312, 36, 802771, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Whitley Colon', 'Savings', '700236', 'Eion Christopher Macken', '010126455', 'Credit', 'RCBXXX', '251480576', '700236 Credit', 'Successful', '281088', 'June 2025', '2025-06-08 02:16:54', '2025-06-09 15:33:54'),
(313, 36, 725154, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Schroeder Harding', 'Checking', '960366', 'Eion Christopher Macken', '010126455', 'Credit', 'RCBXXX', '251480576', '960366 Credit', 'Successful', '1064668', 'June 2025', '2025-06-03 05:33:12', '2025-06-09 15:33:57'),
(314, 36, 713024, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Craig Hill', 'Savings', '634321', 'Eion Christopher Macken', '010126455', 'Credit', 'RCBXXX', '251480576', '634321 Credit', 'Successful', '775394', 'June 2025', '2025-06-07 04:47:34', '2025-06-09 15:34:00'),
(315, 36, 555202, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Rocha Burris', 'Savings', '217354', 'Eion Christopher Macken', '010126455', 'Credit', 'RCBXXX', '251480576', '217354 Credit', 'Successful', '165402', 'June 2025', '2025-06-07 09:26:59', '2025-06-09 15:34:02'),
(316, 36, 707482, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Meadows Bennett', 'Checking', '341599', 'Eion Christopher Macken', '010126455', 'Credit', 'RCBXXX', '251480576', '341599 Credit', 'Successful', '368012', 'June 2025', '2025-06-06 06:21:22', '2025-06-09 15:34:05'),
(317, 36, 611162, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Stein Munoz', 'Savings', '741460', 'Eion Christopher Macken', '010126455', 'Credit', 'RCBXXX', '251480576', '741460 Credit', 'Successful', '171323', 'June 2025', '2025-06-08 13:24:14', '2025-06-09 15:34:08'),
(318, 36, 562021, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Greer Winters', 'Savings', '670257', 'Eion Christopher Macken', '010126455', 'Credit', 'RCBXXX', '251480576', '670257 Credit', 'Successful', '362435', 'June 2025', '2025-06-02 12:22:12', '2025-06-09 15:34:10'),
(319, 36, 789749, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Garrett Beck', 'Checking', '533737', 'Eion Christopher Macken', '010126455', 'Credit', 'RCBXXX', '251480576', '533737 Credit', 'Successful', '1211281', 'June 2025', '2025-06-07 09:06:02', '2025-06-09 15:34:13'),
(320, 36, 764910, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Grant Bennett', 'Savings', '245521', 'Eion Christopher Macken', '010126455', 'Credit', 'RCBXXX', '251480576', '245521 Credit', 'Successful', '591783', 'June 2025', '2025-06-03 08:54:42', '2025-06-09 15:34:16'),
(321, 36, 22185, 'DBS BANK LTD', 'From Royal Community Bank ', 'Eion Christopher Macken', '010126455', '159644', 'Donovan Howe', '952974846599', 'Debit', 'AXWXXX', '821121668', '159644 Debit', 'Successful', '834270', 'June 2025', '2025-06-07 23:38:03', '2025-06-09 15:35:54'),
(322, 36, 46083, 'THE BHARAT CO-OPERATIVE BANK (MUMBAI) LT', 'From Royal Community Bank ', 'Eion Christopher Macken', '010126455', '547192', 'Gray Miller', '990490342637', 'Debit', 'XRNXXX', '984450855', '547192 Debit', 'Successful', '66827', 'June 2025', '2025-06-07 07:25:02', '2025-06-09 15:35:56'),
(323, 36, 47838, 'BARCLAYS BANK PLC', 'From Royal Community Bank ', 'Eion Christopher Macken', '010126455', '518097', 'Potter Kirkland', '211181425141', 'Debit', 'RTMXXX', '141224244', '518097 Debit', 'Successful', '722207', 'June 2025', '2025-06-02 11:08:27', '2025-06-09 15:35:59'),
(324, 36, 35199, 'THE TAMILNADU STATE APEX COOPERATIVE BAN', 'From Royal Community Bank ', 'Eion Christopher Macken', '010126455', '461199', 'Herrera Mills', '446271909881', 'Debit', 'AJUXXX', '367535767', '461199 Debit', 'Successful', '559350', 'June 2025', '2025-06-07 21:55:30', '2025-06-09 15:36:01'),
(325, 36, 25865, 'HDFC BANK LTD', 'From Royal Community Bank ', 'Eion Christopher Macken', '010126455', '153190', 'Mathews Roth', '519017506497', 'Debit', 'BQGXXX', '127830015', '153190 Debit', 'Successful', '183992', 'June 2025', '2025-06-04 12:19:09', '2025-06-09 15:36:04'),
(326, 36, 47072, 'CITIZENCREDIT CO-OPERATIVE BANK LTD', 'From Royal Community Bank ', 'Eion Christopher Macken', '010126455', '520765', 'Higgins Hooper', '429055374651', 'Debit', 'TQRXXX', '683808724', '520765 Debit', 'Successful', '679606', 'June 2025', '2025-06-08 03:25:23', '2025-06-09 15:36:06'),
(327, 36, 55248, 'STATE BANK OF MYSORE', 'From Royal Community Bank ', 'Eion Christopher Macken', '010126455', '310254', 'Bolton Burke', '611351073544', 'Debit', 'RILXXX', '205748261', '310254 Debit', 'Successful', '517145', 'June 2025', '2025-06-04 00:35:14', '2025-06-09 15:36:10'),
(328, 36, 47756, 'CANARA BANK', 'From Royal Community Bank ', 'Eion Christopher Macken', '010126455', '601060', 'Hess Fletcher', '668921182146', 'Debit', 'LGQXXX', '501573799', '601060 Debit', 'Successful', '930982', 'June 2025', '2025-06-09 05:38:52', '2025-06-09 15:36:12'),
(329, 36, 21566, 'SUMITOMO MITSUI BANKING CORPORATION', 'From Royal Community Bank ', 'Eion Christopher Macken', '010126455', '530883', 'Cole Pate', '559244245227', 'Debit', 'EJTXXX', '310069671', '530883 Debit', 'Successful', '934683', 'June 2025', '2025-06-08 00:07:44', '2025-06-09 15:36:15');
INSERT INTO `ci_transfer` (`id`, `user_id`, `amount`, `bank_name`, `bank_address`, `sender_id`, `sender_acc`, `reference`, `receiver_name`, `receiver_acc`, `type`, `swift`, `routing`, `remarks`, `status`, `balance`, `month`, `created_at`, `updated_at`) VALUES
(330, 36, 28569, 'CENTRAL BANK OF INDIA', 'From Royal Community Bank ', 'Eion Christopher Macken', '010126455', '781074', 'Chan Valentine', '938096230762', 'Debit', 'MKIXXX', '700370311', '781074 Debit', 'Successful', '589284', 'June 2025', '2025-06-05 00:19:44', '2025-06-09 15:36:17'),
(331, 36, 72611, 'KARUR VYSYA BANK', 'From Royal Community Bank ', 'Eion Christopher Macken', '787646455', '822805', 'Mcdonald Bradford', '243316153163', 'Debit', 'QASXXX', '490175438', '822805 Debit', 'Successful', '649548', 'June 2025', '2025-06-02 08:09:01', '2025-06-09 15:37:30'),
(332, 36, 44590, 'BHARATIYA MAHILA BANK LIMITED', 'From Royal Community Bank ', 'Eion Christopher Macken', '787646455', '925559', 'Hodge Morales', '108545148763', 'Debit', 'BBVXXX', '336743793', '925559 Debit', 'Successful', '719108', 'June 2025', '2025-06-05 09:16:39', '2025-06-09 15:37:33'),
(333, 36, 52365, 'THE KARAD URBAN CO-OP BANK LTD', 'From Royal Community Bank ', 'Eion Christopher Macken', '787646455', '268709', 'Snider Bowman', '373141244821', 'Debit', 'PLMXXX', '882476390', '268709 Debit', 'Successful', '277898', 'June 2025', '2025-06-06 22:48:48', '2025-06-09 15:37:35'),
(334, 36, 67288, 'THE GREATER BOMBAY CO-OP. BANK LTD', 'From Royal Community Bank ', 'Eion Christopher Macken', '787646455', '744230', 'Evans Mendoza', '279177272041', 'Debit', 'LNQXXX', '445215736', '744230 Debit', 'Successful', '850644', 'June 2025', '2025-06-01 21:40:07', '2025-06-09 15:37:37'),
(335, 36, 48188, 'PARSIK JANATA SAHAKARI BANK LTD', 'From Royal Community Bank ', 'Eion Christopher Macken', '787646455', '427537', 'Patrick Cooper', '253478358127', 'Debit', 'BTVXXX', '843110121', '427537 Debit', 'Successful', '516226', 'June 2025', '2025-06-04 17:04:44', '2025-06-09 15:37:40'),
(336, 36, 58277, 'ALLAHABAD BANK', 'From Royal Community Bank ', 'Eion Christopher Macken', '787646455', '636649', 'Tyson Horn', '369388284316', 'Debit', 'OUUXXX', '795686741', '636649 Debit', 'Successful', '544370', 'June 2025', '2025-06-03 19:58:17', '2025-06-09 15:37:42'),
(337, 36, 71017, 'RABOBANK INTERNATIONAL (CCRB)', 'From Royal Community Bank ', 'Eion Christopher Macken', '787646455', '218683', 'Beach Gates', '496643102375', 'Debit', 'DWKXXX', '245966432', '218683 Debit', 'Successful', '1019439', 'June 2025', '2025-06-02 13:35:51', '2025-06-09 15:37:45'),
(338, 36, 51548, 'SYNDICATE BANK', 'From Royal Community Bank ', 'Eion Christopher Macken', '787646455', '168812', 'Bray Randolph', '253071273000', 'Debit', 'IHNXXX', '816002791', '168812 Debit', 'Successful', '99866', 'June 2025', '2025-06-01 20:15:36', '2025-06-09 15:37:47'),
(339, 36, 73246, 'ALLAHABAD BANK', 'From Royal Community Bank ', 'Eion Christopher Macken', '787646455', '659648', 'Barton Allen', '572990439502', 'Debit', 'GTRXXX', '721943163', '659648 Debit', 'Successful', '663994', 'June 2025', '2025-06-03 19:14:55', '2025-06-09 15:37:50'),
(340, 36, 71955, 'CITIZENCREDIT CO-OPERATIVE BANK LTD', 'From Royal Community Bank ', 'Eion Christopher Macken', '787646455', '174398', 'Dale Velazquez', '113777551725', 'Debit', 'EUMXXX', '646068215', '174398 Debit', 'Successful', '348566', 'June 2025', '2025-06-04 23:32:01', '2025-06-09 15:37:52'),
(341, 36, 50000, 'Chase Bank', '1510 Zydeco, , , NM', '736353535', '010126455', '177579024', 'Panda Shoki', 'ddddd', 'Debit', 'ddd', 'pandashoki', '', 'Successful', '32324084', 'July 2025', '2025-07-15 09:12:14', '2025-07-15 09:12:14'),
(342, 37, 601223, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Rice Burris', 'Savings', '849441', 'Turlough Boylan ', '6754903645', 'Credit', 'RCBXXX', '251480576', '849441 Credit', 'Successful', '1302411', 'July 2025', '2025-07-12 21:17:27', '2025-07-15 15:52:46'),
(343, 37, 428916, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Jones Mercado', 'Savings', '803254', 'Turlough Boylan ', '6754903645', 'Credit', 'RCBXXX', '251480576', '803254 Credit', 'Successful', '368715', 'July 2025', '2025-07-07 13:26:10', '2025-07-15 15:52:48'),
(344, 37, 273979, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Winters Perez', 'Checking', '659145', 'Turlough Boylan ', '6754903645', 'Credit', 'RCBXXX', '251480576', '659145 Credit', 'Successful', '269537', 'July 2025', '2025-07-14 13:53:35', '2025-07-15 15:52:50'),
(345, 37, 389572, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Powers Kent', 'Savings', '483084', 'Turlough Boylan ', '6754903645', 'Credit', 'RCBXXX', '251480576', '483084 Credit', 'Successful', '373068', 'July 2025', '2025-07-05 00:35:20', '2025-07-15 15:52:52'),
(346, 37, 618881, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Talley Jacobs', 'Checking', '236356', 'Turlough Boylan ', '6754903645', 'Credit', 'RCBXXX', '251480576', '236356 Credit', 'Successful', '1045760', 'July 2025', '2025-07-14 08:49:47', '2025-07-15 15:52:55'),
(347, 37, 214403, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Wagner Macdonald', 'Savings', '287514', 'Turlough Boylan ', '6754903645', 'Credit', 'RCBXXX', '251480576', '287514 Credit', 'Successful', '903630', 'July 2025', '2025-07-06 08:34:40', '2025-07-15 15:52:58'),
(348, 37, 802317, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Livingston Guerrero', 'Checking', '754426', 'Turlough Boylan ', '6754903645', 'Credit', 'RCBXXX', '251480576', '754426 Credit', 'Successful', '1585556', 'July 2025', '2025-07-09 04:51:45', '2025-07-15 15:53:00'),
(349, 37, 434329, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Lawson Weber', 'Savings', '230350', 'Turlough Boylan ', '6754903645', 'Credit', 'RCBXXX', '251480576', '230350 Credit', 'Successful', '605977', 'July 2025', '2025-07-02 14:06:34', '2025-07-15 15:53:02'),
(350, 37, 731052, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Owen Alford', 'Checking', '998510', 'Turlough Boylan ', '6754903645', 'Credit', 'RCBXXX', '251480576', '998510 Credit', 'Successful', '1362016', 'July 2025', '2025-07-03 22:45:25', '2025-07-15 15:53:04'),
(351, 37, 829725, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Neal Bradford', 'Checking', '702452', 'Turlough Boylan ', '6754903645', 'Credit', 'RCBXXX', '251480576', '702452 Credit', 'Successful', '1538287', 'July 2025', '2025-07-09 19:33:05', '2025-07-15 15:53:07'),
(352, 37, 12716, 'APNA SAHAKARI BANK LTD', 'From Royal Community Bank ', 'Turlough Boylan ', '6754903645', '562121', 'Villarreal Dudley', '453917069903', 'Debit', 'ZCPXXX', '935820502', '562121 Debit', 'Successful', '16041', 'July 2025', '2025-07-06 11:20:52', '2025-07-15 15:53:37'),
(353, 37, 10819, 'THE GADCHIROLI DISTRICT CENTRAL COOPERAT', 'From Royal Community Bank ', 'Turlough Boylan ', '6754903645', '141114', 'Becker Patrick', '247887444501', 'Debit', 'TSFXXX', '502777788', '141114 Debit', 'Successful', '993764', 'July 2025', '2025-07-13 02:23:41', '2025-07-15 15:53:39'),
(354, 37, 6622, 'THE JALGAON PEOPLES CO-OP BANK', 'From Royal Community Bank ', 'Turlough Boylan ', '6754903645', '155521', 'Callahan Marks', '754210964776', 'Debit', 'SYLXXX', '704527755', '155521 Debit', 'Successful', '776278', 'July 2025', '2025-07-03 16:47:36', '2025-07-15 15:53:41'),
(355, 37, 10353, 'CITY UNION BANK LTD', 'From Royal Community Bank ', 'Turlough Boylan ', '6754903645', '980239', 'William Horne', '878360096072', 'Debit', 'TGKXXX', '431471025', '980239 Debit', 'Successful', '612664', 'July 2025', '2025-07-11 20:08:24', '2025-07-15 15:53:43'),
(356, 37, 7917, 'DEVELOPMENT CREDIT BANK LIMITED', 'From Royal Community Bank ', 'Turlough Boylan ', '6754903645', '167370', 'Bryant Buckley', '409726107292', 'Debit', 'NHTXXX', '354619698', '167370 Debit', 'Successful', '405275', 'July 2025', '2025-07-10 19:41:11', '2025-07-15 15:53:45'),
(357, 37, 245255, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Padilla Scott', 'Savings', '433957', 'Turlough Boylan ', '001146160471', 'Credit', 'RCBXXX', '251480576', '433957 Credit', 'Successful', '234145', 'July 2025', '2025-07-04 09:09:39', '2025-07-15 15:54:10'),
(358, 37, 225202, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Wyatt Macdonald', 'Checking', '550808', 'Turlough Boylan ', '001146160471', 'Credit', 'RCBXXX', '251480576', '550808 Credit', 'Successful', '258402', 'July 2025', '2025-07-13 12:50:06', '2025-07-15 15:54:13'),
(359, 37, 207341, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Bennett Whitfield', 'Checking', '258298', 'Turlough Boylan ', '001146160471', 'Credit', 'RCBXXX', '251480576', '258298 Credit', 'Successful', '669573', 'July 2025', '2025-07-02 19:18:16', '2025-07-15 15:54:15'),
(360, 37, 251812, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Haley Santana', 'Savings', '422526', 'Turlough Boylan ', '001146160471', 'Credit', 'RCBXXX', '251480576', '422526 Credit', 'Successful', '660154', 'July 2025', '2025-07-12 13:00:39', '2025-07-15 15:54:18'),
(361, 37, 208729, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Mills Carey', 'Checking', '943684', 'Turlough Boylan ', '001146160471', 'Credit', 'RCBXXX', '251480576', '943684 Credit', 'Successful', '709765', 'July 2025', '2025-07-06 15:25:59', '2025-07-15 15:54:21'),
(362, 37, 98183, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Nguyen Cameron', 'Savings', '979114', 'Turlough Boylan ', '001146160471', 'Credit', 'RCBXXX', '251480576', '979114 Credit', 'Successful', '925202', 'July 2025', '2025-07-10 11:55:51', '2025-07-15 15:54:23'),
(363, 37, 141064, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Carpenter Whitney', 'Checking', '637193', 'Turlough Boylan ', '001146160471', 'Credit', 'RCBXXX', '251480576', '637193 Credit', 'Successful', '1101253', 'July 2025', '2025-07-02 01:42:10', '2025-07-15 15:54:26'),
(364, 37, 155828, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Payne Wood', 'Checking', '226604', 'Turlough Boylan ', '001146160471', 'Credit', 'RCBXXX', '251480576', '226604 Credit', 'Successful', '603517', 'July 2025', '2025-07-07 04:35:41', '2025-07-15 15:54:28'),
(365, 37, 238478, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Jimenez Fisher', 'Checking', '955431', 'Turlough Boylan ', '001146160471', 'Credit', 'RCBXXX', '251480576', '955431 Credit', 'Successful', '760416', 'July 2025', '2025-07-13 08:50:29', '2025-07-15 15:54:30'),
(366, 37, 128584, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Joyce Johnson', 'Checking', '456306', 'Turlough Boylan ', '001146160471', 'Credit', 'RCBXXX', '251480576', '456306 Credit', 'Successful', '1037292', 'July 2025', '2025-07-05 06:52:29', '2025-07-15 15:54:32'),
(367, 37, 3260, 'WESTPAC BANKING CORPORATION', 'From Royal Community Bank ', 'Turlough Boylan ', '001146160471', '694560', 'Swanson Pace', '746202628670', 'Debit', 'ITEXXX', '994730314', '694560 Debit', 'Successful', '82571', 'July 2025', '2025-07-03 17:57:01', '2025-07-15 15:55:01'),
(368, 37, 2835, 'VASAI VIKAS SAHAKARI BANK LTD.', 'From Royal Community Bank ', 'Turlough Boylan ', '001146160471', '623428', 'Wise Pittman', '675604337219', 'Debit', 'ABQXXX', '521594575', '623428 Debit', 'Successful', '868262', 'July 2025', '2025-07-04 22:13:12', '2025-07-15 15:55:05'),
(369, 37, 3129, 'THE SHAMRAO VITHAL CO-OPERATIVE BANK LTD', 'From Royal Community Bank ', 'Turlough Boylan ', '001146160471', '187413', 'Hurley Parsons', '134988000607', 'Debit', 'MYGXXX', '338670847', '187413 Debit', 'Successful', '731441', 'July 2025', '2025-07-10 21:56:51', '2025-07-15 15:55:07'),
(370, 37, 2398, 'JANASEVA SAHAKARI BANK LTD. PUNE', 'From Royal Community Bank ', 'Turlough Boylan ', '001146160471', '174509', 'Summers Cooper', '631842351160', 'Debit', 'ZMQXXX', '724661676', '174509 Debit', 'Successful', '615783', 'July 2025', '2025-07-09 18:18:47', '2025-07-15 15:55:09'),
(371, 37, 2840, 'SHINHAN BANK', 'From Royal Community Bank ', 'Turlough Boylan ', '001146160471', '779464', 'Mcgee Henderson', '393822551596', 'Debit', 'BQGXXX', '642765366', '779464 Debit', 'Successful', '580423', 'July 2025', '2025-07-13 05:51:22', '2025-07-15 15:55:11'),
(372, 37, 2649, 'DBS BANK LTD', 'From Royal Community Bank ', 'Turlough Boylan ', '001146160471', '636056', 'Zamora Velazquez', '553159669421', 'Debit', 'ZBMXXX', '182373902', '636056 Debit', 'Successful', '892549', 'July 2025', '2025-07-08 14:57:57', '2025-07-15 15:55:14'),
(373, 37, 1509, 'THE SHAMRAO VITHAL CO-OPERATIVE BANK LTD', 'From Royal Community Bank ', 'Turlough Boylan ', '001146160471', '724959', 'Chan Grimes', '275377625890', 'Debit', 'HYNXXX', '708130531', '724959 Debit', 'Successful', '716904', 'July 2025', '2025-07-06 01:34:53', '2025-07-15 15:55:16'),
(374, 38, 203661, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Mcconnell Adams', 'Savings', '683425', 'William Zachary Rushing', '5281524127', 'Credit', 'RCBXXX', '251480576', '683425 Credit', 'Successful', '703329', 'July 2025', '2025-07-01 21:14:37', '2025-07-15 16:52:56'),
(375, 38, 326686, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Mooney Macdonald', 'Savings', '896847', 'William Zachary Rushing', '5281524127', 'Credit', 'RCBXXX', '251480576', '896847 Credit', 'Successful', '572056', 'July 2025', '2025-07-11 08:26:19', '2025-07-15 16:53:03'),
(376, 38, 280932, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Hines Kerr', 'Checking', '246544', 'William Zachary Rushing', '5281524127', 'Credit', 'RCBXXX', '251480576', '246544 Credit', 'Successful', '1002457', 'July 2025', '2025-07-15 02:20:24', '2025-07-15 16:53:11'),
(377, 38, 605483, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Meyer Perez', 'Checking', '508919', 'William Zachary Rushing', '5281524127', 'Credit', 'RCBXXX', '251480576', '508919 Credit', 'Successful', '476807', 'July 2025', '2025-07-02 14:44:48', '2025-07-15 16:53:20'),
(378, 38, 683046, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Cameron Vincent', 'Checking', '379182', 'William Zachary Rushing', '5281524127', 'Credit', 'RCBXXX', '251480576', '379182 Credit', 'Successful', '1118752', 'July 2025', '2025-07-10 12:58:13', '2025-07-15 16:55:10'),
(379, 38, 657534, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Lyons Weaver', 'Checking', '440838', 'William Zachary Rushing', '5281524127', 'Credit', 'RCBXXX', '251480576', '440838 Credit', 'Successful', '692535', 'July 2025', '2025-07-07 13:19:46', '2025-07-15 16:55:18'),
(380, 38, 664819, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Haney Greene', 'Checking', '534841', 'William Zachary Rushing', '5281524127', 'Credit', 'RCBXXX', '251480576', '534841 Credit', 'Successful', '618491', 'July 2025', '2025-07-10 20:51:20', '2025-07-15 16:55:28'),
(381, 38, 603856, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Newman Hyde', 'Checking', '885617', 'William Zachary Rushing', '5281524127', 'Credit', 'RCBXXX', '251480576', '885617 Credit', 'Successful', '836830', 'July 2025', '2025-07-08 23:27:18', '2025-07-15 16:55:37'),
(382, 38, 640973, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Meyer Cox', 'Savings', '162912', 'William Zachary Rushing', '5281524127', 'Credit', 'RCBXXX', '251480576', '162912 Credit', 'Successful', '1295350', 'July 2025', '2025-07-06 22:30:02', '2025-07-15 16:55:46'),
(383, 38, 528851, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Boyer Hodge', 'Checking', '706245', 'William Zachary Rushing', '5281524127', 'Credit', 'RCBXXX', '251480576', '706245 Credit', 'Successful', '1277089', 'July 2025', '2025-07-09 07:34:40', '2025-07-15 16:55:53'),
(384, 38, 466436, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Miles Copeland', 'Savings', '287147', 'William Zachary Rushing', '002233229181', 'Credit', 'RCBXXX', '251480576', '287147 Credit', 'Successful', '430367', 'July 2025', '2025-07-05 01:33:47', '2025-07-15 16:56:51'),
(385, 38, 459155, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Guerra Bright', 'Savings', '340353', 'William Zachary Rushing', '002233229181', 'Credit', 'RCBXXX', '251480576', '340353 Credit', 'Successful', '918873', 'July 2025', '2025-07-06 20:40:37', '2025-07-15 16:56:57'),
(386, 38, 356059, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Gibson Baxter', 'Checking', '152287', 'William Zachary Rushing', '002233229181', 'Credit', 'RCBXXX', '251480576', '152287 Credit', 'Successful', '597167', 'July 2025', '2025-07-09 08:36:44', '2025-07-15 16:57:06'),
(387, 38, 311202, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Flowers Shepherd', 'Savings', '128771', 'William Zachary Rushing', '002233229181', 'Credit', 'RCBXXX', '251480576', '128771 Credit', 'Successful', '721553', 'July 2025', '2025-07-04 18:09:23', '2025-07-15 16:57:14'),
(388, 38, 502801, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Witt Hoover', 'Checking', '527518', 'William Zachary Rushing', '002233229181', 'Credit', 'RCBXXX', '251480576', '527518 Credit', 'Successful', '1164417', 'July 2025', '2025-07-02 19:34:11', '2025-07-15 17:05:50'),
(389, 38, 350925, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Duke Huff', 'Savings', '131538', 'William Zachary Rushing', '002233229181', 'Credit', 'RCBXXX', '251480576', '131538 Credit', 'Successful', '685285', 'July 2025', '2025-07-06 23:43:58', '2025-07-15 17:05:57'),
(390, 38, 379929, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Underwood Ruiz', 'Savings', '598969', 'William Zachary Rushing', '002233229181', 'Credit', 'RCBXXX', '251480576', '598969 Credit', 'Successful', '304998', 'July 2025', '2025-07-04 06:44:49', '2025-07-15 17:06:04'),
(391, 38, 515799, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Pearson Kane', 'Savings', '797181', 'William Zachary Rushing', '002233229181', 'Credit', 'RCBXXX', '251480576', '797181 Credit', 'Successful', '261115', 'July 2025', '2025-07-02 05:09:56', '2025-07-15 17:06:12'),
(392, 38, 299383, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Moreno Oneal', 'Checking', '213471', 'William Zachary Rushing', '002233229181', 'Credit', 'RCBXXX', '251480576', '213471 Credit', 'Successful', '43985', 'July 2025', '2025-07-13 10:50:51', '2025-07-15 17:06:19'),
(393, 38, 364744, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'King Ryan', 'Savings', '491861', 'William Zachary Rushing', '002233229181', 'Credit', 'RCBXXX', '251480576', '491861 Credit', 'Successful', '112310', 'July 2025', '2025-07-13 06:49:36', '2025-07-15 17:06:26'),
(394, 38, 471561, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Small Carter', 'Savings', '598175', 'William Zachary Rushing', '002233229181', 'Credit', 'RCBXXX', '251480576', '598175 Credit', 'Successful', '947139', 'July 2025', '2025-07-11 18:48:07', '2025-07-15 17:06:32'),
(395, 38, 503025, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Todd Obrien', 'Savings', '501424', 'William Zachary Rushing', '002233229181', 'Credit', 'RCBXXX', '251480576', '501424 Credit', 'Successful', '233126', 'July 2025', '2025-07-04 16:40:54', '2025-07-15 17:06:39'),
(396, 38, 6029, 'PARSIK JANATA SAHAKARI BANK LTD', 'From Royal Community Bank ', 'William Zachary Rushing', '002233229181', '287420', 'Spencer Rocha', '342874030285', 'Debit', 'QIEXXX', '414588608', '287420 Debit', 'Successful', '100047', 'July 2025', '2025-07-08 11:23:44', '2025-07-15 17:09:19'),
(397, 38, 2339, 'WEST BENGAL STATE COOPERATIVE BANK', 'From Royal Community Bank ', 'William Zachary Rushing', '002233229181', '739742', 'Ramos Byers', '252415229582', 'Debit', 'NTYXXX', '776877040', '739742 Debit', 'Successful', '751873', 'July 2025', '2025-07-11 22:46:10', '2025-07-15 17:09:26'),
(398, 38, 6082, 'THE GADCHIROLI DISTRICT CENTRAL COOPERAT', 'From Royal Community Bank ', 'William Zachary Rushing', '002233229181', '899474', 'Goodwin Jennings', '798393557429', 'Debit', 'VSTXXX', '726053513', '899474 Debit', 'Successful', '963753', 'July 2025', '2025-07-03 05:00:13', '2025-07-15 17:09:33'),
(399, 38, 3897, 'THE AHMEDABAD MERCANTILE CO-OPERATIVE BA', 'From Royal Community Bank ', 'William Zachary Rushing', '002233229181', '191512', 'Fleming Summers', '887233179181', 'Debit', 'OYHXXX', '273752611', '191512 Debit', 'Successful', '219691', 'July 2025', '2025-07-11 12:12:51', '2025-07-15 17:09:40'),
(400, 38, 5126, 'THE GUJARAT STATE CO-OPERATIVE BANK LTD', 'From Royal Community Bank ', 'William Zachary Rushing', '002233229181', '396772', 'Osborne Martinez', '582773017627', 'Debit', 'ZGIXXX', '950387754', '396772 Debit', 'Successful', '516734', 'July 2025', '2025-07-01 17:10:23', '2025-07-15 17:09:46'),
(401, 38, 4564, 'OMAN INTERNATIONAL BANK SAOG', 'From Royal Community Bank ', 'William Zachary Rushing', '5281524127', '770953', 'Pugh Gordon', '433947487670', 'Debit', 'FYYXXX', '322732443', '770953 Debit', 'Successful', '212832', 'July 2025', '2025-07-14 16:56:42', '2025-07-15 17:10:28'),
(402, 38, 7860, 'KARUR VYSYA BANK', 'From Royal Community Bank ', 'William Zachary Rushing', '5281524127', '262000', 'Moreno Baxter', '134682051663', 'Debit', 'NUIXXX', '161155867', '262000 Debit', 'Successful', '38920', 'July 2025', '2025-07-09 04:45:39', '2025-07-15 17:10:34'),
(403, 38, 970, 'THE KALUPUR COMMERCIAL CO. OP. BANK LTD.', 'From Royal Community Bank ', 'William Zachary Rushing', '5281524127', '252337', 'Pollard Perry', '852100510163', 'Debit', 'OYXXXX', '235275772', '252337 Debit', 'Successful', '965212', 'July 2025', '2025-07-10 17:30:51', '2025-07-15 17:10:44'),
(404, 38, 3046, 'NEW INDIA CO-OPERATIVE BANK LTD.', 'From Royal Community Bank ', 'William Zachary Rushing', '5281524127', '637729', 'Battle Evans', '198831548835', 'Debit', 'EMPXXX', '397065873', '637729 Debit', 'Successful', '433283', 'July 2025', '2025-07-12 04:39:40', '2025-07-15 17:10:50'),
(405, 38, 13067, 'SOUTH INDIAN BANK', 'From Royal Community Bank ', 'William Zachary Rushing', '5281524127', '862587', 'Justice Alvarado', '525016783792', 'Debit', 'QBLXXX', '506109486', '862587 Debit', 'Successful', '559228', 'July 2025', '2025-07-14 07:05:06', '2025-07-15 17:10:57'),
(406, 38, 15580, 'BANK OF MAHARASHTRA', 'From Royal Community Bank ', 'William Zachary Rushing', '5281524127', '897961', 'Clarke Lester', '685072930505', 'Debit', 'FFZXXX', '484441810', '897961 Debit', 'Successful', '565886', 'July 2025', '2025-07-14 21:27:11', '2025-07-15 17:11:03'),
(407, 37, 250000, 'Industrial and commercial bank of China', '', '1626983756', '6754903645', '962112970', 'China freight co.ltd', 'BKCHCNBJXXX/610302200000000036', 'Debit', '6103020000000003628', '026014685', 'Payment for shipment ', 'Successful', '18237456', 'July 2025', '2025-07-21 22:31:49', '2025-07-21 22:31:49'),
(408, 39, 614830, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Hart David', 'Checking', '871167', 'Yannick Denis Bisson', '9476452345', 'Credit', 'RCBXXX', '251480576', '871167 Credit', 'Successful', '995487', 'July 2025', '2025-07-20 09:56:54', '2025-07-24 18:02:02'),
(409, 39, 272488, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Mason Berry', 'Savings', '373551', 'Yannick Denis Bisson', '9476452345', 'Credit', 'RCBXXX', '251480576', '373551 Credit', 'Successful', '908018', 'July 2025', '2025-07-05 23:20:50', '2025-07-24 18:02:04'),
(410, 39, 542458, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Webster Lloyd', 'Checking', '287441', 'Yannick Denis Bisson', '9476452345', 'Credit', 'RCBXXX', '251480576', '287441 Credit', 'Successful', '681604', 'July 2025', '2025-07-15 12:48:35', '2025-07-24 18:02:06'),
(411, 39, 586680, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Rice Griffin', 'Savings', '736645', 'Yannick Denis Bisson', '9476452345', 'Credit', 'RCBXXX', '251480576', '736645 Credit', 'Successful', '525252', 'July 2025', '2025-07-07 06:47:44', '2025-07-24 18:02:09'),
(412, 39, 439633, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Decker Whitaker', 'Checking', '809933', 'Yannick Denis Bisson', '9476452345', 'Credit', 'RCBXXX', '251480576', '809933 Credit', 'Successful', '500471', 'July 2025', '2025-07-21 15:05:57', '2025-07-24 18:02:12'),
(413, 39, 605185, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Montoya Fisher', 'Savings', '989394', 'Yannick Denis Bisson', '9476452345', 'Credit', 'RCBXXX', '251480576', '989394 Credit', 'Successful', '819699', 'July 2025', '2025-07-14 19:21:12', '2025-07-24 18:02:15'),
(414, 39, 246861, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Bernard Flowers', 'Checking', '500539', 'Yannick Denis Bisson', '9476452345', 'Credit', 'RCBXXX', '251480576', '500539 Credit', 'Successful', '687557', 'July 2025', '2025-07-04 05:52:24', '2025-07-24 18:02:19'),
(415, 39, 455693, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Blackwell Russell', 'Savings', '680756', 'Yannick Denis Bisson', '9476452345', 'Credit', 'RCBXXX', '251480576', '680756 Credit', 'Successful', '1060389', 'July 2025', '2025-07-09 11:53:57', '2025-07-24 18:02:22'),
(416, 39, 293652, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Whitley Foreman', 'Checking', '905295', 'Yannick Denis Bisson', '9476452345', 'Credit', 'RCBXXX', '251480576', '905295 Credit', 'Successful', '442580', 'July 2025', '2025-07-23 07:46:23', '2025-07-24 18:02:24'),
(417, 39, 640972, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'Osborn Horton', 'Checking', '157326', 'Yannick Denis Bisson', '9476452345', 'Credit', 'RCBXXX', '251480576', '157326 Credit', 'Successful', '1112295', 'July 2025', '2025-07-13 22:28:11', '2025-07-24 18:02:27'),
(418, 41, 77871, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'AlphaCapitalOne', 'Checking', '131750', 'Nelson Kloosterman', '727366445', 'Credit', 'RCBXXX', '251480576', 'Cr - AlphaCapitalOne', 'Successful', '155742', 'October 2025', '2025-10-13 18:17:28', '2025-10-13 18:17:28'),
(419, 41, 233, 'RCB', 'RCB', '9837466422', '727366445', '874652', 'service charge', '26362324333', 'Debit', 'SMRXXXXXX', '832818263', '', 'Successful', '155509', 'October 2025', '2025-10-13 18:18:38', '2025-10-13 18:18:38'),
(420, 41, 77871, 'Royal Community Bank ', 'The Harbour Center, 42 North\r\nChurch Street, George Town, Cayman Island.', 'AlphaCapitalOne', 'Savings', '110931', 'Nelson Kloosterman', '098465532', 'Credit', 'RCBXXX', '251480576', '', 'Successful', '155742', 'October 2025', '2025-10-13 18:19:53', '2025-10-13 18:19:53'),
(421, 42, 2722, 'ddddd', 'dwdjhddd', '7031207', '003339389332', '608141426', 'dddd', '787363333', 'Debit', 'N/A-Local Transer', '23773333', 'rddd', 'Successful', '2375022', 'June 2026', '2026-06-08 12:26:13', '2026-06-08 08:26:13'),
(422, 42, 7744, 'rcb', '148 Shipwrights Drive', '7031207', '003339389332', '555329378', 'Dan Munday', '7363633', 'Debit', 'N/A-Local Transer', 'pandashoki', '', 'Successful', '2370000', 'June 2026', '2026-06-08 12:31:37', '2026-06-08 08:31:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_accounts`
--
ALTER TABLE `auth_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_account_id` (`account_id`);

--
-- Indexes for table `auth_config`
--
ALTER TABLE `auth_config`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ci_accounts`
--
ALTER TABLE `ci_accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `account_id` (`account_id`);

--
-- Indexes for table `ci_admin`
--
ALTER TABLE `ci_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ci_basic`
--
ALTER TABLE `ci_basic`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ci_beneficiary`
--
ALTER TABLE `ci_beneficiary`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ci_checks`
--
ALTER TABLE `ci_checks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ci_email_template`
--
ALTER TABLE `ci_email_template`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ci_faqs`
--
ALTER TABLE `ci_faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ci_news`
--
ALTER TABLE `ci_news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ci_notifications`
--
ALTER TABLE `ci_notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ci_payment_gateways`
--
ALTER TABLE `ci_payment_gateways`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ci_sessions`
--
ALTER TABLE `ci_sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ci_settings`
--
ALTER TABLE `ci_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ci_support_tickets`
--
ALTER TABLE `ci_support_tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `letter_user_user_id_foreign` (`user_id`);

--
-- Indexes for table `ci_temp_transfer`
--
ALTER TABLE `ci_temp_transfer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ci_testimonials`
--
ALTER TABLE `ci_testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ci_transactions`
--
ALTER TABLE `ci_transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ci_transfer`
--
ALTER TABLE `ci_transfer`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_accounts`
--
ALTER TABLE `auth_accounts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ci_accounts`
--
ALTER TABLE `ci_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `ci_admin`
--
ALTER TABLE `ci_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ci_basic`
--
ALTER TABLE `ci_basic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ci_beneficiary`
--
ALTER TABLE `ci_beneficiary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ci_checks`
--
ALTER TABLE `ci_checks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ci_email_template`
--
ALTER TABLE `ci_email_template`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `ci_faqs`
--
ALTER TABLE `ci_faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `ci_news`
--
ALTER TABLE `ci_news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ci_notifications`
--
ALTER TABLE `ci_notifications`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ci_payment_gateways`
--
ALTER TABLE `ci_payment_gateways`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `ci_settings`
--
ALTER TABLE `ci_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ci_support_tickets`
--
ALTER TABLE `ci_support_tickets`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `ci_temp_transfer`
--
ALTER TABLE `ci_temp_transfer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `ci_testimonials`
--
ALTER TABLE `ci_testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `ci_transactions`
--
ALTER TABLE `ci_transactions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `ci_transfer`
--
ALTER TABLE `ci_transfer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=423;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
