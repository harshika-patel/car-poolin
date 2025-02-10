# **Project Title: Carpooling Application**
## **Overview**

The Carpooling Application is a platform designed to connect drivers offering rides with passengers seeking transportation. It aims to facilitate ride-sharing by providing a user-friendly interface for both drivers and passengers to register, post ride details, and book available seats.

## **Problem Space**
Urban areas often face challenges such as traffic congestion, environmental pollution, and high commuting costs. Many vehicles travel with empty seats, leading to inefficient use of resources. This application addresses these issues by promoting carpooling, thereby reducing the number of vehicles on the road, lowering emissions, and decreasing travel expenses for users.

## **User Profile**

## **The application serves two primary user groups:**
### Drivers:
Individuals who have available seats in their vehicles and wish to offer rides to others.

### Passengers: 
Individuals seeking transportation options that are cost-effective and environmentally friendly.

Both user types will have tailored registration processes to capture necessary information, ensuring safety and reliability within the platform.

## **Features**

### **User Registration and Authentication:**
Separate sign-in pages for drivers and passengers, collecting relevant details such as name, contact information, and, for drivers, additional credentials like insurance and license numbers.

### **Ride Posting:** 
Drivers can post ride details, including pickup and drop-off locations, time, available seats, and price per seat.

### **Ride Search and Booking:** 
Passengers can search for rides based on their desired pickup and drop-off locations and time. Search results are displayed in a card format, showing key details. Passengers can view detailed ride information and book available seats.

### **Email Notifications:**
Drivers receive email when a passenger books a seat, with options to confirm or cancel the booking.



## **Implementation**

## **Tech Stack**

###  **Front-End:**
HTML, CSS, SCSS, Bootstrap, JavaScript, React.js

### **Back-End: **
Node.js, Express.js

### **Database:**
MySQL

### **Tools:**
Postman for API testing

### **APIs**

The application will utilize third-party APIs for functionalities such as geolocation and mapping to enhance user experience.

## **Sitemap**

**Home Page**: Introduction and overview of the application.

**Registration Pages**: Separate pages for driver and passenger sign-ups.

**Login Page**: Unified login for all users.

**Ride Posting Page**: Form for drivers to post new rides.

**Search Results Page**: Displays available rides based on passenger search criteria.

**Ride Details Page**: Detailed information about a selected ride, with booking options.



## **Mockups**

Wireframes and mockups will be created using Figma to visualize the application's user interface and user experience design.

[https://www.figma.com/design/wVZmSojfuv24UWtX1spUcy/Harshika?node-id=0-1&t=DvBKsxhcWeiC8wG9-1]

## **Data**

The database will include tables for users, rides, bookings, and notifications. Relationships will be established to link drivers to their posted rides, passengers to their bookings, and notifications to relevant user actions.

## **Endpoints**

**User Endpoints:**
POST /register
POST /login
GET /profile

**Ride Endpoints:**
POST /rides
GET /rides
GET /rides/:id

**Booking Endpoints:**
POST /bookings
GET /bookings

**Notification Endpoints:**
GET /email

## **Roadmap**
**
Week 1-2**: Requirement gathering, planning, and designing mockups.

**Week 3-4**: Setting up the development environment and creating the database schema.

**Week 5-6**: Developing user authentication and profile management features.

**Week 7-8**: Implementing ride posting and search functionalities.

**Week 9-10**: Developing booking and notification systems.

**Week 11-12**: Testing, debugging, and preparing for deployment.

## **Future Implementations**

**Real-Time Tracking**: Integrate real-time GPS tracking for rides.

**Payment Integration**: Implement secure payment gateways for transactions.

**Rating System**: Allow users to rate each other to build trust within the community.

**Advanced Matching Algorithm**: Enhance ride matching based on user preferences and past behaviors.
