import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    // Cleanup existing data
    await prisma.reviewResponse.deleteMany();
    await prisma.reviewTag.deleteMany();
    await prisma.reviewCategory.deleteMany();
    await prisma.review.deleteMany();
    await prisma.message.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.vehicle.deleteMany();
    await prisma.driver.deleteMany();
    await prisma.shopPhoto.deleteMany();
    await prisma.savedMechanic.deleteMany();
    await prisma.mechanic.deleteMany();
    await prisma.user.deleteMany();
    await prisma.articleBookmark.deleteMany();
    await prisma.article.deleteMany();

    // Create password hash
    const passwordHash = await hash('password123', 12);

    // 1. Create Drivers
    const driver1 = await prisma.user.create({
        data: {
            email: 'driver@example.com',
            password_hash: passwordHash,
            full_name: 'John Driver',
            phone_number: '+1234567890',
            role: 'driver',
            is_verified: true,
            driver: {
                create: {
                    current_location_lat: 37.7749,
                    current_location_lng: -122.4194,
                    preferred_language: 'English',
                },
            },
        },
        include: { driver: true },
    });

    const driver2 = await prisma.user.create({
        data: {
            email: 'jane@example.com',
            password_hash: passwordHash,
            full_name: 'Jane Doe',
            phone_number: '+1987654321',
            role: 'driver',
            is_verified: true,
            driver: {
                create: {
                    current_location_lat: 37.7849,
                    current_location_lng: -122.4094,
                },
            },
        },
        include: { driver: true },
    });

    // 2. Create Vehicles for Drivers
    await prisma.vehicle.create({
        data: {
            driver_id: driver1.driver!.id,
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            color: 'Silver',
            license_plate: 'ABC-123',
            current_mileage: 45000,
        },
    });

    await prisma.vehicle.create({
        data: {
            driver_id: driver2.driver!.id,
            make: 'Honda',
            model: 'Civic',
            year: 2018,
            color: 'Blue',
            license_plate: 'XYZ-789',
            current_mileage: 62000,
        },
    });

    // 3. Create Mechanics
    const mechanic1 = await prisma.user.create({
        data: {
            email: 'mechanic@example.com',
            password_hash: passwordHash,
            full_name: 'Mike Mechanic',
            phone_number: '+1122334455',
            role: 'mechanic',
            is_verified: true,
            mechanic: {
                create: {
                    shop_name: "Mike's Auto Repair",
                    shop_address: '123 Main St, San Francisco, CA',
                    shop_description: 'Expert repair for all makes and models. Family owned since 2010.',
                    shop_location_lat: 37.775,
                    shop_location_lng: -122.418,
                    service_radius_km: 20,
                    hourly_rate: 85.0,
                    years_experience: 15,
                    is_available: true,
                    verification_status: 'verified',
                    certifications: ['ASE Certified', 'Master Technician'],
                    specializations: ['Engine Repair', 'Brake Service', 'Oil Change'],
                    shop_photos: {
                        create: [
                            { photo_url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=1000', caption: 'Shop Exterior' },
                            { photo_url: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=1000', caption: 'Service Bay' },
                        ]
                    }
                },
            },
        },
        include: { mechanic: true },
    });

    const mechanic2 = await prisma.user.create({
        data: {
            email: 'sarah@example.com',
            password_hash: passwordHash,
            full_name: 'Sarah Smith',
            phone_number: '+1555666777',
            role: 'mechanic',
            is_verified: true,
            mechanic: {
                create: {
                    shop_name: "Sarah's Mobile Mechanics",
                    shop_address: 'Mobile Service - Greater SF Area',
                    shop_description: 'We come to you! Professional mobile mechanic service.',
                    shop_location_lat: 37.780,
                    shop_location_lng: -122.420,
                    service_radius_km: 30,
                    hourly_rate: 95.0,
                    years_experience: 8,
                    is_available: true,
                    verification_status: 'verified',
                    certifications: ['Mobile Tech Certified'],
                    specializations: ['General Maintenance', 'Battery Replacement', 'Diagnostics'],
                },
            },
        },
        include: { mechanic: true },
    });

    // 4. Create Bookings
    // Past completed booking
    const vehicle1 = await prisma.vehicle.findFirst({ where: { driver_id: driver1.driver!.id } });

    const booking1 = await prisma.booking.create({
        data: {
            driver_id: driver1.driver!.id,
            mechanic_id: mechanic1.mechanic!.id,
            vehicle_id: vehicle1!.id,
            service_type: 'Oil Change',
            description: 'Regular oil change needed',
            status: 'completed',
            scheduled_time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
            completed_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 3600000), // 1 hour later
            location_lat: 37.775,
            location_lng: -122.418,
            location_address: '123 Main St, San Francisco, CA',
            estimated_price: 60.0,
            final_price: 60.0,
            payment_status: 'paid',
        },
    });

    // Upcoming booking
    await prisma.booking.create({
        data: {
            driver_id: driver1.driver!.id,
            mechanic_id: mechanic2.mechanic!.id,
            vehicle_id: vehicle1!.id,
            service_type: 'Battery Replacement',
            description: 'Car having trouble starting',
            status: 'accepted',
            scheduled_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
            location_lat: 37.7749,
            location_lng: -122.4194,
            location_address: 'Driver Location',
            estimated_price: 150.0,
            payment_status: 'pending',
        },
    });

    // 5. Create Reviews
    await prisma.review.create({
        data: {
            booking_id: booking1.id,
            driver_id: driver1.driver!.id,
            mechanic_id: mechanic1.mechanic!.id,
            rating: 5,
            comment: 'Great service! Quick and professional.',
            categories: {
                create: {
                    quality_rating: 5,
                    punctuality_rating: 5,
                    communication_rating: 4,
                    pricing_rating: 5,
                    cleanliness_rating: 5,
                }
            },
            tags: {
                create: [
                    { tag: 'fixed_quickly' },
                    { tag: 'fair_price' }
                ]
            }
        },
    });

    // Update mechanic stats
    await prisma.mechanic.update({
        where: { id: mechanic1.mechanic!.id },
        data: {
            rating_average: 5.0,
            total_reviews: 1,
        },
    });

    // 6. Create Articles
    await prisma.article.create({
        data: {
            title: 'How to Check Your Oil',
            slug: 'how-to-check-oil',
            content: 'Checking your oil is simple. 1. Park on level ground. 2. Wait for engine to cool...',
            excerpt: 'Learn the basics of checking your engine oil level.',
            category: 'Basics',
            read_time_minutes: 3,
            is_published: true,
            thumbnail_url: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=500',
        },
    });

    await prisma.article.create({
        data: {
            title: 'Understanding Dashboard Warning Lights',
            slug: 'dashboard-warning-lights',
            content: 'Check Engine Light: This could mean many things...',
            excerpt: 'Don\'t panic when a light comes on. Here is what they mean.',
            category: 'Warning Lights',
            read_time_minutes: 5,
            is_published: true,
            thumbnail_url: 'https://images.unsplash.com/photo-1580273916550-e323be2ed5f6?auto=format&fit=crop&q=80&w=500',
        },
    });

    // 7. Create Admin User
    await prisma.user.create({
        data: {
            email: 'admin@example.com',
            password_hash: passwordHash,
            full_name: 'Admin User',
            phone_number: '+1000000000',
            role: 'admin',
            is_verified: true,
        },
    });

    // 8. Create Loyalty Points & Transactions
    const loyalty = await prisma.loyaltyPoints.create({
        data: {
            user_id: driver1.id,
            total_points: 150,
            tier_level: 'Silver',
        },
    });

    await prisma.pointTransaction.create({
        data: {
            loyalty_id: loyalty.id,
            points: 100,
            action_type: 'booking_completed',
            description: 'Completed Oil Change',
        },
    });

    await prisma.pointTransaction.create({
        data: {
            loyalty_id: loyalty.id,
            points: 50,
            action_type: 'referral',
            description: 'Referred a friend',
        },
    });

    // 9. Create Notifications
    await prisma.notification.create({
        data: {
            user_id: driver1.id,
            title: 'Booking Confirmed',
            message: 'Your booking with Mike\'s Auto Repair has been confirmed.',
            type: 'booking',
            related_id: booking1.id,
        },
    });

    await prisma.notification.create({
        data: {
            user_id: mechanic1.id,
            title: 'New Review',
            message: 'You received a 5-star review from John Driver.',
            type: 'review',
            related_id: booking1.id,
        },
    });

    // 10. Create Maintenance Reminders
    await prisma.maintenanceReminder.create({
        data: {
            vehicle_id: vehicle1!.id,
            reminder_type: 'tire_rotation',
            due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            notes: 'Rotate tires every 5000 miles',
        },
    });

    // 11. Create Saved Mechanics
    await prisma.savedMechanic.create({
        data: {
            driver_id: driver1.driver!.id,
            mechanic_id: mechanic1.mechanic!.id,
        },
    });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
