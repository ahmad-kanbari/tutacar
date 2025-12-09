import { appRouter } from '../src/server/routers/app';
import { prisma } from '../src/lib/prisma';

const caller = appRouter.createCaller({});

async function main() {
    console.log('🚀 Starting Backend Verification...');

    try {
        // 1. Admin Verification
        console.log('\n--- Admin Router ---');
        const stats = await caller.admin.getStats();
        console.log('✅ Stats fetched:', stats);

        const users = await caller.admin.listUsers({ limit: 5 });
        console.log(`✅ Listed ${users.users.length} users`);

        // 2. Loyalty Verification
        console.log('\n--- Loyalty Router ---');
        // Get a user ID (assuming seed ran or we pick one)
        const user = await prisma.user.findFirst({ where: { role: 'driver' } });
        if (user) {
            const balance = await caller.loyalty.getBalance({ userId: user.id });
            console.log('✅ Loyalty Balance:', balance);

            const referral = await caller.loyalty.getReferralCode({ userId: user.id });
            console.log('✅ Referral Code:', referral.code);
        } else {
            console.log('⚠️ No driver found for loyalty test');
        }

        // 3. Notification Verification
        console.log('\n--- Notification Router ---');
        if (user) {
            const notifications = await caller.notification.list({ userId: user.id });
            console.log(`✅ Found ${notifications.length} notifications`);

            if (notifications.length > 0) {
                await caller.notification.markRead({ id: notifications[0].id });
                console.log('✅ Marked notification as read');
            }
        }

        // 4. Reminder Verification
        console.log('\n--- Reminder Router ---');
        const vehicle = await prisma.vehicle.findFirst();
        if (vehicle) {
            const reminder = await caller.reminder.create({
                vehicleId: vehicle.id,
                reminderType: 'general',
                notes: 'Test Reminder',
                dueDate: new Date().toISOString(),
            });
            console.log('✅ Created reminder:', reminder.id);

            const reminders = await caller.reminder.list({ vehicleId: vehicle.id });
            console.log(`✅ Listed ${reminders.length} reminders`);

            await caller.reminder.delete({ id: reminder.id });
            console.log('✅ Deleted reminder');
        } else {
            console.log('⚠️ No vehicle found for reminder test');
        }

        // 5. Favorite Verification
        console.log('\n--- Favorite Router ---');
        const mechanic = await prisma.mechanic.findFirst();
        if (user && user.driver && mechanic) {
            const result = await caller.favorite.toggle({
                driverId: user.driver.id,
                mechanicId: mechanic.id,
            });
            console.log('✅ Toggled favorite:', result);

            const favorites = await caller.favorite.list({ driverId: user.driver.id });
            console.log(`✅ Listed ${favorites.length} favorites`);
        } else {
            console.log('⚠️ Missing driver or mechanic for favorite test');
        }

        console.log('\n✅ Verification Complete!');

    } catch (error) {
        console.error('❌ Verification Failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
