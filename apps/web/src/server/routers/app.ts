import { publicProcedure, router } from '../trpc';
import { authRouter } from './auth';
import { driverRouter } from './driver';
import { mechanicRouter } from './mechanic';
import { bookingRouter } from './booking';
import { reviewRouter } from './review';
import { messageRouter } from './message';
import { paymentRouter } from './payment';
import { contentRouter } from './content';
import { emergencyRouter } from './emergency';
import { adminRouter } from './admin';
import { loyaltyRouter } from './loyalty';
import { notificationRouter } from './notification';
import { reminderRouter } from './reminder';
import { favoriteRouter } from './favorite';

export const appRouter = router({
    health: publicProcedure.query(() => {
        return 'ok';
    }),
    auth: authRouter,
    driver: driverRouter,
    mechanic: mechanicRouter,
    booking: bookingRouter,
    review: reviewRouter,
    message: messageRouter,
    payment: paymentRouter,
    content: contentRouter,
    emergency: emergencyRouter,
    admin: adminRouter,
    loyalty: loyaltyRouter,
    notification: notificationRouter,
    reminder: reminderRouter,
    favorite: favoriteRouter,
});

export type AppRouter = typeof appRouter;
