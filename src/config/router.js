import authRouter from '@/routes/auth';
import indexRouter from '@/routes/index';
import userRouter from '@/routes/user';
import roleRouter from '@/routes/role';

export default function (app) {
  app.use('/', indexRouter);
  app.use('/auth', authRouter);
  app.use('/users', userRouter);
  app.use('/roles', roleRouter);
}
